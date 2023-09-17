// Angular
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Activity } from 'src/app/_models/Activity';
import { LoginResponse } from 'src/app/_models/_crud/login-response';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserUtilsService {
	loginResponse: LoginResponse;
	tempLoginResponse: LoginResponse;

	public getUserDetails(): LoginResponse {
		debugger;
		var userMenu = this.getUserMenu();
		if (userMenu != undefined && userMenu != null) {
			var data = Cookie.get(environment.userInfoKey);
			if (data != undefined) {
				//this.loginResponse = JSON.parse(data);
				//this.loginResponse.menuBar = this.getUserMenu();
				//this.loginResponse.userActivities = this.getUserActivities();
				return this.loginResponse;
			}
		}

		return new LoginResponse();
	}

	public setUserDetails(user: LoginResponse) {
		debugger;

		localStorage.setItem(environment.menuBar, JSON.stringify(user.menuBar));
		localStorage.setItem(environment.userActivities, JSON.stringify(user.userActivities));

		this.tempLoginResponse = new LoginResponse();
		this.tempLoginResponse.channelID = user.channelID;
		this.tempLoginResponse.isOTPRequired = user.isOTPRequired;
		this.tempLoginResponse.isOTPValidated = user.isOTPValidated;
		this.tempLoginResponse.isResetPassord = user.isResetPassord;
		this.tempLoginResponse.sessionID = user.sessionID;
		this.tempLoginResponse.userCode = user.userCode;
		this.tempLoginResponse.tokenExpirayTime = user.tokenExpirayTime;
		this.tempLoginResponse.token = user.token;

		Cookie.set(environment.userInfoKey, JSON.stringify(this.tempLoginResponse), 1);

	}

	public setUserEmail(email: string) {
		localStorage.setItem(environment.userEmailKey, email);
	}

	public getUserEmail(): string {

		//localStorage
		var email = localStorage.getItem(environment.userEmailKey);
		if (email == undefined || email == null || email == '') {
			var user = this.getUserDetails();
			return user ? user.userCode : '';
		}
		return email;
	}

	public removeUserDetails() {
		debugger;

		//cookies
		Cookie.delete(environment.userInfoKey);
		Cookie.deleteAll();

		localStorage.removeItem(environment.menuBar);
		localStorage.removeItem(environment.userActivities);
		localStorage.removeItem(environment.userEmailKey);
		localStorage.removeItem('IsFranchiseToVendorFlow')

	}

	public setUserMenu(menu: string) {
		localStorage.setItem(environment.menuBar, menu);
	}

	public getUserMenu() {
		return JSON.parse(localStorage.getItem(environment.menuBar) || '{}');
	}

	public getUserActivities() {
		return JSON.parse(localStorage.getItem(environment.userActivities) || '{}');
	}

	public getActivity(activityName: string): Activity {
		//this.getUserDetails();
		var activities = JSON.parse(localStorage.getItem(environment.userActivities) || '{}');
		return activities.filter((x: { activityName: string; }) => x.activityName == activityName)[0];
	}

	public isValidUrl(url: string): boolean {
		if (url == '/dashboard' || url == '/error')
			return true;

		this.getUserDetails();
		var activities = JSON.parse(localStorage.getItem(environment.userActivities) || '{}');
		if (activities != null && activities != undefined) {
			var result = activities.filter((x: { activityURL: string; }) => x.activityURL == url)[0];

			if (result != null && result != undefined) {
				return true;
			}
		}

		if (url.includes('user-management/users/edit;id=')) {
			return true;
		}
		return false;
	}

	public isTokenExpired() {
		this.getUserDetails();
		if (this.loginResponse) {
			var tokenDate = new Date(this.loginResponse.tokenExpirayTime);
			if (tokenDate > new Date())
				return false;
		}
		return true;
	}

}
