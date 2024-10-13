import { NotFoundError } from "../error";
import roadmapJson from "../mockData/roadmapdata.json";
import { Course } from "../schemas/course";

const get = async (degree: string, cohort: string, degreeType: string) => {
  // TODO: Add mongoDB Code

  const roadmap = roadmapJson.find(
    (roadmap) =>
      roadmap.degree === degree &&
      roadmap.cohort === cohort &&
      roadmap.type === degreeType
  );
  if (!roadmap) {
    throw new NotFoundError();
  }
  return Promise.resolve(roadmap);
};

const getAll = async () => {
  return Promise.resolve(roadmapJson);
};

const insertMany = async (courses: Course[]) => {
  return Promise.resolve(courses);
};

export default { get, getAll, insertMany };
