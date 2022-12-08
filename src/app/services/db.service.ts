import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ObservedValueOf, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class DbService {
  constructor(private http: HttpClient, private notification: ToastrService) {}

  getTables(req: any): Observable<any> {
    req["query"] =
      "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" +
      req.tableSchema +
      "'";
    return this.http.post<any>(
      environment.baseApiUrl + "cd-run-raw-query",
      req
    );
  }
  getTableColumns(req: any): Observable<any> {
    req[
      "query"
    ] = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N\'${req.tableName}\'`;
    return this.http.post<any>(
      environment.baseApiUrl + "cd-run-raw-query",
      req
    );
  }
  getSchema(): Observable<any> {
    let req = {
      query:
        "SELECT * FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'dbo'",
    };

    return this.http.post<any>(
      environment.baseApiUrl + "cd-run-raw-query",
      req
    );
  }
  runQuery(req: any): Observable<any> {
    req["query"] = req.query;
    return this.http.post<any>(
      environment.baseApiUrl + "cd-run-raw-query",
      req
    );
  }
  runStoredProcedure(req: any) {
    return this.http.post<any>(
      environment.baseApiUrl + "cd-run-stored-procedure",
      req
    );
  }
}
