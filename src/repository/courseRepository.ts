import coursesJson from "../mockData/courses.json";
import type { Course } from "../schemas/course";
import { NotFoundError } from "../error";
import { coursesContainer } from "./cosmosClient";
import { v4 as uuidv4 } from "uuid";
import { OperationInput } from "@azure/cosmos";

const get = (courseCode: string): Promise<Course> => {
  // TODO: Connect to azure cosmosDB
  const courseFound = coursesJson.find(
    (course) => course.courseCode === courseCode
  );

  if (!courseFound) {
    throw new NotFoundError();
  }

  return new Promise((resolve) => resolve(courseFound));
};

// TODO: Connect to azure cosmosDB
const getCourses = (courseCodes: string[]): Promise<Course[]> => {
  const coursesFound = coursesJson.filter((course) =>
    courseCodes.includes(course.courseCode)
  );

  return new Promise((resolve) => resolve(coursesFound || []));
};

const getAll = async (): Promise<Course[]> => {
  const { resources: courses } = await coursesContainer.items
    .query("SELECT * FROM c")
    .fetchAll();
  return courses;
};

const insertMany = async (courses: Course[]): Promise<void> => {
  const operations: OperationInput[] = courses.map((course) => ({
    operationType: "Create",
    resourceBody: {
      ...course,
    },
    id: uuidv4(),
  }));
  await coursesContainer.items.bulk(operations);
};

export default { get, getCourses, getAll, insertMany };
