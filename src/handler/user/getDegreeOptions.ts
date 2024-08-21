import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";

export async function getDegreeOptions(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  return { body: `Degree Options are here!` };
}
