import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import { AdminCard, ActiveMemberCard, MemberCard } from "src/components/feature/Card";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser } from "src/global-states/atoms";

const Member = () => {
  const [users, setUsers] = useState<CurrentUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getUsers = async () => {
        const colRef = collection(db, "users");
        const users = await getDocs(colRef);
        setUsers(users.docs.map((doc) => doc.data() as CurrentUser));
      };
      getUsers();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  if (isLoading) return <AppLoading />;

  const Committee = users.map((user) => {
    if (user.position === 3 || user.position === 4 || user.position === 5)
      return <AdminCard key={user.displayName} {...user} />;
  });

  return (
    <Layout>
      <div className="flex flex-col flex-wrap gap-5 w-full">
        <div className="pt-5">
          <Text weight="bold">コミッティー</Text>
          <div className="flex flex-wrap gap-5">{Committee}</div>
        </div>

        <div>
          <Text weight="bold">アクティブメンバー</Text>
          <ActiveMemberCard />
        </div>

        <div>
          <Text weight="bold">自分の興味のある分野を専門としているメンバー</Text>
          <MemberCard />
        </div>

        <div>
          <Text weight="bold">2回生</Text>
          <MemberCard />
        </div>

        <div className="font-bold text-center">その他</div>
        <h1>Member</h1>
        <p>上に検索バー・分野・学年で絞れるようにする</p>
        <p>自分の興味のある分野を専門としているメンバー一覧</p>
        <p>それぞれ閉じるボタンをつけれるようにする。</p>
      </div>
    </Layout>
  );
};
export default Member;
