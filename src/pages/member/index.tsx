import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { MemberCard } from "src/components/feature/Card";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser } from "src/global-states/atoms";

const Member = () => {
  const [users, setUsers] = useState<CurrentUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const foo = async () => {
        const colRef = collection(db, "users");
        const users = await getDocs(colRef);
        setUsers(users.docs.map((doc) => doc.data() as CurrentUser));
      };
      foo();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  if (isLoading) return <AppLoading />;

  return (
    <Layout>
      <h1>Member</h1>
      <p>上に検索バー・分野・学年で絞れるようにする</p>
      <p>コミッティーメンバー</p>
      <p>アクティブメンバー</p>
      <p>自分の興味のある分野を専門としているメンバー一覧</p>
      <p>それぞれ閉じるボタンをつけれるようにする。</p>
      {users.map((user) => (
        <div key={user.uid}>{user.uid}</div>
      ))}
      {/* <div className="flex flex-wrap w-full">
        <MemberCard />
      </div> */}
    </Layout>
  );
};
export default Member;
