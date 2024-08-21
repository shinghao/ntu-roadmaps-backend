import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";

export async function getCareers(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const degree = request.params.degree;
  return { body: `Get Careers for Degree ${degree}` };
}
