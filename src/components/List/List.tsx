import ListItem, { ListItemObj } from "./ListItem";
import { ListState } from "./ListState";

//* Types
export type ListProps = {
  listState: ListState;
  deleteHandler: (item: ListItemObj) => void;
};

//* Definitions

//* Styling

//* Helpers

export default function List({
  listState,
  deleteHandler,
  ...props
}: ListProps) {
  //* Context

  //* State

  //* Effects

  //* Handlers

  //* Renders
  const listItems = listState.list.map((item, index) => (
    <ListItem
      key={index}
      item={item}
      handleDelete={() => deleteHandler(item)}
    />
  ));

  return (
    <>
      <div>{listItems}</div>
    </>
  );
}
