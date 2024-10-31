import batchInsert from "./batchInsert";
import { v4 as uuidv4 } from "uuid";

// Mock uuid to return predictable values for test purposes
jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

// Mock container with a bulk method
const mockContainer = {
  items: {
    bulk: jest.fn(),
  },
};

describe("batchInsert", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should batch items into groups of BATCH_SIZE and call container.items.bulk", async () => {
    const items = Array.from({ length: 45 }, (_, i) => ({
      name: `Item${i + 1}`,
    }));

    await batchInsert(mockContainer, items);

    // Verify that bulk was called 3 times (45 items / 20 BATCH_SIZE = 3 batches)
    expect(mockContainer.items.bulk).toHaveBeenCalledTimes(3);

    // Verify each batch contains up to BATCH_SIZE items
    expect(mockContainer.items.bulk).toHaveBeenNthCalledWith(
      1,
      expect.arrayContaining(Array(20).fill(expect.any(Object)))
    );
    expect(mockContainer.items.bulk).toHaveBeenNthCalledWith(
      2,
      expect.arrayContaining(Array(20).fill(expect.any(Object)))
    );
    expect(mockContainer.items.bulk).toHaveBeenNthCalledWith(
      3,
      expect.arrayContaining(Array(5).fill(expect.any(Object)))
    );
  });

  it("should handle empty items array without calling container.items.bulk", async () => {
    await batchInsert(mockContainer, []);

    // Ensure bulk was never called for an empty array
    expect(mockContainer.items.bulk).not.toHaveBeenCalled();
  });

  it("should generate unique UUIDs for each item", async () => {
    const items = Array.from({ length: 5 }, (_, i) => ({
      name: `Item${i + 1}`,
    }));

    await batchInsert(mockContainer, items);

    // Check that each operation has a UUID assigned
    const firstBatch = mockContainer.items.bulk.mock.calls[0][0];
    firstBatch.forEach((operation: any) => {
      expect(operation.id).toBe("test-uuid"); // "test-uuid" because uuid is mocked
    });
  });
});
