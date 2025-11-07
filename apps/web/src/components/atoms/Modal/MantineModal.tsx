/*
 * Copyright (c) 2024 Ryo-Kgym.
 */

import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type ModalPresenterProps = {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: string;
};

export const MantineModal = ({ opened, onClose, children, size = "75%" }: ModalPresenterProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)");
  return (
    <Modal opened={opened} onClose={onClose} size={size} fullScreen={isMobile}>
      {children}
    </Modal>
  );
};
