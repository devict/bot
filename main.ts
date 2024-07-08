import { Hono } from "@hono/hono";
import { validator } from "@hono/hono/validator";
import { logger } from "@hono/hono/logger";
import { SlackEventSchema } from "./events.ts";
import { Value as V } from "@sinclair/typebox/value";
import { commands } from "./commands/mod.ts";

const app = new Hono();

app.use(logger());
app.post(
  "/slack/event",
  validator("json", (value, c) => {
    if (!V.Check(SlackEventSchema, value)) {
      const errors = [...V.Errors(SlackEventSchema, value)].map(
        ({ path, message }) => ({ path, message })
      );
      console.log("bad request", errors);
      return c.json({ errors }, 400);
    }
    return V.Cast(SlackEventSchema, value);
  }),
  async (c) => {
    const body = c.req.valid("json");

    switch (body.event.type) {
      case "url_verification":
        return c.json({ challenge: body.event.challenge });

      case "app_mention": {
        const msg = body.event.text;
        const command = commands.find((cmd) => cmd.matcher.test(msg));
        if (!command) {
          return c.json({ text: "wat?" }, 400);
        }

        await command.handler(body.event);

        return c.text("OK");
      }
    }
  }
);

Deno.serve(app.fetch);
