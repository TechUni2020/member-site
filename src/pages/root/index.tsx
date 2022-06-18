import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

const Top = () => {
  return (
    <>
      <Layout>
        <AppLoading />
        <h1 className="text-red-500">top</h1>
      </Layout>
    </>
  );
};
export default Top;

// AppLoading削除→suspenseでLoadingコンポーネントを配置
