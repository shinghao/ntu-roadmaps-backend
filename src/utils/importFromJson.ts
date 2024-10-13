import { HttpRequest } from "@azure/functions";
import { BadRequestError } from "../error";
import { z } from "zod";

const importFromJson = async (request: HttpRequest, schema: z.ZodSchema) => {
  try {
    const jsonData = await request.json();
    const validatedData = schema.array().parse(jsonData);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(
        `Invalid JSON format: ${error.errors.map((err) => err.message).join(", ")}`
      );
    }
    throw new BadRequestError(
      `Error processing JSON: ${error instanceof Error ? error.message : "Unable to parse JSON"}`
    );
  }
};

export default importFromJson;
