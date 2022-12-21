import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { QueryBuilderConfig } from "angular2-query-builder";
import { ToastrService } from "ngx-toastr";
import { BootstrapNotify } from "bootstrap-notify";

import { DbService } from "../../services/db.service";
import { QueryResultDialogComponent } from "../query-result-dialog/query-result-dialog.component";
import { SaveQueryDialogComponent } from "../save-query-dialog/save-query-dialog.component";

@Component({
  selector: "query-builder-custom",
  templateUrl: "./query-builder-custom.component.html",
  styleUrls: ["./query-builder-custom.component.css"],
})
export class QueryBuilderCustomComponent implements OnInit {
  stringJson: string;
  stringObj: any;
  constructor(
    public dbService: DbService,
    public notification: ToastrService,
    public dialog: MatDialog
  ) {}
  @Output() getHistory: EventEmitter<any> = new EventEmitter();
  @Output() getSchema: EventEmitter<any> = new EventEmitter();
  query: any;
  queryBuilderShow = false;
  config: QueryBuilderConfig = {
    fields: {},
  };

  expression: string = "";
  tablesData: any[] = [];
  schemaData: any;
  tableSelected: any;
  selectedTableColumns: any;
  selectedColumns: string[] = [];
  originalColumnLength: number = 0;
  resultantQuery: string = "";
  tableSchema: string = "";
  data: any[] = [];
  executeCardShow: boolean = false;
  queryName: string = "";
  tableColumnResult: any = [];
  /*
  Funtion to reset all data we accumilated
  */
  reset() {
    this.schemaData = [];
    this.tablesData = [];
    this.tableSelected = "";
    this.tableSchema = "";
    this.selectedColumns = [];
    this.originalColumnLength = 0;
    this.resultantQuery = "";
    this.selectedTableColumns = [];
    this.queryName = "";
    this.queryBuilderShow = false;
  }
  getSchemas() {
    this.reset();
    this.dbService.getSchema().subscribe(
      (data) => {
        this.schemaData = data;
        console.log(data);
      },
      (err) => {
        this.notification.error("Error!", err.message);
      }
    );
  }
  getTables() {
    this.refreshHistoryData();
    this.dbService
      .getTables({
        tableSchema: this.tableSchema,
      })
      .subscribe(
        (data) => {
          console.log(data.status);
          this.tablesData = data;
          console.log(this.tablesData);
          if (this.tablesData) {
            this.tableSelected = this.tablesData[0].TABLE_NAME;
            this.getColumns();
          }
        },
        (err) => {
          this.notification.error("Error!", err.message);
        }
      );
  }

  getColumns() {
    this.selectedColumns = [];
    this.config.fields = {};
    this.dbService
      .getTableColumns({
        tableName: this.tableSelected,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.queryBuilderShow = false;
          this.selectedTableColumns = data;
          this.originalColumnLength = data.length;
          data.forEach((item: { COLUMN_NAME: any }) => {
            this.selectedColumns.push(item.COLUMN_NAME);
            this.config.fields[item.COLUMN_NAME] = {
              name: item.COLUMN_NAME,
              type: "string",
              operators: ["=", "!=", ">", ">=", "<", "<=", "like", "contains"],
            };
          });
          console.log(this.config);
        },
        (err) => {
          this.notification.error("Error!", err.message);
        },
        async () => {
          console.log(Object.keys(this.config.fields));
          this.query = {
            condition: "and",
            rules: [
              {
                field:
                  this.config.fields[Object.keys(this.config.fields)[0]].name,
                operator: "=",
                value: "",
              },
            ],
          };
          await setTimeout(() => (this.queryBuilderShow = true));
        }
      );
  }
  getCheckbox(text: any) {
    if (text.checked) {
      this.selectedColumns.push(text.value);
    } else {
      this.selectedColumns.splice(this.selectedColumns.indexOf(text.value), 1);
    }
    // console.log(this.selectedColumns);
  }

