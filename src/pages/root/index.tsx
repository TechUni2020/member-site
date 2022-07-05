import { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { currentUserState } from "src/global-states/atoms";

const Top = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);

  return (
    <>
      <Layout>
        <Suspense fallback={<AppLoading />}>
          <h1>top</h1>
          <div>{currentUser?.displayName}</div>
          <div>{currentUser?.email}</div>
        </Suspense>
      </Layout>
    </>
  );
};
export default Top;

// AppLoading削除→suspenseでLoadingコンポーネントを配置
