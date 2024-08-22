export interface Course {
  courseCode: string;
  au: number;
  title: string;
  description: string;
  intendedLearningOutcomes: string[];
  semesters: number[];
  prerequisites: string[][];
  otherPrerequisites?: string;
  school: string;
  yearStanding: number;
}
