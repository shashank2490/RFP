import * as React from 'react';

import styles from './Filter.module.scss';
import { IFilterProps } from './IFilterProps';
import { IFilterState } from './IFilterState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, IDropdownOption,
     ChoiceGroup,
     Button, ButtonType, PrimaryButton, DefaultButton,
     Panel as OPanel, PanelType } from 'office-ui-fabric-react';
// import Panel from '../Panel/Panel';
// import { PanelPosition } from '../Panel/Panel';

export default class Filter extends React.Component<IFilterProps, IFilterState> {
    private statusDropDown: Dropdown;

    constructor(props) {
        super(props);
        this.state = {};
        //this.Status = React.PureComponent()
        //this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(priority: string): void {
        console.log(event);
        this.props.filterProjectsBasedOnPriority(priority);
    }

    private onPanelClosed() {
        this.setState({
            isOpen: false
        });
    }

    private onButtonClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private onChange(option: IDropdownOption, index?: number){
        this.setState({
            Status: option.key as string
        });
    }

    public render(): JSX.Element {

        const priorityElementList: JSX.Element[] = this.props.PriorityMaster.map((priority, index) => {

            return (
                <li onClick={this.handleClick.bind(this, priority)}
                    className={this.props.priority == priority ? styles.liActive : ""}
                    key={priority}>
                    <div>{priority.toUpperCase()}</div>
                </li>
            );
        });

        // const panelPosition = !this.props.panelPosition && this.props.panelPosition !== 0 
        //     ? PanelPosition.Right : this.props.panelPosition;

        return (
            <div className={styles.filterBar}>
                <div className={styles.filterPriorityListDiv}>
                    <ul className={styles.filterPriorityList}>{priorityElementList}</ul>
                </div>
                <div className={styles.advanceFilterDiv}>
                    <DefaultButton text={"Advance Filters".toUpperCase()}
                        onClick={this.onButtonClick.bind(this)}
                        buttonType={ButtonType.default}
                        className={styles.button} />

                    {/* <Panel isOpen={this.state.isOpen} 
                            position={panelPosition} onDismiss={this.onPanelClosed.bind(this)}>
                        <span>Child content of the panel</span>
                    </Panel> */}
                    <OPanel
                        isOpen={this.state.isOpen}
                        type={PanelType.smallFixedFar}
                        onDismiss={this.onPanelClosed.bind(this)}
                        headerText='Panel - Small, right-aligned, fixed, with footer'
                        closeButtonAriaLabel='Close'
                        onRenderFooterContent={this._onRenderFooterContent}
                    >
                        <Dropdown
                            ref={(input) => { this.statusDropDown = input; }}
                            placeHolder='Select an Option'
                            label='Select Status:'
                            id='Status'
                            ariaLabel='Select Status'
                            options={
                                [
                                    { key: 'A', text: 'Option a' },
                                    { key: 'B', text: 'Option b' },
                                    { key: 'C', text: 'Option c' },
                                    { key: 'D', text: 'Option d' },
                                    { key: 'E', text: 'Option e' },
                                ]
                            }
                            errorMessage=''
                            onChanged={this.onChange.bind(this)}
                        />
                        
                    </OPanel>
                </div>
            </div>
        );
    }

    private _onRenderFooterContent = (): JSX.Element => {
        return (
            <div>
                <PrimaryButton
                    onClick={this._onClosePanel}
                    style={{ 'marginRight': '8px' }}
                >
                    Save
            </PrimaryButton>
                <DefaultButton
                    onClick={this._onClosePanel}
                >
                    Cancel
            </DefaultButton>
            </div>
        );
    }

    private _onShowPanel = (): void => {
        this.setState({ isOpen: true });
    }

    private _onClosePanel = (): void => {
        this.setState({ isOpen: false });
    }
}
