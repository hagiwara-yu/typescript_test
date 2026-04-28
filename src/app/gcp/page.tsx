// src/app/gcp/page.tsx
import Link from "next/link";

export default function Page() {
  const assets = [
    { id: 1, name: "GCE-Instance-1" },
    { id: 2, name: "Cloud-Storage-1" },
  ];

  return (
    <div className="p-6">
      {/* 戻る */}
      <Link href="/" className="text-blue-500 underline">
        ← Back
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-4">
        GCP Assets
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <ul>
          {assets.map((a) => (
            <li key={a.id} className="border-b py-2">
              {a.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}