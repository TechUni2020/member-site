import AuthProvider from "src/components/utils/libs/authContext";
import type { AppProps } from "next/app";
import "src/styles/globals.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default App;

// todo: ログイン済みのユーザー情報があるかどうかをチェックする
// todo:RecoilRootの配置・Recoil導入
