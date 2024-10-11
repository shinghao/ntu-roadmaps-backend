import coursesJson from "../mockData/courses.json";
import type { Course } from "../model/course";
import { NotFoundError } from "../error";

const get = (courseCode: string): Promise<Course> => {
  // TODO: Add mongoDB Code
  const courseFound = coursesJson.find(
    (course) => course.courseCode === courseCode
  );

  if (!courseFound) {
    throw new NotFoundError();
  }

  return new Promise((resolve) => resolve(courseFound));
};

const getCourses = (courseCodes: string[]): Promise<Course[]> => {
  const coursesFound = coursesJson.filter((course) =>
    courseCodes.includes(course.courseCode)
  );

  return new Promise((resolve) => resolve(coursesFound || []));
};

const getAll = (): Promise<Course[]> => {
  return new Promise((resolve) => resolve(coursesJson));
};

export default { get, getCourses, getAll };
