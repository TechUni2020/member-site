import "src/styles/globals.css";

import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { FC, useEffect, useState } from "react";
import { AuthProvider } from "src/components/ui-libraries/AuthProvider";
import { Modal } from "src/components/feature/Modal";
import { TECH_UNI } from "src/components/utils/constants/tokens";

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <AppPage Component={Component} pageProps={pageProps} router={router} />
    </RecoilRoot>
  );
};

const AppPage: FC<AppProps> = ({ Component, pageProps, router }) => {
  const [opened, setOpened] = useState(false);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    setPassword(localStorage.getItem(TECH_UNI));
    setOpened(true);
  }, [opened]);

  if (!password) return <Modal opened={opened} setOpened={setOpened} />;
  if (router.pathname === "/signup") return <Component {...pageProps} />;

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
