import { Command, commands } from "./mod.ts";
import { AppMention, slack } from "../lib/slack.ts";

export const helpCommand: Command<AppMention> = {
  matcher: (msg) => /^<@.+> help$/.test(msg),
  handler: async (event) => {
    const text = commands.map((command) =>
      `${command.name} - ${command.helpText}`
    ).join("\n");

    await slack.chat.postMessage({
      channel: event.channel,
      text: text,
    });
  },
  name: "help",
  helpText: "lists commands",
};
