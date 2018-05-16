import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CurrentProjectsWebPartStrings';
import CurrentProjects from './components/ProjectCardBoard/CurrentProjects';
import { ICurrentProjectsProps } from './components/ProjectCardBoard/ICurrentProjectsProps';
import { IProject } from './components/IProject';

import { IGetProjects } from "./dataProvider/IGetProjects";
import { GetProjects } from "./dataProvider/GetProjects";
import { IAppState } from './components/App/IAppState';
import { IAppProps } from './components/App/IAppProps';
import App from './components/App/App';


export interface ICurrentProjectsWebPartProps {
  description: string;
}

export default class CurrentProjectsWebPart extends BaseClientSideWebPart<ICurrentProjectsWebPartProps> {
  
  private projects:IProject[];

  public onInit(): Promise<void> {

    const iGetProjects = new GetProjects(this.context);

    return super.onInit().then(_ => {
      
      iGetProjects.getProjects("All").then((response):void =>{
        //debugger;
        this.projects = response;
        this.render();
      });

    });
    
  }

  public render(): void {
    const props:IAppProps = {
      allProjects: this.projects,
      projects: this.projects,
      priority: "All",
      PriorityMaster: ["All","Low","Moderate","High"],
      context:this.context 
    };

    const element: React.ReactElement<IAppProps> = React.createElement(
      App,
      {
        ...props
      }
    );

    (document.querySelector(".CanvasZone") as any).style.maxWidth="inherit";
    (document.querySelector("div[class^='pageHeader']") as any).style.height = "0";
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
