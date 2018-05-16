import { IGetProjects } from "./IGetProjects";
import { IProject, IProjectUsers } from "../components/IProject";
import IPeople, { IPeopleSimple } from "../components/IPeople";
import pnp, { Web } from "sp-pnp-js";
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class GetProjects implements IGetProjects{

    public constructor(context: IWebPartContext){
        pnp.setup({
            spfxContext: context
          });
    }

    public getProjects(filter:string): Promise<IProject[]>{
        let web:Web = pnp.sp.web;
        let listItems:IProject[];

        const properties = "ID,Title,BusinessUnit,DueDate,RequestType,Status,Client,Priority,PercentageComplete,TotalContractValue,CoreTeam/Name,Contributors/Name,ReasonForStatus,WinStrategy,KeyActionsOrNextSteps,CompanyLogo";
        const expand = "CoreTeam,Contributors";
        switch(filter)
        {
            case "All":
                return web.lists.getByTitle("ProjectRFP").items.select(properties).expand(expand).getAll().then((response:IProject[]):IProject[] =>{
                    return response;
                });

            case "High":
            case "Low":
            case "Medium":
                return web.lists.getByTitle("ProjectRFP").items.filter("Priority eq " + filter).select(properties).expand(expand).getAll().then((response:IProject[]):IProject[] =>{
                    return response;
                });
        }
        
    }

    public getProfileInformation(peoplesCoreTeam:string[],peoplesContributors:string[]): Promise<IProjectUsers>
    {
        let batch = pnp.sp.createBatch();
        let projectUsers:IProjectUsers = {
            CoreTeam:[],
            Contributors:[]
        };

        peoplesCoreTeam.forEach(value=>{
            pnp.sp.profiles.inBatch(batch).getPropertiesFor(value).then((response:IPeople)=>{
                projectUsers.CoreTeam.push({
                    Name: response.AccountName,
                    PictureURL: response.UserProfileProperties.filter(x=>x.Key === "PictureURL")[0].Value as string,
                    WorkEmail: response.UserProfileProperties.filter(x=>x.Key === "WorkEmail")[0].Value as string,
                    PreferredName: response.UserProfileProperties.filter(x=>x.Key === "PreferredName")[0].Value as string,
                    WorkPhone: response.UserProfileProperties.filter(x=>x.Key === "WorkPhone")[0].Value as string,
                    SPSJobTitle: response.UserProfileProperties.filter(x=>x.Key === "SPS-JobTitle")[0].Value as string,
                });
            });
        });

        peoplesContributors.forEach(value=>{
            pnp.sp.profiles.inBatch(batch).getPropertiesFor(value).then((response:IPeople)=>{
                projectUsers.Contributors.push({
                    Name: response.AccountName,
                    PictureURL: response.UserProfileProperties.filter(x=>x.Key === "PictureURL")[0].Value as string,
                    WorkEmail: response.UserProfileProperties.filter(x=>x.Key === "WorkEmail")[0].Value as string,
                    PreferredName: response.UserProfileProperties.filter(x=>x.Key === "PreferredName")[0].Value as string,
                    WorkPhone: response.UserProfileProperties.filter(x=>x.Key === "WorkPhone")[0].Value as string,
                    SPSJobTitle: response.UserProfileProperties.filter(x=>x.Key === "SPS-JobTitle")[0].Value as string,
                });
            });
        });
        
        return batch.execute().then(() => projectUsers);       

    }
}