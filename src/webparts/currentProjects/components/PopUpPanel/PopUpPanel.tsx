import * as React from 'react';

import {
    Panel,
    PanelType,
    Image,
    Persona,
    IPersonaProps,
    PersonaSize,
    IPersonaStyles,
    IPersonaStyleProps
} from 'office-ui-fabric-react';


import styles from '../ProjectCardBoard/CurrentProjects.module.scss';
import IPopUpPanelProps from './IPopUpPanelProps';
import { escape, } from '@microsoft/sp-lodash-subset';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from "../../../../common/TestImages";
import { IProject } from '../IProject';

const img = require('../../../../images/avatar-kat.png');

class PopUpPanel extends React.Component<IPopUpPanelProps, {}> {

    private getStyle = (styleProps: IPersonaStyleProps):Partial<IPersonaStyles> => {
        const iPersonaStyles: Partial<IPersonaStyles> = {
            root:{
                marginBottom:"5px"
            },
            primaryText: {
                fontSize: "12px",
                fontWeight: "bold"
            },
            secondaryText: {
                fontSize: "10px",
            },
            tertiaryText: {
                fontSize: "10px",
                color:"#a6a6a6"
            }
        };

        return iPersonaStyles;
    }

    public render(): JSX.Element {

        if (!this.props.project || !this.props.showPanel)
            return null;
        
        const project = this.props.project;

        let coreTeam: JSX.Element[];
        if (project.CoreTeam) {
            coreTeam = project.CoreTeam.map((member) => {
                const personaProps = {
                    imageUrl: member.PictureURL ? member.PictureURL : "",
                    imageInitials: member.PreferredName.split(" ").reduce((prevVal, currentVal, index) => {
                        return prevVal += currentVal.charAt(0);
                    }, ""),
                    primaryText: member.PreferredName,
                    secondaryText: member.SPSJobTitle,
                    tertiaryText: member.WorkEmail,
                    optionalText: member.WorkPhone,
                    size: PersonaSize.size72
                };

                return (<div className="ms-Grid-col ms-md4 ms-lg4 ms-xl4">
                    <Persona key={member.WorkEmail} {...personaProps} getStyles={this.getStyle} />
                </div>);
            });
        }

        let contributors: JSX.Element[];
        if (project.CoreTeam) {
            contributors = project.Contributors.map((member) => {
                const personaProps = {
                    imageUrl: member.PictureURL ? member.PictureURL : "",
                    imageInitials: member.PreferredName.split(" ").reduce((prevVal, currentVal, index) => {
                        return prevVal += currentVal.charAt(0);
                    }, ""),
                    primaryText: member.PreferredName,
                    secondaryText: member.SPSJobTitle,
                    tertiaryText: member.WorkEmail,
                    optionalText: member.WorkPhone,
                    size: PersonaSize.size72
                };

                return (<div className="ms-Grid-col ms-md4 ms-lg4 ms-xl4">
                    <Persona key={member.WorkEmail} {...personaProps} getStyles={this.getStyle} />
                </div>);
            });
        }


        return (<Panel
            isOpen={this.props.showPanel}
            type={PanelType.smallFluid}
            onDismiss={this.props.onDismiss}>
            <div className={styles.ProjectDetailsPanel + " ms-Grid"}>
                <div className="ms-Grid-row">
                    {/* <div className="ms-Grid-col ms-md3 ms-lg2 ms-xl2 ms-xxl2 ms-xxxl1"> */}
                    <div className="ms-Grid-col">
                        <Image src={project.CompanyLogo.Url}
                            imageFit={ImageFit.cover}
                            className={styles.ProjectIconDP}
                            alt='Some Alt' />
                    </div>

                    <div className="ms-Grid-col ms-md6 ms-lg7 ms-xl7 ms-xxl8 ms-xxxl8">
                        <p className={styles.lowMarginPara + " ms-fontSize-s ms-fontWeight-semibold"}>{project.Client}</p>
                        <p className={styles.lowMarginPara + " ms-fontSize-mi"}>{project.Title} <span className="ms-fontSize-s">  |  </span>  {project.BusinessUnit}  <span className="ms-fontSize-s">  |  </span>{project.RequestType}</p>
                    </div>

                    <div className="ms-Grid-col ms-md3 ms-lg2 ms-xl3 ms-xxl2 ms-xxxl2 ms-mdPush1">
                        <p className={styles.rightAlignPara}>Total Contract Value</p>
                        <p className={styles.rightAlignPara}><strong>{project.TotalContractValue}</strong></p>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12">
                        <h3>{"Bid Team".toUpperCase()}</h3>
                        <div className={styles.lineSeperator}></div>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md12 ms-lg12 ms-xl12">
                        <div className={styles.peopleHeaderDiv}>
                            <h3 className={styles.peopleHeading}>{"Core Team".toUpperCase()}</h3>
                        </div>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    {coreTeam}
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md12 ms-lg12 ms-xl12">
                        <div className={styles.peopleHeaderDiv}>
                            <h3 className={styles.peopleHeading}>{"Contributors".toUpperCase()}</h3>
                        </div>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    {contributors}
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12">
                        <h3>{"Reason For Status".toUpperCase()}</h3>
                        <div className={styles.lineSeperator}></div>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12"
                        dangerouslySetInnerHTML={{ __html: project.ReasonForStatus }} />
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12">
                        <h3>{"Win Strategy".toUpperCase()}</h3>
                        <div className={styles.lineSeperator}></div>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12"
                        dangerouslySetInnerHTML={{ __html: project.WinStrategy }} />
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12">
                        <h3>{"Key Actions".toUpperCase()}</h3>
                        <div className={styles.lineSeperator}></div>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12"
                        dangerouslySetInnerHTML={{ __html: project.KeyActionsOrNextSteps }} />
                </div>

            </div>

        </Panel>);
    }

}

export default PopUpPanel;
