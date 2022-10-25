import { DBSQLClient } from "@databricks/sql";
import type IDBSQLSession from "@databricks/sql/dist/contracts/IDBSQLSession";

const serverHostname: string = process.env.DATABRICKS_SERVER_HOSTNAME || "";
const httpPath: string = process.env.DATABRICKS_HTTP_PATH || "";
const token: string = process.env.DATABRICKS_TOKEN || "";

if (serverHostname == "" || httpPath == "" || token == "") {
  throw new Error(
    "Cannot find Server Hostname, HTTP Path, or personal access token. " +
      "Check the environment variables DATABRICKS_SERVER_HOSTNAME, " +
      "DATABRICKS_HTTP_PATH, and DATABRICKS_TOKEN."
  );
}

let existingSession: IDBSQLSession;

export async function connectToWarehouse(): Promise<IDBSQLSession> {
  if (existingSession) {
    return existingSession;
  }
  const client: DBSQLClient = new DBSQLClient();
  const connectedClient = await client.connect({
    host: serverHostname,
    path: httpPath,
    token: token,
  });

  const session = await connectedClient.openSession();
  existingSession = session;
  return session;
}
