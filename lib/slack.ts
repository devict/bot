import { Static, Type } from "@sinclair/typebox";
import { WebClient as SlackClient } from "npm:@slack/web-api";
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
});
export type AppMention = Static<typeof AppMentionSchema>;

export const SlackEventSchema = Type.Object({
  event: Type.Union([ChallengeSchema, AppMentionSchema]),
});
export type SlackEvent = Static<typeof SlackEventSchema>;
