import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Trophy, Calendar, MapPin, Users, Award, Clock } from "lucide-react";
import type { Tournament as TournamentType } from "@/types/tournament/TournamentType";
import { TournamentStateLabel, TournamentScopeLabel } from "@/enums/Tournament";
import TournamentDetailsSidebar from "./TournamentDetailsSidebar/TournamentDetailsSidebar";
import { getTournamentById } from "@/api/tournament/TournamentAPI";

export default function TournamentDetails() {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const [tournament, setTournament] = useState<TournamentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tournamentId) {
      console.warn("No tournament ID provided in the URL.");
      return;
    }

    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        const data = await getTournamentById(tournamentId);
        setTournament(data);
      } catch (error) {
        console.error("Failed to fetch tournament details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
  }, [tournamentId]);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStateBadgeClasses = (state: string) => {
    switch (state) {
      case "ONGOING":
        return "bg-red-50 text-red-700 border-red-200";
      case "UPCOMING":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "COMPLETED":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-red-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin giải đấu...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <p className="text-gray-600 font-medium">
            Không tìm thấy thông tin giải đấu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-5 items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="w-full mx-auto mb-4">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg rounded-xl overflow-hidden">
            <div className="px-6 py-10 md:px-10 md:py-12">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-inner shrink-0">
                  <Trophy className="w-12 h-12 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium border ${getStateBadgeClasses(
                        tournament.tournamentState
                      )}`}
                    >
                      {TournamentStateLabel[tournament.tournamentState]}
                    </span>

                    <span className="px-4 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md text-white border border-white/10">
                      {TournamentScopeLabel[tournament.tournamentScope]}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                    {tournament.tournamentName}
                  </h2>

                  <div className="flex flex-wrap gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{formatDate(tournament.tournamentDate)}</span>
                    </div>
                    {tournament.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{tournament.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Vận động viên</p>
              <p className="text-gray-900 font-medium text-lg">248 người</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Hạng đấu</p>
              <p className="text-gray-900 font-medium text-lg">16 hạng</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Thời gian</p>
              <p className="text-gray-900 font-medium text-lg">3 ngày</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 text-xl font-semibold mb-4">
            Thông Tin Giải Đấu
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-gray-500 text-sm mb-1">Đơn vị tổ chức</p>
              <p className="text-gray-900 font-medium">
                Liên đoàn Taekwondo Việt Nam
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Thể thức thi đấu</p>
              <p className="text-gray-900 font-medium">Loại trực tiếp</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Độ tuổi tham gia</p>
              <p className="text-gray-900 font-medium">16 tuổi trở lên</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Trọng tài chính</p>
              <p className="text-gray-900 font-medium">
                Nguyễn Văn A (WTF Level 4)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 text-xl font-semibold mb-4">
            Hạng Cân Thi Đấu
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              "54kg",
              "58kg",
              "63kg",
              "68kg",
              "74kg",
              "80kg",
              "87kg",
              "+87kg",
            ].map((weight) => (
              <div
                key={weight}
                className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <p className="text-gray-900 font-medium">{weight}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {Math.floor(Math.random() * 20 + 10)} VĐV
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 text-xl font-semibold mb-4">
            Lịch Thi Đấu
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="min-w-[80px] p-3 rounded-lg text-center bg-red-600 text-white shrink-0">
                <div className="text-lg font-bold leading-none mb-1">05</div>
                <div className="text-xs opacity-90">Tháng 12</div>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium mb-1">
                  Ngày 1: Vòng loại
                </p>
                <p className="text-gray-600 text-sm">
                  8:00 - 18:00 | Thi đấu vòng loại các hạng cân
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="min-w-[80px] p-3 rounded-lg text-center bg-orange-600 text-white shrink-0">
                <div className="text-lg font-bold leading-none mb-1">06</div>
                <div className="text-xs opacity-90">Tháng 12</div>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium mb-1">
                  Ngày 2: Vòng bán kết
                </p>
                <p className="text-gray-600 text-sm">
                  8:00 - 18:00 | Thi đấu vòng bán kết
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="min-w-[80px] p-3 rounded-lg text-center bg-amber-600 text-white shrink-0">
                <div className="text-lg font-bold leading-none mb-1">07</div>
                <div className="text-xs opacity-90">Tháng 12</div>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium mb-1">
                  Ngày 3: Chung kết & Lễ trao giải
                </p>
                <p className="text-gray-600 text-sm">
                  8:00 - 20:00 | Thi đấu chung kết và lễ trao giải
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 text-xl font-semibold mb-4">
            Thông Tin Liên Hệ
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Email</p>
              <p className="text-gray-900 font-medium">
                contact@taekwondo-vietnam.vn
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Điện thoại</p>
              <p className="text-gray-900 font-medium">0909 123 456</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Website</p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                www.taekwondo-vietnam.vn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:sticky lg:top-8 z-10">
        <TournamentDetailsSidebar idTournament={tournamentId!} />
      </div>
    </div>
  );
}
