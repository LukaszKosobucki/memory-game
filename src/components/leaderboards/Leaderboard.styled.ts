import styled from "styled-components";
import { colors, Heading4 } from "../../global.styled";

export const LeaderboardRecordContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.DarkBackground800};
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 50px;
  width: 100%;
  align-items: center;
  @media (max-width: 390px) {
    width: calc(100vw - 5vw);
    justify-content: space-around;
    padding-left: 0;
    padding-right: 0;
  }
`;
export const LeaderboardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 540px;
  gap: 10px;
`;

export const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 540px;
  gap: 1.5rem;
  @media (max-width: 390px) {
    width: 100vw;
    height: 550px;
  }
`;

export const LeaderboardName = styled(Heading4)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  width: 300px;
  @media (max-width: 390px) {
    width: 50vw;
    flex: 1;
    margin-left: 1rem;
  }
`;

export const LeaderboardLevel = styled(Heading4)`
  max-width: 100px;
  display: flex;
  justify-content: start;
  flex: 1;
  @media (max-width: 390px) {
    width: 100vw;
    margin-right: 1rem;
  }
`;

export const LeaderboardNumber = styled(Heading4)`
  width: 80px;
  max-width: 80px;
`;
