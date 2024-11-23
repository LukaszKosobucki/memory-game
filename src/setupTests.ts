// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("@xstate/react", () => ({
  useInterpret: jest.fn(),
}));

jest.mock("./utils/selectors", () => ({
  useSelectors: jest.fn(() => ({
    hasLost: jest.fn(),
    getLevel: jest.fn(),
    getTimer: jest.fn(),
    isPlaying: jest.fn(),
    isPeekBoard: jest.fn(),
    isCounting: jest.fn(),
    getState: jest.fn(),
    getSize: jest.fn(),
    getBoard: jest.fn(),
    getWin: jest.fn(),
    getEmptyBoard: jest.fn(),
    getUserTime: jest.fn(),
    getUserErrors: jest.fn(),
    getUserCorrectBlocks: jest.fn(),
    useTimer: jest.fn(() => [false, 0, 60]),
  })),
}));
