import { FC } from "react";
import { Modal as MantineModal } from "@mantine/core";

type Props = {
  opened: boolean;
  setOpened: () => void;
};

export const SettingModal: FC<Props> = ({ opened, setOpened }) => {
  return <MantineModal opened={opened} onClose={setOpened} title="設定"></MantineModal>;
};

// todo: 画像変更・名前・大学・学年・SNS・emailを設定のモーダルから編集できるようにする
// todo:
