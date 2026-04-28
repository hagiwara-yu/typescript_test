// src/components/Header.tsx
import Link from "next/link";

export default function Header({ current }: { current: "aws" | "gcp" }) {
  return (
    <div className="flex gap-2 mb-6">
      <Link
        href="/aws"
        className={`px-4 py-2 rounded ${
          current === "aws"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        AWS
      </Link>

      <Link
        href="/gcp"
        className={`px-4 py-2 rounded ${
          current === "gcp"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        GCP
      </Link>
    </div>
  );
}