export type ManageItemInputProps = {
  name: string;
  cancelHandler: () => void;
  saveHandler: (e: React.MouseEvent<HTMLElement>) => void;
};
