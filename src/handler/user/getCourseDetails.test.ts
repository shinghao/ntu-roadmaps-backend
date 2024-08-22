import { HttpRequest, InvocationContext } from "@azure/functions";
import coursesJson from "../../mockData/courses.json";
import getCourseDetails from "./getCourseDetails";

test("valid courseCode should get course details", async () => {
  const courseCode = "SC1004";
  const courseFound = coursesJson.find(
    (course) => course.courseCode === courseCode
  );

  const request = { params: { courseCode } } as unknown as HttpRequest;
  const context = {} as unknown as InvocationContext;
  const result = await getCourseDetails(request, context);
  expect(result).toStrictEqual({ body: JSON.stringify(courseFound) });
});
