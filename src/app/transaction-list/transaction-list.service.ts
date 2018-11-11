import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class TransactionListService {
  constructor(private _http: Http) { }
  getTransactions() {
    return this._http.get('https://jsonblob.com/api/jsonBlob/0d354506-e4ad-11e8-8d6e-27353ba6398b').map(res => res.json());
  }
  getFilterSource(data) {
    var accountNamesList = [];
    var transactionTypeList = [];
    var accountNames = [];
    var transactionType = [];
    data.forEach(function(item) {
      if (accountNamesList.indexOf(item.accountName) < 0) {
        accountNames.push({
            name: item.accountName,
            checked: false
        });
        accountNamesList.push(item.accountName);
      }
      if (transactionTypeList.indexOf(item.transactionType) < 0) {
        transactionType.push({
            name: item.transactionType,
            checked: false
        });
        transactionTypeList.push(item.transactionType);
      }
    });
    return {accountNames: accountNames, transactionType: transactionType};
  }
}
