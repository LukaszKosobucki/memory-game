import { Heading4 } from "../../global.styled";
import { LeaderboardRecordContainer } from "./Leaderboard.styled";

const LeaderboardRecord = ({ user }: any) => {
  return (
    <LeaderboardRecordContainer>
      <Heading4>no.1</Heading4>
      <Heading4>{user.username}</Heading4>
      <Heading4>level: {user.level}</Heading4>
    </LeaderboardRecordContainer>
  );
};

export default LeaderboardRecord;
