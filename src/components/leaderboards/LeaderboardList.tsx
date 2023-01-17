import { LeaderboardListContainer } from "./Leaderboard.styled";
import LeaderboardRecord from "./LeaderboardRecord";

const mockList = [
  { username: "user1", level: 15 },
  { username: "user2", level: 13 },
  { username: "user3", level: 11 },
  { username: "user4", level: 17 },
];

const LeaderboardList = () => {
  return (
    <LeaderboardListContainer>
      {mockList.map((user) => (
        <LeaderboardRecord user={user} />
      ))}
    </LeaderboardListContainer>
  );
};

export default LeaderboardList;
