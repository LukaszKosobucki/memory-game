import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { boardSizesDesktop, boardSizesMobile } from "../../utils/gameSizes";
import GameBoard, { TBoard } from "./GameBoard";
import { useBoards } from "./useBoards";

jest.mock("./useBoards", () => ({
  useBoards: jest.fn(),
}));

describe("GameBoard Component", () => {
  const mockHandleClick = jest.fn();
  const mockBoard: TBoard[] = [
    { id: 1, size: 2, selected: false },
    { id: 2, size: 3, selected: true },
    { id: 3, size: 3, selected: false },
    { id: 4, size: 3, selected: false },
    { id: 5, size: 3, selected: false },
  ];

  beforeEach(() => {
    (useBoards as jest.Mock).mockReturnValue([
      false,
      mockBoard,
      true,
      mockHandleClick,
    ]);
  });

  it("should render the game board with blocks", () => {
    render(<GameBoard size={5} getLevel={5} getSize={5} hasLost={false} />);

    expect(screen.getByTestId("block-1")).toBeInTheDocument();
    expect(screen.getByTestId("block-2")).toBeInTheDocument();
  });

  it("should call handleClick when a block is clicked", () => {
    render(<GameBoard size={5} getLevel={1} getSize={5} hasLost={false} />);

    const blockElement = screen.getByTestId("block-1");
    fireEvent.click(blockElement);
    expect(mockHandleClick).toHaveBeenCalledWith(1);
  });

  it("should render the game board with correct styles for mobile", () => {
    (useBoards as jest.Mock).mockReturnValue([
      true,
      mockBoard,
      true,
      mockHandleClick,
    ]);

    render(<GameBoard size={5} getLevel={1} getSize={5} hasLost={false} />);

    const blockElement = screen.getByTestId("block-1");
    expect(blockElement).toHaveStyle(`height: ${boardSizesMobile[2]}px`);
  });

  it("should render the game board with correct styles for desktop", () => {
    render(<GameBoard size={5} getLevel={1} getSize={5} hasLost={false} />);

    const blockElement = screen.getByTestId("block-1");
    expect(blockElement).toHaveStyle(`height: ${boardSizesDesktop[2]}px`);
  });
});
