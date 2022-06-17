import { Loader } from "@mantine/core";
import { FC } from "react";

export const AppLoading: FC = () => {
  return (
    <div className="flex justify-center mt-4 h-screen">
      <Loader />
    </div>
  );
};
