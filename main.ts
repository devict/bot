import { config } from "./lib/config.ts";
import { initServer } from "./lib/server.ts";

const app = initServer();

if (import.meta.main) {
  Deno.serve({ port: parseInt(config.APP_PORT) }, app.fetch);
}
