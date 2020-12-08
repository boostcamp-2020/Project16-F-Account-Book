export type ItemProp = {
  id: number;
  name: string;
};

export type ManageItemProps = {
  deleteItem: () => void;
  updateItem: () => void;
  item: ItemProp;
};
