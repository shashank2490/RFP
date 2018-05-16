import * as React from 'react';

import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  IDocumentCardActivityProps,
  Panel,
  PanelType,
  Image,
  Persona,
  IPersonaProps,
  PersonaSize
} from 'office-ui-fabric-react';


import styles from './CurrentProjects.module.scss';
import { ICurrentProjectsProps } from './ICurrentProjectsProps';
import { ICurrentProjectsState } from './ICurrentProjectsState';
import { escape,  } from '@microsoft/sp-lodash-subset';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from "../../../../common/TestImages";
import { IProject } from '../IProject';
import PopUpPanel from "../PopUpPanel/PopUpPanel";
import IPopUpPanelProps from "../PopUpPanel/IPopUpPanelProps";
import { GetProjects } from '../../dataProvider/GetProjects';

const img = require('../../../../images/avatar-kat.png');

export default class CurrentProjects extends React.Component<ICurrentProjectsProps, ICurrentProjectsState> {

  public constructor(props:ICurrentProjectsProps){
    super(props);
    this.state = {
      showPanel:false,
      currentProject: null
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  private onCardClick(id:number, event:React.SyntheticEvent<HTMLElement>):void{
    //console.log("event=>",event.currentTarget);
    //console.log("Id=>",id);
    //debugger;
    const iGetProjects = new GetProjects(this.props.context);
    const project = this.props.projects.filter(proj=>proj.ID===id)[0];
    const peopleCoreTeam = project.CoreTeam ? project.CoreTeam.map(user=>user.Name):[];
    const peopleContributors = project.Contributors ? project.Contributors.map(user=>user.Name):[];
    
    iGetProjects.getProfileInformation(peopleCoreTeam,peopleContributors).then((response)=>{

      project.CoreTeam = response.CoreTeam;
      project.Contributors = response.Contributors;

      this.setState((prevState:ICurrentProjectsState)=>{
        return {
          showPanel: !prevState.showPanel,
          currentProject: project
        };
      });
    });
  }

  private onDismiss():void{
    //debugger;
    this.setState((prevState:ICurrentProjectsState)=> {
      return {
        showPanel: false //!prevState.showPanel
      };
    });
  }

  public render(): JSX.Element {

    const project:IProject = this.state.currentProject;

    const element:JSX.Element[] = this.props.projects === undefined ? []: this.props.projects.map((project,index) => {

      const style = {
        width: String(project.PercentageComplete*100) + "%",
      };

      if(!project.CompanyLogo)
        project.CompanyLogo = {
          Url : TestImages.noImageURL,
          Description: project.Client
        };

      const previewProps: IDocumentCardPreviewProps = {
        previewImages: [
          {
            name: project.Client,
            previewImageSrc: project.CompanyLogo.Url,
            imageFit: ImageFit.contain,
            height: 100
          },
          
        ],
      };

      let dueDate: string = "";

      if(project.DueDate)
      {
        const dueDateObj = new Date(project.DueDate.toString());
        dueDate = dueDateObj.toLocaleDateString('en-gb',{year: '2-digit', month: 'short', day: 'numeric'});
      }
     
      return (
        <div className="ms-Grid-col ms-sm-12 ms-md6 ms-lg6 ms-xl4 ms-xxl4 ms-xxxl4">
            <DocumentCard className={styles.myCard} key={project.ID} onClick={this.onCardClick.bind(this,project.ID)}>
              <div className={styles.priorityDiv + " " + styles[this.getProjectPriorityClassName(project.Priority)]}>
                <DocumentCardPreview { ...previewProps } />
                <div className={styles.projectDetails}>
                  <DocumentCardTitle
                    title={project.Client}
                    shouldTruncate={ false }
                    showAsSecondaryTitle={true}
                  />
                  <div className={styles.detailsDiv + ' ms-fontSize-mi'}><span className='ms-font-mi'>Title:</span> {project.Title}</div>
                  <div className={styles.detailsDiv + ' ms-fontSize-mi'}><span className='ms-font-mi'>BU:</span> {project.BusinessUnit}</div>
                  <div className={styles.detailsDiv + ' ms-fontSize-mi'}><span className='ms-font-mi'>Due Date:</span> {dueDate}</div>

                  <div className={styles.seperatorDiv}>
                    {/* <hr/> */}
                    <div className={styles.progressBarDiv}><div style={style}></div></div>
                    <span>{String(project.PercentageComplete*100)}%</span>
                  </div>
                
                  <div className={styles.detailsDiv + ' ms-fontSize-mi'}>{project.RequestType}</div>
                </div>
              </div>
            </DocumentCard>
            </div>
          );
      });

    const popUpPanelProps:IPopUpPanelProps = {
      project: project,
      showPanel: this.state.showPanel,
      //onDismiss: this.onDismiss
    };
      
    return (
      <div className={styles.currentProjects}>
          <div className="ms-Grid-row">
            {element}
          </div>
        <PopUpPanel {...popUpPanelProps} onDismiss={this.onDismiss}  />
      </div>
    );
  }

  private getProjectPriorityClassName(priority:string): string {
    switch(priority)
    {
      case "Low" :
        return "priorityLow";

      case "Medium" :
      case "Moderate" :
        return "priorityMedium";

      case "High" :
        return "priorityHigh";

      default:
        return "";
    }
  }

  private getProgressBarColor(progress:number): string {
    if(progress <= 30) {
      return "red";
    } else if(progress >30 && progress <=70) {
      return "orange";
    } else if(progress >70) {
      return "green";
    }
  }

}
