import { Command } from "./mod.ts";
import { AppMention, respondInThread, slack } from "../lib/slack.ts";

export const pingCommand: Command<AppMention> = {
  matcher: (msg) => /^<@.+> ping$/.test(msg),
  handler: async (event) => {
        
    // const response = await slack.chat.postMessage({
    //   channel: event.channel,
    //   text: "pong",
    //   thread_ts:event.thread_ts || event.ts,
    // });

    const response = await respondInThread(event, "pong");

    console.log(response);
    
  },
  name:"ping",
  helpText:"pong"
};
