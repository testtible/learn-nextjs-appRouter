"use client";

import React, { useActionState, useEffect, useRef } from "react";
import style from "./review-list-delete-btn.module.css";
import { deleteReviewAction } from "@/actions/delete-review-action";
const ReviewListDeleteBtn = ({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input hidden readOnly name="reviewId" value={reviewId} />
      <input hidden readOnly name="bookId" value={bookId} />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          className={style.delete_button}
          onClick={() => formRef.current?.requestSubmit()}
        >
          삭제하기
        </div>
      )}
    </form>
  );
};

export default ReviewListDeleteBtn;
