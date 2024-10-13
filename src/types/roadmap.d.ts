export interface CourseInRoadmap {
  courseCode: string;
  prerequisites: string[][];
}

interface YearSemester {
  year: number;
  semester: number;
  courses: CourseInRoadmap[];
}

export interface Roadmap {
  degree: string;
  cohort: string;
  type?: string;
  coursesByYearSemester: YearSemester[];
}
