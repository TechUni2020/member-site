import { FC, useState } from "react";
import { Modal as MantineModal } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { useRecoilState } from "recoil";
import { currentUserState } from "src/global-states/atoms";
import { AppButton } from "../ui-libraries/AppButton";
import { ImageUpload } from "./ImageUpload";

type Props = {
  opened: boolean;
  setOpened: () => void;
};

export const SettingModal: FC<Props> = ({ opened, setOpened }) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [name, setName] = useState<string | null | undefined>(currentUser?.displayName);
  const [email, setEmail] = useState<string | null | undefined>(currentUser?.email);

  const handleSave = () => {
    console.log(name);

    // localstateで保存していて、firestoreに保存する
  };

  return (
    <MantineModal opened={opened} onClose={setOpened} title="設定" className="">
      <ImageUpload />
      <TextInput
        label="名前"
        variant="filled"
        placeholder="名前"
        value={name ? name : ""}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <TextInput
        label="メールアドレス"
        variant="filled"
        placeholder="techuni@code.com"
        value={email ? email : ""}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <div className="mt-5 w-full text-center">
        <AppButton type="button" color="blue" size="md" radius="md" variant="filled" className="" onClick={handleSave}>
          保存
        </AppButton>
      </div>
    </MantineModal>
  );
};

// todo: 画像変更・名前・大学・学年・SNS・emailを設定のモーダルから編集できるようにする
