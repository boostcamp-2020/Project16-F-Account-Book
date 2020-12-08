export type ItemProp = {
  id: number;
  name: string;
};

export type MangeItemProps = {
  deleteItem: () => void;
  updateItem: () => void;
  item: ItemProp;
};
