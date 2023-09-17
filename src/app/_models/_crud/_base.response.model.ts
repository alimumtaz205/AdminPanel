export class BaseResponseModel {
	code: string;
	isSuccess : boolean; // Admin
	message: string;

	data: any;
}

export class GetUserTypeResponse {
	code: string;
	isSuccess : boolean; // Admin
	message: string;
	channelId:number;
	data: any;
}
