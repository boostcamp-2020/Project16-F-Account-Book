type SelectInputOption = {
  id: number;
  name: string;
};

export type ModalSelectInputProps = {
  children: SelectInputOption[];
  placeHolder: string;
};
