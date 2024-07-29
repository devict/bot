# 🤖 devICT bot 🤖

A slack bot powered by Slack webhook events.

## Slack App

This bot is installed in the devICT work space as a Slack app called **bot**.

- The [OAuth & Permissions](https://api.slack.com/apps/A07B9TL6EMT/oauth) page contains the `SLACK_TOKEN` needed to power the bot.
  - The following scopes must be added: `app_mentions:read`, `chat:write`
- The event receiving endpoint must be added on the [Event Subscriptions](https://api.slack.com/apps/A07B9TL6EMT/event-subscriptions) page.
  - Events to subscribe to: `app_mention`

## Slack Events

[A list of all the events can be seen here](https://api.slack.com/events).

The events the bot responds to are defined in the `events.ts` module. Typebox schemas are defined for the events we respond to.

## Development

There is a separate Slack app for development (`@bot (test)`) that can be used. Reach out to [@seth](https://devict.slack.com/archives/D19FFBMPB) in Slack for the `SLACK_TOKEN`.

## Deployment

Bot is deployed on Deno Deploy. The Slack App points to the `/slack/event` endpoint of the deployed bot API (this repo).
