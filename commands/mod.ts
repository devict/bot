import { jobsCommand } from "./jobs.ts";
import { pingCommand } from "./ping.ts";

export const commands = [pingCommand, jobsCommand];

export interface Command<TSlackEvent> {
  matcher: (msg: string) => boolean;
  handler: (event: TSlackEvent) => Promise<void>;
}
