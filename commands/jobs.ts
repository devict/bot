import { type Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { config } from "../lib/config.ts";
import { AppMention, respondInThread, slack } from "../lib/slack.ts";
import { Command } from "./mod.ts";

export const jobsCommand: Command<AppMention> = {
  matcher: (msg) => /^<@.+>\s+jobs$/.test(msg.trim()),
  handler: async (event) => {
    const jobs = await fetchJobs();

    const jobsMessage = jobs.items
      .map((job) => {
        const url = job.url ?? `https://jobs.devict.org/jobs/${job.id}`;
        return `- <${url}|*${job.organization}* - ${job.position}>`;
      })
      .join("\n");

    respondInThread(event, jobsMessage);
  },
  helpText: "displays a list of jobs",
  name: "jobs",
};

const JobSchema = Type.Object({
  description: Type.String(),
  email: Type.String(),
  id: Type.String(),
  organization: Type.String(),
  position: Type.String(),
  published_at: Type.String(),
  url: Type.Union([Type.Null(), Type.String()]),
});
const JobsRespSchema = Type.Object({
  items: Type.Array(JobSchema),
});

async function fetchJobs(): Promise<Static<typeof JobsRespSchema>> {
  const response = await fetch(`${config.JOB_BOARD_URL}/api/jobs`, {
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch jobs: ${response.statusText} (${response.status})`,
    );
  }
  const json = await response.json();

  return Value.Decode(JobsRespSchema, json);
}
