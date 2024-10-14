import { NotFoundError } from "../error";
import { OperationInput } from "@azure/cosmos";
import { v4 as uuidv4 } from "uuid";
import { roadmapsContainer } from "./cosmosClient";
import { Roadmap } from "../types/roadmap";

const get = async (
  degree: string,
  cohort: string,
  degreeType: string
): Promise<Roadmap> => {
  const { resources: roadmaps } = await roadmapsContainer.items
    .query({
      query:
        "SELECT * FROM c WHERE c.degree = @degree AND c.cohort = @cohort AND c.type = @degreeType",
      parameters: [
        { name: "@degree", value: degree },
        { name: "@cohort", value: cohort },
        { name: "@degreeType", value: degreeType },
      ],
    })
    .fetchAll();

  const roadmap = roadmaps[0];
  if (!roadmap) {
    throw new NotFoundError();
  }

  return roadmap;
};

const getAll = async (): Promise<Roadmap[]> => {
  const { resources: roadmaps } = await roadmapsContainer.items
    .query("SELECT * FROM c")
    .fetchAll();

  return roadmaps;
};

const insertMany = async (roadmaps: Roadmap[]): Promise<void> => {
  const operations: OperationInput[] = roadmaps.map((roadmap) => ({
    operationType: "Create",
    resourceBody: {
      ...roadmap,
      id: uuidv4(),
    },
  }));

  await roadmapsContainer.items.bulk(operations);
};

const deleteOne = async (id: string): Promise<boolean> => {
  const { resource: deletedItem } = await roadmapsContainer.item(id).delete();

  if (!deletedItem) {
    return false;
  }
  return true;
};

export default { get, getAll, insertMany, deleteOne };
