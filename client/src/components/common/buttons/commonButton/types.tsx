export type CommonButtonProps = {
  image?: string;
  color: 'white' | 'blue';
  children: React.ReactNode;
  onClickEvent?: () => void;
};

export type ButtonColorProps = {
  color: 'white' | 'blue';
};
