import { RecoilRoot, useRecoilState } from "recoil";

import "src/styles/globals.css";
import { useEffect } from "react";
import router from "next/router";
import { AppProps } from "next/app";
import { doc, DocumentData, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { currentUserState } from "src/global-states/atoms";
import { auth, db } from "src/components/utils/libs/firebase";

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      {router.pathname === "/signin" || router.pathname === "/signup" ? null : <AppAuth />}
      <Component {...pageProps} />
    </RecoilRoot>
  );
};
export default App;

// todo: ログイン済みのユーザー情報があるかどうかをチェックする

const AppAuth = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user === null) {
        router.push("/signin");
      } else {
        router.push("/");
      }
    });
  }, [setCurrentUser]);

  return <></>;
};
