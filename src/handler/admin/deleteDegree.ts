import { HttpRequest, InvocationContext } from "@azure/functions";
import handler from "../handler";
import { BadRequestError } from "../../error";
import degreeRepository from "../../repository/degreeRepository";

interface DeleteRequestBody {
  id: string;
  degree: string;
}

const deleteDegree = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const { id, degree } = body;

  if (!id || !degree) {
    throw new BadRequestError();
  }
  return await degreeRepository.deleteOne(id, degree);
};

export default handler(deleteDegree);
