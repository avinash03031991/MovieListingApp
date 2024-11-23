import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

const mockMovies = [
  {
    title: "A New Hope",
    episode_id: 4,
    release_date: "1977-05-25",
    opening_crawl: "...",
  },
  {
    title: "The Empire Strikes Back",
    episode_id: 5,
    release_date: "1980-05-17",
    opening_crawl: "...",
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: mockMovies }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders movies fetched from API", async () => {
  render(<App />);
  expect(await screen.findByText(/A New Hope/)).toBeInTheDocument();
  expect(screen.getByText(/The Empire Strikes Back/)).toBeInTheDocument();
});
