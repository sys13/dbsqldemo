import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { getWarehouseData } from "~/models/warehouse.server";

export async function loader({ request }: LoaderArgs) {
  const warehouseData = await getWarehouseData();
  return json(warehouseData);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="trip_distance" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="fare_amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
