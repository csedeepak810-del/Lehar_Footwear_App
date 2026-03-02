webpackJsonp([9],{

/***/ 1383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendPointRequestListingPageModule", function() { return SendPointRequestListingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__send_point_request_listing__ = __webpack_require__(1422);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SendPointRequestListingPageModule = /** @class */ (function () {
    function SendPointRequestListingPageModule() {
    }
    SendPointRequestListingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__send_point_request_listing__["a" /* SendPointRequestListingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__send_point_request_listing__["a" /* SendPointRequestListingPage */]),
            ],
        })
    ], SendPointRequestListingPageModule);
    return SendPointRequestListingPageModule;
}());

//# sourceMappingURL=send-point-request-listing.module.js.map

/***/ }),

/***/ 1417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendPointReqDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_profile_view_profile__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SendPointReqDetailPage = /** @class */ (function () {
    function SendPointReqDetailPage(navCtrl, constant, navParams, service, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.constant = constant;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.sendPointReqData = {};
        this.productDetails = [];
        this.inputFieldFlag = [false];
        this.url = constant.upload_url1 + 'point_transfer_bill/';
        if (this.navParams.get('id')) {
            this.requestID = this.navParams.get('id');
            console.log(this.requestID);
            this.getSendPointReqDetail(this.requestID);
        }
    }
    SendPointReqDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendPointReqDetailPage');
    };
    SendPointReqDetailPage.prototype.getSendPointReqDetail = function (requestID) {
        var _this = this;
        console.log(requestID);
        this.service.presentLoading();
        this.service.addData({ "requestID": requestID }, "AppStockTransfer/customerRequestDetailForSelf").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.sendPointReqData = result['result'];
                for (var i = 0; i < result['result']['productDetails'].length; i++) {
                    _this.productDetails.push({ 'product_qty': result['result']['productDetails'][i]['product_qty'],
                        'product_detail': result['result']['productDetails'][i]['product_detail'],
                        'id': result['result']['productDetails'][i]['id'],
                        'product_id': result['result']['productDetails'][i]['product_id'],
                        'inputFieldFlag': _this.inputFieldFlag[i] = false
                    });
                }
                console.log(_this.productDetails);
                console.log(_this.sendPointReqData);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SendPointReqDetailPage.prototype.delete_item = function (index, id, requestID) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm ',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.delete_req_item(index, id, requestID);
                    }
                }
            ]
        });
        alert.present();
    };
    SendPointReqDetailPage.prototype.delete_req_item = function (index, id, requestID) {
        var _this = this;
        // this.service.presentLoading();
        this.service.addData({ 'productID': id, 'requestID': requestID }, 'AppStockTransfer/deleteProduct').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.productDetails.splice(index, 1);
                // this.service.dismissLoading();
                _this.service.successToast(result['statusMsg']);
                _this.getSendPointReqDetail(_this.requestID);
                _this.productDetails = [];
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                // this.service.dismissLoading();
            }
        });
    };
    SendPointReqDetailPage.prototype.getEditfieldEnable = function (index) {
        this.inputFieldFlag[index] = true;
    };
    SendPointReqDetailPage.prototype.item_update_data = function (productDetails) {
        var _this = this;
        console.log(productDetails);
        this.service.addData({ 'requestID': this.requestID, 'data': productDetails }, "AppStockTransfer/updateRetailerPointRequest").then(function (result) {
            if (result['statusCode'] == 200) {
                _this.getSendPointReqDetail(_this.requestID);
                _this.productDetails = [];
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismissLoading();
        });
    };
    SendPointReqDetailPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    SendPointReqDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-send-point-req-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\send-point-req-detail\send-point-req-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Send Stock Request Detail</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="list-box">\n\n        <div class="mid mt0">\n\n            <div class="content-info">\n\n                <!-- <div class="left-info" >\n\n                    <div class="circle">{{sendPointReqData.company_name.substring(0,1).toUpperCase()}}</div>\n\n                </div> -->\n\n                \n\n                <div class="right-info" >\n\n                    <p>{{sendPointReqData.company_name}}</p>\n\n                    <p>{{sendPointReqData.name | titlecase}} ({{sendPointReqData.mobile}})</p>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="tag-info">\n\n                <a href="tel:{{sendPointReqData.mobile}}"><i class="material-icons">phone</i></a>\n\n            </div>\n\n        </div>\n\n        \n\n        <div class="upper">\n\n            <div class="left-date">\n\n                <div class="date-section">\n\n                    <p>{{sendPointReqData.date_created | date:\'d MMM y hh:mm a\'}}</p>\n\n                    <p>Date Created</p>\n\n                </div>\n\n                \n\n                <div class="date-section">\n\n                    <p>{{sendPointReqData.total_items ? sendPointReqData.total_items : \'0\'}}</p>\n\n                    <p>Total Item</p>\n\n                </div>\n\n                \n\n                <div class="date-section">\n\n                    <p>{{sendPointReqData.total_item_qty ? sendPointReqData.total_item_qty : \'0\'}}</p>\n\n                    <p>Total Item Qty</p>\n\n                </div>\n\n            </div>\n\n        </div>\n\n        \n\n        <div class="slab mt10">\n\n            <div class="slab-day">\n\n                <span>Status</span>\n\n                <p class="bold" [ngClass]="{\'pending\' : sendPointReqData.status == \'Pending\' , \'approved\' : sendPointReqData.status == \'Approved\' , \'reject\' : sendPointReqData.status == \'Reject\'}">{{sendPointReqData.status}}</p>\n\n            </div>\n\n            <!-- [ngClass]="{\'active\' : distributor_detail.tabActiv==\'Order\'} "  -->\n\n            <div class="slab-day" *ngIf="sendPointReqData.status == \'Reject\'">\n\n                <span>{{sendPointReqData.status}} Remark</span>\n\n                <p class="bold">{{sendPointReqData.reject_reason}}</p>\n\n            </div>\n\n        </div>\n\n        \n\n        <div class="upload-doc padding0" *ngIf="sendPointReqData.bill_image">\n\n            <div class="">\n\n                Attachment\n\n            </div>\n\n            <ul class="padding0" >\n\n                <li class="image-upload">\n\n                    <img (click)="imageModal(url+sendPointReqData.bill_image)" src="{{url+sendPointReqData.bill_image}}">\n\n                </li>\n\n            </ul>\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="pl16 pr16 mb25">\n\n        <ng-container>\n\n            <div class="summary-heading font14 mb8" *ngIf="productDetails.length > 0">ITEM INFORMATION</div>\n\n            \n\n            \n\n            <div class="attendance-list" style="padding : 5px 10px;" *ngFor="let item of productDetails; let i = index;">\n\n                <div class="center-block flat-block">\n\n                    <h1>{{item.product_detail}}</h1>\n\n                    \n\n                    <ng-container *ngIf="sendPointReqData.status == \'Pending\'">\n\n                        <a class="cell-phone" (click)="delete_item(i,item.id,sendPointReqData.id)">\n\n                            <i class="material-icons">delete_sweep</i>\n\n                        </a>\n\n                    </ng-container>\n\n                </div>\n\n                \n\n                <div class="slab slab-three boder-top1 pt5 mt5 dflex jcc align-center">\n\n                    <div class="slab-day">\n\n                        <p class="font10" *ngIf="inputFieldFlag[i] == true">\n\n                            <input class="w60" name="product_qty" [(ngModel)]="item.product_qty" #product_qty="ngModel" type="number">\n\n                        </p>\n\n                        <p *ngIf="inputFieldFlag[i] == false">{{item.product_qty}}</p>\n\n                        <span>Qty</span>\n\n                    </div>\n\n                    \n\n                    <div class="slab-day" *ngIf="sendPointReqData.status == \'Pending\'">\n\n                        <button class="slab-btn edit-bg mr10" [disabled]="inputFieldFlag[i] == true" (click)="getEditfieldEnable(i)">\n\n                            <i class="material-icons">edit</i>\n\n                        </button>\n\n                        \n\n                        <button class="slab-btn save-bg" [disabled]="inputFieldFlag[i] == false" (click)="item_update_data(item,i)">\n\n                            <i class="material-icons">save</i>\n\n                        </button>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ng-container>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\send-point-req-detail\send-point-req-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], SendPointReqDetailPage);
    return SendPointReqDetailPage;
}());

//# sourceMappingURL=send-point-req-detail.js.map

/***/ }),

