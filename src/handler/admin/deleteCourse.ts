import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { BadRequestError } from "../../error";
import courseRepository from "../../repository/courseRepository";

interface DeleteRequestBody {
  id: string;
}

const deleteCourse = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const id = body?.id;

  if (!id) {
    throw new BadRequestError("Missing id");
  }
  return await courseRepository.deleteOne(id);
};

export default handler(deleteCourse);
