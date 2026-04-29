export async function getAllAssets() {
  const res = await fetch("http://api:8000/v2/all", { //ここのURLは本番とSTGでURLが違うため管理方法を考える必要あり（ecsで動かすのでecsの環境変数使う形になりそうだが）
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }

  return res.json();
}