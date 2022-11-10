import { describe, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import List from "../List";
import { ListItemObj } from "../ListItem";
import useListState from "../ListState";

//* Mocks
const mockList: ListItemObj[] = [
  { name: "test1" },
  { name: "test2" },
  { name: "test3" },
];
const MockList = () => {
  const state = useListState({ inital: mockList });
  const deleteHandler = () => state.delete;
  return <List listState={state} deleteHandler={deleteHandler} />;
};

describe("List tests", () => {
  test("renders List", () => {
    //* Setup
    render(<MockList />);

    //* Html Elements
    const element1 = screen.getByText("test1");
    const element2 = screen.getByText("test2");
    const element3 = screen.getByText("test3");
  });
});
