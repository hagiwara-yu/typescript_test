import { getAllAssets } from "@/features/aws/api/getAwsAssets";

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
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Account ID</th>
                <th className="p-2 text-left">IP</th>
                <th className="p-2 text-left">Create Date</th>
                <th className="p-2 text-left">End Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((a) => (
                <tr
                  key={`${a.account_id}-${a.gip}`}
                  className="border-t"
                >
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
        )}
      </div>
    </div>
  );
}