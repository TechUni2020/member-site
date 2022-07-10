import { FC } from "react";
import { Modal as MantineModal } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { AppButton } from "../ui-libraries/AppButton";
import { ImageUploadIcon } from "./ImageUploadIcon";

type Props = {
  opened: boolean;
  setOpened: () => void;
};

export const SettingModal: FC<Props> = ({ opened, setOpened }) => {
  return (
    <MantineModal opened={opened} onClose={setOpened} title="設定" className="">
      <ImageUploadIcon />
      <TextInput label="名前" variant="filled" placeholder="名前" />
      <TextInput label="メールアドレス" variant="filled" placeholder="メールアドレス" />
      <div className="mt-5 w-full text-center">
        <AppButton type="button" color="blue" size="md" radius="md" variant="filled" className="">
          保存
        </AppButton>
      </div>
    </MantineModal>
  );
};

// todo: 画像変更・名前・大学・学年・SNS・emailを設定のモーダルから編集できるようにする
