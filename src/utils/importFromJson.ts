import { HttpRequest } from "@azure/functions";
import { z } from "zod";
import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { BadRequestError } from "../error";

const importFromJson = async <T>(
  request: HttpRequest,
  schema: z.ZodSchema<T>
): Promise<T[]> => {
  const form = new IncomingForm();

  return new Promise<T[]>((resolve, reject) => {
    form.parse(request as any, async (err, fields, files) => {
      if (err) {
        return reject(new BadRequestError("Error parsing form data"));
      }

      const uploadedFile = files?.file?.[0];
      if (!uploadedFile || !uploadedFile.filepath) {
        return reject(new BadRequestError("No valid file uploaded"));
      }

      try {
        const buffer = await fs.readFile(uploadedFile.filepath);
        const jsonData = JSON.parse(buffer.toString());
        const validatedData = schema.array().parse(jsonData);

        resolve(validatedData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reject(
            new BadRequestError(
              `Invalid schema: ${error.errors.map((err) => err.message).join(", ")}`
            )
          );
        } else {
          return reject(
            new BadRequestError(
              `Error processing JSON: ${error instanceof Error ? error.message : "Unknown error"}`
            )
          );
        }
      }
    });
  });
};

export { importFromJson };
