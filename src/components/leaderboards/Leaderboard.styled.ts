import styled from "styled-components";
import { colors } from "../../global.styled";

export const LeaderboardRecordContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.DarkBackground800};
  justify-content: space-around;
  height: 50px;
  width: 100%;
  align-items: center;
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
  justify-content: center;
  align-items: center;
  width: 540px;
  gap: 3rem;
`;
