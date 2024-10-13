import { z } from "zod";
import { courseSchema } from "../schemas/course";

export type Course = z.infer<typeof courseSchema>;
