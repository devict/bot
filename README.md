# 🤖 devICT bot 🤖

A slack bot powered by Slack webhook events.

## Slack Events

[A list of all the events can be seen here](https://api.slack.com/events).

The events the bot responds to are defined in the `events.ts` module. Typebox schemas are defined for the events we respond to.

## Running locally

```
deno task start
```

## Deployment

Bot is deployed on Deno Deploy. The Slack App points to the `/slack/event` endpoint of the deployed bot API (this repo).
