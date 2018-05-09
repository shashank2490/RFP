import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  IDocumentCardActivityProps
} from 'office-ui-fabric-react/lib/DocumentCard';

import styles from './CurrentProjects.module.scss';
import { ICurrentProjectsProps } from './ICurrentProjectsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from "../../../common/TestImages";
import { IProject } from './IProject';

export default class CurrentProjects extends React.Component<ICurrentProjectsProps, {}> {
  public render(): JSX.Element {
    const projects:IProject[] = [
      {
        Title: "Digital Transformation Partner",
        BusinessUnit: "Sigma",
        DueDate: new Date(2018,3,22),
        Client: "Coca Cola",
        RequestType: "General Proposal",
        Status:"Key: 1"      
      },
      {
        Title: "Digital Transformation Partner",
        BusinessUnit: "Sigma",
        DueDate: new Date(2018,3,22),
        Client: "Via Rail",
        RequestType: "General Proposal",
        Status:"Key: 1"      
      } ,
      {
        Title: "Digital Transformation Partner",
        BusinessUnit: "Sigma",
        DueDate: new Date(2018,3,22),
        Client: "DHL",
        RequestType: "General Proposal",
        Status:"Key: 1"      
      }  
    ];

    

    const previewProps: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
        {
          name: 'My Project',
          url: './CreateTraining.aspx',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        
      ],

    };

    const previewPropsUsingIcon: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewIconProps: { iconName: 'OpenFile', styles: { root: { fontSize: 42, color: '#ffffff' } } },
          width: 318,
          height: 196
        }
      ]
    };

    const c = `this is ${projects[0].RequestType} some value`;

    const element:JSX.Element[] = projects.map((project,index) => {
      return <DocumentCard key={index} onClickHref='./CreateTraining.aspx?'>
              <DocumentCardPreview { ...previewProps } />
              <div className='ms-DocumentCard-details'>
              <DocumentCardTitle
                  title={project.Client}
                  shouldTruncate={ false }
                />
                <div className={styles.projectDetails}>
                  <div><span className=''>Title:</span> {project.Title}</div>
                  <div>BU: {project.BusinessUnit}</div>
                  <div>Due Date: {project.DueDate.toLocaleString()}</div>
                </div>
                <hr/>
                <div>
                  <div>{project.RequestType}</div>
                </div>
              </div>
            </DocumentCard>
      });


    return (
      <div className={styles.currentProjects}>
        {element}
      </div>
    );
  }

  private _onClick(): void {
    console.log('You clicked the card.');
  }

}
