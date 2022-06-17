import { AppProps } from "next/app";
import * as React from "react";
import "src/styles/globals.css";

const App = (props: AppProps) => {
  return (
    <>
      <props.Component {...props.pageProps} />
    </>
  );
};
export default App;

// todo: ログイン済みのユーザー情報があるかどうかをチェックする
// todo: AuthProviderの配置
// todo:RecoilRootの配置
