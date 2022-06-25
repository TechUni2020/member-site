import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import "src/styles/globals.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};
export default App;

// todo: ログイン済みのユーザー情報があるかどうかをチェックする
