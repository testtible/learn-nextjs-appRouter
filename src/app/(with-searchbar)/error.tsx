"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div>
      <h3>오류 발생</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴 (비동기지만 Promise 반환 안함)
            reset(); // 클라이언트 에러 상태 리셋
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
