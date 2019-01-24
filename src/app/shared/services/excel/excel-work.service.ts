import { Injectable } from '@angular/core';
import { Helpers } from "../../../helpers";

@Injectable()
export class ExcelWorkService {
    constructor() {

    }

    downloadXLS(name: string, data: any) {
        var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        let blob = new Blob([data._body], { type: contentType });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();

        /*var link = document.createElement('a');
         console.log(data.url);
         link.href = data.url;
         link.download = name;

         link.click();*/

        Helpers.setLoading(false);
    }
}
