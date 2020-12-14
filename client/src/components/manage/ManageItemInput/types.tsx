export type ManageItemInputProps = {
  name: string;
  cancelHandler?: () => void;
  saveHandler?: (e: React.MouseEvent<HTMLElement>) => void;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  border: boolean;
  isValid?: boolean;
};

export type ManageItemInputContainerProps = {
  border: boolean;
};
