import { v4 as uuidv4 } from "uuid";

const BATCH_SIZE = 20;
const MAX_RETRIES = 3;
const RATE_LIMIT_ERROR_CODE = 429;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Inserts multiple items into a CosmosDB container in batches with rate limiting handling.
 * @param {any} container - The CosmosDB container where items will be inserted.
 * @param {Record<string, unknown>[]} items - The list of items to be inserted.
 * @returns {Promise<void>} - A promise that resolves when all items are inserted.
 */

async function batchInsertWithBackoff(
  container: any,
  items: Record<string, unknown>[]
): Promise<void> {
  const operations = items.map((item) => ({
    operationType: "Create",
    resourceBody: { ...item },
    id: uuidv4(),
  }));

  // Split operations into batches based on the specified BATCH_SIZE
  const batches = Array.from(
    { length: Math.ceil(operations.length / BATCH_SIZE) },
    (_, i) => operations.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE)
  );

  for (const [i, batch] of batches.entries()) {
    let retries = 0;
    let inserted = false;

    // Retry inserting the batch if rate limiting (HTTP 429) is encountered
    while (retries < MAX_RETRIES && !inserted) {
      try {
        // Attempt to insert the current batch
        await container.items.bulk(batch);
        console.log(
          `${container} bulk import - Batch ${i + 1} inserted successfully.`
        );
        inserted = true;
      } catch (error: any) {
        // Check if error is due to rate limiting
        if (error.code === RATE_LIMIT_ERROR_CODE) {
          retries++;
          const delayTime = Math.pow(2, retries) * 100; // Calculate exponential backoff delay
          console.warn(
            `Batch ${i + 1} rate-limited, retrying after ${delayTime}ms...`
          );
          await delay(delayTime); // Wait before retrying
        } else {
          // Log non-rate-limiting errors
          console.error(`Failed to insert batch ${i + 1}: ${error}`);
          break;
        }
      }
    }
  }
}

export default batchInsertWithBackoff;
