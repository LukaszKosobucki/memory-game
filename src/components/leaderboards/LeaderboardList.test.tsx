import { fireEvent, render, screen } from "@testing-library/react";
import { IUsers } from "../../utils/ContextWrapper";
import LeaderboardList from "./LeaderboardList";

const mockUsers: IUsers[] = [
  { username: "user1", level: 5, time: 120, errors: 2, correctClicks: 10 },
  { username: "user2", level: 4, time: 110, errors: 1, correctClicks: 9 },
  { username: "user3", level: 6, time: 130, errors: 3, correctClicks: 11 },
  { username: "user4", level: 3, time: 100, errors: 0, correctClicks: 8 },
  { username: "user5", level: 2, time: 90, errors: 1, correctClicks: 7 },
  { username: "user6", level: 1, time: 80, errors: 2, correctClicks: 6 },
  { username: "user7", level: 7, time: 140, errors: 4, correctClicks: 12 },
];

const handleNextPage = jest.fn();
const handlePreviousPage = jest.fn();

describe("LeaderboardList", () => {
  test("renders leaderboard records", () => {
    render(
      <LeaderboardList
        userLeaderboard={mockUsers}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        leaderboardLimit={0}
      />
    );

    const records = screen.getAllByTestId("record-container");
    expect(records).toHaveLength(6);
  });

  test("calls handleNextPage when next button is clicked", () => {
    render(
      <LeaderboardList
        userLeaderboard={mockUsers}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        leaderboardLimit={0}
      />
    );

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);
    expect(handleNextPage).toHaveBeenCalled();
  });

  test("calls handlePreviousPage when previous button is clicked", () => {
    render(
      <LeaderboardList
        userLeaderboard={mockUsers}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        leaderboardLimit={6}
      />
    );

    const previousButton = screen.getByText(/previous/i);
    fireEvent.click(previousButton);
    expect(handlePreviousPage).toHaveBeenCalled();
  });

  test("disables previous button on first page", () => {
    render(
      <LeaderboardList
        userLeaderboard={mockUsers}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        leaderboardLimit={0}
      />
    );

    const previousButton = screen.queryByText(/previous/i);
    expect(previousButton).not.toBeInTheDocument();
  });

  test("disables next button on last page", () => {
    render(
      <LeaderboardList
        userLeaderboard={mockUsers}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        leaderboardLimit={6}
      />
    );

    const nextButton = screen.queryByText(/next/i);
    expect(nextButton).not.toBeInTheDocument();
  });
});
