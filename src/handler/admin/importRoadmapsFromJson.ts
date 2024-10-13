import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import importFromJson from "../../utils/importFromJson";
import roadmapRepository from "../../repository/roadmapRepository";
import { roadmapSchema } from "../../schemas/roadmap";

const importRoadmapsFromJson = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const validatedData = await importFromJson(request, roadmapSchema);
  await roadmapRepository.insertMany(validatedData);
  return true;
};

export default handler(importRoadmapsFromJson);
