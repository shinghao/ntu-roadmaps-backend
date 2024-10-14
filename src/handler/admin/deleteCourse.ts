import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { BadRequestError, NotFoundError } from "../../error";
import roadmapRepository from "../../repository/roadmapRepository";

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

  const result = await roadmapRepository.deleteOne(id);
  if (!result) {
    throw new NotFoundError();
  }
  return true;
};

export default handler(deleteCourse);
