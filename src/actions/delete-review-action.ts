"use server";

import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export const deleteReviewAction = async (_: any, formData: FormData) => {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();
  if (!reviewId || !bookId) {
    return {
      status: false,
      error: "잘못된 요청입니다.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      // throw new Error는 catch 블록으로 에러 메세지를 넘김
      throw new Error(res.statusText);
    }
    updateTag(`review-${bookId}`);
    return {
      status: true,
      error: "리뷰 삭제에 성공했습니다.",
    };
  } catch (e) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다. ${e}`,
    };
  }
};
