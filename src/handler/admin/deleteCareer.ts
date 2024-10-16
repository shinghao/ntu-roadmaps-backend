import { HttpRequest, InvocationContext } from "@azure/functions";
import careerRepository from "../../repository/careerRepository";
import handler from "../handler";
import { BadRequestError, InternalServerError } from "../../error";

interface DeleteRequestBody {
  id: string;
  career: string;
}

const deleteCareer = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const { id, career } = body;

  if (!id || !career) {
    throw new BadRequestError();
  }
  return await careerRepository.deleteOne(id, career);
};

export default handler(deleteCareer);
