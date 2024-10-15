import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { BadRequestError } from "../../error";
import degreeRepository from "../../repository/degreeRepository";

interface DeleteRequestBody {
  id: string;
}

const deleteDegree = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const id = body?.id;

  if (!id) {
    throw new BadRequestError("Missing id");
  }
  return await degreeRepository.deleteOne(id);
};

export default handler(deleteDegree);
