import { IProject } from "../IProject";
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IAppProps {
  PriorityMaster: string[];
  priority:string;
  allProjects:IProject[];
  projects:IProject[];
  context:IWebPartContext;
}
