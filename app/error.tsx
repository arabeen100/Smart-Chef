"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-center p-6">
      <div className="flex flex-col items-center gap-4">
        <AlertCircle className="text-green-500 w-20 h-20 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-white">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-300 max-w-md">
          Sorry, we couldn’t load the content you were looking for. Please try
          again.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => reset()}
            className="cursor-pointer px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors duration-300"
          >
            Retry
          </button>
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer px-6 py-3 border border-green-500 text-green-500 rounded-xl font-bold hover:bg-green-800/10 transition-colors duration-300"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

