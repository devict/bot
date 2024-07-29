const assertEnv = (key: string) => {
  const v = Deno.env.get(key);
  if (!v) throw new Error(`Missing environment variable: ${key}`);
  return v;
};

export const config = {
  JOB_BOARD_URL: assertEnv("JOB_BOARD_URL"),
  SLACK_TOKEN: assertEnv("SLACK_TOKEN"),
} as const;
