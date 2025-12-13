import "./CompetitorList.scss";
import { useParams, useSearchParams } from "react-router-dom";
import CompetitorListCard from "./CompetitorListCard";
import TournamentDetailsSidebar from "../TournamentDetails/TournamentDetailsSidebar/TournamentDetailsSidebar";

export default function CompetitorList() {
  const { tournamentId, discipline, combinationId } = useParams<{
    tournamentId: string;
    discipline: string;
    combinationId: string;
  }>();

  const [searchParams] = useSearchParams();
  const combinationName = searchParams.get("combination_name");

  // Kiểm tra xem các tham số có hợp lệ không
  if (!tournamentId || !combinationId || !discipline) {
    return <div className="competitor-list--error">Invalid parameters</div>;
  }

  return (
    <div className="competitor-list--container">
      <CompetitorListCard
        tournamentId={tournamentId!}
        combinationId={combinationId!}
        discipline={discipline!}
        combinationName={combinationName!}
      />

      <TournamentDetailsSidebar tournamentId={tournamentId!} />
    </div>
  );
}
