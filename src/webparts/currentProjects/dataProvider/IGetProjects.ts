import { IProject } from "../components/IProject";

export interface IGetProjects{
    getProjects(filter:string): Promise<IProject[]>;
}