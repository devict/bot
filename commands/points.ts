import { Command } from "./mod.ts";
import { AppMention, slack } from "../lib/slack.ts";

export const pointsCommand: Command<AppMention> = {
  matcher: /ping/,
  handler: async (event) => {
    await slack.chat.postMessage({
      channel: event.channel,
      text: "pong",
    });
  },
};
