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
  const filtered = data.filter((item) => {
    return (
      item.account_id.includes(keyword) ||
      item.gip.includes(keyword)
    );
  });

  // ソート
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  //　ソート切り替え
  const handleSort = (key: keyof Asset) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-4">
      {/* 検索 */}
      <input
        type="text"
        placeholder="検索（account_id / IP）"
        className="border p-2 mb-4 w-full"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* テーブル */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th onClick={() => handleSort("account_id")} className="cursor-pointer">
              Account ID
            </th>
            <th onClick={() => handleSort("gip")} className="cursor-pointer">
              IP
            </th>
            <th onClick={() => handleSort("create_date")} className="cursor-pointer">
              Created
            </th>
            <th onClick={() => handleSort("end_date")} className="cursor-pointer">
              End
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((a) => (
            <tr key={`${a.account_id}-${a.gip}`} className="border-b">
              <td>{a.account_id}</td>
              <td>{a.gip}</td>
              <td>{a.create_date}</td>
              <td>{a.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}