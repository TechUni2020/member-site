import { RecoilRoot, useRecoilState } from "recoil";
import "src/styles/globals.css";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "src/components/utils/libs/firebase";
import { currentUserState } from "src/global-states/atoms";

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      {router.pathname === "/signup" ? null : <Auth />}
    </RecoilRoot>
  );
};
export default App;

export const Auth = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const uid: string | null = localStorage.getItem("currentUser");
    const docRef = doc(db, "users", uid ?? "");
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setCurrentUser(doc.data() as User);
      }
    });
  }, []);

  return null;
};
