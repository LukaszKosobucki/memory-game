import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GameInfoHeader from "./GameInfoHeader";

const mockUseTimer = jest.fn();

jest.mock("../../utils/selectors", () => ({
  useSelectors: jest.fn(() => ({
    useTimer: mockUseTimer,
  })),
}));

describe("GameInfoHeader Component", () => {
  it("should display level, errors, and time when the game is not lost and matches is false", () => {
    mockUseTimer.mockReturnValue([false, 2, 50]);

    render(<GameInfoHeader hasLost={false} getLevel={3} />);

    expect(screen.getByText("level: 3")).toBeInTheDocument();
    expect(screen.getByText("errors: 2")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("should display score and congratulations when the game is lost and matches is false", () => {
    mockUseTimer.mockReturnValue([false, 2, 50]);

    render(<GameInfoHeader hasLost={true} getLevel={3} />);

    expect(screen.getByText(/Your Score: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
  });

  it("should display level, errors, and time when the game is not lost and matches is true", () => {
    mockUseTimer.mockReturnValue([true, 2, 50]);

    render(<GameInfoHeader hasLost={false} getLevel={3} />);

    expect(screen.getByText("level: 3")).toBeInTheDocument();
    expect(screen.getByText("errors: 2")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("should display score and congratulations when the game is lost and matches is true", () => {
    mockUseTimer.mockReturnValue([true, 2, 50]);

    render(<GameInfoHeader hasLost={true} getLevel={3} />);

    expect(screen.getByText(/Your Score: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
  });
});
