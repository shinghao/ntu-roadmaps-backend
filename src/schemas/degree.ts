import { z } from "zod";

export const cohortsByYearSchema = z.record(z.array(z.string()));

export const degreeSchema = z.object({
  school: z.string(),
  degree: z.string(),
  cohorts: cohortsByYearSchema,
});
