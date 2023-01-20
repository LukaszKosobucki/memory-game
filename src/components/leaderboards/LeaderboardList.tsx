import { useContext } from "react";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import { LeaderboardListContainer } from "./Leaderboard.styled";
import LeaderboardRecord from "./LeaderboardRecord";

const LeaderboardList = () => {
  const globalServices = useContext(GlobalStateContext);
  console.log(globalServices.userLeaderboard);
  return (
    <LeaderboardListContainer>
      {globalServices.userLeaderboard
        .sort((a, b) => {
          if (a.level === b.level) {
            if (a.errors === b.errors) {
              if (a.time === b.time) {
                return a.correctClicks > b.correctClicks ? -1 : 1;
              }
              return a.time > b.time ? 1 : -1;
            }
            return a.errors > b.errors ? 1 : -1;
          }
          return a.level > b.level ? -1 : 1;
        })
        .map((user, index) => (
          <LeaderboardRecord user={user} index={index} key={user.username} />
        ))}
    </LeaderboardListContainer>
  );
};

export default LeaderboardList;
