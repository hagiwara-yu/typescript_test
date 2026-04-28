export async function getAllAssets() {
  const res = await fetch("https://sec-cloud-asset-inventory.com/v2/all", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }

  return res.json();
}