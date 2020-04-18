import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { isNullOrUndefined } from "util";
import { DateFormatter } from "../../helper/date-formatter";
import { HttpService } from "../http/http.service";

@Injectable()
export class ApiService {
  public url: string;

  constructor(protected http: HttpService) {}

  list(params?: any, responseType?: any): Observable<any> {
    if (!params) return this.http.get(this.url);
    params = this.serialize(params);
    return this.http.get(this.url, {
      params: this.object2Params(params),
      responseType: responseType
    });
  }

  getById(id: string | number): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }

  getByIdAndLanguage(id: string | number, language: string): Observable<any> {
    return this.http.get(`${this.url}${id}/${language}`);
  }

  getAll(params?: any): Observable<any> {
    if (!params) return this.http.get(`${this.url}todos`);
    params = this.serialize(params);
    return this.http.get(`${this.url}todos`, {
      params: this.object2Params(params)
    });
  }

  create(resource?: any): Observable<any> {
    resource = this.serialize(resource);
    return this.http.post(this.url, resource);
  }

  update(resource: any): Observable<any> {
    let id = resource.id;
    resource.id = null;
    resource = this.serialize(resource);
    return this.http.put(`${this.url}${id}`, resource);
  }

  updateByLanguage(resource: any, language: string): Observable<any> {
    resource = this.serialize(resource);
    return this.http.put(`${this.url}${resource.id}/${language}`, resource);
  }

  delete(id: string | number, resource?: any): Observable<any> {
    if (!resource) return this.http.delete(`${this.url}${id}`);
    else {
      return this.http.delete(`${this.url}${id}`, { body: resource });
    }
  }

  deleteMultiple(resources: any): Observable<any> {
    return this.http.delete(`${this.url}delete/multiple`, { body: resources });
  }

  importar(resource): Observable<any> {
    resource = this.serialize(resource);
    return this.http.post(`${this.url}import`, resource);
  }

  /**
   * Gets the data ready for being sent to the API.
   * Converts boolean params into binary params attributes.
   * Formats dates params.
   *
   * @param data The data to serialize
   * @returns {any} The serialized data.
   */
  protected serialize(data: any) {
    let serializedData = {};
    Object.getOwnPropertyNames(data).forEach(attr => {
      if (isNullOrUndefined(data[attr])) {
        // Does not include it if null or undefined
      } else if (typeof data[attr] == "boolean") {
        // Converts boolean params into binary int.
        serializedData[attr] = data[attr] ? 1 : 0;
      } else if (
        data[attr]["year"] &&
        data[attr]["month"] &&
        data[attr]["day"]
      ) {
        // Puts Dates into the correct format.
        serializedData[attr] = DateFormatter.formatDate(data[attr]);
      } else if (typeof data[attr] == "string") {
        if (!data[attr].length) {
        } else {
          if (
            attr != "descripcion" &&
            attr != "direccion" &&
            attr != "nombre" &&
            attr != "apellido"
          )
            serializedData[attr] = data[attr].split(" ").join(",");
          else serializedData[attr] = data[attr];
        }
        // Does not include empty strings
      } else if (typeof data[attr] == "number" && data[attr] == -1) {
      } else if (data[attr].formatted && data[attr].date) {
        serializedData[attr] = data[attr].formatted;
      } else {
        // Leaves it as is.
        serializedData[attr] = data[attr];
      }
    });
    return serializedData;
  }

  /**
   * Takes an object with params and transforms it into
   * a query params string to pass to an http request.
   *
   * @param object The object with the params.
   * @returns {string} The query params string.
   */
  protected object2Params(object: any): string {
    // Transforms the object into a query params array.
    let array: string[] = Object.getOwnPropertyNames(object).map(key => {
      return `${key}=${object[key]}`;
    });
    // Joins the query params into a query params string.
    return array.join("&");
  }
}
