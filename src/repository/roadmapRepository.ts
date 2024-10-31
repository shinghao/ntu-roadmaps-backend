import { NotFoundError } from "../error";
import { roadmapsContainer } from "./cosmosClient";
import { Roadmap } from "../types/roadmap";
import batchInsert from "./batchInsert";

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
  const queryOptions = {
    maxItemCount: 100,
  };
  const { resources: roadmaps } = await roadmapsContainer.items
    .query("SELECT * FROM c", queryOptions)
    .fetchAll();

  return roadmaps;
};

const insertMany = async (roadmaps: Roadmap[]): Promise<void> => {
  await batchInsert(roadmapsContainer, roadmaps);
};

const deleteOne = async (id: string): Promise<boolean> => {
  try {
    await roadmapsContainer.item(id, id).delete();
    return true;
  } catch (err) {
    throw new NotFoundError(`Roadmap ${id} not found`);
  }
};

export default { get, getAll, insertMany, deleteOne };
