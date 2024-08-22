import { NotFoundError } from "../error";
import type { DegreePrograms } from "../model/degree";
import degreeProgrammesJson from "../mockData/degreeProgrammes.json";

const get = (): Promise<DegreePrograms> => {
  // TODO: Add mongoDB Code
  const degreeProgramsFound = degreeProgrammesJson;
  if (!degreeProgramsFound || degreeProgramsFound.length === 0) {
    throw new NotFoundError();
  }
  return Promise.resolve(degreeProgramsFound);
};

export default { get };
