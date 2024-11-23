import { fireEvent, render, screen } from "@testing-library/react";
import { blockSizesDesktop, blockSizesMobile } from "../../utils/gameSizes";
import GameBlock from "./GameBlock";

describe("GameBlock Component", () => {
  const mockHandleClick = jest.fn();
  const block = {
    id: 1,
    size: 2,
    selected: false,
    wrongSelected: false,
  };

  it("should render the block with correct size for desktop", () => {
    render(
      <GameBlock
        block={block}
        hover={false}
        canClick={true}
        getSize={5}
        handleClick={mockHandleClick}
        isMobile={false}
      />
    );

    const blockElement = screen.getByTestId("block-1");
    expect(blockElement).toHaveStyle(
      `height: ${blockSizesDesktop[block.size]}px`
    );
  });

  it("should render the block with correct size for mobile", () => {
    render(
      <GameBlock
        block={block}
        hover={false}
        canClick={true}
        getSize={5}
        handleClick={mockHandleClick}
        isMobile={true}
      />
    );

    const blockElement = screen.getByTestId("block-1");
    expect(blockElement).toHaveStyle(
      `height: ${blockSizesMobile[block.size]}px`
    );
  });

  it("should call handleClick when clicked and conditions are met", () => {
    render(
      <GameBlock
        block={block}
        hover={false}
        canClick={true}
        getSize={5}
        handleClick={mockHandleClick}
        isMobile={false}
      />
    );

    const blockElement = screen.getByTestId("block-1");
    fireEvent.click(blockElement);
    expect(mockHandleClick).toHaveBeenCalledWith(block.id);
  });

  it("should not call handleClick when clicked and conditions are not met", () => {
    render(
      <GameBlock
        block={{ ...block, selected: true }}
        hover={false}
        canClick={false}
        getSize={5}
        handleClick={mockHandleClick}
        isMobile={false}
      />
    );

    const blockElement = screen.getByTestId("block-1");
    fireEvent.click(blockElement);
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it("should call handleClick on touch start when conditions are met for mobile", () => {
    render(
      <GameBlock
        block={block}
        hover={false}
        canClick={true}
        getSize={5}
        handleClick={mockHandleClick}
        isMobile={true}
      />
    );

    const blockElement = screen.getByTestId("block-1");
    fireEvent.touchStart(blockElement);
    expect(mockHandleClick).toHaveBeenCalledWith(block.id);
  });
});