/***/ 1422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendPointRequestListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__send_point_request_add_send_point_request_add__ = __webpack_require__(1423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__send_point_req_detail_send_point_req_detail__ = __webpack_require__(1417);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SendPointRequestListingPage = /** @class */ (function () {
    function SendPointRequestListingPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.requestList = [];
        this.requestCounts = [];
        this.ActiveTab = 'Pending';
        this.filter = {};
    }
    SendPointRequestListingPage.prototype.ionViewWillEnter = function () {
        this.getRequestList(this.ActiveTab);
    };
    SendPointRequestListingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransferRequestListingPage');
    };
    SendPointRequestListingPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getRequestList(this.ActiveTab);
        refresher.complete();
    };
    SendPointRequestListingPage.prototype.goToSendPointRequest = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__send_point_request_add_send_point_request_add__["a" /* SendPointRequestAddPage */]);
    };
    SendPointRequestListingPage.prototype.getRequestList = function (ActiveTab) {
        var _this = this;
        console.log(ActiveTab);
        console.log(this.filter.master_search);
        this.service.presentLoading();
        this.service.addData({ ActiveTab: ActiveTab, master_search: this.filter.master_search }, 'AppStockTransfer/customerRequestListingForSelf').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.requestList = result['result'];
                _this.requestCounts = result['count'];
                console.log(_this.requestList);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SendPointRequestListingPage.prototype.goOnSendPointReqDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__send_point_req_detail_send_point_req_detail__["a" /* SendPointReqDetailPage */], { id: id });
    };
    SendPointRequestListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-send-point-request-listing',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\send-point-request-listing\send-point-request-listing.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>My Transfer Requests</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <div class="search add-search">\n\n            <div class="filter">\n\n                <ion-searchbar type=\'text\' name="master_search" [(ngModel)]="filter.master_search" (keyup.enter)="getRequestList(ActiveTab)"></ion-searchbar>\n\n            </div>\n\n        </div>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    \n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n    \n\n    <div class="capsule-tabs">\n\n        <ul>\n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Pending\'}" (click)="ActiveTab=\'Pending\' ;getRequestList(ActiveTab)">\n\n                <p>Pending\n\n                    <span>{{requestCounts.Pending}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Approved\'}" (click)="ActiveTab=\'Approved\';getRequestList(ActiveTab)">\n\n                <p>Approved\n\n                    <span>{{requestCounts.Approved}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Reject\'}" (click)="ActiveTab=\'Reject\';getRequestList(ActiveTab)">\n\n                <p>Rejected\n\n                    <span>{{requestCounts.Reject}}</span>\n\n                </p>\n\n            </li>\n\n        </ul>\n\n    </div>\n\n    \n\n    \n\n    <div class="padding16">\n\n        <div class="list-box" *ngFor="let row of requestList" (click)="goOnSendPointReqDetail(row.id)">\n\n            <div class="mid mt0">\n\n                <div class="content-info">\n\n                    <div class="left-info" >\n\n                        <div class="circle">{{row.company_name.substring(0,1).toUpperCase()}}</div>\n\n                    </div>\n\n\n\n                    <div class="right-info" >\n\n                        <p>{{row.company_name.toUpperCase()}}</p>\n\n                        <p>{{row.name | titlecase}} ({{row.mobile}})</p>\n\n                    </div>\n\n                </div>\n\n                \n\n                <div class="tag-info">\n\n                    <a><i class="material-icons">chevron_right</i></a>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="upper">\n\n                <div class="left-date">\n\n                    <div class="date-section">\n\n                        <p>{{row.date_created | date:\'d MMM y hh:mm a\'}}</p>\n\n                        <p>Date Created</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{row.total_items}}</p>\n\n                        <p>Total Item</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{row.total_item_qty}}</p>\n\n                        <p>Total Item Qty</p>\n\n                    </div>\n\n                    \n\n                    <!-- <div class="date-section">\n\n                        <p>{{row.total_points}}</p>\n\n                        <p>Total Point</p>\n\n                    </div> -->\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="nothing-here" style="height: 50%;" *ngIf="!requestList?.length">\n\n        <div class="outer">\n\n            <div class="innear">\n\n                <img src="assets/imgs/no_found.svg" alt="">\n\n                <p>Data Not Available</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    \n\n    <!-- <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)" *ngIf="flag!=1">\n\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n\n        </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll> -->\n\n    \n\n    <ion-fab right bottom>\n\n        <button ion-fab color="primary" (click)="goToSendPointRequest()">\n\n            <ion-icon name="add"></ion-icon>\n\n        </button>\n\n    </ion-fab>\n\n    \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\send-point-request-listing\send-point-request-listing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], SendPointRequestListingPage);
    return SendPointRequestListingPage;
}());

