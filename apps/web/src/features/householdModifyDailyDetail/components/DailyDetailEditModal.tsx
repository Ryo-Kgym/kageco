import { Modal } from "../../../components/atoms/Modal";
import { Tab } from "../../../components/ui";
import { CutDailyDetail } from "./CutDailyDetail";
import { DuplicateDailyDetail } from "./DuplicateDailyDetail";
import { ModifyDailyDetail } from "./ModifyDailyDetail";
import { LinkFreeeForDailyDetail } from "./link-freee-for-daily-detail";

export const DailyDetailEditModal = ({
  id,
  isOpen,
  onCloseHandler,
}: {
  id: string;
  isOpen: boolean;
  onCloseHandler: () => void;
}) => (
  <Modal opened={isOpen} onClose={onCloseHandler}>
    <Tab
      defaultSelect="change"
      tabPropsList={[
        {
          value: "change",
          label: "変更",
          icon: null,
          contents: <ModifyDailyDetail id={id} onClose={onCloseHandler} />,
        },
        {
          value: "cut",
          label: "分解",
          icon: null,
          contents: <CutDailyDetail id={id} onClose={onCloseHandler} />,
        },
        {
          value: "duplicate",
          label: "複製",
          icon: null,
          contents: <DuplicateDailyDetail id={id} onClose={onCloseHandler} />,
        },
        {
          value: "freee",
          label: "freee連携",
          icon: null,
          contents: (
            <LinkFreeeForDailyDetail id={id} onClose={onCloseHandler} />
          ),
        },
      ]}
    />
  </Modal>
);
