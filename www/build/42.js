webpackJsonp([42],{

/***/ 1381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferPointsWalletPageModule", function() { return TransferPointsWalletPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_points_wallet__ = __webpack_require__(1445);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransferPointsWalletPageModule = /** @class */ (function () {
    function TransferPointsWalletPageModule() {
    }
    TransferPointsWalletPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transfer_points_wallet__["a" /* TransferPointsWalletPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__transfer_points_wallet__["a" /* TransferPointsWalletPage */]),
            ],
        })
    ], TransferPointsWalletPageModule);
    return TransferPointsWalletPageModule;
}());

//# sourceMappingURL=transfer-points-wallet.module.js.map

/***/ }),

/***/ 1445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferPointsWalletPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TransferPointsWalletPage = /** @class */ (function () {
    function TransferPointsWalletPage(navCtrl, navParams, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.pointsDetail = [];
        this.transactionsDetail = [];
        this.ActiveTab = 'recieved_transaction';
        this.transactionCounts = [];
        this.getPointsDetail();
        setTimeout(function () {
            _this.gettransactionsDetail(_this.ActiveTab);
        }, 1000);
    }
    TransferPointsWalletPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransferPointsWalletPage');
    };
    TransferPointsWalletPage.prototype.ionViewWillEnter = function () {
    };
    TransferPointsWalletPage.prototype.getPointsDetail = function () {
        var _this = this;
        this.service.presentLoading();
        this.service.addData({}, "AppCustomerNetwork/pointsWallet").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.pointsDetail = result['result'];
                console.log(_this.pointsDetail);
                _this.service.dismissLoading();
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    TransferPointsWalletPage.prototype.gettransactionsDetail = function (ActiveTab) {
        var _this = this;
        console.log(ActiveTab);
        this.service.presentLoading();
        this.service.addData({ ActiveTab: ActiveTab }, "AppCustomerNetwork/tranferRecievedPointsDetail").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.transactionsDetail = result['result'];
                _this.transactionCounts = result['count'];
                console.log(_this.transactionsDetail);
                _this.service.dismissLoading();
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    TransferPointsWalletPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transfer-points-wallet',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-points-wallet\transfer-points-wallet.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Transfer Points Wallet</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="my-wallet">\n\n        <div class="pts-icon">\n\n            <i class="material-icons">account_balance_wallet </i>\n\n            Total Points\n\n        </div>\n\n        <div class="pts">\n\n            {{pointsDetail.total_points}}\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="my-wallet">\n\n        <div class="pts-icon">\n\n            <i class="material-icons">account_balance_wallet </i>\n\n            Transfer Points\n\n        </div>\n\n        <div class="pts">\n\n            {{pointsDetail.transfer_points}}\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="my-wallet">\n\n        <div class="pts-icon">\n\n            <i class="material-icons">account_balance_wallet </i>\n\n            Balance Points\n\n        </div>\n\n        <div class="pts">\n\n            {{pointsDetail.balance_points}}\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="capsule-tabs">\n\n        <ul>\n\n            <li [ngClass]="{\'active\' : ActiveTab==\'recieved_transaction\'}" (click)="ActiveTab=\'recieved_transaction\' ;gettransactionsDetail(ActiveTab)">\n\n                <p>Received Transaction\n\n                    <span>{{transactionCounts.recievedPoints}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'send_transaction\'}" (click)="ActiveTab=\'send_transaction\';gettransactionsDetail(ActiveTab)">\n\n                <p>Send Transaction\n\n                    <span>{{transactionCounts.transferPoints}}</span>\n\n                </p>\n\n            </li>\n\n        </ul>\n\n    </div>\n\n    \n\n    <div class="pl16 pr16 mt15 mb50">\n\n        <div class="attendance-list" *ngFor="let row of transactionsDetail">\n\n            <div class="slab slab-bg">\n\n                <div class="slab-day">\n\n                    <p>{{row.date_created| date:\'d MMM y\'}}</p>\n\n                    <span>Date created</span>\n\n                </div>\n\n                \n\n                <div class="slab-day" *ngIf="ActiveTab==\'recieved_transaction\'">\n\n                    <p>{{row.credit}}</p>\n\n                    <span>Points Received</span>\n\n                </div>\n\n                <div class="slab-day" *ngIf="ActiveTab==\'send_transaction\'">\n\n                    <p>{{row.debit}}</p>\n\n                    <span>Points Send</span>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="center-block">\n\n                <div class="circle">{{row.party_name?.substring(0,1).toUpperCase()}}</div>\n\n                <h1 *ngIf="ActiveTab==\'recieved_transaction\'">Received From : {{row.party_name | titlecase}}</h1>\n\n                <h1 *ngIf="ActiveTab==\'send_transaction\'">Send To : {{row.party_name | titlecase}}</h1>\n\n                <p>Code / Mobile : {{row.party_code ? row.party_code : \'-\'}} / {{row.mobile ? row.mobile : \'\'}}</p>\n\n            </div>\n\n            \n\n            <div class="slab mt16">\n\n                <div class="slab-day">\n\n                    <span>Product Name</span>\n\n                    <p class="bold">{{row.product_name ? row.product_name : \'-\'}}</p>\n\n                </div>\n\n                <div class="slab-day">\n\n                    <span>Product Code</span>\n\n                    <p class="bold">{{row.product_code ? row.product_code : \'-\'}}</p>\n\n                </div>\n\n                <div class="slab-day">\n\n                    <span>Qty</span>\n\n                    <p class="bold">{{row.product_qty ? row.product_qty : \'-\'}}</p>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="slab mt16" *ngIf="row.remark">\n\n                <div class="slab-day">\n\n                    <span>Remark</span>\n\n                    <p class="bold">{{row.remark ? row.remark : \'-\'}}</p>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n    <div class="nothing-here" style="height: 50%;" *ngIf="!transactionsDetail?.length">\n\n        <div class="outer">\n\n            <div class="innear">\n\n                <img src="assets/imgs/no_found.svg" alt="">\n\n                <p>Data Not Available</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    \n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-points-wallet\transfer-points-wallet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], TransferPointsWalletPage);
    return TransferPointsWalletPage;
}());

//# sourceMappingURL=transfer-points-wallet.js.map

/***/ })

});
//# sourceMappingURL=42.js.map