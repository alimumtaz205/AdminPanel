import { UserInfoModel } from "../_userInfo.model";

export class AuditTrailModel {
	page: string; //Module name+page name
	action: string; //Navigate, add, update, delete,export,Read
	status: string; //
	actionDetails: string;
	ip: string;
	userInfo: UserInfoModel;

}
