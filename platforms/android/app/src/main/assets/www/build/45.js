webpackJsonp([45],{

/***/ 1378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointTransferLedgerPageModule", function() { return PointTransferLedgerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__point_transfer_ledger__ = __webpack_require__(1444);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PointTransferLedgerPageModule = /** @class */ (function () {
    function PointTransferLedgerPageModule() {
    }
    PointTransferLedgerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__point_transfer_ledger__["a" /* PointTransferLedgerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__point_transfer_ledger__["a" /* PointTransferLedgerPage */]),
            ],
        })
    ], PointTransferLedgerPageModule);
    return PointTransferLedgerPageModule;
}());

//# sourceMappingURL=point-transfer-ledger.module.js.map

/***/ }),

/***/ 1444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointTransferLedgerPage; });
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



var PointTransferLedgerPage = /** @class */ (function () {
    function PointTransferLedgerPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.account_list = [];
        this.limit = 20;
        this.start = 0;
    }
    PointTransferLedgerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointTransferLedgerPage');
        this.get_ledger();
    };
    PointTransferLedgerPage.prototype.get_ledger = function () {
        var _this = this;
        this.limit = 20;
        this.start = 0;
        this.service.presentLoading();
        this.service.addData({}, "AppCustomerNetwork/ledgerListing").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.account_list = result['result'];
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
    PointTransferLedgerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-point-transfer-ledger',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\point-transfer-ledger\point-transfer-ledger.html"*/'\n\n<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Point Transfer Ledger</ion-title>\n\n        <!-- <ion-buttons end>\n\n            <button ion-button icon-only (click)="presentPopover($event)">\n\n                <ion-icon name="more"></ion-icon>\n\n            </button>\n\n        </ion-buttons> -->\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="transation-tabel">\n\n        <table>\n\n            <tr  *ngFor="let row of account_list; let i=index">\n\n                <td>\n\n                    <div class="point-date">\n\n                        <div class="led-date">{{row.date_created|date : \'dd MMM yyyy , hh:mm a\'}}</div>\n\n                        <div class="led-amount" [ngClass]="{\'credit\' : row.credit, \'debit\' : row.debit} ">\n\n                            \n\n                            <span *ngIf="row.credit">{{row.credit}} pt</span>\n\n                            <span *ngIf="row.debit">{{row.debit}} pt</span>\n\n                            <i class="material-icons">{{row.credit ? \'call_received\' : \'call_made\'}}</i>\n\n                        </div>\n\n                    </div>\n\n                    \n\n                    <div class="point-remark mb0">\n\n                        <p *ngIf="row.credit">Received From {{row.recieved_from_name}}</p>\n\n                        <p *ngIf="row.debit">Send To {{row.transfer_to_name}}</p>\n\n                        \n\n                        <div class="avl-bal">\n\n                            Balance: {{row.balance}} pt\n\n                        </div>\n\n                    </div>\n\n                </td>\n\n            </tr>\n\n        </table>\n\n    </div>\n\n    \n\n    \n\n    <div class="nothing-here" style="height: 100%;" *ngIf="!account_list.length">\n\n        <div class="outer">\n\n            <div class="innear">\n\n                <img src="assets/imgs/no_found.svg" alt="">\n\n                <p>No Data Available</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\point-transfer-ledger\point-transfer-ledger.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], PointTransferLedgerPage);
    return PointTransferLedgerPage;
}());

//# sourceMappingURL=point-transfer-ledger.js.map

/***/ })

});
//# sourceMappingURL=45.js.map