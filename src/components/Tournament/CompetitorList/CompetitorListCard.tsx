import { useEffect, useState } from "react";
import { Plus, Trophy, User, Award, MapPin, Shield } from "lucide-react";
import { getPoomsaeListByFilter } from "@/api/achievement/PoomsaeListAPI";
import { getSparringListByFilter } from "@/api/achievement/SparringListAPI";
import { createPoomsaeHistoryForElimination } from "@/api/tournament/Poomsae/PoomsaeHistoryAPI";
import { existPoomsaeHistoryByFilter } from "@/api/tournament/Poomsae/PoomsaeHistoryAPI";

import type { CompetitorBaseDTO } from "@/types/achievement/Competitor";
import ModalAddAthlete from "./ModalAddAthlete";

type Props = {
  tournamentId: string;
  combinationId: string;
  discipline: string;
  combinationName: string;
};

export default function CompetitorListCard({
  tournamentId,
  combinationId,
  discipline,
  combinationName,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [competitors, setCompetitors] = useState<CompetitorBaseDTO[]>([]);
  const [existsSigma, setExistsSigma] = useState<boolean>(false);
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

    const fetchPoomsaeCompetitors = async () => {
      setLoading(true);
      try {
        const [data, exists] = await Promise.all([
          getPoomsaeListByFilter(tournamentId, combinationId, null, null),
          existPoomsaeHistoryByFilter(tournamentId, combinationId, null),
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
          getSparringListByFilter(tournamentId, combinationId, null, null),
          existPoomsaeHistoryByFilter(tournamentId, combinationId, null),
        ]);
        setExistsSigma(exists);
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
    if (discipline === "quyen" && competitors.length > 0) {
      createPoomsaeHistoryForElimination(
        competitors.map((c) => c.idCompetitor!)
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
  };

  if (discipline !== "quyen" && discipline !== "doi-khang") {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg border-2 border-red-200">
        <p className="text-red-600 font-medium">Loại giải đấu không hợp lệ</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Đang tải danh sách vận động viên...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <User className="w-6 h-6 text-red-600" />
                Danh Sách Vận Động Viên
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <p className="text-sm">
                  <span className="font-medium">
                    {discipline === "quyen" ? "Quyền" : "Đối Kháng"}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{combinationName}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                  {competitors.length}
                </span>
                <span>Tổng số: {competitors.length} vận động viên</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={showModal}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                Thêm vận động viên
              </button>

              {competitors.length === 0 ? (
                <div className="flex items-center px-5 py-2.5 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg text-sm font-medium">
                  Chưa có vận động viên để tạo bảng đấu
                </div>
              ) : !existsSigma && competitors.length > 0 ? (
                <button
                  onClick={handleCreateBracket}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-600 transition-colors duration-200 shadow-sm"
                >
                  <Trophy className="w-5 h-5" />
                  Xem bảng đấu
                </button>
              ) : (
                existsSigma && (
                  <button
                    onClick={handleViewBracket}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm"
                  >
                    <Trophy className="w-5 h-5" />
                    Xem bảng đấu
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        <ModalAddAthlete
          isModalOpen={isModalOpen}
          handleOk={saveListAthlete}
          handleCancel={handleCancel}
          tournamentId={tournamentId}
          combinationId={combinationId}
          combinationType={discipline}
          competitors={competitors}
        />

        {/* Competitors Grid */}
        {competitors.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              Không có vận động viên nào
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Nhấn "Thêm vận động viên" để bắt đầu
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {competitors.map((competitor) => {
              const detail = competitor.competitorDetailDTO;
              const student = detail.personalAcademicInfo;
              return (
                <div
                  key={competitor.idCompetitor || Math.random()}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
                >
                  <div className="bg-gradient-to-r from-red-600 to-red-500 h-1 group-hover:h-1.5 transition-all duration-300"></div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-red-600 transition-colors duration-300">
                          {student?.personalInfo?.name || "Tên không có sẵn"}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          ID: {student?.personalInfo?.idAccount || "N/A"}
                        </p>
                      </div>
                      {detail.medal && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <Award className="w-3 h-3 text-yellow-600" />
                          <span className="text-xs font-medium text-yellow-700">
                            {detail.medal}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm">
                          <span className="text-gray-500">Chi nhánh:</span>{" "}
                          <span className="font-medium text-gray-700">
                            {student?.academicInfo?.idBranch || "N/A"}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm">
                          <span className="text-gray-500">Đai:</span>{" "}
                          <span className="font-medium text-red-600">
                            {student?.academicInfo?.beltLevel || "N/A"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
