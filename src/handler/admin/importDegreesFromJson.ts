import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { importFromJson } from "../../utils/importFromJson";
import { degreeSchema } from "../../schemas/degree";
import degreeRepository from "../../repository/degreeRepository";

const importDegreesFromJson = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const validatedData = await importFromJson(request, degreeSchema);
  await degreeRepository.insertMany(validatedData);
  return true;
};

export default handler(importDegreesFromJson);
