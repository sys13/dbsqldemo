import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getWarehouseData } from "~/models/warehouse.server";

export async function loader({ request }: LoaderArgs) {
  const warehouseData = await getWarehouseData();
  return json(warehouseData);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return <div>Hello {data[0].fare_amount}</div>;
}
