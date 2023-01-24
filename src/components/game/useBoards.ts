import { useContext } from "react";
import { useSelectors } from "../../utils/selectors";
import { GlobalStateContext } from "../../utils/ContextWrapper";

export function useBoards() {
  const globalServices = useContext(GlobalStateContext);
  const { isPlaying, getBoard, getEmptyBoard } = useSelectors();

  if (isPlaying) {
    return [globalServices.matches, getEmptyBoard, isPlaying];
  } else return [globalServices.matches, getBoard, isPlaying];
}
