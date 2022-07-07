import { TextInput } from "@mantine/core";
import { ChangeEvent, FC } from "react";

type Props = {
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  error?: string | null;
};

export const AppTextInput: FC<Props> = ({ placeholder, value, onChange, label, required, error }) => {
  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      required={required}
      onChange={onChange}
      value={value}
      error={error}
    />
  );
};
