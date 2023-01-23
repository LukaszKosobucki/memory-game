import { GlobalStateContext, IUsers } from "../../utils/ContextWrapper";
import {
  LeaderboardLevel,
  LeaderboardName,
  LeaderboardNumber,
  LeaderboardRecordContainer,
} from "./Leaderboard.styled";
import { useContext } from "react";

const LeaderboardRecord = ({
  user,
  index,
}: {
  user: IUsers;
  index: number;
}) => {
  const globalServices = useContext(GlobalStateContext);

  return (
    <>
      {globalServices.matches ? (
        <LeaderboardRecordContainer>
          <LeaderboardName>
            {[1, 2, 3].includes(index + 1) && (
              <img src={`/medal${index + 1}.svg`} alt="" />
            )}
            {user.username}
          </LeaderboardName>
          <LeaderboardLevel>level: {user.level}</LeaderboardLevel>
        </LeaderboardRecordContainer>
      ) : (
        <LeaderboardRecordContainer>
          <LeaderboardNumber>no.{index + 1}</LeaderboardNumber>
          <LeaderboardName>
            {[1, 2, 3].includes(index + 1) && (
              <img src={`/medal${index + 1}.svg`} alt="" />
            )}
            {user.username}
          </LeaderboardName>
          <LeaderboardLevel>level: {user.level}</LeaderboardLevel>
        </LeaderboardRecordContainer>
      )}
    </>
  );
};

export default LeaderboardRecord;
