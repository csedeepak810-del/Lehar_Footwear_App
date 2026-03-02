webpackJsonp([23],{

/***/ 1376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StockPageModule", function() { return StockPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stock__ = __webpack_require__(1443);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StockPageModule = /** @class */ (function () {
    function StockPageModule() {
    }
    StockPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__stock__["a" /* StockPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__stock__["a" /* StockPage */]),
            ],
        })
    ], StockPageModule);
    return StockPageModule;
}());

//# sourceMappingURL=stock.module.js.map

/***/ }),

/***/ 1430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zingchart__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StockDetailPage = /** @class */ (function () {
    function StockDetailPage(navCtrl, navParams, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.productData = {};
        this.stockData = [];
        this.return_out = [];
        this.return_in = [];
        this.mainTab = 'stock';
        this.SubTab = 'incoming';
        if (this.navParams.get('productData')) {
            this.productData = this.navParams.get('productData');
            console.log(this.productData);
            this.getSendPointReqDetail(this.productData.product_id);
            setTimeout(function () {
                _this.getSalesRetrunDetail(_this.productData.product_id);
            }, 200);
        }
    }
    StockDetailPage.prototype.ionViewWillEnter = function () {
        this.getGraph();
    };
    StockDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StockDetailPage');
    };
    StockDetailPage.prototype.getGraph = function () {
        // getEnquiryReport() {
        var myConfig = {
            "type": "area",
            "scale-x": {
                "labels": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
            },
            "scale-y": {
                "values": "0:1000000:200000",
                "short": true,
                "short-unit": "K",
                "thousands-separator": ","
            },
            "plot": {
                "aspect": "spline"
            },
            "plotarea": {
                "margin-left": "dynamic"
            },
            "series": [{
                    "values": [31342, 596061, 76790, 151630, 75319, 771421, 989312]
                }]
        };
        // myChart.gui = { contextMenu: { visible: false } }
        __WEBPACK_IMPORTED_MODULE_2_zingchart__["a" /* default */].render({
            id: 'myChart',
            data: myConfig,
            height: 400,
        });
        // zingchart.render({ id: 'myChart', data: enquiryPieChart, height: 250 })
        // }
    };
    StockDetailPage.prototype.getSendPointReqDetail = function (product_id) {
        var _this = this;
        console.log(product_id);
        this.service.presentLoading();
        this.service.addData({ "product_id": product_id }, "AppStockTransfer/stockDetails").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.stockData = result['result'];
                console.log(_this.stockData);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    StockDetailPage.prototype.getSalesRetrunDetail = function (product_id) {
        var _this = this;
        console.log(product_id);
        this.service.addData({ "product_id": product_id }, "AppStockTransfer/salesReturnPartyList").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.return_in = result['return_in'];
                _this.return_out = result['return_out'];
                console.log(_this.stockData);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    StockDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stock-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\stock-manage\stock-detail\stock-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Stock Transaction</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <!-- <div class="mb10">\n\n        <img src="../assets/imgs/graph.png" alt="">\n\n    </div> -->\n\n    <!-- <div id=\'myChart\' class="text-center"></div> -->\n\n    \n\n    <div class="pd-left-right16 mt16">\n\n        <div class="list-box">\n\n            <div class="mid mt0">\n\n                <div class="content-info" >\n\n                    <div class="right-info" >\n\n                        <p>{{productData.product_detail}}</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="upper">\n\n                <div class="left-date">\n\n                    <div class="date-section">\n\n                        <p>{{stockData.current_stock}}</p>\n\n                        <p>Current Stock</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{stockData.dispatch_pending}}</p>\n\n                        <p>Dispatch Pending</p>\n\n                    </div>\n\n                    \n\n                    <!-- <div class="date-section">\n\n                        <p>{{stockData.order_placed}}</p>\n\n                        <p>Order Placed</p>\n\n                    </div> -->\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{stockData.average_sale}}</p>\n\n                        <p>Avg. Sale</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </div>  \n\n    </div>\n\n    \n\n    <div class="capsule-tabs">\n\n        <ul>\n\n            <li [ngClass]="{\'active\' : mainTab==\'stock\'}" (click)="mainTab = \'stock\';">\n\n                <p>Stock</p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : mainTab==\'salesRetrun\'}" (click)="mainTab = \'salesRetrun\';">\n\n                <p>Sales Retrun</p>\n\n            </li>\n\n        </ul>\n\n    </div>\n\n    \n\n    <div class="capsule-buttons">\n\n        <ul>\n\n            <li [ngClass]="{\'active\' : SubTab==\'incoming\'}" (click)="SubTab=\'incoming\' ;">\n\n                <p>Incoming</p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : SubTab==\'outgoing\'}" (click)="SubTab=\'outgoing\';">\n\n                <p>Outgoing</p>\n\n            </li>\n\n        </ul>\n\n    </div>\n\n    \n\n    <ng-container *ngIf="mainTab==\'stock\'">\n\n        <ng-container *ngIf="SubTab == \'incoming\'">\n\n            <div class="transation-tabel" *ngFor="let row of stockData.dr_in">\n\n                <table>\n\n                    <tr>\n\n                        <td>\n\n                            <div class="point-date">\n\n                                <div class="led-date">Date : {{row.date_created | date:\'d MMM y hh:mm a\'}}</div>\n\n                                <div class="led-amount credit">\n\n                                    <span>Qty: {{row.product_qty}}</span>\n\n                                </div>\n\n                            </div>\n\n                            <div class="point-remark mb0">\n\n                                <div class="date">\n\n                                    {{row.party_detail}}\n\n                                </div>\n\n                            </div>\n\n                        </td>\n\n                    </tr>\n\n                </table>\n\n            </div>\n\n            \n\n            <div class="nothing-here" style="height: 60%;" *ngIf="!stockData.dr_in?.length">\n\n                <div class="outer">\n\n                    <div class="innear">\n\n                        <img src="assets/imgs/no_found.svg" alt="">\n\n                        <p>Data Not Available</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ng-container>\n\n        \n\n        <ng-container *ngIf="SubTab == \'outgoing\'">\n\n            <div class="transation-tabel" *ngFor="let row of stockData.dr_out">\n\n                <table>\n\n                    <tr>\n\n                        <td>\n\n                            <div class="point-date">\n\n                                <div class="led-date">Date : {{row.date_created | date:\'d MMM y hh:mm a\'}}</div>\n\n                                <div class="led-amount debit">\n\n                                    <span>Qty: {{row.product_qty}}</span>\n\n                                </div>\n\n                            </div>\n\n                            <div class="point-remark mb0">\n\n                                <div class="date">\n\n                                    {{row.party_detail}}\n\n                                </div>\n\n                            </div>\n\n                        </td>\n\n                    </tr>\n\n                </table>\n\n            </div>\n\n            \n\n            <div class="nothing-here" style="height: 60%;" *ngIf="!stockData.dr_out?.length">\n\n                <div class="outer">\n\n                    <div class="innear">\n\n                        <img src="assets/imgs/no_found.svg" alt="">\n\n                        <p>Data Not Available</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ng-container>\n\n    </ng-container>\n\n\n\n    <ng-container *ngIf="mainTab==\'salesRetrun\'">\n\n        <ng-container *ngIf="SubTab == \'incoming\'">\n\n            <div class="transation-tabel" *ngFor="let row of return_in">\n\n                <table>\n\n                    <tr>\n\n                        <td>\n\n                            <div class="point-date">\n\n                                <div class="led-date">Date : {{row.date_created | date:\'d MMM y hh:mm a\'}}</div>\n\n                                <div class="led-amount credit">\n\n                                    <span>Qty: {{row.product_qty}}</span>\n\n                                </div>\n\n                            </div>\n\n                            <div class="point-remark mb0">\n\n                                <div class="date">\n\n                                    {{row.party_detail}}\n\n                                </div>\n\n                            </div>\n\n                        </td>\n\n                    </tr>\n\n                </table>\n\n            </div>\n\n            \n\n            <div class="nothing-here" style="height: 60%;" *ngIf="!return_in?.length">\n\n                <div class="outer">\n\n                    <div class="innear">\n\n                        <img src="assets/imgs/no_found.svg" alt="">\n\n                        <p>Data Not Available</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ng-container>\n\n        \n\n        <ng-container *ngIf="SubTab == \'outgoing\'">\n\n            <div class="transation-tabel" *ngFor="let row of return_out">\n\n                <table>\n\n                    <tr>\n\n                        <td>\n\n                            <div class="point-date">\n\n                                <div class="led-date">Date : {{row.date_created | date:\'d MMM y hh:mm a\'}}</div>\n\n                                <div class="led-amount debit">\n\n                                    <span>Qty: {{row.product_qty}}</span>\n\n                                </div>\n\n                            </div>\n\n                            <div class="point-remark mb0">\n\n                                <div class="date">\n\n                                    {{row.party_detail}}\n\n                                </div>\n\n                            </div>\n\n                        </td>\n\n                    </tr>\n\n                </table>\n\n            </div>\n\n            \n\n            <div class="nothing-here" style="height: 60%;" *ngIf="!return_out?.length">\n\n                <div class="outer">\n\n                    <div class="innear">\n\n                        <img src="assets/imgs/no_found.svg" alt="">\n\n                        <p>Data Not Available</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ng-container>\n\n    </ng-container>\n\n    \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\stock-manage\stock-detail\stock-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], StockDetailPage);
    return StockDetailPage;
}());

//# sourceMappingURL=stock-detail.js.map

/***/ }),

