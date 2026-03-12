"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginFromQuery({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "fail">(
    "loading"
  );

  const Id = searchParams.get("Id");
  const pw = searchParams.get("pw");

  useEffect(() => {
    if (!Id || !pw) {
      setStatus("done");
      return;
    }
    setStatus("loading");
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: Id, password: pw }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus("done");
        } else {
          setStatus("fail");
          router.replace("/error");
        }
      })
      .catch(() => {
        setStatus("fail");
        router.replace("/error");
      });
  }, [Id, pw, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">로그인 중...</p>
      </div>
    );
  }

  if (status === "fail") {
    return null;
  }

  return <>{children}</>;
}
