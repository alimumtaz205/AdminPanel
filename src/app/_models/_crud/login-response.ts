import { Activity } from "../Activity";

export class LoginResponse {
	userId: string;
	//userTypeID: number;
	isResetPassord: boolean;
	//emailAddress: string;
	//msisdn: string;
	isOTPRequired: number;
	//userName : string;
	userCode: string;
	token: string;
	tokenExpirayTime: string;
	responseCode: number;
	isSuccessful: boolean;
	message: string;
	data: any;
	menuBar: any[];
	sessionID: string;
	channelID: number;
	userActivities: Activity[];
	franchiseVendorFlow?: any;
	isOTPValidated: boolean;


}
