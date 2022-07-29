import {
  browserLocalPersistence,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { FC, ReactNode, useEffect } from "react";
import { doc, Timestamp, DocumentData, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "src/components/utils/libs/firebase";
import { GitHubIcon, GoogleIcon } from "src/components/ui-libraries/icon";
import { UID } from "src/components/utils/constants/tokens";
import { LINKS } from "src/components/utils/constants/link";
import type { NextPage } from "next";

type ButtonProps = {
  Icon: ReactNode;
  text: string;
  onClick: () => void;
};

const LoginButton: FC<ButtonProps> = ({ Icon, text, onClick }) => {
  return (
    <div
      className="flex gap-3 justify-center items-center py-2 px-4 mb-8 w-72 bg-gray-50  hover:bg-gray-100 rounded-2xl border border-gray-300 hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      {Icon}
      <p className="text-base font-bold">{`Login with ${text}`}</p>
    </div>
  );
};

const LogIn: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        initAddData();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAddData = async () => {
    const { currentUser } = getAuth();

    if (currentUser === null) return;

    // userコレクションの中に入っているものの構成にする
    const docRef = doc(db, "users", currentUser.uid);
    const data = {
      bio: "",
      createdAt: Timestamp.now(),
      displayName: currentUser.displayName,
      email: currentUser.email,
      faculty: "",
      field: "",
      github: "",
      grade: "",
      instagram: "",
      photoURL: currentUser.photoURL,
      position: 0,
      status: 0,
      twitter: "",
      uid: currentUser.uid,
      university: "",
    } as DocumentData;

    setDoc(docRef, data, { merge: true })
      .then(() => {
        router.push(LINKS.SIGNUP);
      })
      .catch((e) => {
        console.log(`set failed: ${e}`);
      });
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence).then(async () => {
      signInWithPopup(auth, googleProvider).then(async (res) => {
        localStorage.setItem(UID, res.user.uid);
      });
    });
  };

  const github = new GithubAuthProvider();
  const signInWithGitHub = () => {
    signInWithRedirect(auth, github)
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="pb-10 text-2xl font-bold text-center">ログインしてください</h1>
        <LoginButton Icon={<GoogleIcon />} text="Google" onClick={signInWithGoogle} />
        <LoginButton Icon={<GitHubIcon />} text="GitHub" onClick={signInWithGitHub} />
      </div>
    </div>
  );
};

export default LogIn;

// todo: LoginButtonを共通化してそっから持ってくる
