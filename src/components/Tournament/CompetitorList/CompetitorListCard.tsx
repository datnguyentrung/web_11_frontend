import "./CompetitorListCard.scss";
import { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Plus, Trophy } from "lucide-react";

import { getPoomsaeListByFilter } from "@/api/achievement/PoomsaeListAPI";
import { getSparringListByFilter } from "@/api/achievement/SparringListAPI";
import {
  createPoomsaeHistoryForElimination, checkModePoomsaeHistoryExistence
} from "@/api/tournament/Poomsae/PoomsaeHistoryAPI";

import type { CompetitorBaseDTO } from "@/types/achievement/Competitor";

import ModalAddAthlete from "./ModalAddAthlete";
import { formatDateDMY } from "@/utils/format";
import type { CheckModeResponse } from "@/types/tournament/PoomsaeCombinationType";

type Props = {
  tournamentId: string;
  combinationId: string;
  discipline: string; // "quyen" or "doi-khang"
  combinationName: string;
};

export default function CompetitorListCard({
  tournamentId,
  combinationId,
  discipline,
  combinationName,
}: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [competitors, setCompetitors] = useState<CompetitorBaseDTO>();
  const [existsSigma, setExistsSigma] = useState<CheckModeResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const saveListAthlete = () => {
    console.log("Lưu danh sách vào database");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!tournamentId || !combinationId) {
      return;
    }

    // Gọi API để lấy danh sách vận động viên dựa trên tournamentId và combinationId
    const fetchPoomsaeCompetitors = async () => {
      setLoading(true);
      try {
        const [data, exists] = await Promise.all([
          getPoomsaeListByFilter(tournamentId, combinationId),
          checkModePoomsaeHistoryExistence(tournamentId, combinationId),
        ]);
        setExistsSigma(exists);
        setCompetitors(data);
      } catch (error) {
        console.error("Error fetching poomsae competitors:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSparringCompetitors = async () => {
      setLoading(true);
      try {
        const [data, exists] = await Promise.all([
          getSparringListByFilter(tournamentId, combinationId),
          checkModePoomsaeHistoryExistence(tournamentId, combinationId),
        ]);
        setExistsSigma(exists);
        // console.log('Sparring data received:', data); // Debug log
        setCompetitors(data);
      } catch (error) {
        console.error("Error fetching sparring competitors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (discipline === "quyen") {
      fetchPoomsaeCompetitors();
    } else if (discipline === "doi-khang") {
      fetchSparringCompetitors();
    }
  }, [tournamentId, combinationId, discipline]);

  const handleCreateBracket = () => {
    if (discipline === "quyen" && competitors && competitors?.competitorDetailDTO?.length > 0) {
      // Gọi API để tạo bảng đấu quyền
      createPoomsaeHistoryForElimination(
        competitors.competitorDetailDTO.map((c) => c.idCompetitor!)
      )
        .then(() => {
          console.log("Bảng đấu quyền đã được tạo thành công");
        })
        .catch((error) => {
          console.error("Lỗi khi tạo bảng đấu quyền:", error);
        });
    } else if (discipline === "doi-khang") {
      // Gọi API để tạo bảng đấu đối kháng
    }
  };

  const handleViewBracket = () => {
    console.log("View bracket clicked");

    if (existsSigma && existsSigma.exists && existsSigma.poomsaeMode) {
      const path = `/giai-dau/${tournamentId}/${discipline}/${combinationId}/bang-dau`;

      const params: Record<string, string> = {
        combination_name: combinationName,
        sigma_type: existsSigma.poomsaeMode,
      };

      navigate({
        pathname: path,
        search: createSearchParams(params).toString()
      })
    }
  };

  // Kiểm tra xem tournamentType có hợp lệ không
  if (discipline !== "quyen" && discipline !== "doi-khang") {
    return <div>Loại giải đấu không hợp lệ</div>;
  }

  if (loading) {
    return <div>Đang tải danh sách vận động viên...</div>;
  }

  return (
    <div className="competitor-list">
      <div className="competitor-list__header">
        <div className="competitor-list__title-section">
          <h2>Danh Sách Vận Động Viên</h2>
          <p>
            Loại giải: {discipline === "quyen" ? "Quyền" : "Đối Kháng"} -{" "}
            {combinationName}
          </p>
        </div>
        <div className="competitor-list__actions">
          <button
            className="competitor-list__action competitor-list__action--secondary"
            onClick={showModal}
          >
            <Plus className="competitor-list__action-icon" />
            Thêm vận động viên
          </button>
          {competitors?.competitorDetailDTO?.length === 0 ? (
            <div className="competitor-list__info-message">
              Chưa có vận động viên nào để tạo bảng đấu
            </div>
          ) : existsSigma && !existsSigma.exists && competitors && competitors?.competitorDetailDTO?.length > 0 ? (
            <button
              className="competitor-list__action competitor-list__action--primary"
              onClick={handleCreateBracket}
            >
              <Trophy className="competitor-list__action-icon" />
              Tạo bảng đấu
            </button>
          ) : (
            existsSigma?.exists && (
              <button
                className="competitor-list__action competitor-list__action--primary"
                onClick={handleViewBracket}
              >
                <Trophy className="competitor-list__action-icon" />
                Xem bảng đấu
              </button>
            )
          )}
        </div>
      </div>
      {competitors &&
        <ModalAddAthlete
          isModalOpen={isModalOpen}
          handleOk={saveListAthlete}
          handleCancel={handleCancel}
          tournamentId={tournamentId}
          combinationId={combinationId}
          combinationType={discipline}
          competitors={competitors.competitorDetailDTO}
        ></ModalAddAthlete>
      }
      {competitors?.competitorDetailDTO?.length === 0 ? (
        <div>Không có vận động viên nào</div>
      ) : (
        <div className="competitor-list__grid">
          {competitors?.competitorDetailDTO.map((competitor) => {
            const detail = competitor;
            const student = detail.personalInfo;
            return (
              <div
                key={competitor.idCompetitor || Math.random()}
                className="competitor-card"
              >
                <div className="competitor-card__info">
                  <h3>{student?.name || "Tên không có sẵn"}</h3>
                  <p>ID: {student?.idAccount || "N/A"}</p>
                  <p>Ngày sinh: {formatDateDMY(student?.birthDate) || "N/A"}</p>
                  {detail.medal && (
                    <p className="medal">Huy chương: {detail.medal}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
