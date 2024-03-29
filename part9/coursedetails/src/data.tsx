export const courseName = "Half Stack application development";
//type definitions
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
interface CourseNormalSubmission extends CoursePartBase  {
    description: string;
}

interface CourseNormalPart extends CourseNormalSubmission {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseNormalSubmission {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseNormalSubmission {
    type: "special",
    requirements: Array<string>

}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

//data for courses
export const courseParts: Array<CoursePart> = [
{
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal"
},
{
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part",
    type: "normal"
},
{
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
},
{
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
},
{
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]