import { Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

const Top = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<AppLoading />}>
          <h1>top</h1>
        </Suspense>
      </Layout>
    </>
  );
};
export default Top;

// AppLoading削除→suspenseでLoadingコンポーネントを配置
