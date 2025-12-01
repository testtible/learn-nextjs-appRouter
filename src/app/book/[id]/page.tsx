import BookDetail from "@/components/book-detail";
import style from "./page.module.css";
import ReviewEditor from "@/components/review-editor";
import ReviewList from "@/components/review-list";
export function generateStaticParams() {
  // 정적 params 생성
  // 페이지 라우터의 getStaticPaths의 앱 라우터 버전
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail id={id} />
      <ReviewEditor id={id} />
      <ReviewList id={id} />
    </div>
  );
}
