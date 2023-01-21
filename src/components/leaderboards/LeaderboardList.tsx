import { useContext } from "react";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import { LeaderboardListContainer } from "./Leaderboard.styled";
import LeaderboardRecord from "./LeaderboardRecord";

const LeaderboardList = () => {
  const globalServices = useContext(GlobalStateContext);
  return (
    <LeaderboardListContainer>
      {globalServices.userLeaderboard
        .sort((a, b) => {
          return a.level > b.level
            ? -1
            : 1 || a.errors > b.errors
            ? 1
            : -1 || a.time > b.time
            ? 1
            : -1 || a.correctClicks > b.correctClicks
            ? -1
            : 1;
        })
        .slice(0, 6)
        .map((user, index) => (
          <LeaderboardRecord user={user} index={index} key={user.username} />
        ))}
    </LeaderboardListContainer>
  );
};

export default LeaderboardList;
