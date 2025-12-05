import "./CompetitorList.scss";
import { useParams, useSearchParams } from "react-router-dom";
import CompetitorListCard from "./CompetitorListCard";
import TournamentDetailsSidebar from "../TournamentDetails/TournamentDetailsSidebar/TournamentDetailsSidebar";

export default function CompetitorList() {
  const { tournamentType } = useParams<{ tournamentType: string }>(); // "quyen" or "doi-khang"
  const [searchParams] = useSearchParams();

  // Lấy search params từ URL
  const tournamentId = searchParams.get("tournament"); // "5df55583-..."
  const combinationId = searchParams.get("combination_id"); // "05a8f93d-..."
  const combinationName = searchParams.get("combination_name"); // "Hạng A - Nam"

  // Kiểm tra xem các tham số có hợp lệ không
  if (!tournamentId || !combinationId || !tournamentType) {
    return <div className="competitor-list--error">Invalid parameters</div>;
  }

  return (
    <div className="competitor-list--container">
      <CompetitorListCard
        tournamentId={tournamentId!}
        combinationId={combinationId!}
        combinationName={combinationName!}
        tournamentType={tournamentType!}
      />

      <TournamentDetailsSidebar idTournament={tournamentId!} />
    </div>
  );
}
