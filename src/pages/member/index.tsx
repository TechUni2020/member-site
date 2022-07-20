import { MemberCard } from "src/components/feature/Card";
import { Layout } from "src/components/layout";

const Member = () => {
  return (
    <Layout>
      <h1>Member</h1>
      <p>上に検索バー・分野・学年で絞れるようにする</p>
      <p>コミッティーメンバー</p>
      <p>アクティブメンバー</p>
      <p>自分の興味のある分野を専門としているメンバー一覧</p>
      <p>それぞれ閉じるボタンをつけれるようにする。</p>
      <div className="flex flex-wrap w-full">
        <MemberCard />
      </div>
    </Layout>
  );
};
export default Member;
