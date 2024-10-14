import { NotFoundError } from "../error";
import type { Career } from "../types/career";
import { careersContainer } from "./cosmosClient";
import { OperationInput } from "@azure/cosmos";
import { v4 as uuidv4 } from "uuid";

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
  const { resources: careers } = await careersContainer.items
    .query("SELECT * FROM c")
    .fetchAll();
  return careers;
};

const insertMany = async (careers: Career[]): Promise<void> => {
  const operations: OperationInput[] = careers.map((career) => ({
    operationType: "Create",
    resourceBody: {
      ...career,
    },
    id: uuidv4(),
  }));
  await careersContainer.items.bulk(operations);
};

const deleteOne = async (id: string): Promise<boolean> => {
  const { resource: deletedItem } = await careersContainer.item(id).delete();

  if (!deletedItem) {
    return false;
  }
  return true;
};

export default { get, getAll, insertMany, deleteOne };
