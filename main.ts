import { initServer } from "./lib/server.ts";

const app = initServer();
Deno.serve({ port: 3927 }, app.fetch);
