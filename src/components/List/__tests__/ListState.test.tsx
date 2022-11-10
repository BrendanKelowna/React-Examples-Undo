import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { ListItemObj } from "../ListItem";
import useListState, { ListState, ListStateProps } from "../ListState";

//* Mocks
const MockComp = ({ state, ...props }: { state: {} } & ListStateProps) => {
  const _state = useListState(props);
  Object.assign(state, _state);
  return <></>;
};

//* Helpers
const _find = (list: ListItemObj[], name: string) =>
  !!list.find((listItem) => listItem.name === name);

describe("ListState tests", () => {
  test("renders ListState", () => {
    //* Setup
    const state = {} as ListState;
    render(<MockComp state={state} />);

    //* Test add
    act(() => state.add({ name: "list item 1" }));
    expect(state.list[0].name).toBe("list item 1");
    act(() => state.add({ name: "list item 2" }));
    expect(state.list[1].name).toBe("list item 2");
    act(() => state.add({ name: "list item 3" }));
    expect(state.list[2].name).toBe("list item 3");

    //* Test Delete
    act(() => state.delete("list item 1"));
    expect(_find(state.list, "list item 1")).toBeFalsy();
    act(() => state.delete("list item 2"));
    expect(_find(state.list, "list item 2")).toBeFalsy();
    act(() => state.delete("list item 3"));
    expect(_find(state.list, "list item 3")).toBeFalsy();
  });
});
