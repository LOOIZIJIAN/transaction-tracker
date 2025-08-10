"use client";
import UploadAttachment from "@/services/upload/file-upload";
import { trpc } from "@/trpc/client";

export default function HomePage() {
  const { data } = trpc.hello.useQuery({ text: 'hello world' });

  return (
    <div className="flxe flex-col items-center justify-center p-4">
      <h1 className="mt-16 text-black font-bold">{data?.greeting}</h1>
      <UploadAttachment/>
    </div>
  );
}
