import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort
} from '@angular/material';
import {
    TransactionListService
} from "./transaction-list.service";
import {
    TransactionDataService
} from '../shared/transactionData.service';
import {
    Router,
    ActivatedRoute,
    ParamMap
} from '@angular/router';
export interface TransactionElement {
    account: string;
    accountName: string;
    currencyCode: string;
    amount: number;
    transactionType: string;
};
@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css'],
    providers: [TransactionListService]
})
export class TransactionListComponent implements OnInit {
    loadingData = true;
    checked = false;
    indeterminate = false;
    labelPosition = 'after';
    filtersSource;
    transactionsSourceOriginal;
    accountNamesModel = [];
    dataSource: MatTableDataSource < TransactionElement > = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private transactionListService: TransactionListService, private route: ActivatedRoute, private router: Router, private transactionDataService: TransactionDataService) {}
    initView(data) {
        this.transactionsSourceOriginal = JSON.stringify(data.transactions);
        this.loadingData = false;
        this.filtersSource = this.transactionListService.getFilterSource(data.transactions);
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.data = data.transactions;
        });
    }
    ngOnInit() {
        if (this.transactionDataService.transactionsListData) {
            this.initView(JSON.parse(this.transactionDataService.transactionsListData));
        } else {
            this.transactionListService.getTransactions().subscribe(x => {
                this.transactionDataService.transactionsListData = JSON.stringify(x);
                this.initView(x);
            });
        }
    }
    displayedColumns: string[] = ['account', 'accountName', 'currencyCode', 'amount', 'transactionType'];
    filterChecked(e) {
        var checkedAccountNames = [];
        var checkedTransactionsTypes = [];
        var sourceDataToFilter = JSON.parse(this.transactionsSourceOriginal);
        var filteredRecord = [];
        this.filtersSource.accountNames.forEach(function(item) {
            if (item.checked) {
                checkedAccountNames.push(item.name);
            }
        });
        this.filtersSource.transactionType.forEach(function(item) {
            if (item.checked) {
                checkedTransactionsTypes.push(item.name);
            }
        });
        sourceDataToFilter.forEach((item) => {
            if (checkedAccountNames.length && checkedTransactionsTypes.length) {
                if (checkedAccountNames.indexOf(item.accountName) > -1 && checkedTransactionsTypes.indexOf(item.transactionType) > -1) {
                    filteredRecord.push(item);
                }
            } else if (checkedAccountNames.length || checkedTransactionsTypes.length) {
                if (checkedAccountNames.indexOf(item.accountName) > -1 || checkedTransactionsTypes.indexOf(item.transactionType) > -1) {
                    filteredRecord.push(item);
                }
            }
        });
        if (checkedAccountNames.length || checkedTransactionsTypes.length) {
            this.dataSource.data = filteredRecord;
        } else {
            this.dataSource.data = sourceDataToFilter;
        }
        console.log(filteredRecord);
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    viewTransactionDetails(transaction) {
        this.transactionDataService.selectedTransaction = transaction;
        this.router.navigate(['/transaction/' + transaction.account]);
    }
}
