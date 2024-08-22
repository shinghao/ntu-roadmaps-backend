export interface CohortsByYear {
  [year: string]: string[];
}

export interface DegreeProgram {
  school: string;
  degree: string;
  cohorts: CohortsByYear;
}

export type DegreePrograms = DegreeProgram[];
