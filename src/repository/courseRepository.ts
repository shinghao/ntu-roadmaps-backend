import type { Course } from "../schemas/course";
import { NotFoundError } from "../error";
import { coursesContainer } from "./cosmosClient";
import { v4 as uuidv4 } from "uuid";
import { OperationInput } from "@azure/cosmos";

const get = async (courseCode: string): Promise<Course> => {
  const { resources: coursesFound } = await coursesContainer.items
    .query({
      query: `SELECT * FROM c WHERE c.courseCode = @courseCode`,
      parameters: [{ name: "@courseCode", value: courseCode }],
    })
    .fetchAll();

  if (!coursesFound || coursesFound.length === 0) {
    throw new NotFoundError();
  }

  return coursesFound[0];
};

const getCourses = async (courseCodes: string[]): Promise<Course[]> => {
  const { resources: coursesFound } = await coursesContainer.items
    .query({
      query: `SELECT * FROM c WHERE c.courseCode IN (@courseCodes)`,
      parameters: [{ name: "@courseCodes", value: courseCodes }],
    })
    .fetchAll();

  return coursesFound || [];
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

const deleteOne = async (courseCode: string): Promise<boolean> => {
  try {
    const query = {
      query: "SELECT * FROM c WHERE c.courseCode = @courseCode",
      parameters: [{ name: "@courseCode", value: courseCode }],
    };
    const { resources: courses } = await coursesContainer.items
      .query(query)
      .fetchAll();

    if (!courses || courses.length === 0) {
      throw new Error();
    }

    const courseToDelete = courses[0];
    const { id } = courseToDelete;

    await coursesContainer.item(id, courseCode).delete();
    return true;
  } catch (err) {
    throw new NotFoundError(`Course ${courseCode} not found`);
  }
};

export default { get, getCourses, getAll, insertMany, deleteOne };
