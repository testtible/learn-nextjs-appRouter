import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import Skeleton, { SkeletonList } from "@/components/skeleton/skeleton";

export const dynamic = "auto";
// 특정 페이지의 유형을 강제로 Static or Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 강제로 동적 페이지로 지정
// 3. force-static : 강제로 정적 페이지로 지정
// 4. error : Static 페이지로 변경이 불가능하다면 build 때 에러를 발생

const AllBooks = async () => {
  await delay(1500);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!res.ok) {
    return <div>오류 발생</div>;
  }
  const allBooks: BookData[] = await res.json();

  return (
    <div>
      {allBooks.map((book: BookData) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

const RecommendedBooks = async () => {
  await delay(2000);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`
  );
  if (!res.ok) {
    return <div>오류 발생</div>;
  }
  const recommendedBooks: BookData[] = await res.json();
  return (
    <div>
      {recommendedBooks.map((book: BookData) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        <Suspense fallback={<SkeletonList count={3} />}>
          <RecommendedBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<SkeletonList count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
