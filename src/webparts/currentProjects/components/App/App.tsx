import * as React from 'react';

// import styles from './Filter.module.scss';
import { IAppProps } from './IAppProps';
import { IAppState } from './IAppState';
import * as lodash from '@microsoft/sp-lodash-subset';
import { IProject } from '../IProject';
import Filter  from "../Filter/Filter";
import CurrentProjects from "../ProjectCardBoard/CurrentProjects";
import { IGetProjects } from "../../dataProvider/IGetProjects";
import { GetProjects } from "../../dataProvider/GetProjects";

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props:IAppProps) {
        super(props);
        this.state = {
            PriorityMaster: props.PriorityMaster,
            priority: props.priority,
            allProjects: props.allProjects,
            projects: props.projects,
        };
        this.filterProjectsBasedOnPriority = this.filterProjectsBasedOnPriority.bind(this);
    }
    
    public componentWillReceiveProps(nextProps: IAppProps) {
        const projects = [...nextProps.projects];
        this.setState({
            projects: projects,
            allProjects: projects,
        });
    }  
    
    private filterProjectsBasedOnPriority(priority:string):void{
        const projects = this.state.allProjects.filter(project => priority==="All" ? true: project.Priority==priority);
        this.setState({
            projects:projects,
            priority: priority
        });
    }

    public render(): JSX.Element {
    
    const { projects, allProjects, ...filterProps} = this.state;

    return (
      <div className={""} style={ { width: "100%"} }>
        <Filter {...filterProps} panelPosition={0} filterProjectsBasedOnPriority={this.filterProjectsBasedOnPriority}/>
        <CurrentProjects projects={projects} context={this.props.context}/>
      </div>
    );
  }

}
