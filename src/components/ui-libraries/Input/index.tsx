import { TextInput } from "@mantine/core";
import { FC, ReactNode } from "react";

type Props = {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string | null | undefined;
  icon?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AppInput: FC<Props> = ({ label, required, placeholder, icon, value, onChange }) => {
  return (
    <>
      <TextInput
        label={label}
        icon={icon}
        required={required}
        variant="filled"
        className="mt-4"
        placeholder={placeholder}
        value={value ? value : ""}
        onChange={onChange}
      />
    </>
  );
};
