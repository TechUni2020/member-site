import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "src/global-states/atoms";
import { db } from "../utils/libs/firebase";
import { AppLoading } from "./AppLoading";

type Props = {
  children: ReactNode;
};

export const Auth: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uid: string | null = localStorage.getItem("currentUser");
    const docRef = doc(db, "users", uid ?? "");
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setCurrentUser(doc.data() as User);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <AppLoading />;
  if (!currentUser) return <div>ログインしてください</div>;

  return <div>{children}</div>;
};
