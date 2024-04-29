import { AppMention } from "../events.ts";
import { slack } from "../slack.ts";
import { Command } from "./types.ts";

export const pingCommand: Command<AppMention> = {
  matcher: /ping/,
  handler: async (event) => {
    await slack.chat.postMessage({
      channel: event.channel,
      text: "pong",
    });
  },
};
