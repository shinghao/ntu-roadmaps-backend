import { HttpRequest, InvocationContext } from "@azure/functions";
import roadmapJson from "../../mockData/roadmapdata.json";
import coursesJson from "../../mockData/courses.json";
import getRoadmap from "./getRoadmap";

test("roadmap found should return roadmap", async () => {
  const degree = "Computer Science";
  const cohort = "2021";
  const type = "Normal";

  const getPrerequisites = (courseCode: string): string[][] => {
    const course = coursesJson.find((c) => c.courseCode === courseCode);
    return course ? course.prerequisites : [];
  };

  const roadmap = roadmapJson.find(
    (roadmap) =>
      roadmap.degree === degree &&
      roadmap.cohort === cohort &&
      roadmap.type === type
  );

  const roadmapFound = {
    ...roadmap,
    coursesByYearSemester: roadmap?.coursesByYearSemester.map(
      (coursesByYearSemester) => {
        return {
          ...coursesByYearSemester,
          courses: coursesByYearSemester.courses.map((courseCode) => ({
            courseCode,
            prerequisites: getPrerequisites(courseCode),
          })),
        };
      }
    ),
  };

  const request = {
    params: { degree, cohort, type },
  } as unknown as HttpRequest;
  const context = {} as unknown as InvocationContext;
  const result = await getRoadmap(request, context);

  expect(result).toStrictEqual({ body: JSON.stringify(roadmapFound) });
});
