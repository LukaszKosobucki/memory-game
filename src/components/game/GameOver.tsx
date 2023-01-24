import { useNavigate } from "react-router-dom";
import {
  Heading1,
  Heading2,
  Heading4,
  Heading5,
  Heading6,
} from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";
import {
  ErrorMessage,
  ErrorMessageMobile,
  GaveOver,
  GaveOverInfo,
  UserInput,
  UserInputContainer,
} from "./GameBoard.styled";
import { useContext, useRef, useState } from "react";
import { GlobalStateContext, IUsers } from "../../utils/ContextWrapper";
import GameInfoHeader from "./GameInfoHeader";
import { motion } from "framer-motion";
import { collection, doc, setDoc } from "firebase/firestore";
import { useSelectors } from "../../utils/selectors";

const GameOver = () => {
  const globalServices = useContext(GlobalStateContext);
  const {
    getLevel,
    getUserErrors,
    getUserTime,
    getUserCorrectBlocks,
    hasLost,
  } = useSelectors();
  const navigate = useNavigate();
  const inputRef: React.Ref<any> = useRef(null);
  const [isDisabled, setIsDisabled] = useState<{
    isDisabled: boolean;
    errorMessage: string;
  }>({
    isDisabled: true,
    errorMessage: "username has to be atlest 4letters long",
  });

  const handleRetry = () => {
    globalServices.gameService.send("RETRY");
  };

  const handleLeaderboards = () => {
    navigate("/leaderboards");
  };

  const handleSubmit = () => {
    const username = inputRef.current && inputRef.current?.value;
    const userCol = collection(globalServices.firestore, `users`);
    const userDoc = doc(userCol, username);

    if (
      !isDisabled.isDisabled &&
      !globalServices.isInputDisabled &&
      !globalServices.userLeaderboard.some((user) => {
        return user.username === username;
      })
    ) {
      const postData: IUsers = {
        username: username,
        level: getLevel,
        correctClicks: getUserCorrectBlocks,
        errors: getUserErrors,
        time: getUserTime,
      };
      setDoc(userDoc, postData)
        .then(() => globalServices.setIsInputDisabled(true))
        .catch((error) => console.log(error.value));
      setIsDisabled({
        isDisabled: true,
        errorMessage: "",
      });
    } else if (globalServices.isInputDisabled) {
      setIsDisabled({
        isDisabled: false,
        errorMessage: "you already submitted your score",
      });
    } else {
      setIsDisabled({
        isDisabled: false,
        errorMessage: "user already exists",
      });
    }
  };

  const handleChange = () => {
    const username = inputRef.current && inputRef.current?.value;
    if (username === null || username.length < 4) {
      setIsDisabled({
        isDisabled: true,
        errorMessage: "username has to be atlest 4letters long",
      });
    } else {
      setIsDisabled({
        isDisabled: false,
        errorMessage: "",
      });
    }
  };

  return (
    <GaveOver
      key="GameOver"
      as={motion.div}
      transition={{ duration: 0.5 }}
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ x: "-100vw" }}
    >
      <GameInfoHeader hasLost={hasLost} getLevel={getLevel} />
      {globalServices.matches ? (
        <>
          <GaveOverInfo>
            <Heading6>
              enter your name to preserve the record on the leaderboards
            </Heading6>
          </GaveOverInfo>
          <UserInputContainer>
            <UserInput
              ref={inputRef}
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              disabled={globalServices.isInputDisabled}
            />
            <ErrorMessageMobile>{isDisabled.errorMessage}</ErrorMessageMobile>
            <StartButton
              type="button"
              onClick={handleSubmit}
              disabled={isDisabled.isDisabled}
            >
              <Heading4>
                {globalServices.isInputDisabled ? "submited" : "submit"}
              </Heading4>
            </StartButton>
          </UserInputContainer>

          <StartButton type="button" onClick={handleRetry}>
            <Heading2>Retry</Heading2>
          </StartButton>
          <StartButton type="button" onClick={handleLeaderboards}>
            <Heading5>View Leaderboards</Heading5>
          </StartButton>
        </>
      ) : (
        <>
          <GaveOverInfo>
            <Heading5>
              enter your name to preserve the record on the leaderboards
            </Heading5>
          </GaveOverInfo>
          <UserInputContainer>
            <Heading5>username:</Heading5>
            <UserInput
              ref={inputRef}
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              disabled={globalServices.isInputDisabled}
            />
            <StartButton
              type="button"
              onClick={handleSubmit}
              disabled={isDisabled.isDisabled}
            >
              <Heading5>
                {globalServices.isInputDisabled ? "submited" : "submit"}
              </Heading5>
            </StartButton>
          </UserInputContainer>
          <ErrorMessage>{isDisabled.errorMessage}</ErrorMessage>
          <StartButton type="button" onClick={handleRetry}>
            <Heading1>Retry</Heading1>
          </StartButton>
          <StartButton type="button" onClick={handleLeaderboards}>
            <Heading4>View Leaderboards</Heading4>
          </StartButton>
        </>
      )}
    </GaveOver>
  );
};

export default GameOver;
