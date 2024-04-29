import { Hono } from "npm:hono";
import { tbValidator } from "npm:@hono/typebox-validator";
import { SlackEventSchema } from "./events.ts";
import { pingCommand } from "./commands/ping.ts";

const app = new Hono();

const commands = [pingCommand];

app.post("/slack/event", tbValidator("json", SlackEventSchema), async (c) => {
  const body = c.req.valid("json");

  switch (body.type) {
    case "url_verification":
      return c.json({ challenge: body.challenge });

    case "app_mention": {
      const command = commands.find((cmd) => cmd.matcher.test(body.text));
      if (!command) {
        return c.json({ text: "wat?" }, 400);
      }

      await command.handler(body);

      return c.text("OK");
    }
  }
});

Deno.serve(app.fetch);
