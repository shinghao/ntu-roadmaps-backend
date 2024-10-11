import { HttpRequest, InvocationContext } from "@azure/functions";
import roadmapRepository from "../../repository/roadmapRepository";
import handler from "../handler";

// TODO: return type should be Roadmap[]
const getAllRoadmaps = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<object[]> => {
  return await roadmapRepository.getAll();
};

export default handler(getAllRoadmaps);