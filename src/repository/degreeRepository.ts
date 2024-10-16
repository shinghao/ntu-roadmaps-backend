import { NotFoundError } from "../error";
import type { DegreeProgram, DegreePrograms } from "../types/degree";
import { degreesContainer } from "./cosmosClient";
import { OperationInput } from "@azure/cosmos";
import { v4 as uuidv4 } from "uuid";

const getAll = async (): Promise<DegreePrograms> => {
  const { resources: degreeProgramsFound } = await degreesContainer.items
    .query("SELECT * FROM c")
    .fetchAll();

  if (!degreeProgramsFound || degreeProgramsFound.length === 0) {
    throw new NotFoundError();
  }
  return degreeProgramsFound;
};

const insertMany = async (courses: DegreeProgram[]): Promise<void> => {
  const operations: OperationInput[] = courses.map((course) => ({
    operationType: "Create",
    resourceBody: {
      ...course,
    },
    id: uuidv4(),
  }));
  await degreesContainer.items.bulk(operations);
};

const deleteOne = async (id: string, degreeName: string): Promise<boolean> => {
  try {
    await degreesContainer.item(id, degreeName).delete();
    return true;
  } catch (err) {
    throw new NotFoundError(`Degree ${id} not found`);
  }
};

export default { getAll, insertMany, deleteOne };
