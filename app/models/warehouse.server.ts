import { connectToWarehouse } from "../warehouseConnection.server";

type Results = Array<{
  tpep_pickup_datetime: string;
  trip_distance: number;
  fare_amount: number;
  pickup_zip: number;
  dropfoff_zip: number;
}>;

export async function getWarehouseData() {
  const client = await connectToWarehouse();

  const selectDataOperation = await client.executeStatement(
    "SELECT * FROM samples.nyctaxi.trips LIMIT 10",
    { runAsync: true }
  );
  const results = (await selectDataOperation.fetchAll()) as Results;
  await selectDataOperation.close();
  return results;
}
