import { Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppButton } from "src/components/ui-libraries/AppButton";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { successToast } from "src/components/ui-libraries/AppToast";

const Top = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<AppLoading />}></Suspense>
      </Layout>
    </>
  );
};
export default Top;

// AppLoading削除→suspenseでLoadingコンポーネントを配置
