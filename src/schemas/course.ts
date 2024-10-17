import { z } from "zod";

export const courseSchema = z.object({
  courseCode: z.string(),
  au: z.number().int(),
  title: z.string(),
  description: z.string(),
  intendedLearningOutcomes: z.array(z.string()),
  semesters: z.array(z.number().int()),
  prerequisites: z.array(z.array(z.string())),
  school: z.string(),
  yearStanding: z.number().int(),
});

export type Course = z.infer<typeof courseSchema>;
