import { z } from "zod";
import { yearSemesterSchema, roadmapSchema } from "../schemas/roadmap";

// This is after adding au, title, prerequisite to course in roadmap
export interface CourseInRoadmap {
  au: number;
  title: string;
  prerequisites: string[][];
}

export interface GetRoadmapResponse {
  degree: string;
  cohort: string;
  type?: string;
  coursesByYearSemester: {
    year: number;
    semester: number;
    courses: CourseInRoadmap[];
  }[];
}

export type YearSemester = z.infer<typeof yearSemesterSchema>;
export type Roadmap = z.infer<typeof roadmapSchema>;
