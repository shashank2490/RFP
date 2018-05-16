import { IProject } from "../IProject";
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface ICurrentProjectsProps {
  projects:IProject[];
  context:IWebPartContext;
}
