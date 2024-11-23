import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import {
  GlobalStateContext,
  GlobalStateContextType,
} from "../utils/ContextWrapper";
import Start from "./Start";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;

const mockGlobalServices = {
  height: jest.fn().mockReturnValue("100vh"),
  matches: true,
};

describe("Start Component", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("renders correctly with matches", () => {
    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Start />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();
    expect(
      screen.getByText(/train your short-memory capacity and retention!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Start/i)).toBeInTheDocument();
    expect(screen.getByText(/How to play/i)).toBeInTheDocument();
    expect(screen.getByText(/Good Luck!/i)).toBeInTheDocument();
  });

  test("navigates to /game on start button click", () => {
    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Start />
      </GlobalStateContext.Provider>
    );

    const startButton = screen.getByTestId("Start");
    fireEvent.click(startButton);

    expect(mockNavigate).toHaveBeenCalledWith("/game");
  });

  test("renders correctly without matches", () => {
    const mockGlobalServicesWithoutMatches = {
      ...mockGlobalServices,
      matches: false,
    };

    render(
      <GlobalStateContext.Provider
        value={
          mockGlobalServicesWithoutMatches as unknown as GlobalStateContextType
        }
      >
        {" "}
        <Start />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();
    expect(
      screen.getByText(/train your short-memory capacity and retention!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Start/i)).toBeInTheDocument();
    expect(screen.getByText(/How to play/i)).toBeInTheDocument();
    expect(screen.getByText(/Good Luck!/i)).toBeInTheDocument();
  });
});
