import { z } from "zod";

export const yearSemesterSchema = z.object({
  year: z.number(),
  semester: z.number(),
  courses: z.array(z.string()),
});

export const roadmapSchema = z.object({
  degree: z.string(),
  cohort: z.string(),
  type: z.string().optional(),
  coursesByYearSemester: z.array(yearSemesterSchema),
});
