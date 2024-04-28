import { Hono } from "npm:hono";
import { tbValidator } from "npm:@hono/typebox-validator";
import { Type } from "npm:@sinclair/typebox";
import { ChallengeSchema, AppMentionSchema } from "./events.ts";

const app = new Hono();

app.post(
  "/slack/event",
  tbValidator("json", Type.Union([ChallengeSchema, AppMentionSchema])),
  (c) => {
    const body = c.req.valid("json");
    switch (body.type) {
      case "url_verification":
        return c.json({ challenge: body.challenge });
      case "app_mention":
        return c.text(body.text);
    }
  },
);

Deno.serve(app.fetch);
