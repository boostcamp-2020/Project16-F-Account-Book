export type ModalProps = {
  children?: React.ReactNode;

  show?: boolean;

  toggleModal?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
