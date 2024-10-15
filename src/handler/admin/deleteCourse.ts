import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { BadRequestError } from "../../error";
import courseRepository from "../../repository/courseRepository";

interface DeleteRequestBody {
  courseCode: string;
}

const deleteCourse = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const courseCode = body?.courseCode;

  if (!courseCode) {
    throw new BadRequestError("Missing id");
  }
  return await courseRepository.deleteOne(courseCode);
};

export default handler(deleteCourse);
