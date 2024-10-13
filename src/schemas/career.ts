import { z } from "zod";

export const careerSchema = z.object({
  career: z.string(),
  degrees: z.array(z.string()),
  electives: z.array(z.string()),
});

export type Career = z.infer<typeof careerSchema>;
