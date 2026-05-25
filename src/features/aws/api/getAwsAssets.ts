const API_URL = process.env.INTERNAL_API_URL;

export async function getAllAssets() {
  const res = await fetch(`${API_URL}/v2/all`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }

  return res.json();
}