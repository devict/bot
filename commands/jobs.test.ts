import { assert } from "@std/assert";
import { jobsCommand } from "./jobs.ts";

Deno.test({
  name: "jobsCommand: matcher",
  fn: () => {
    const shouldMatch = ["<@U01J9G9JX1V> jobs", "<@U01J9G9JX1V>  jobs   \n"];
    for (const text of shouldMatch) {
      const result = jobsCommand.matcher(text);
      assert(result, `Expected ${text} to match`);
    }

    const shouldNotMatch = [
      "<@U01J9G9JX1V> jobsx",
      "<@U01J9G9JX1V> x jobs",
      "<@U01J9G9JX1V> jobsx\n",
      "<@U01J9G9JX1V> xjobs\n",
    ];
    for (const text of shouldNotMatch) {
      const result = jobsCommand.matcher(text);
      assert(!result, `Expected ${text} to not match`);
    }
  },
});
