import { IUsers } from "../../utils/ContextWrapper";
import {
  LeaderboardLevel,
  LeaderboardName,
  LeaderboardNumber,
  LeaderboardRecordContainer,
} from "./Leaderboard.styled";

const LeaderboardRecord = ({
  user,
  index,
}: {
  user: IUsers;
  index: number;
}) => {
  return (
    <LeaderboardRecordContainer>
      <LeaderboardNumber>no.{index + 1}</LeaderboardNumber>
      <LeaderboardName>{user.username}</LeaderboardName>
      <LeaderboardLevel>level: {user.level}</LeaderboardLevel>
    </LeaderboardRecordContainer>
  );
};

export default LeaderboardRecord;
