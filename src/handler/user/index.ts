import {
  app,
  InvocationContext,
  HttpRequest,
  HttpResponseInit,
  output,
  trigger,
} from "@azure/functions";

// Handler for getting degree options
export async function getDegreeOptions(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Logic to handle the GET request for degree options
  return { body: `Hello, world!` };
}

// Handler for getting career options
export async function getCareerOptions(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Logic to handle the GET request for career options
  return { body: `Hello, world!` };
}

// Handler for getting roadmap
export async function getRoadmap(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Logic to handle the GET request for roadmap
  return { body: `Hello, world!` };
}

// Handler for getting course details
export async function getCourseDetails(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Logic to handle the GET request for course details
  return { body: `Hello, world!` };
}
