import { AdminCard, InterestMember, MemberCard } from "src/components/feature/Card";
import { Layout } from "src/components/layout";

const Member = () => {
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
    </Layout>
  );
};
export default Member;
