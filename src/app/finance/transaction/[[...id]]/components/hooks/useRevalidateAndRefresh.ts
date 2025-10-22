"use client";

import handleRevalidateTag from "@/utils/actions";
import { useRouter } from "next/navigation";

export default function useRevalidateAndRefresh() {
  const router = useRouter();

  return (tag: string, delay: number) => {
    setTimeout(async () => {
      await handleRevalidateTag(tag);
      router.refresh();
    }, delay);
  };
}
