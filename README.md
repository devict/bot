# 🤖 devICT bot 🤖

A slack bot powered by Slack webhook events.

## Overview

This is _not_ using any of the Slack platform stuff. Trying to keep it simple by
simply receiving webhook events from Slack and responding to those events
however we want.

- Runs as an API service listening on a `/slack/event` endpoint for webhook
  events from Slack.
  - Deployed to Deno Deploy
- Commands are implemented as handlers that are executed if the message from the
  event matches some defined criteria.
  - Check the
    [commands/ping.ts](https://github.com/devict/bot/tree/main/commands/ping.ts)
    for a basic example.
- Responses to the events are sent as separate HTTP requests, not as responses
  to the incoming webhooks.
  - We're using the
    [@slack/web-api](https://www.npmjs.com/package/@slack/web-api) package,
    which is a thin wrapper over Slack's HTTP API.

## Contributing

This is a great project to contribute to as a member of the devICT community!

## Local dev

This project runs on TypeScript with Deno.

### Setup

- [Install deno](https://docs.deno.com/runtime/manual/getting_started/installation/)
  with `brew install deno`, or several other methods
- Copy `.env.example` to `.env`
- Plug your `SLACK_TOKEN` in to `.env` (reach out to
  [@seth](https://devict.slack.com/archives/D19FFBMPB) for this)
- Run `deno task cache` to download dependencies

### Running the service

- `deno task start`

### Testing commands locally

There is a separate Slack app for development (`@bot (test)`) that can be used.
Reach out to [@seth](https://devict.slack.com/archives/D19FFBMPB) in Slack for
the `SLACK_TOKEN`.

Simulate events from Slack hitting your local server with the
`bin/simulate-message` util.

```
$ bin/simulate-message.ts "@bot ping"
```

or for windows

```
deno run --env --allow-env --allow-net .\bin\simulate-message.ts "@bot ping"
```

You won't see the simulated message in Slack, but the response will show up
there from `@bot (test)`.

## Slack App

This bot is installed in the devICT work space as a Slack app called **bot**.

- The [OAuth & Permissions](https://api.slack.com/apps/A07B9TL6EMT/oauth) page
  contains the `SLACK_TOKEN` needed to power the bot.
  - The following scopes must be added: `app_mentions:read`, `chat:write`
- The event receiving endpoint must be added on the
  [Event Subscriptions](https://api.slack.com/apps/A07B9TL6EMT/event-subscriptions)
  page.
  - Events to subscribe to: `app_mention`

## Slack Events

[A list of all the events can be seen here](https://api.slack.com/events).

The events the bot responds to are defined in the `events.ts` module. Typebox
schemas are defined for the events we respond to.

_Note: If we want to respond to new event types, we will need to add them in the
Slack app console before Slack will start sending them._

## Deployment

Bot is deployed on Deno Deploy. The Slack App points to the `/slack/event`
endpoint of the deployed bot API (this repo).
