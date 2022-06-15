import { FC } from "react";
import Head from "next/head";
import { Layout } from "src/components/layout";
import { AppPropsWithLayout } from "src/next-type";
import "src/styles/globals.css";

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const MainLayout = Component.useLayout ? Component.useLayout : Layout;

  return (
    <>
      <Head>
        <title>Tech Uni Members</title>
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default App;
