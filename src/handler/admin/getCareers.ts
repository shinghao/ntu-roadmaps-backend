import { HttpRequest, InvocationContext } from "@azure/functions";
import careerRepository from "../../repository/careerRepository";
import handler from "../handler";
import { Career } from "../../types/career";

const getCareers = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<Career[]> => {
  return await careerRepository.getAll();
};

export default handler(getCareers);
