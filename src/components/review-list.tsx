import React from "react";
import style from "./review-list.module.css";
import { ReviewData } from "@/types";
import ReviewListDeleteBtn from "./review-list-delete-btn";
const ReviewList = async ({ id }: { id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${id}`,
    { next: { tags: [`review-${id}`] } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const reviews: ReviewData[] = await res.json();

  return (
    <section className={style.container}>
      {reviews.map((review) => (
        <div className={style.review_item} key={review.id}>
          <div className={style.content}>{review.content}</div>
          <div className={style.author}>{review.author}</div>
          <div className={style.bottom_container}>
            <div className={style.createdAt}>
              {review.createdAt.toLocaleString()}
            </div>
            <ReviewListDeleteBtn reviewId={review.id} bookId={review.bookId} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReviewList;
