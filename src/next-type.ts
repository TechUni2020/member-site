import { NextPage } from "next";
import { AppProps } from "next/app";
import { FC, ReactElement } from "react";

export type NextPageWithLayout = NextPage & {
  useLayout?: FC<{ children: ReactElement }>;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
