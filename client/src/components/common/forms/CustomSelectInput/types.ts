type SelectInputOption = {
  id: number;
  name: string;
};

export type SelectInputProps = {
  children: SelectInputOption[];
  placeHolder: string;
};
