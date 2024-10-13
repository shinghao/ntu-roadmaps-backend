import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import importFromJson from "../../utils/importFromJson";
import { careerSchema } from "../../schemas/career";
import careerRepository from "../../repository/careerRepository";

const importCareersFromJson = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const validatedData = await importFromJson(request, careerSchema);
  await careerRepository.insertMany(validatedData);
  return true;
};

export default handler(importCareersFromJson);
