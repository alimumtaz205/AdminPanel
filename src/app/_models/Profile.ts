

export class Profile {
    profileID: number;
    profileName: string;
    profileDescription: string;
    activitiesList: string;
    channel: number;

    activitiesListAdd: string;
    activitiesListDelete: string;
    //used in create user form to check if user have selected profile
    isSelected: boolean;
    userInfo: any;
    //userInfo: UserInfoModel;
}

