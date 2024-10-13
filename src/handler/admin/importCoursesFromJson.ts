import { HttpRequest, InvocationContext } from "@azure/functions";
import roadmapRepository from "../../repository/roadmapRepository";
import handler from "../handler";
import { courseSchema } from "../../schemas/course";
import { importFromJson } from "../../utils/importFromJson";

const importJsonCourses = async (
  request: HttpRequest,
  context: InvocationContext
) => {
  const validatedData = await importFromJson(request, courseSchema);
  return await roadmapRepository.insertMany(validatedData);
};

export default handler(importJsonCourses);
