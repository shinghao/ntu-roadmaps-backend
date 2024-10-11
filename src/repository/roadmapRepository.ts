import { NotFoundError } from "../error";
import roadmapJson from "../mockData/roadmapdata.json";

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

export default { get, getAll };
