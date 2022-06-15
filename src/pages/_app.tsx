import { AppProps } from "next/app";
import * as React from "react";

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
