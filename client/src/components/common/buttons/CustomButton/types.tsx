export type CustomButtonProps = {
  image?: string;
  color: 'white' | 'blue';
  children: React.ReactNode;
  size?: 's' | 'm';
  onClickEvent?: () => void;
};

export type ButtonProps = {
  color: 'white' | 'blue' | 'gray';
  size?: 's' | 'm';
};
