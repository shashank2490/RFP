import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CurrentProjectsWebPartStrings';
import CurrentProjects from './components/CurrentProjects';
import { ICurrentProjectsProps } from './components/ICurrentProjectsProps';
import { IProject } from './components/IProject';

export interface ICurrentProjectsWebPartProps {
  description: string;
}

export default class CurrentProjectsWebPart extends BaseClientSideWebPart<ICurrentProjectsWebPartProps> {

  public render(): void {

    const project:IProject = {
      Title: "Digital Transformation Partner",
      BusinessUnit: "Sigma",
      DueDate: new Date(2018,3,22),
      Client: "Coca Cola",
      RequestType: "General Proposal",
      Status:"Key: 1"      
    } 
    
    const element: React.ReactElement<ICurrentProjectsProps > = React.createElement(
      CurrentProjects,
      {
        description: this.properties.description,
        project
      }
    );

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
