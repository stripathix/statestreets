import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {
  result:any;
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  private authHeaders;
  constructor(private _http: Http) {
  }
  getTransactions() {
    return this._http.get('https://jsonblob.com/api/jsonBlob/0d354506-e4ad-11e8-8d6e-27353ba6398b').map(res => res.json());
  }
  getcontactInfo(id:any) {
    return this._http.get('http://localhost:3000/api/contacts/' + id).map(res => res.json());
  }
}
