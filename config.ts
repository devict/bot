const assertEnv = (key: string) => {
  const v = Deno.env.get(key);
  if (!v) throw new Error(`Missing environment variable: ${key}`);
  return v;
};

export const config = {
  SLACK_TOKEN: assertEnv("SLACK_TOKEN"),
} as const;
