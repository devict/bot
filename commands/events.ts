import { Command } from "./mod.ts";
import { AppMention, slack } from "../lib/slack.ts";
import {
  convertEventsToDisplayString,
  getEventsInTheNextWeek,
} from "../lib/meetup.ts";

export const eventsCommand: Command<AppMention> = {
  matcher: (msg) => /^<@.+> events$/.test(msg),
  handler: async (event) => {
    const events = await getEventsInTheNextWeek();
    const text = convertEventsToDisplayString(events);
    await slack.chat.postMessage({
      channel: event.channel,
      text: text,
    });
  },
  name: "events",
  helpText: "lists upcoming events within the next week",
};
