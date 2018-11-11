import { Component, OnInit } from '@angular/core';
import {
    TransactionListService
} from "../transaction-list/transaction-list.service"
import { TransactionDataService } from '../shared/transactionData.service';;
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
  providers: []
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetails:any = {};
  constructor(private transactionDataService: TransactionDataService) {
  }
  ngOnInit() {
      this.transactionDetails = this.transactionDataService.selectedTransaction;
  }
}
