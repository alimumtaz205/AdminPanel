import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfoModel } from 'src/app/_models/_userInfo.model';
import { HttpExtenstionsModel } from 'src/app/_models/http-extentsions-model';
import { QueryParamsModel } from 'src/app/_models/query-models/query-params.model';
import { UserUtilsService } from './user.utils.service';
import { QueryResultsModel } from 'src/app/_models/query-models/query-results.model';


@Injectable()
export class HttpUtilsService {
  /**
   * Prepare query http params
   * @param queryParams: QueryParamsModel
   */
  getFindHTTPParams(queryParams: { filter: string | number | boolean; sortOrder: string | number | boolean; sortField: string | number | boolean; pageNumber: { toString: () => string | number | boolean; }; pageSize: { toString: () => string | number | boolean; }; }): HttpParams {
    const params = new HttpParams()
      .set('lastNamefilter', queryParams.filter)
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('pageNumber', queryParams.pageNumber.toString())
      .set('pageSize', queryParams.pageSize.toString());

    return params;
  }

  /**
   * get standard content-type
   */
  getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders();
    result.set('Content-Type', 'application/json');
    return result;
  }

  getMultiPartHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders();
    result.set('Content-Type', 'multipart/form-data');
    return result;
  }

  baseFilter(_entities: any[], _queryParams: QueryParamsModel, _filtrationFields: string[] = []): QueryResultsModel {
    const httpExtention = new HttpExtenstionsModel();
    return httpExtention.baseFilter(_entities, _queryParams, _filtrationFields);
  }

  sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
    const httpExtention = new HttpExtenstionsModel();
    return httpExtention.sortArray(_incomingArray, _sortField, _sortOrder);
  }

  searchInArray(_incomingArray: any[], _queryObj: any, _filtrationFields: string[] = []): any[] {
    const httpExtention = new HttpExtenstionsModel();
    return httpExtention.searchInArray(_incomingArray, _queryObj, _filtrationFields);
  }

  getUserInfo(): UserInfoModel {
    var userService = new UserUtilsService();
    var data = userService.getUserDetails();
    var user = new UserInfoModel();
    //user.emailAddress = data.emailAddress;
    user.sessionID = data.sessionID;
    //user.userName = data.userName;
    user.userCode = data.userCode;
    return user;

  }
}
