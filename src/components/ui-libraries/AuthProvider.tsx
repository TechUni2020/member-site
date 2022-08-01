import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { CurrentUser, useCurrentUser } from "src/global-states/atoms";
import { LINKS } from "../utils/constants/link";
import { UID } from "../utils/constants/tokens";
import { db } from "../utils/libs/firebase";
import { AppLoading } from "./AppLoading";

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const uid: string | null = localStorage.getItem(UID);
    if (!uid) {
      router.push(LINKS.LOGIN);
      return;
    }
    const docRef = doc(db, "users", uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setCurrentUser(doc.data() as CurrentUser);
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
    router.push(LINKS.LOGIN);
    return null;
  }

  return <div>{children}</div>;
};
