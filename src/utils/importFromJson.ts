import { HttpRequest } from "@azure/functions";
import { Readable } from "stream";
import { z } from "zod";
import { BadRequestError } from "../error";

/*
 * Utility function to handle file uploads and JSON parsing
 */
const importFromJson = async <T>(
  request: HttpRequest,
  schema: z.ZodSchema<T>
): Promise<T[]> => {
  // Convert the incoming stream to a buffer
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    if (!request.body) {
      throw new BadRequestError("No file uploaded");
    }
    const readableStream = Readable.from(request.body);
    readableStream.on("data", (chunk) => chunks.push(chunk));
    readableStream.on("end", () => resolve(Buffer.concat(chunks)));
    readableStream.on("error", (err) => reject(err));
  });

  try {
    const jsonData = JSON.parse(buffer.toString());
    const validatedData = schema.array().parse(jsonData);

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(
        `Invalid schema: ${error.errors.map((err) => err.message).join(", ")}`
      );
    }
    throw new BadRequestError(
      `Error processing JSON: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export { importFromJson };
