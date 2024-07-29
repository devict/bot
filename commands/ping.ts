import { Command } from "./mod.ts";
import { AppMention } from "../lib/events.ts";
import { slack } from "../lib/slack.ts";

export const pingCommand: Command<AppMention> = {
  matcher: /ping/,
  handler: async (event) => {
    await slack.chat.postMessage({
      channel: event.channel,
      text: "pong",
    });
  },
};
