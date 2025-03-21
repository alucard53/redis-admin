import redisClient from "@/app/_lib/redis";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const keys = (
    await redisClient.keys("*")).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
  );

  return (
    <>
      <header className="text-center w-full text-5xl mb-10 text-red-500 border-red-500 border-b-2 py-2">
        RedisAdmin
      </header>
      <div className="flex flex-col gap-2">
        {keys.map((key, index) => (
          <Link
            href={`/${key}`} className="underline"
            key={index}
          >
            {key}
          </Link>
        ))}
      </div>
    </>
  );
}
