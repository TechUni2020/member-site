import { Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

const Calendar = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}>
        <h1>Calendar</h1>
      </Suspense>
    </Layout>
  );
};
export default Calendar;