  generateQuery() {
    if (this.selectedColumns.length == 0) {
      this.notification.error("Please select atleast one column");
      return;
    }
    if (this.selectedColumns.length === this.originalColumnLength) {
      this.resultantQuery = `SELECT * FROM ${this.tableSchema}.${this.tableSelected}`;
    } else {
      this.resultantQuery = "SELECT ";
      this.resultantQuery += this.selectedColumns.join(",");
      this.resultantQuery += ` FROM ${this.tableSelected}`;
    }
    if (this.query.rules.length != 0) {
      this.expression = this.basicRulesetToSQL(this.query);
      this.resultantQuery += ` WHERE ${this.expression}`;
    }
    // this.dbService.runStoredProcedure({
    //   db:this.db,
    //   host:this.host,
    //   username:this.username,
    //   password:this.password,
    //   port:this.port,
    //   procedure:`${this.tableSchema}.insertQuery`,
    //   data:{query:this.resultantQuery.toString()}
    // }).subscribe(
    //   res => {
    //     // this.notification.success("Query stored in DB!")
    //     console.log(this.resultantQuery)
    //     this.refreshHistoryData()
    //   },
    //   err => {
    //     this.notification.error("Error!",err.sText)
    //   }
    // );
  }
  saveQuery() {
    if (this.queryName == "") {
      this.notification.error("Error!", "Query Name cannot be empty");
      return;
    }
    this.dbService
      .runStoredProcedure({
        procedure: `${this.tableSchema}.insertNameQuery`,
        data: {
          queryName: this.queryName,
          query: this.resultantQuery.toString(),
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
          if (res[0].exist) {
            this.notification.warning(res[0].result);
            return;
          }
          this.notification.success(res[0].result);
          this.refreshHistoryData();
        },
        (err) => {
          this.notification.error("Error!", err.sText);
        }
      );
  }
  valueToSQL(value: any) {
    switch (typeof value) {
      case "string":
        return "'" + value + "'";
      case "boolean":
        return value ? "1" : "0";
      case "number":
        if (isFinite(value)) return value;
    }
    return;
  }

  isDefined(value: any) {
    return value !== undefined;
  }

  basicRulesetToSQL(ruleset: any) {
    return ruleset.rules
      .map((rule: any) => {
        if (rule.rules) {
          return "(" + this.basicRulesetToSQL(rule) + ")";
        }
        var column = rule.field,
          operator,
          value;

        switch (rule.operator) {
          case "is null":
          case "is not null":
            operator = rule.operator;
            value = "";
            break;
          case "in":
          case "not in":
            operator = rule.operator;
            if (Array.isArray(rule.value) && rule.value.length)
              value =
                "(" +
                rule.value
                  .map(this.valueToSQL)
                  .filter(this.isDefined)
                  .join(", ") +
                ")";
            break;
          default:
            operator = rule.operator;
            value = this.valueToSQL(rule.value);
            break;
        }

        if (
          this.isDefined(column) &&
          this.isDefined(value) &&
          this.isDefined(operator)
        ) {
          return "(" + (column + " " + operator + " " + value).trim() + ")";
        }
        return;
      })
      .filter(this.isDefined)
      .join(" " + ruleset.condition + " ");
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.resultantQuery);
    this.notification.success("Coppied to clipboard");
  }
  runAndDisplayQuery(query: any) {
    // if(query.indexOf("SELECT TOP(100)") == -1)
    // query = query.replace("SELECT", "SELECT TOP(100) ")
    console.log(query);
    // this.dbService.runQuery({
    //   rowCount:100,
    //   query:query?query:this.resultantQuery
    // }).subscribe(
    //   res => {
    //       this.notification.success("Query Successful");
    //       // this.openDialog(res);
    //       console.log(res)
    //       this.resultantQuery = query
    //       if(res.length){
    //       this.data = [...res]
    //       this.reloadTable();
    //     }
    //     else{
    //       this.data = []
    //       this.reloadTable();
    //     }
    //   },
    //   err => {
    //     this.notification.error("Error!",err)
    //   }
    // )
    this.dbService
      .runStoredProcedure({
        procedure: `${this.tableSchema}.getSampleData`,
        data: { queryRaw: query },
      })
      .subscribe({
        next: (res) => {
          //code for SQL Query table starts here(SHIVAM.RAI)
          this.data = res;
          this.stringJson = JSON.stringify(this.data);

          this.stringObj = JSON.parse(this.stringJson);
          console.log(this.stringObj);

          //code for SQL Query table ends here(SHIVAM.RAI)

          this.notification.success("Query Successful");
          // this.openDialog(res);
          console.log(res);
          this.resultantQuery = query;
          if (res.length) {
            this.tableColumnResult = Object.keys(res[0]);
            this.data = [...res];

            this.reloadTable();
          } else {
            this.data = [];
            this.tableColumnResult = [];
            this.reloadTable();
          }
        },
        error: (err) => this.notification.error("Error!", err.message),

        // (res) => {
        //   this.notification.success("Query Successful");
        //   // this.openDialog(res);
        //   console.log(res);
        //   this.resultantQuery = query;
        //   if (res.length) {
        //     this.tableColumnResult = Object.keys(res[0]);
        //     this.data = [...res];
        //     this.reloadTable();
        //   } else {
        //     this.data = [];
        //     this.tableColumnResult = [];
        //     this.reloadTable();
        //   }
        // },
        // (err) => {
        //   this.notification.error("Error!", err.message);
        // }
      });
  }

  ngOnInit() {
    // this.stringJson = JSON.stringify(this.data);
    // this.stringObj = JSON.parse(this.stringJson);
    // console.log(this.stringObj);
  }
  async reloadTable() {
    this.executeCardShow = false;
    await setTimeout(() => (this.executeCardShow = true));
  }

  refreshHistoryData() {
    this.getHistory.emit({
      procedure: `${this.tableSchema}.getSqlNameQueryHistory`,
    });
    this.getSchema.emit(this.tableSchema);
  }

  openDialogResult(queryData: any) {
    const dialogRef = this.dialog.open(QueryResultDialogComponent, {
      width: "100%",
      data: queryData,
    });
  }
  openDialogSave() {
    const dialogRef = this.dialog.open(SaveQueryDialogComponent, {
      width: "fit-content",
      data: { name: this.queryName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.queryName = result;
        this.saveQuery();
        this.queryName = "";
      }
    });
  }
}
