//* Types
export type ListItemObj = { name: string };
export type ListItemProps = {
  item: ListItemObj;
  handleDelete: () => void;
};

//* Definitions

//* Styling

//* Helpers

export default function ListItem({
  item,
  handleDelete,
  ...props
}: ListItemProps) {
  const { name } = item;

  //* Context

  //* State

  //* Effects

  //* Handlers

  //* Renders

  return (
    <li className="row">
      <span>
        <button onClick={handleDelete}>Delete</button>
      </span>
      <span>{name}</span>
    </li>
  );
}
