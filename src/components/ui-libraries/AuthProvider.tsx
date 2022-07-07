import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "src/global-states/atoms";
import { db } from "../utils/libs/firebase";
import { AppLoading } from "./AppLoading";

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const uid: string | null = localStorage.getItem("currentUser");
    if (!uid) {
      router.push("/signup");
      return;
    }
    const docRef = doc(db, "users", uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setCurrentUser(doc.data() as User);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <AppLoading />;
  if (!currentUser) {
    router.push("/signup");
    return null;
  }

  return <div>{children}</div>;
};
