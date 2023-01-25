import { Heading4 } from "../../global.styled";
import { IUsers } from "../../utils/ContextWrapper";
import {
  LeaderboardListContainer,
  LeaderboardNavigation,
  NextButton,
  PreviousButton,
} from "./Leaderboard.styled";
import LeaderboardRecord from "./LeaderboardRecord";

const LeaderboardList = ({
  userLeaderboard,
  handleNextPage,
  handlePreviousPage,
  leaderboardLimit,
}: {
  userLeaderboard: IUsers[];
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  leaderboardLimit: number;
}) => {
  return (
    <LeaderboardListContainer>
      {userLeaderboard
        .sort((a, b) => {
          return (
            b.level - a.level ||
            a.time - b.time ||
            a.errors - b.errors ||
            b.correctClicks - a.correctClicks
          );
        })
        .slice(leaderboardLimit, leaderboardLimit + 6)
        .map((user, index) => (
          <LeaderboardRecord
            user={user}
            index={leaderboardLimit + index}
            key={user.username}
          />
        ))}
      <LeaderboardNavigation>
        {leaderboardLimit >= 6 && (
          <PreviousButton onClick={handlePreviousPage}>
            <Heading4>previous</Heading4>
          </PreviousButton>
        )}
        {leaderboardLimit + 6 < userLeaderboard.length && (
          <NextButton onClick={handleNextPage}>
            <Heading4>next</Heading4>
          </NextButton>
        )}
      </LeaderboardNavigation>
    </LeaderboardListContainer>
  );
};

export default LeaderboardList;
