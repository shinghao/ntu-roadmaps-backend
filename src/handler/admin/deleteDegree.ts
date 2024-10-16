import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { BadRequestError } from "../../error";
import degreeRepository from "../../repository/degreeRepository";

interface DeleteRequestBody {
  id: string;
  degreeName: string;
}

const deleteDegree = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const { id, degreeName } = body;

  if (!id || !degreeName) {
    throw new BadRequestError();
  }
  return await degreeRepository.deleteOne(id, degreeName);
};

export default handler(deleteDegree);
