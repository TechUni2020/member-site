import { FC, ReactNode } from "react";
import { useAuth } from "src/hooks/useAuth";
import { GoogleIcon, GitHubIcon } from "src/components/ui-libraries/icon";
import type { NextPage } from "next";

const SignUp: NextPage = () => {
  const { signInWithGoogle, signInWithGitHub } = useAuth();
  return (
    <div className="flex justify-center items-center h-screen">
      <p>初回ログイン時には、このページに飛ばします</p>
      <p>ここで、登録が完了したら、rootにredirectするようにする</p>
    </div>
  );
};

export default SignUp;

// todo: LoginButtonを共通化してそっから持ってくる
