import { Command } from "./mod.ts";
import { AppMention, slack } from "../lib/slack.ts";

export const pingCommand: Command<AppMention> = {
  matcher: (msg) => /^<@.+> ping$/.test(msg),
  handler: async (event) => {
    await slack.chat.postMessage({
      channel: event.channel,
      text: "pong",
    });
  },
};
