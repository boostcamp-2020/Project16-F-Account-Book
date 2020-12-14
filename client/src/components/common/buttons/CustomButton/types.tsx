export type CustomButtonProps = {
  image?: string;
  color: 'white' | 'blue';
  children: React.ReactNode;
  size?: 'sm' | 'md';
  onClickEvent?: any;
  isValid?: boolean;
};

export type ButtonProps = {
  color: 'white' | 'blue' | 'gray';
  size?: 'sm' | 'md';
};
