import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";

export async function getRoadmap(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const degree = request.params.degree;
  const cohort = request.params.cohort;
  const type = request.params.type;

  return {
    body: `Get Roadmap, degree: ${degree}, cohort: ${cohort}, type: ${type}`,
  };
}
