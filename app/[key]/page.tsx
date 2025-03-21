import redisClient from "@/app/_lib/redis";
import Link from "next/link";
import EditorWrapper from "../_components/EditorWrapper";

export const dynamic = "force-dynamic";

export default async function Page({
  params
} : {
  params: Promise<{
    key: string
  }>
}) {
  const { key } = await params;

  const value = await redisClient.get(key);
  let parsed: string | undefined;

  try {
    parsed = JSON.stringify(JSON.parse(value ?? ""), undefined, 4);
  } catch (_) {}

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <Link href="/" className="underline justify-self-start">Keys</Link>
        <span className="text-xl mx-auto font-semibold underline">{key}</span>

      </div>
      <EditorWrapper
        rKey={key}
        value={parsed ?? value ?? undefined}
        isJSON={Boolean(parsed)}
      />
    </div>
  );
}
