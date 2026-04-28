// src/app/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Asset Management
        </h1>

        <div className="flex flex-col gap-4">
          <Link
            href="/aws"
            className="p-4 rounded bg-orange-500 text-white text-center hover:opacity-90"
          >
            AWS
          </Link>

          <Link
            href="/gcp"
            className="p-4 rounded bg-blue-500 text-white text-center hover:opacity-90"
          >
            GCP
          </Link>
        </div>
      </div>
    </div>
  );
}