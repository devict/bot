import { eventsCommand } from "./events.ts";
import { helpCommand } from "./help.ts";
import { jobsCommand } from "./jobs.ts";
import { pingCommand } from "./ping.ts";
import { questionCommand } from "./question.ts";

export const commands = [pingCommand, jobsCommand, helpCommand, eventsCommand, questionCommand];

export interface Command<TSlackEvent> {
  matcher: (msg: string) => boolean;
  handler: (event: TSlackEvent) => Promise<void>;
  name:string,
  helpText:string,
}
