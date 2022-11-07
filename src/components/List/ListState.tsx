import { useState } from "react";
import { ListItemObj } from "./ListItem";

//* Types
export type ListStateProps = {};

export type ListState = ReturnType<typeof useListState>;

//* Definitions

//* Styling

//* Helpers

export default function useListState({}: ListStateProps = {}) {
  //* Context

  //* State
  const [list, setList] = useState<ListItemObj[]>([]);

  //* Effects

  //* Handlers
  const deleteHandler = (value: ListItemObj) => {
    setList((state) => state.filter((item) => item.name !== value.name));
  };

  const addHandler = (value: ListItemObj) => {
    setList((state) => [...state, value]);
  };

  //* Renders
  return { list, add: addHandler, delete: deleteHandler };
}
