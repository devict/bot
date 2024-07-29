import { initServer } from "./lib/server.ts";

const app = initServer();

if (import.meta.main) {
  Deno.serve({ port: 3927 }, app.fetch);
}
