export type ItemProp = {
  id: number;
  name: string;
};

export type ManageItemProps = {
  deleteItem: any;
  updateItem: any;
  item: ItemProp;
};
