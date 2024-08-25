#!/usr/bin/env -S deno run --env --allow-env --allow-net

import { config } from "../lib/config.ts";
import { type AppMention } from "../lib/slack.ts";

// https://devict.slack.com/archives/C02N7CW42JE
const BOT_TESTING_CHANNEL = "C02N7CW42JE";
const TEST_BOT_ID = "<@U07AY8LEWUF>";
const LOCAL_URL = `http://localhost:${config.APP_PORT}`;

// get the message from args
const _message = Deno.args[0];

if (!_message) {
  console.error("Please provide a message to simulate");
  Deno.exit(1);
}

// replace @bot with the test bot username mention (`<@ABC123>`)
const message = _message.replaceAll("@bot", TEST_BOT_ID);

// create an app_mention event payload with the `#bot-testing` channel ID
const payload: AppMention = {
  type: "app_mention",
  user: "U07AY8LEWUF",
  text: message,
  ts: "1723835381.746579",
  channel: BOT_TESTING_CHANNEL,
  event_ts: "1723832846.938799",
};

// send the payload to the local server
const resp = await fetch(`${LOCAL_URL}/slack/event`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ event: payload }),
});
if (!resp.ok) {
  console.error(`request failed: ${resp.status}`);
  console.error(await resp.text());
  Deno.exit(1);
}

console.log("message sent successfully");
