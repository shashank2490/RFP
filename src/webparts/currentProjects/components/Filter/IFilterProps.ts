import { IProject } from "../IProject";
import {PanelPosition} from '../Panel/Panel';

export interface IFilterProps {
    PriorityMaster?:string[];
    priority?:string;
    panelPosition?: PanelPosition;
    filterProjectsBasedOnPriority?: (filter: string) => void;
    filterProjectsBasedOnMultiParams?: (filterObj: IProject) => void;
}
