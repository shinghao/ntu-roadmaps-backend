import { HttpRequest, InvocationContext } from "@azure/functions";
import careerRepository from "../../repository/careerRepository";
import handler from "../handler";
import { BadRequestError } from "../../error";

interface DeleteRequestBody {
  id: string;
}

const deleteCareer = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<boolean> => {
  const body: DeleteRequestBody = (await request.json()) as DeleteRequestBody;
  const id = body?.id;

  if (!id) {
    throw new BadRequestError("Missing id");
  }
  return await careerRepository.deleteOne(id);
};

export default handler(deleteCareer);
