import { HttpRequest, InvocationContext } from "@azure/functions";
import roadmapRepository from "../../repository/roadmapRepository";
import courseRepository from "../../repository/courseRepository";
import handler from "../handler";
import { GetRoadmapResponse } from "../../types/roadmap";

const getRoadmap = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<object> => {
  const degree = request.params.degree;
  const cohort = request.params.cohort;
  const type = request.params.type;

  const roadmapFound = await roadmapRepository.get(degree, cohort, type);

  const courseCodes = roadmapFound?.coursesByYearSemester?.flatMap(
    ({ courses }) => courses
  );
  const courses =
    courseCodes && courseCodes.length > 0
      ? await courseRepository.getCourses(courseCodes)
      : [];

  const result = {
    ...roadmapFound,
    coursesByYearSemester: roadmapFound?.coursesByYearSemester.map(
      (coursesByYearSemester) => ({
        ...coursesByYearSemester,
        courses: coursesByYearSemester.courses.map((courseCode) => ({
          courseCode,
          prerequisites:
            courses.find((course) => course.courseCode === courseCode)
              ?.prerequisites || [],
        })),
      })
    ),
  };

  return result;
};

export default handler(getRoadmap);
