"use client";

import React, { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review-action";
const ReviewEditor = ({ id }: { id: string }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section className={style.container}>
      <form className={style.form} action={formAction}>
        <input hidden readOnly name="bookId" value={id} />
        <textarea required name="content" placeholder="리뷰를 입력해주세요." />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "...Loading" : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReviewEditor;
