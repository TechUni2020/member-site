import { FC, FormEvent, useState } from "react";
import { Modal as MantineModal } from "@mantine/core";
import { AppTextInput } from "../ui-libraries/AppTextInput";
import { techUniPassword } from "../utils/constants/env";
import { TECH_UNI } from "../utils/constants/tokens";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export const Modal: FC<Props> = ({ opened, setOpened }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === techUniPassword) {
      localStorage.setItem(TECH_UNI, password);
      setOpened(false);
    } else {
      setError("パスワードが間違っています");
    }
  };

  return (
    <MantineModal
      opened={opened}
      onClose={() => {
        return;
      }}
      title="ログイン"
    >
      <form onSubmit={handleSubmit}>
        <AppTextInput placeholder="TechUniパスワードを入力" onChange={handleChange} value={password} error={error} />
        <div className="mt-2">
          <button>確定</button>
        </div>
      </form>
    </MantineModal>
  );
};
