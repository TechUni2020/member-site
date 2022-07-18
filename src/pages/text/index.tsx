import { Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

const Text = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}>
        <h1>教材</h1>
      </Suspense>
    </Layout>
  );
};
export default Text;
