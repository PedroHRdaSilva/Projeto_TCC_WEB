"use server";
import { revalidateTag } from "next/cache";

export default async function handleRevalidateTag(tag: string) {
  revalidateTag("/*", tag);
}
