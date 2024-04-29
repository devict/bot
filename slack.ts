import { WebClient as SlackClient } from "npm:@slack/web-api";
import { config } from "./config.ts";

export const slack = new SlackClient(config.SLACK_TOKEN);
