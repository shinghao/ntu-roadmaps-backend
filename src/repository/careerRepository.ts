import { NotFoundError } from "../error";
import type { Career } from "../types/career";
import careersJson from "../mockData/careers.json";

const get = async (degree: string): Promise<Career[]> => {
  // TODO:
  const careersFound = careersJson.filter((career) =>
    career.degrees.includes(degree)
  );
  if (!careersFound || careersFound.length === 0) {
    throw new NotFoundError();
  }
  return Promise.resolve(careersFound || []);
};

const getAll = async (): Promise<Career[]> => {
  // TODO:
  return Promise.resolve(careersJson);
};

const insertMany = async () => {
  return Promise.resolve(true);
};

export default { get, getAll, insertMany };
