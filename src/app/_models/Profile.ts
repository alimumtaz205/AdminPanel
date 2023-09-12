

export class Profile {
    profileID: number | undefined;
    profileName: string | undefined;
    profileDescription: string | undefined;
    activitiesList: string | undefined;
    channel: number | undefined;

    activitiesListAdd: string | undefined;
    activitiesListDelete: string | undefined;
    //used in create user form to check if user have selected profile
    isSelected: boolean | undefined;
    //userInfo: UserInfoModel;
}

