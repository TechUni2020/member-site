import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { AdminCard, InterestMember, MemberCard } from "src/components/feature/Card";
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
      <div className="flex flex-col flex-wrap gap-5 w-full">
        <div className="pt-5">
          <h1 className="font-bold">コミッティー</h1>
          <div className="flex gap-x-5">
            <AdminCard />
            <AdminCard />
          </div>
        </div>
        <div>
          <h1 className="font-bold">アクティブメンバー</h1>
          <MemberCard />
        </div>
        <div>
          <h1 className="font-bold">自分の興味のある分野を専門としているメンバー</h1>
          <InterestMember />
        </div>
        <div>
          <h1 className="font-bold">2回生</h1>
          <InterestMember />
        </div>
        <div className="font-bold text-center">その他</div>
      </div>
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
