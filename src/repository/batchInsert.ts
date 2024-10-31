import { v4 as uuidv4 } from "uuid";

const BATCH_SIZE = 20;

interface OperationInput {
  operationType: string;
  resourceBody: Record<string, unknown>;
  id: string;
}

const batchInsert = async (
  container: any,
  items: Record<string, unknown>[]
): Promise<void> => {
  // Map items to operations for cosmosDB
  const operations: OperationInput[] = items.map((item) => ({
    operationType: "Create",
    resourceBody: { ...item },
    id: uuidv4(),
  }));

  // Split operations into batches of BATCH_SIZE
  const batches = Array.from(
    { length: Math.ceil(operations.length / BATCH_SIZE) },
    (_, i) => operations.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE)
  );

  // Execute each batch in parallel
  await Promise.all(batches.map((batch) => container.items.bulk(batch)));
};

export default batchInsert;
