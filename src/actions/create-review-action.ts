"use server";

import { delay } from "@/util/delay";
import { revalidatePath } from "next/cache";

export const createReviewAction = async (_: any, formData: FormData) => {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author || !bookId) {
    return {
      status: false,
      error: "모든 필드를 입력해주세요.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ content, author, bookId }),
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidatePath(`/book/${bookId}`);
  } catch (e) {
    return {
      status: false,
      error: "리뷰 작성에 실패했습니다.",
    };
  }
  console.log(content, author);
};
