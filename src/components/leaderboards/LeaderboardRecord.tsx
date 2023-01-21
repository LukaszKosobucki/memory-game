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
      <LeaderboardName>
        {[1, 2, 3].includes(index + 1) && (
          <img src={`/medal${index + 1}.png`} alt="" />
        )}
        {user.username}
      </LeaderboardName>
      <LeaderboardLevel>level: {user.level}</LeaderboardLevel>
    </LeaderboardRecordContainer>
  );
};

export default LeaderboardRecord;
