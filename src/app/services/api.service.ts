import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';


// const headers = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   })
// }; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  /**
	 * Common function to call all APIs
	 * @param endpoint string
	 * @param args args
	 * @param httpmethod string
	 * @return response as obserbalbe
	 */

  fetchData(endpoint, args = {}, httpmethod = 'GET'): Observable<any> {

    let requestURL = environment.baseUrl + endpoint;
    let headers = this.generateHeader();

    if (httpmethod == 'GET') {
      requestURL = requestURL + this.toQueryString(args);
      return  this.http.get(requestURL)
        .pipe(map(data => data),
          catchError(this.handleError('Error in getting data', []))
        );
    }

    if (httpmethod == 'DELETE') {
      return  this.http.delete(requestURL, headers)
        .pipe(map(data => data),
          catchError(this.handleError('Error in getting data', []))
        );
    }

    if (httpmethod == 'POST') {
      return this.http.post(requestURL, args, headers)
        .pipe(map(data => data),
          catchError(this.handleError('Error in getting data', []))
        );
    }

    if (httpmethod == 'PUT') {
      return this.http.put(requestURL, args, headers)
        .pipe(map(data => data),
          catchError(this.handleError('Error in getting data', []))
        );
    }
  }

  generateHeader(){
    let headers = {};
    let HeaderObj = {
      'Content-Type': 'application/json'
    }
    let usersdata = localStorage.getItem('user') 
                ? JSON.parse(localStorage.getItem('user')) : null
    if(usersdata) {
      let authtoken = 'Bearer '+ usersdata.token
      HeaderObj['Authorization'] = authtoken;
    }
    return headers = {headers: new HttpHeaders(HeaderObj)}
  }

  /**
	 * @param obj object
	 * @return string
	 */
  private toQueryString(obj) {
    const parts = [];

    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }

    return parts.join('&');
  }

	/**
	 * Handle error
	 * @param operation error
	 * @param result throw error
	 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { // TODO: send the error to remote logging infrastructure
      console.log(error.error.error);
      this.toastr.error(error.error.error);
      return of(result as T);

    };
  }
}
