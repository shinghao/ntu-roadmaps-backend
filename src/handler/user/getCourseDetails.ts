import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";

export async function getCourseDetails(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const courseCode = request.params.courseCode;
  return {
    body: `Get Course Details for Course ${courseCode}`,
  };
}
