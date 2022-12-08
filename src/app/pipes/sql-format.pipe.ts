import { Pipe, PipeTransform } from "@angular/core";
import { format } from "sql-formatter";

@Pipe({ name: "sqlFormat" })
export class SqlFormatPipe implements PipeTransform {
  transform(value: any): any {
    return format(value, {
      language: "spark",
      tabWidth: 2,
      keywordCase: "upper",
      linesBetweenQueries: 2,
    });
  }
}
