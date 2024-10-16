import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { BadRequestError } from "../../error";
import roadmapRepository from "../../repository/roadmapRepository";

interface DeleteRequestBody {
  id: string;
}

const deleteRoadmap = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const id = body?.id;

  if (!id) {
    throw new BadRequestError();
  }
  return await roadmapRepository.deleteOne(id);
};

export default handler(deleteRoadmap);
