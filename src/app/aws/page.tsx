import { getAllAssets } from "@/features/aws/api/getAwsAssets";
import AssetTable from "@/components/aws/AssetTable";

type Asset = {
  account_id: string;
  gip: string;
  create_date: string;
  end_date: string;
};

export default async function Page() {
  let data: Asset[] = [];

  try {
    data = await getAllAssets();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AWS Assets</h1>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        {data.length === 0 ? (
          <p className="text-gray-500">No data</p>
        ) : (
          <AssetTable data={data} />
        )}
      </div>
    </div>
  );
}