import type { Bxh } from '../../../../types/bxh';
import './BxhList.scss';

type Props = {
    players: Bxh[];
    hasFilterName?: boolean;
};

export default function BxhList({ players, hasFilterName }: Props) {
    console.log('BxhList players:', players);

    function renderPlayerRow(player: Bxh, index: number) {
        return (
            <div key={index} className="bxh-player-row">
                <div className="bxh-player-rank">{hasFilterName && player.rank ? player.rank : index + 1}</div>
                <div className='bxh-player-branch'>{player.branch}</div>
                <div className="bxh-player-name">{player.studentName}</div>
                <div className="bxh-player-count">{player.amount} lượt rút gối</div>
                <div className="bxh-player-time">{player.duration} giây</div>
                <div className={`bxh-player-level${player.accept ? '--accepted' : '--not-accepted'}`}>
                    {player.accept ? `Level ${player.level}` : 'Chưa đạt điều kiện'}
                </div>
            </div>
        );
    }

    return (
        <div className="bxh-list">
            {players.map(renderPlayerRow)}
        </div>
    );
}