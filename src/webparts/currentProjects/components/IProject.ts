import IPeople, { IPeopleSimple }  from "./IPeople";
export interface IProject{
    ID?:number;
    Title?: string;
    BusinessUnit?: string;
    DueDate?: Date;
    RequestType?: string;
    Status?:string;
    Client?: string;
    Priority?: string;
    PercentageComplete?:number;
    TotalContractValue?:string;
    CoreTeam?:IPeopleSimple[];
    Contributors?:IPeopleSimple[];
    ReasonForStatus?:string;
    WinStrategy?:string;
    KeyActionsOrNextSteps?:string;
    CompanyLogo?:LogoUrl;
}

export interface IProjectUsers {
    CoreTeam?:IPeopleSimple[];
    Contributors?:IPeopleSimple[];
}

export interface LogoUrl{
    Description?:string;
    Url:string;
}