/***/ 1443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stock_detail_stock_detail__ = __webpack_require__(1430);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StockPage = /** @class */ (function () {
    function StockPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.stockListing = [];
        this.stockCounts = [];
        this.ActiveTab = 'in_stock';
        this.filter = {};
    }
    StockPage.prototype.ionViewWillEnter = function () {
        this.getStockList(this.ActiveTab);
    };
    StockPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StockPage');
    };
    StockPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getStockList(this.ActiveTab);
        refresher.complete();
    };
    StockPage.prototype.goOnStockDetail = function (productData) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__stock_detail_stock_detail__["a" /* StockDetailPage */], { "productData": productData });
    };
    StockPage.prototype.getStockList = function (ActiveTab) {
        var _this = this;
        console.log(ActiveTab);
        console.log(this.filter.master_search);
        this.service.presentLoading();
        this.service.addData({ ActiveTab: ActiveTab, master_search: this.filter.master_search }, 'AppStockTransfer/stockListing').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.stockListing = result['result'];
                _this.stockCounts = result['count'];
                console.log(_this.stockListing);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    StockPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stock',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\stock-manage\stock\stock.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Stock</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <div class="search add-search">\n\n            <div class="filter">\n\n                <ion-searchbar type=\'text\' name="master_search" [(ngModel)]="filter.master_search" (keyup.enter)="getStockList(ActiveTab)"></ion-searchbar>\n\n            </div>\n\n        </div>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n    <div class="capsule-tabs">\n\n        <ul>\n\n            <li [ngClass]="{\'active\' : ActiveTab==\'in_stock\'}" (click)="ActiveTab=\'in_stock\' ;getStockList(ActiveTab)">\n\n                <p>In Stock\n\n                    <span>{{stockCounts.in_stock}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'out_stock\'}" (click)="ActiveTab=\'out_stock\';getStockList(ActiveTab)">\n\n                <p>Out Of Stock\n\n                    <span>{{stockCounts.out_stock}}</span>\n\n                </p>\n\n            </li>\n\n        </ul>\n\n    </div>\n\n    \n\n    <!-- <div class="capsule-buttons">\n\n        <ul>\n\n            <i class="material-icons">filter_list</i>\n\n            \n\n            <li class="active">\n\n                <p>Latest Stock</p>\n\n            </li>\n\n            \n\n            <li>\n\n                <p>Top Seller</p>\n\n            </li>\n\n            \n\n            <li>\n\n                <p>Least Seller</p>\n\n            </li>\n\n        </ul>\n\n    </div> -->\n\n    \n\n    <div class="pd-left-right16">\n\n        <div class="list-box mt16" *ngFor="let row of stockListing" (click)="goOnStockDetail(row);">\n\n            <div class="mid mt0">\n\n                <div class="content-info jcc">\n\n                    \n\n                    <div class="right-info" >\n\n                        <p>{{row.product_detail}}</p>\n\n                        \n\n                    </div>\n\n                    \n\n                    <div class="left-info">\n\n                        <div class="circle">{{row.current_stock}}</div>\n\n                    </div>\n\n                </div>\n\n                <div class="tag-info">\n\n                    <a><i class="material-icons">chevron_right</i></a>\n\n                </div>\n\n            </div>\n\n        </div> \n\n    </div>\n\n    \n\n    <div class="nothing-here" *ngIf="!stockListing?.length">\n\n        <div class="outer">\n\n            <div class="innear">\n\n                <img src="assets/imgs/no_found.svg" alt="">\n\n                <p>Data Not Available</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\stock-manage\stock\stock.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], StockPage);
    return StockPage;
}());

//# sourceMappingURL=stock.js.map

/***/ })

});
//# sourceMappingURL=23.js.map