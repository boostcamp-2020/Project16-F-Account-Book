export type ModalInputProps = {
  placeholder: string;
  inputType: 'amount' | 'description' | 'calendar';
  name?: string;
  onChange?: any;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
};
