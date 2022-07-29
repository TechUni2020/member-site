import type { NextPage } from "next";

const SignUp: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p>初回ログイン時には、このページに飛ばします</p>
      <p>ここで、登録が完了したら、rootにredirectするようにする</p>
    </div>
  );
};

export default SignUp;

// todo: LoginButtonを共通化してそっから持ってくる
