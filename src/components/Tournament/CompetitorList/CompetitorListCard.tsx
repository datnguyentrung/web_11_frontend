import { useEffect, useState } from "react";
import { Plus, Trophy, Users, Award, AlertCircle } from "lucide-react";
import { getPoomsaeListByFilter } from "@/api/achievement/PoomsaeListAPI";
import { getSparringListByFilter } from "@/api/achievement/SparringListAPI";
import { createPoomsaeHistoryForElimination } from "@/api/tournament/PoomsaeHistoryAPI";
import { existPoomsaeHistoryByFilter } from "@/api/tournament/PoomsaeHistoryAPI";

import type { CompetitorBaseDTO } from "@/types/achievement/Competitor";
import ModalAddAthlete from "./ModalAddAthlete";

interface Props {
  tournamentId: string;
  combinationId: string;
  combinationName: string;
  tournamentType: "quyen" | "doi-khang";
}

export default function CompetitorListCard({
  tournamentId,
  combinationId,
  combinationName,
  tournamentType,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [competitors, setCompetitors] = useState<CompetitorBaseDTO[]>([]);
  const [existsSigma, setExistsSigma] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const saveListAthlete = (): void => {
    console.log("Lưu danh sách vào database");
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!tournamentId || !combinationId) {
      return;
    }

    const fetchPoomsaeCompetitors = async (): Promise<void> => {
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

    const fetchSparringCompetitors = async (): Promise<void> => {
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

    if (tournamentType === "quyen") {
      fetchPoomsaeCompetitors();
    } else if (tournamentType === "doi-khang") {
      fetchSparringCompetitors();
    }
  }, [tournamentId, combinationId, tournamentType]);

  const handleCreateBracket = async (): Promise<void> => {
    if (tournamentType === "quyen" && competitors.length > 0) {
      try {
        await createPoomsaeHistoryForElimination(
          competitors.map((c) => c.idCompetitor!)
        );
        console.log("Bảng đấu quyền đã được tạo thành công");
      } catch (error) {
        console.error("Lỗi khi tạo bảng đấu quyền:", error);
      }
    } else if (tournamentType === "doi-khang") {
      // TODO: Gọi API để tạo bảng đấu đối kháng
    }
  };

  const handleViewBracket = (): void => {
    console.log("View bracket clicked");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Đang tải danh sách vận động viên...
          </p>
        </div>
      </div>
    );
  }

  const tournamentTypeLabel =
    tournamentType === "quyen" ? "Quyền" : "Đối Kháng";

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#fb2c36] to-[#e7202a] rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Danh Sách Vận Động Viên</h2>
            </div>
            <p className="text-[#fff] flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="font-medium">{tournamentTypeLabel}</span>
              <span className="mx-2">•</span>
              <span>{combinationName}</span>
            </p>
            <p className="text-[#fff] mt-2 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Tổng số: {competitors.length} vận động viên</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={showModal}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#fb2c36] rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Thêm vận động viên
            </button>

            {competitors.length === 0 ? (
              <div className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium">
                <AlertCircle className="w-5 h-5" />
                Chưa có vận động viên
              </div>
            ) : !existsSigma ? (
              <button
                onClick={handleCreateBracket}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Trophy className="w-5 h-5" />
                Tạo bảng đấu
              </button>
            ) : (
              <button
                onClick={handleViewBracket}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Trophy className="w-5 h-5" />
                Xem bảng đấu
              </button>
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
        combinationType={tournamentType}
      />

      {/* Competitors Grid */}
      {competitors.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Chưa có vận động viên
          </h3>
          <p className="text-gray-500">
            Nhấn nút "Thêm vận động viên" để bắt đầu thêm người tham gia
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((competitor) => {
            const detail = competitor.competitorDetailDTO;
            const student = detail.personalAcademicInfo;
            const personalInfo = student?.personalInfo;
            const academicInfo = student?.academicInfo;

            return (
              <div
                key={competitor.idCompetitor || Math.random()}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#fb2c36]"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {personalInfo?.name || "Tên không có sẵn"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    ID: {personalInfo?.idAccount || "N/A"}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cơ sở</p>
                      <p className="font-semibold">
                        {academicInfo?.idBranch || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Đai</p>
                      <p className="font-semibold">
                        {academicInfo?.beltLevel || "N/A"}
                      </p>
                    </div>
                  </div>

                  {detail.medal && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <Trophy className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-xs text-amber-700 font-medium">
                            Huy chương
                          </p>
                          <p className="font-bold text-amber-800">
                            {detail.medal}
                          </p>
                        </div>
                      </div>
                    </div>
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
