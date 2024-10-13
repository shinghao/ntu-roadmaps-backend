import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { courseSchema } from "../../schemas/course";
import importFromJson from "../../utils/importFromJson";
import courseRepository from "../../repository/courseRepository";

const importCoursesFromJson = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<any> => {
  const validatedData = await importFromJson(request, courseSchema);
  await courseRepository.insertMany(validatedData);
  return true;
};

export default handler(importCoursesFromJson);
