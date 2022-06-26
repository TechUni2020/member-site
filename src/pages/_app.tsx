import { RecoilRoot, useRecoilState } from "recoil";

import "src/styles/globals.css";
import { useEffect } from "react";
import router from "next/router";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { AppProps } from "next/app";
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
      console.log(user);
      if (user === null) {
        router.push("/signin");
      } else {
        if (user?.uid === null) {
          return;
        }
        console.log("user.uid", user?.uid);

        const docRef = doc(db, "users_v2", user.uid);
        const data = {
          name: user?.displayName ?? "",
          profilePicture: user?.photoURL ?? "",
          uid: user?.uid.substring(0, 10) ?? "",
          university: "",
          grade: "",
          department: "",
          role: "",
          githubId: "",
          twitterId: "",
          instagramId: "",
          bio: "",
          knownAs: "",
        };

        await setDoc(docRef, data, { merge: true });

        router.push("/");
      }
    });
  }, [setCurrentUser]);

  return <div>hello world!</div>;
};
