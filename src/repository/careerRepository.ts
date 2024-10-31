import { NotFoundError } from "../error";
import type { Career } from "../types/career";
import batchInsert from "./batchInsert";
import { careersContainer } from "./cosmosClient";

const get = async (degree: string): Promise<Career[]> => {
  const { resources: careersFound } = await careersContainer.items
    .query({
      query: `SELECT * FROM c WHERE ARRAY_CONTAINS(c.degrees, @degree)`,
      parameters: [{ name: "@degree", value: degree }],
    })
    .fetchAll();

  if (!careersFound || careersFound.length === 0) {
    throw new NotFoundError();
  }
  return careersFound;
};

const getAll = async (): Promise<Career[]> => {
  const queryOptions = {
    maxItemCount: 100,
  };
  const { resources: careers } = await careersContainer.items
    .query("SELECT * FROM c", queryOptions)
    .fetchAll();
  return careers;
};

const insertMany = async (careers: Career[]): Promise<void> => {
  await batchInsert(careersContainer, careers);
};

const deleteOne = async (id: string, career: string): Promise<boolean> => {
  try {
    await careersContainer.item(id, career).delete();
    return true;
  } catch (err) {
    throw new NotFoundError(`Career ${id} not found`);
  }
};

export default { get, getAll, insertMany, deleteOne };
