import React from "react";
import { render, screen } from "@testing-library/react";
import SingleUser from "./SingleUser";

describe("User Details component", () => {
  test("renders followers", () => {
    render(<SingleUser />);
    const linkElement = screen.getByText(/Followers/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders following", () => {
    render(<SingleUser />);
    const linkElement = screen.getByText(/Following/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders number of repos", () => {
    render(<SingleUser />);
    const linkElement = screen.getByText(/Repos/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("shows back button", () => {
    render(<SingleUser />);
    const linkElement = screen.getByText(/BACK TO USER LIST/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("has icon to mark user as favorite", () => {
    render(<SingleUser />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveStyle("color: lightgray");
  });
});
