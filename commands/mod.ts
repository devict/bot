import { pingCommand } from "./ping.ts";

export const commands = [pingCommand];

export interface Command<TSlackEvent> {
  matcher: RegExp;
  handler: (event: TSlackEvent) => Promise<void>;
}
