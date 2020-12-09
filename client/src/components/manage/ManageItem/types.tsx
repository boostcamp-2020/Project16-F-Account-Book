export type ItemProp = {
  id: number;
  name: string;
};

export type ManageItemProps = {
  deleteItem: (id: number) => void;
  updateItem: (id: number) => void;
  item: ItemProp;
  value: string;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
