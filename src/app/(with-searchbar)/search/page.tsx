import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

const SearchBooks = async ({ q }: { q: string }) => {
  await delay(1500);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    return <div>오류 발생</div>;
  }
  const searchBooks: BookData[] = await res.json();

  return (
    <div>
      {searchBooks.map((book: BookData) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ""} fallback={<div>Loading...</div>}>
      <SearchBooks q={q || ""} />
    </Suspense>
  );
}
