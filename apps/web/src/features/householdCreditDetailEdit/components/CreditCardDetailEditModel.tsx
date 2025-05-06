import type { ComponentProps, FC } from "react";

import { Modal } from "../../../components/atoms/Modal";
import { Tab } from "../../../components/ui";
import { CreditCardDetailEditContainer } from "./CreditCardDetailEditContainer";

type Props = ComponentProps<typeof CreditCardDetailEditContainer> & {
  isOpen: boolean;
  onCloseHandler: () => void;
};

export const CreditCardDetailEditModal: FC<Props> = ({
  id,
  isOpen,
  onCloseHandler,
}) => {
  return (
    <Modal opened={isOpen} onClose={onCloseHandler}>
      <Tab
        defaultSelect={"creditCard"}
        tabPropsList={[
          {
            value: "creditCard",
            label: "変更",
            icon: null,
            contents: (
              <CreditCardDetailEditContainer id={id} onClose={onCloseHandler} />
            ),
          },
        ]}
      />
    </Modal>
  );
};
