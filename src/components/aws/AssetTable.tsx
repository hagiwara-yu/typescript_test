"use client";

import { useState } from "react";

type Asset = {
  account_id: string;
  gip: string;
  create_date: string;
  end_date: string;
};

export default function AssetTable({ data }: { data: Asset[] }) {
  const [keyword, setKeyword] = useState("");
  const [sortKey, setSortKey] = useState<keyof Asset>("account_id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // 検索
  const filtered = data.filter((a) =>
    a.account_id.includes(keyword) || a.gip.includes(keyword)
  );

  // ソート
  const sorted = [...filtered].sort((a, b) => {
    let valA: string | number = a[sortKey];
    let valB: string | number = b[sortKey];

    if (sortKey.includes("date")) {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // ソート切り替え
  const handleSort = (key: keyof Asset) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソートアイコン
  const getSortIcon = (key: keyof Asset) => {
    if (sortKey !== key) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div>
      {/* 検索 + 件数 */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="検索（account_id / IP）"
          className="border p-2 w-1/3"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* 件数表示 */}
        <div className="text-sm text-gray-600">
          {filtered.length} / {data.length} 件
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("account_id")}
            >
              Account ID {getSortIcon("account_id")}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("gip")}
            >
              IP {getSortIcon("gip")}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("create_date")}
            >
              Create {getSortIcon("create_date")}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("end_date")}
            >
              End {getSortIcon("end_date")}
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((a) => (
            <tr key={`${a.account_id}-${a.gip}`} className="border-t">
              <td className="p-2">{a.account_id}</td>
              <td className="p-2">{a.gip}</td>
              <td className="p-2">
                {new Date(a.create_date).toLocaleString()}
              </td>
              <td className="p-2">
                {new Date(a.end_date).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}