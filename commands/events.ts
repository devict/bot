import { Command } from "./mod.ts";
import { AppMention, respondInThread, slack } from "../lib/slack.ts";
import {
  convertEventsToDisplayString,
  getEventsInTheNextWeek,
} from "../lib/meetup.ts";

export const eventsCommand: Command<AppMention> = {
  matcher: (msg) => /^<@.+> events$/.test(msg),
  handler: async (event) => {
    const events = await getEventsInTheNextWeek();
    const text = convertEventsToDisplayString(events);
    await respondInThread(event, text, {
      unfurl_links: false,
      unfurl_media: false,
    });
  },
  name: "events",
  helpText: "lists upcoming events within the next week",
};
