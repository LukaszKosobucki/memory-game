import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { TBoard } from "../components/game/GameBoard";
import { useBoards } from "../components/game/useBoards";
import {
  GlobalStateContext,
  GlobalStateContextType,
} from "../utils/ContextWrapper";
import Game from "./Game";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;
const mockSend = jest.fn();

const mockGlobalServices = {
  height: jest.fn().mockReturnValue("100vh"),
  gameService: { send: mockSend },
};

const mockSelectors = {
  isCounting: false,
  getState: { value: "someState" },
  isPlaying: false,
  isPeekBoard: false,
  hasLost: false,
  getTimer: jest.fn().mockReturnValue(3),
  getLevel: jest.fn(),
  getSize: jest.fn(),
  useTimer: jest.fn().mockReturnValue([true, 0, 60]),
};

jest.mock("../components/game/useBoards", () => ({
  useBoards: jest.fn(),
}));

jest.mock("../utils/selectors", () => ({
  useSelectors: jest.fn(() => ({
    ...mockSelectors,
  })),
}));

describe("Game Component", () => {
  const mockHandleClick = jest.fn();
  const mockBoard: TBoard[] = [
    { id: 1, size: 2, selected: false },
    { id: 2, size: 3, selected: true },
    { id: 3, size: 3, selected: false },
    { id: 4, size: 3, selected: false },
    { id: 5, size: 3, selected: false },
  ];
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useBoards as jest.Mock).mockReturnValue([
      false,
      mockBoard,
      true,
      mockHandleClick,
    ]);
  });

  test("renders GamePrepare component when not counting, playing, or peeking and has not lost", () => {
    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Game />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText(/Take a peek/i)).toBeInTheDocument();
    expect(screen.getByText(/View Leaderboard/i)).toBeInTheDocument();
  });

  test("renders Counting component when isCounting is true", () => {
    mockSelectors.isCounting = true;

    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Game />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  test("renders GameBoard component when isPlaying or isPeekBoard is true", () => {
    mockSelectors.isCounting = false;
    mockSelectors.isPlaying = true;

    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Game />
      </GlobalStateContext.Provider>
    );
    for (let index = 1; index < 6; index++) {
      expect(screen.getByTestId(`block-${index}`)).toBeInTheDocument();
    }
  });

  test("renders GameOver component when hasLost is true", () => {
    mockSelectors.isCounting = false;
    mockSelectors.isPlaying = false;
    mockSelectors.hasLost = true;

    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Game />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
  });
});
