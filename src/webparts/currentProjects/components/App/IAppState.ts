import { IProject } from "../IProject";
export interface IAppState {
  PriorityMaster: string[];
  priority:string;
  allProjects:IProject[];
  projects:IProject[];
}
