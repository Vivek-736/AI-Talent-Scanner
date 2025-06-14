import {
  BriefcaseBusinessIcon,
  CalculatorIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interviews",
    icon: Calendar,
    path: "/scheduled-interviews",
  },
  {
    name: "All Interviews",
    icon: List,
    path: "/all-interviews",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewTypes = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: CalculatorIcon,
  },
];

export const PROMPT = `You are an expert technical interviewer for college club recuritments majorly.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Role Title: {{roleTitle}}}
Role Description: {{roleDescription}}
Interview Duration: {{interviewDuration))
Interview Type: (type}}
Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
Format your response in JSON format with array list of questions.
format: interviewQuestions =[
{
question:"",
type:Technical/Behavioral/Experince/ProbIem Solving/Leadership'
},{
...
}]
The goal is to create a structured, relevant, and time-optimized interview plan for a {OobT1tle}} role.`;

export const FEEDBACK = `{{conversation}}
Based on the above interview conversation between the assistant and the user, provide feedback for the candidate's interview performance.  
Rate the candidate out of 10 for Technical Skills, Communication, Problem Solving, and Experience.  
Provide a concise 3-line summary of the interview, and include a one-line statement indicating whether the candidate is recommended for hire, along with a brief message.  
Return your response in the following JSON format:  
{
  feedback: {
    rating: {
      technicalSkills: '<rate out of 10>',
      communication: '<rate out of 10>',
      problemSolving: '<rate out of 10>',
      experience: '<rate out of 10>'
    },
    summary: "<3-line summary>",
    recommendation: "",
    recommendationMsg: ""
  }
}`;
