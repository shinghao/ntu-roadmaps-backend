import { z } from "zod";
import { careerSchema } from "../schemas/career";

export type Career = z.infer<typeof careerSchema>;
