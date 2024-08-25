import { Static, Type } from "@sinclair/typebox";
import {
  ChatPostMessageArguments,
  WebClient as SlackClient,
} from "npm:@slack/web-api";
import { config } from "./config.ts";

export const slack = new SlackClient(config.SLACK_TOKEN);

/**
 * https://api.slack.com/events/url_verification
 */
export const ChallengeSchema = Type.Object({
  type: Type.Literal("url_verification"),
  token: Type.String(),
  challenge: Type.String(),
});
export type Challenge = Static<typeof ChallengeSchema>;

/**
 * https://api.slack.com/events/app_mention
 */
export const AppMentionSchema = Type.Object({
  type: Type.Literal("app_mention"),
  user: Type.String(),
  text: Type.String(),
  ts: Type.String(),
  channel: Type.String(),
  event_ts: Type.String(),
  thread_ts: Type.Optional(Type.String()),
});
export type AppMention = Static<typeof AppMentionSchema>;

export const SlackEventSchema = Type.Object({
  event: Type.Union([ChallengeSchema, AppMentionSchema]),
});
export type SlackEvent = Static<typeof SlackEventSchema>;

interface EventWithTS {
  ts: string;
  thread_ts?: string;
  channel: string;
}

type ExtraPostMessageArgs = Omit<
  ChatPostMessageArguments,
  "channel" | "text" | "thread_ts" | "ts"
>;
export async function respondInThread(
  event: EventWithTS,
  text: string,
  extraArgs?: ExtraPostMessageArgs
) {
  const thread_ts = event.thread_ts || event.ts;
  const response = await slack.chat.postMessage({
    channel: event.channel,
    text: text,
    thread_ts: thread_ts,
    ...extraArgs,
  });
  return response;
}
