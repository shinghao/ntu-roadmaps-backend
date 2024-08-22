import { NotFoundError } from "../error";
import type { Career } from "../model/career";
import careersJson from "../mockData/careers.json";

const get = async (degree: string): Promise<Career[]> => {
  // TODO: Add mongoDB code
  const careersFound = careersJson.filter((career) =>
    career.degrees.includes(degree)
  );
  if (!careersFound || careersFound.length === 0) {
    throw new NotFoundError();
  }
  return Promise.resolve(careersFound || []);
};

export default { get };
