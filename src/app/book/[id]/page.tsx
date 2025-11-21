import style from "./page.module.css";

export function generateStaticParams() {
  // 정적 params 생성
  // 페이지 라우터의 getStaticPaths의 앱 라우터 버전
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!res.ok) {
    return <div>오류 발생</div>;
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } =
    await res.json();

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
