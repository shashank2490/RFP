import { IProject } from '../IProject';

export default interface IPopUpPanelProps{
    project:IProject;
    showPanel: boolean;
    onDismiss?:() => void;
}