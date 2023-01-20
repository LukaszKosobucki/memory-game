import { Heading4 } from "../../global.styled";
import { IUsers } from "../../utils/ContextWrapper";
import { LeaderboardRecordContainer } from "./Leaderboard.styled";

const LeaderboardRecord = ({
  user,
  index,
}: {
  user: IUsers;
  index: number;
}) => {
  return (
    <LeaderboardRecordContainer>
      <Heading4>no.{index + 1}</Heading4>
      <Heading4>{user.username}</Heading4>
      <Heading4>level: {user.level}</Heading4>
    </LeaderboardRecordContainer>
  );
};

export default LeaderboardRecord;
