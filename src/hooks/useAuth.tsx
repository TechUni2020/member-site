import {
  onAuthStateChanged,
  User,
  browserLocalPersistence,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, Timestamp, DocumentData, setDoc, DocumentReference } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LINKS } from "src/components/utils/constants/link";
import { UID } from "src/components/utils/constants/tokens";
import { auth, db } from "src/components/utils/libs/firebase";

type ReturnType = {
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => void;
};

export const useAuth = (): ReturnType => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        // NOTE: doc.exists()でfirestoreにuserが存在するか確認して、存在しない場合は新規に作成する
        getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              router.push(LINKS.HOME);
            } else {
              initAddData(user, docRef);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAddData = async (user: User, docRef: DocumentReference<DocumentData>): Promise<void> => {
    const data = {
      bio: "",
      createdAt: Timestamp.now(),
      displayName: user.displayName,
      email: user.email,
      faculty: "",
      field: "",
      fieldDetails: [],
      github: "",
      grade: "",
      instagram: "",
      photoURL: user.photoURL,
      position: 0,
      status: 0,
      twitter: "",
      uid: user.uid,
      university: "",
    } as DocumentData;

    setDoc(docRef, data, { merge: true })
      .then(() => {
        router.push(LINKS.HOME);
      })
      .catch((e) => {
        console.log(`set failed: ${e}`);
      });
  };

  // NOTE: Google認証
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence).then(async () => {
      signInWithPopup(auth, googleProvider).then(async (res) => {
        localStorage.setItem(UID, res.user.uid);
      });
    });
  };

  // NOTE: GitHub認証
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

  return { signInWithGoogle, signInWithGitHub };
};
