import Link from "next/link";
import { browserLocalPersistence, browserSessionPersistence, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, setPersistence, signInWithRedirect } from "firebase/auth";
import { doc, Timestamp, DocumentData, setDoc } from "firebase/firestore";
import router from "next/router";
import { useRecoilState } from "recoil";
import { GoogleIcon } from "src/components/ui-libraries/GoogleIcon";
import { auth, db } from "src/components/utils/libs/firebase";
import { currentUserState } from "src/global-states/atoms";
import type { NextPage } from "next";

const signIn: NextPage = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserLocalPersistence).then(async() => {
      await signInWithRedirect(auth, provider).then(async() => {
        await getRedirectResult(auth).then((result) => {
          setCurrentUser(result!.user);
        })
      })
    })
    router.push('/')
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
    <div className="h-screen bg-white">
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:px-24 md:pt-0 lg:px-32">
            <p className="text-3xl text-center">Welcome.</p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          {/* 入会方法側・ログイン */}
          <div className="flex flex-col  px-8 pt-8 my-auto md:px-24 md:pt-0 lg:px-32">
            <p className="mt-28 text-3xl font-bold text-center">入会方法</p>
            <div className="flex flex-row">
              <div className="flex justify-center items-center mt-10 w-8 h-8 bg-gray-700 rounded-full">
                <p className="text-xl text-white">1</p>
              </div>
              <div className="flex-col">
                <p className="mt-10 ml-6 text-xl">下記よりアカウント作成</p>
                <p className="mt-2 ml-6 text-xs">Google連携が必要です</p>
              </div>
            </div>
            <div className=" flex flex-row">
              <div className="flex justify-center items-center mt-10 w-8 h-8 bg-gray-700 rounded-full">
                <p className="text-xl text-white">2</p>
              </div>
              <div className="flex-col">
                <p className="mt-10 ml-6 text-xl">プロフィールの記入</p>
                <p className="mt-2 ml-6 text-xs">あとで変更することも可能です</p>
              </div>
            </div>
            <button onClick={signInWithGoogle}>
              <div className="flex justify-center items-center">
                <GoogleIcon />
                <span>Sign up with Google</span>
              </div>
            </button>
            <button onClick={signInWithGitHub}>
              <div className="flex justify-center items-center">
                <span>github</span>
              </div>
            </button>
            <div className=" pt-6 pb-12">
              <p className="text-sm">
                既にアカウントをお持ちですか？
                <Link href="/signin">
                  <a className="text-blue-400">サインイン</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signIn;

// TODO: 不要なconsoleを消す
// TODO: スタイルの修正
