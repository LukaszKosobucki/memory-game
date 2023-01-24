import { GlobalStateContext, IUsers } from "../../utils/ContextWrapper";
import {
  LeaderboardInfoContainer,
  LeaderboardLevel,
  LeaderboardName,
  LeaderboardNumber,
  LeaderboardRecordContainer,
  LeaderboardStats,
} from "./Leaderboard.styled";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeaderboardRecord = ({
  user,
  index,
}: {
  user: IUsers;
  index: number;
}) => {
  const globalServices = useContext(GlobalStateContext);
  const [flipped, setFlipped] = useState(false);

  const handleHover = () => setFlipped(true);
  const handleHoverEnd = () => setFlipped(false);

  return (
    <AnimatePresence>
      {globalServices.matches ? (
        <motion.div onTouchStart={() => setFlipped(!flipped)}>
          {!flipped ? (
            <LeaderboardRecordContainer
              key={"front"}
              transition={{ duration: 0.4 }}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
            >
              {[1, 2, 3].includes(index + 1) && (
                <img src={`/medal${index + 1}.svg`} alt="" style={{}} />
              )}
              <LeaderboardName>{user.username}</LeaderboardName>
              <LeaderboardLevel>level: {user.level}</LeaderboardLevel>
            </LeaderboardRecordContainer>
          ) : (
            <LeaderboardInfoContainer
              key={"back"}
              transition={{ duration: 0.4 }}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
            >
              <LeaderboardStats>time: {user.time}s</LeaderboardStats>
              <LeaderboardStats>correct: {user.correctClicks}</LeaderboardStats>
              <LeaderboardStats>errors: {user.errors}</LeaderboardStats>
            </LeaderboardInfoContainer>
          )}
        </motion.div>
      ) : (
        <motion.div onHoverStart={handleHover} onHoverEnd={handleHoverEnd}>
          {!flipped ? (
            <LeaderboardRecordContainer
              key={"front"}
              transition={{ duration: 0.4 }}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
            >
              <LeaderboardNumber>no.{index + 1}</LeaderboardNumber>
              {[1, 2, 3].includes(index + 1) && (
                <img src={`/medal${index + 1}.svg`} alt="" />
              )}
              <LeaderboardName>{user.username}</LeaderboardName>
              <LeaderboardLevel>level: {user.level}</LeaderboardLevel>
            </LeaderboardRecordContainer>
          ) : (
            <LeaderboardRecordContainer
              key={"back"}
              transition={{ duration: 0.4 }}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
            >
              <LeaderboardStats>time: {user.time}s</LeaderboardStats>
              <LeaderboardStats>correct: {user.correctClicks}</LeaderboardStats>
              <LeaderboardStats>errors: {user.errors}</LeaderboardStats>
            </LeaderboardRecordContainer>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeaderboardRecord;
