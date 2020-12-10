export type SelectInputOption = {
  id: number;
  name: string;
};

export type SelectInputProps = {
  children: SelectInputOption[];
  placeholder: string;
  name: string;
  onChange: any;
  value?: SelectInputOption;
};
