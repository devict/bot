import { config } from "./config.ts";
import { AppMention } from "./events.ts";
import { WebClient as SlackClient } from "npm:@slack/web-api";

const slack = new SlackClient(config.SLACK_TOKEN);

interface Command {
  matcher: RegExp;
  handler: (event: AppMention) => Promise<void>;
}

export const commands: Command[] = [
  {
    matcher: /ping/,
    handler: async (event) => {
      await slack.chat.postMessage({
        channel: event.channel,
        text: "pong",
      });
    },
  },
  // {
  //   matcher: /hello/,
  //   handler: async (event) => {
  //     console.log("hello");
  //   },
  // },
];
