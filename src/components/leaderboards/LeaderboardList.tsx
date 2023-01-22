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
          return (
            b.level - a.level ||
            a.time - b.time ||
            a.errors - b.errors ||
            b.correctClicks - a.correctClicks
          );
        })
        .slice(0, 6)
        .map((user, index) => (
          <LeaderboardRecord user={user} index={index} key={user.username} />
        ))}
    </LeaderboardListContainer>
  );
};

export default LeaderboardList;
