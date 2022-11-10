import { useState } from "react";
import { ListItemObj } from "./ListItem";

//* Types
export type ListStateProps = { inital?: ListItemObj[] };

export type ListState = ReturnType<typeof useListState>;

//* Definitions

//* Styling

//* Helpers

export default function useListState({ inital }: ListStateProps = {}) {
  //* Context

  //* State
  const [list, setList] = useState<ListItemObj[]>(inital ?? []);

  //* Effects

  //* Handlers
  const deleteHandler = (name: string) => {
    setList((state) => state.filter((item) => item.name !== name));
  };

  const addHandler = (value: ListItemObj) => {
    setList((state) => [...state, value]);
  };

  //* Renders
  return { list, add: addHandler, delete: deleteHandler };
}
