export class Activity {
    activityID: number;
    activityName: string;
    activityURL: string;
    parentActivityID: number;
    isActivityChecked: boolean;
    isActive: boolean = false;
    isAdmin: boolean = false;
    isReadOnly: boolean = false;
    c: boolean = false;
    r: boolean = false;
    u: boolean = false;
    d: boolean = false;
    e: boolean = false;
    ex: boolean = false;
    createdBy?: number;
    createdDate?: Date;
    updatedBy?: number;
    updatedDate?: Date;
    userName: string = "";
    channelId: number = 0;
    userInfo: any;

    clear() {
        this.activityID = 0;
        this.activityName = '';
        this.activityURL = '';
        this.parentActivityID = 0;
        this.isActive = false;
        this.isAdmin = false;
        this.isReadOnly = false;
        this.c = false;
        this.r = false;
        this.u = false;
        this.d = false;
        this.e = false;
        this.ex = false;
    }
}
