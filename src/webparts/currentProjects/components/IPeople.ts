// export interface UserProfileProperties{
//     SPSJobTitle?:[string,string];
//     WorkEmail?:string;
//     WorkPhone?:string;
//     PreferredName?:string;
// }

export interface KeyValuePair{
    Key:string;
    Value?:any;
    ValueType?:string;
}

export default interface IPeople{
    AccountName?:string;
    Name?:string;
    Email?:string;
    UserProfileProperties?:KeyValuePair[];
    //UserProfileProperties?:UserProfileProperties;
}

export interface IPeopleSimple{
    Name?:string;
    PictureURL?:string;
    SPSJobTitle?:string;
    WorkEmail?:string;
    WorkPhone?:string;
    PreferredName?:string;
}

