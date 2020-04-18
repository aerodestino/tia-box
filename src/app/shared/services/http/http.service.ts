import { Inject, Injectable } from "@angular/core";
import { Headers, Http, RequestOptionsArgs, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { isNullOrUndefined, isUndefined } from "util";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class HttpService {
  constructor(
    @Inject("API_URL") private api_url: string,
    public storageService: StorageService,
    protected http: Http
  ) {}
  /**
   * Shorthand method to make a GET request to the API using the given url.
   * Usually used to read data from the API
   *
   * @param url The url to request.
   * @param options The options of the request.
   * @returns {Observable<Response>} The response observable.
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(this.api_url + url, this.addAuthHeader(options));
  }

  getWithoutAuthHeader(
    url: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return this.http.get(this.api_url + url, options);
  }

  /**
   * Shorthand method to make a POST request to the API using the given url.
   * Usually used to send new data to the API.
   *
   * @param url The url to request.
   * @param body The request's body.
   * @param options The options of the request.
   * @returns {Observable<Response>} The response observable.
   */
  post(
    url: string,
    body: any,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return this.http.post(
      this.api_url + url,
      body,
      this.addAuthHeader(options)
    );
  }

  postWithoutAuthHeader(
    url: string,
    body: any,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return this.http.post(this.api_url + url, body, options);
  }

  /**
   * Shorthand method to make a PUT request to the API using the given url.
   * Usually used to change data in the API.
   *
   * @param url The url to request.
   * @param body The request's body.
   * @param options The options of the request.
   * @returns {Observable<Response>} The response observable.
   */
  put(
    url: string,
    body: any,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return this.http.put(this.api_url + url, body, this.addAuthHeader(options));
  }

  /**
   * Shorthand method to make a DELETE request to the Api using the given url.
   * Used to delete data from the API.
   *
   * @param url The url to request.
   * @param options The options of the request.
   * @returns {Observable<Response>} The response observable.
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(this.api_url + url, this.addAuthHeader(options));
  }

  /**
   * Adds the auth header to a request to make authenticated requests.
   *
   * @param options The options of the request.
   */
  addAuthHeader(options: RequestOptionsArgs): RequestOptionsArgs {
    // If undefined it's set to an empty object
    options = isUndefined(options) ? {} : options;

    // Add auth header to request options if a session is logged in
    if (localStorage.getItem("access_token")) {
      let headers = isNullOrUndefined(options.headers)
        ? new Headers()
        : options.headers;
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem("access_token")
      );
      return Object.assign(options, { headers: headers });
    }
  }
}
