import { HttpRequest, InvocationContext } from "@azure/functions";
import careersJson from "../../mockData/careers.json";
import getCareersByDegree from "./getCareersByDegree";

test("valid degree should return career options", async () => {
  const degree = "Computer Science";
  const careerFound = careersJson.filter((career) =>
    career.degrees.includes(degree)
  );
  const request = { params: { degree } } as unknown as HttpRequest;
  const context = {} as unknown as InvocationContext;
  const result = await getCareersByDegree(request, context);

  expect(result).toStrictEqual({ body: JSON.stringify(careerFound) });
});
