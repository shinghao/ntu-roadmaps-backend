import { HttpRequest, InvocationContext } from "@azure/functions";
import degreeRepository from "../../repository/degreeRepository";
import handler from "../handler";
import { DegreePrograms } from "../../model/degree";

const getDegreeOptions = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<DegreePrograms> => {
  return await degreeRepository.get();
};

export default handler(getDegreeOptions);
