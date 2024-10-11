import { HttpRequest, InvocationContext } from "@azure/functions";
import careerRepository from "../../repository/careerRepository";
import handler from "../handler";
import { Career } from "../../model/career";

const getCareersByDegree = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<Career[]> => {
  const degree = request.params.degree;
  return await careerRepository.get(degree);
};

export default handler(getCareersByDegree);