//# sourceMappingURL=send-point-request-listing.js.map

/***/ }),

/***/ 1423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendPointRequestAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__send_point_request_listing_send_point_request_listing__ = __webpack_require__(1422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SendPointRequestAddPage = /** @class */ (function () {
    function SendPointRequestAddPage(Device, navCtrl, navParams, service, alertCtrl, constant, actionSheetController, camera) {
        var _this = this;
        this.Device = Device;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.constant = constant;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.networkList = [];
        this.productList = [];
        this.data = {};
        this.form = {};
        this.Submit_button = false;
        this.spinnerLoader = false;
        this.loginDrData = {};
        this.selectImage = [];
        this.add_list = [];
        this.loginDrData = this.constant.UserLoggedInData;
        console.log(this.loginDrData);
        this.getNetworkList('');
        setTimeout(function () {
            _this.getProductList('');
        }, 800);
    }
    SendPointRequestAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendPointRequestAddPage');
    };
    SendPointRequestAddPage.prototype.searchNetwork = function (event) {
        var _this = this;
        if (event.text == '') {
            this.getNetworkList('');
        }
        this.search = event.text;
        var wordSearch = this.search;
        setTimeout(function () {
            if (wordSearch == _this.search) {
                if (_this.search) {
                    _this.getNetworkList(_this.search);
                }
            }
        }, 500);
    };
    SendPointRequestAddPage.prototype.getNetworkList = function (masterSearch) {
        var _this = this;
        // this.service.presentLoading();
        this.service.addData({ 'master_search': masterSearch }, 'AppStockTransfer/assignedDistributors').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.networkList = result['result'];
                console.log(_this.networkList);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SendPointRequestAddPage.prototype.searchProduct = function (event) {
        var _this = this;
        if (event.text == '') {
            this.getProductList('');
        }
        this.search = event.text;
        var wordSearch = this.search;
        setTimeout(function () {
            if (wordSearch == _this.search) {
                if (_this.search) {
                    _this.getProductList(_this.search);
                }
            }
        }, 500);
    };
    SendPointRequestAddPage.prototype.getProductList = function (masterSearch) {
        var _this = this;
        // this.service.presentLoading();
        this.service.addData({ 'master_search': masterSearch }, 'AppStockTransfer/fetchNonScannedProduct').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.productList = result['result'];
                console.log(_this.productList);
                for (var index = 0; index < _this.productList.length; index++) {
                    _this.productList[index].display_name = _this.productList[index].product_name + " - " + _this.productList[index].product_code;
                }
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SendPointRequestAddPage.prototype.addToList = function () {
        var _this = this;
        console.log(this.data);
        console.log(this.add_list);
        var newData;
        newData = this.data;
        if (this.add_list.length == 0) {
            console.log('1');
            this.add_list.push({ 'product': newData.product, 'qty': newData.qty, 'requested_points': newData.requested_points });
            console.log(newData, 'newData');
            console.log(this.add_list, 'newData');
        }
        else {
            var existIndex = this.add_list.findIndex(function (row) { return (row.product.id == _this.data['product']['id']); });
            console.log(existIndex);
            if (existIndex != -1) {
                // console.log('1');
                // this.service.errorToast('Already same product added to items')
                console.log(typeof newData.qty);
                this.add_list[existIndex].qty = parseInt(this.add_list[existIndex].qty) + parseInt(newData.qty);
                this.add_list[existIndex].requested_points = parseInt(this.add_list[existIndex].requested_points) + parseInt(newData.requested_points);
            }
            else {
                console.log('1');
                this.add_list.push({ 'product': newData.product, 'qty': newData.qty, 'requested_points': newData.requested_points });
            }
        }
        this.data.product = '';
        this.data.qty = '';
        this.data.requested_points = '';
        console.log(this.add_list);
    };
    SendPointRequestAddPage.prototype.DeleteItem = function (i) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: 'Your Want To Delete This Item ',
            cssClass: 'alert-modal',
            buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.add_list.splice(i, 1);
                    }
                }]
        });
        alert.present();
    };
    SendPointRequestAddPage.prototype.submitTransferRequest = function () {
        var _this = this;
        console.log(this.data);
        console.log(this.add_list);
        this.data.image = this.selectImage;
        var alert = this.alertCtrl.create({
            title: 'Save !',
            message: 'Do you want to Save this ?',
            cssClass: 'alert-modal',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.data.requestItems = _this.add_list;
                        _this.service.addData({ 'data': _this.data }, 'AppStockTransfer/distributorPointTransferRequest').then(function (result) {
                            if (result['statusCode'] == 200) {
                                _this.spinnerLoader = true;
                                _this.Submit_button = true;
                                _this.service.successToast(result['statusMsg']);
                                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_3__send_point_request_listing_send_point_request_listing__["a" /* SendPointRequestListingPage */]);
                            }
                            else {
                                _this.spinnerLoader = false;
                                _this.Submit_button = false;
                                _this.service.errorToast(result['statusMsg']);
                            }
                        }, function (error) {
                            _this.Submit_button = false;
                            _this.spinnerLoader = false;
                            _this.service.Error_msg(error);
                            _this.service.dismiss();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    SendPointRequestAddPage.prototype.MobileNumber = function (event) {
        var pattern = /^[0-9+\- ]+$/;
        // const pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    SendPointRequestAddPage.prototype.getfieldsClear = function () {
        this.data.qty = '';
        this.data.requested_points = '';
    };
    SendPointRequestAddPage.prototype.getPointCalculation = function (data) {
        console.log(data);
        console.log(data.product.dealer_point);
        console.log(data.qty);
        this.data.requested_points = data.product.dealer_point * data.qty;
        console.log(this.data.requested_points);
        if (this.data.requested_points == 0) {
            this.service.errorToast('Selected Product Point Value is 0');
            this.data.requested_points = '';
            console.log(this.data.requested_points);
        }
    };
    SendPointRequestAddPage.prototype.onUploadChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: 'Upload File',
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: 'Gallery',
                    icon: 'image',
                    handler: function () {
                        _this.getImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        _this.selectImage = [];
                    }
                }]
        });
        actionsheet.present();
    };
    SendPointRequestAddPage.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            var image = 'data:image/jpeg;base64,' + imageData;
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.stop();
            }
            _this.selectImage.push(image);
        }, function (err) {
        });
    };
    SendPointRequestAddPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            var image = 'data:image/jpeg;base64,' + imageData;
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.stop();
            }
            _this.selectImage.push(image);
        }, function (err) {
        });
    };
    SendPointRequestAddPage.prototype.delete_img = function (index) {
        this.selectImage.splice(index, 1);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dealerSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], SendPointRequestAddPage.prototype, "dealerSelectable", void 0);
    SendPointRequestAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-send-point-request-add',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\send-point-request-add\send-point-request-add.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Send Stock Request</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="padding16">\n\n        <div class="edit">\n\n            <!-- <form name="requestform" #requestform="ngForm" (ngSubmit)="requestform.valid && submitTransferRequest()"> -->\n\n                <ion-list>\n\n                    <ion-item class="cs-normal-select retailerSelectionBox mt16" >\n\n                        <ion-label><span>Select Distributor <span>*</span></span></ion-label>\n\n                        <ionic-selectable name="drData" item-content [(ngModel)]="data.drData" #drData="ngModel" [items]="networkList" itemValueField="id" itemTextField="name" [hasVirtualScroll]="true" [canSearch]="true" #dealerSelectable (onSearch)="searchNetwork($event)" required></ionic-selectable>\n\n                    </ion-item>\n\n                    \n\n                    <ion-item class="mb0 cs-normal-select retailerSelectionBox mt16">\n\n                        <ion-label><span>Select Product<span>*</span></span></ion-label>\n\n                        <ionic-selectable item-content name="product" [(ngModel)]="data.product" #product="ngModel" [items]="productList" itemValueField="id" itemTextField="display_name" [hasVirtualScroll]="true" [canSearch]="true" #distributorSelectable (onSearch)="searchProduct($event)" (ngModelChange)="getfieldsClear()" required></ionic-selectable>\n\n                    </ion-item>\n\n                    \n\n                    <ion-item >\n\n                        <ion-label floating><span>Qty <strong>*</strong></span></ion-label>\n\n                        <ion-input type="number" name="qty" #qty="ngModel" [(ngModel)]="data.qty" [disabled]= "!data.product" (keypress)="MobileNumber($event)"  (ngModelChange)="getPointCalculation(data)" required></ion-input>\n\n                    </ion-item>\n\n                    \n\n                    <ion-item hidden>\n\n                        <ion-label floating><span>Points <strong>*</strong></span></ion-label>\n\n                        <ion-input type="text" name="requested_points" #requested_points="ngModel" [(ngModel)]="data.requested_points" readonly required></ion-input>\n\n                    </ion-item>\n\n                    \n\n                    <div class="mt16">\n\n                        <button type="text" ion-button class="cs-btn" [disabled]="!data.drData || !data.product || !data.qty" (click)="addToList()">Add To List</button>\n\n                    </div>\n\n                    \n\n                    <div class="cs-heading1 pl0" *ngIf="add_list.length">\n\n                        <p>PRODUCT INFORMATION</p>\n\n                    </div>\n\n                    \n\n                    <div class="list-box mt10"  *ngFor="let row of add_list;let i=index">\n\n                        <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n                            <div class="content-info">\n\n                                <div class="right-info">\n\n                                    <div class="mt2 mb2" style="display:flex; flex-direction:row">\n\n                                        <p class="pr2" style="color:rgb(255, 153, 0)">#{{i+1}} </p>\n\n                                        <p> {{row.product.product_name}} ({{row.product.product_code}})</p>\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                            <div class="tag-info">\n\n                                <button><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></button>\n\n                            </div>\n\n                        </div>\n\n                        \n\n                        <div class="three_boxes">\n\n                            <div class="lower ">\n\n                                <p class="font10">Qty</p>\n\n                                <p class="font10">{{row.qty}}</p>\n\n                            </div>\n\n\n\n                            <!-- <div class="lower ">\n\n                                <p class="font10">Scheme Points</p>\n\n                                <p class="font10">{{row.requested_points}}</p>\n\n                            </div> -->\n\n                        </div>\n\n                    </div>\n\n                    \n\n                    <!-- <ion-item class="cs-textarea1">\n\n                        <ion-label floating><span>Description</span></ion-label>\n\n                        <ion-textarea name="description" [(ngModel)]="data.description" #description="ngModel"></ion-textarea>\n\n                    </ion-item> -->\n\n                </ion-list>\n\n                \n\n                <div class="upload-doc">\n\n                    <div class="">\n\n                        Attachment\n\n                    </div>\n\n                    <ul class="padding0">\n\n                        <li class="add-image" (click)="onUploadChange()">\n\n                            <i class="material-icons">add_a_photo</i>\n\n                        </li>\n\n                        <li class="image-upload" *ngFor="let image of selectImage;index as i">\n\n                            <img src="{{image}}">\n\n                            <button class="del" (click)="delete_img(i)"><i class="material-icons">delete_sweep</i></button>\n\n                        </li>\n\n                    </ul>\n\n                </div>\n\n                \n\n                \n\n                <div class="text-right mt16" *ngIf="add_list.length">\n\n                    <button ion-button block color="primary" [disabled]="Submit_button || !add_list.length" (click)="submitTransferRequest()">\n\n                        <ion-spinner *ngIf="spinnerLoader"></ion-spinner>\n\n                        Submit\n\n                    </button>\n\n                </div>\n\n            <!-- </form> -->\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\send-point-request-add\send-point-request-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]])
    ], SendPointRequestAddPage);
    return SendPointRequestAddPage;
}());

//# sourceMappingURL=send-point-request-add.js.map

/***/ })

});
//# sourceMappingURL=9.js.map