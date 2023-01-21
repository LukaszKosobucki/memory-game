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
  gap: 1.6rem;
`;

export const LeaderboardName = styled(Heading4)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  width: 300px;
`;

export const LeaderboardLevel = styled(Heading4)`
  max-width: 100px;
  display: flex;
  justify-content: start;
  flex: 1;
`;

export const LeaderboardNumber = styled(Heading4)`
  width: 80px;
  max-width: 80px;
`;
