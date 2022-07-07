import "src/styles/globals.css";

import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { AuthProvider } from "src/components/ui-libraries/Auth";

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      {/* signupページ以外で毎回ログインの有無を確認  */}
      {router.pathname === "/signup" ? (
        <Component {...pageProps} />
      ) : (
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      )}
    </RecoilRoot>
  );
};
export default App;
