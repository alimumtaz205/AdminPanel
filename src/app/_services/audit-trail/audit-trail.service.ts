import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuditTrailModel } from 'src/app/_models/audit-trail/audit-trail-request.model';
import { AE } from 'src/app/_models/enums/audit.enum';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuditTrailService {

	auditTrailModel: AuditTrailModel;
	constructor(private http: HttpClient) { }


	create(page: string, action: string, actionType: string, isSuccess: boolean) {
		this.auditTrailModel = new AuditTrailModel();
		this.auditTrailModel.page = page;
		this.auditTrailModel.action = action;
		this.auditTrailModel.status = isSuccess ? AE.Success : AE.Fail;
		//this.auditTrailModel.actionDetails = this.getActionDetails(actionType, isSuccess);
		this.auditTrailModel.ip = '';

		// var userInfo = this.httpUtils.getUserInfo();
		// userInfo.activity = 'AuditTrailLoging';
		// this.auditTrailModel.userInfo = userInfo;

		//console.log('logging request');
		//console.log(this.auditTrailModel);


		//return this.http.post(`${environment.apiUrl}/UserManagement/AuditTrailLoging`, this.auditTrailModel,
		//	{ headers: this.httpUtils.getHTTPHeaders() }).subscribe((data) => {
		//		return data;
		//	debugger;
		//	console.log(data);
		//	});

		// return this.http.post(`${environment.API_URL}/UserManagement/AuditTrailLoging`,
		// 	this.auditTrailModel,
		// 	{ headers: this.httpUtils.getHTTPHeaders() })
		// 	.subscribe((data) => {
		// 		//console.log('logging response');
		// 		//console.log(data);
		// 	});
	}

	// getActionDetails(action: string, isSuccess: boolean) {

	// 	if (AE.Create == action) {
	// 		return isSuccess ? AE.Created : AE.NotCreated;
	// 	}
	// 	else if (AE.Get == action) {
	// 		return isSuccess ? AE.Geted : AE.NotGeted;
	// 	}
	// 	else if (AE.Update == action) {
	// 		return isSuccess ? AE.Updated : AE.NotUpdated;
	// 	}
	// 	else if (AE.Delete == action) {
	// 		return isSuccess ? AE.Deleted : AE.NotDeleted;
	// 	}
	// 	else if (AE.Export == action) {
	// 		return isSuccess ? AE.Exported : AE.NotExported;
	// 	}
	// 	else if (AE.Navigate == action) {
	// 		return isSuccess ? AE.Navigated : AE.NotNavigated;
	// 	}

	// }

}
