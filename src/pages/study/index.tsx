import { Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

const Study = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}>
        <h1>勉強会</h1>
      </Suspense>
    </Layout>
  );
};
export default Study;
