import { NotFoundError } from "../error";
import type { DegreePrograms } from "../types/degree";
import degreeProgrammesJson from "../mockData/degreeProgrammes.json";

const get = (): Promise<DegreePrograms> => {
  // TODO: Add mongoDB Code
  const degreeProgramsFound = degreeProgrammesJson;
  if (!degreeProgramsFound || degreeProgramsFound.length === 0) {
    throw new NotFoundError();
  }
  return Promise.resolve(degreeProgramsFound);
};

const insertMany = async () => {
  return Promise.resolve(true);
};

export default { get, insertMany };
