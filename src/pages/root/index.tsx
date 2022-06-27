import { getRedirectResult } from "firebase/auth";
import { doc, Timestamp, DocumentData, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { auth, db } from "src/components/utils/libs/firebase";
import { currentUserState } from "src/global-states/atoms";

const Top: NextPage = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    initAddData()
  }, []);
  
  const initAddData = async () => {
    const user = currentUser;
    console.log(`user: ${user}`)
    if (user === null) {
      return;
    }
            
    // userコレクションの中に入っているものの構成にする
    const docRef = doc(db, "users", user.uid);
    const data = {
      bio: "",
      createdAt: Timestamp.now(),
      department: "経済学部",
      description: "どうも",
      github: "",
      grade: "",
      id: "shinyamamoto",
      instagram: "",
      knownAs: "",
      name: "山本新",
      profilePicture: "",
      twitter: "",
      uid: user.uid,
      university: "同志社大学",
    } as DocumentData;
  

    setDoc(docRef, data, { merge: true }).then((v) => {
      console.log("set success")
    }).catch((e) => {
      console.log(`set failed: ${e}`)
    })
  };

  return (
    <>
      <Layout>
        {/* <AppLoading /> */}
        <h1 className="text-red-500">top</h1>
      </Layout>
    </>
  );
};
export default Top;

// AppLoading削除→suspenseでLoadingコンポーネントを配置
