import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  text: string;
};

export const Button: FC<Props> = ({ text }: Props) => {
  return (
    <button type="button" className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded">
      {text}
    </button>
  );
};
