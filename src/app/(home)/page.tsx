"use client";
import { trpc } from "@/trpc/client";

export default function HomePage() {
  const { data } = trpc.hello.useQuery({ text: 'hello world' });

  return (
    <div className="flxe flex-col items-center justify-center min-h-screen p-4 mt-80">
      <h1 className="mt-80 text-black font-bold">{data?.greeting}</h1>
    </div>
  );
}
