import { z } from "zod";
import { cohortsByYearSchema, degreeSchema } from "../schemas/degree";

export type CohortsByYear = z.infer<typeof cohortsByYearSchema>;
export type DegreeProgram = z.infer<typeof degreeSchema>;
export type DegreePrograms = DegreeProgram[];
