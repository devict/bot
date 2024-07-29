import { jobsCommand } from "./jobs.ts";
import { pingCommand } from "./ping.ts";

export const commands = [pingCommand, jobsCommand];

export interface Command<TSlackEvent> {
  matcher: RegExp;
  handler: (event: TSlackEvent) => Promise<void>;
}
