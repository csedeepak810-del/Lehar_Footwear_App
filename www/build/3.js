webpackJsonp([3],{

/***/ 1382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferRequestAddPageModule", function() { return TransferRequestAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_request_add__ = __webpack_require__(1407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TransferRequestAddPageModule = /** @class */ (function () {
    function TransferRequestAddPageModule() {
    }
    TransferRequestAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transfer_request_add__["a" /* TransferRequestAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__transfer_request_add__["a" /* TransferRequestAddPage */]),
                __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["b" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__["SelectSearchableModule"]
            ],
        })
    ], TransferRequestAddPageModule);
    return TransferRequestAddPageModule;
}());

//# sourceMappingURL=transfer-request-add.module.js.map

/***/ }),

/***/ 1407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferRequestAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transfer_request_listing_transfer_request_listing__ = __webpack_require__(1408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__return_point_listing_return_point_listing__ = __webpack_require__(1413);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TransferRequestAddPage = /** @class */ (function () {
    function TransferRequestAddPage(navCtrl, constant, navParams, service, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.constant = constant;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.data = {};
        this.form = {};
        this.add_list = [];
        this.networkList = [];
        this.tempdrData = [];
        this.drList = [];
        // drData: any = [];
        this.productList = [];
        this.Submit_button = false;
        this.spinnerLoader = false;
        this.loginDrData = {};
        this.type = {};
        this.loginDrData = this.constant.UserLoggedInData;
        console.log(this.loginDrData);
        if (this.navParams.get('type')) {
            this.data.type = this.navParams.get('type');
            console.log(this.data.type);
        }
        else {
            this.data.type = 'Transfer';
            console.log(this.data.type);
        }
        this.getNetworkList('');
        setTimeout(function () {
            _this.getProductList('');
        }, 800);
    }
    TransferRequestAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransferRequestAddPage');
    };
    TransferRequestAddPage.prototype.MobileNumber = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    TransferRequestAddPage.prototype.searchNetwork = function (event) {
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
    TransferRequestAddPage.prototype.getNetworkList = function (masterSearch) {
        var _this = this;
        console.log(masterSearch);
        console.log(this.loginDrData.type);
        if (this.loginDrData.type == 3) {
            console.log('1');
            if (masterSearch.length == 10) {
                // this.service.presentLoading();
                this.service.addData({ 'master_search': masterSearch }, 'AppStockTransfer/assignedCustomer').then(function (result) {
                    console.log(result);
                    if (result['statusCode'] == 200) {
                        _this.service.dismissLoading();
                        if (result['result'] != '') {
                            _this.tempdrData = result['result'][0];
                            console.log(_this.tempdrData);
                            if (_this.data.type == 'Transfer') {
                                _this.data.drData = _this.tempdrData.mobile_no;
                                console.log(_this.data.drData);
                            }
                            else {
                                _this.data.drData = _this.tempdrData;
                                console.log(_this.data.drData);
                            }
                        }
                        else {
                            _this.service.errorToast('Not Exist');
                        }
                    }
                    else {
                        _this.service.dismissLoading();
                        _this.service.errorToast(result['statusMsg']);
                    }
                }, function (err) {
                    _this.service.dismissLoading();
                });
            }
        }
        else {
            // this.service.presentLoading();
            this.service.addData({ 'master_search': masterSearch }, 'AppStockTransfer/assignedCustomer').then(function (result) {
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
        }
    };
    TransferRequestAddPage.prototype.searchProduct = function (event) {
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
    TransferRequestAddPage.prototype.getProductList = function (masterSearch) {
        var _this = this;
        // this.service.presentLoading();
        this.service.addData({ 'master_search': masterSearch }, this.data.type == 'Transfer' ? 'AppStockTransfer/fetchNonScannedProduct' : 'AppStockTransfer/fetchProduct').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                // this.service.dismissLoading();
                _this.productList = result['result'];
                console.log(_this.productList);
                for (var index = 0; index < _this.productList.length; index++) {
                    _this.productList[index].display_name = _this.productList[index].product_name + " - " + _this.productList[index].product_code;
                }
            }
            else {
                // this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            // this.service.dismissLoading();
        });
    };
    TransferRequestAddPage.prototype.addToList = function () {
        var _this = this;
        console.log(this.data);
        console.log(this.add_list);
        var newData;
        newData = this.data;
        if (this.add_list.length == 0) {
            console.log('1');
            this.add_list.push({ 'product': newData.product, 'qty': newData.qty, 'transferPoints': newData.transferPoints });
            console.log(newData, 'newData');
            console.log(this.add_list, 'newData');
        }
        else {
            var existIndex = this.add_list.findIndex(function (row) { return (row.product.id == _this.data['product']['id']); });
            console.log(existIndex);
            if (existIndex != -1) {
                // console.log('1');
                this.service.errorToast('Already same product added to items');
                console.log(typeof newData.qty);
                // this.add_list[existIndex].qty=parseInt(this.add_list[existIndex].qty)+parseInt(newData.qty);
                // this.add_list[existIndex].transferPoints = parseInt(this.add_list[existIndex].transferPoints)+parseInt(newData.transferPoints);
            }
            else {
                console.log('1');
                this.add_list.push({ 'product': newData.product, 'qty': newData.qty, 'transferPoints': newData.transferPoints });
            }
        }
        this.data.product = '';
        this.data.qty = '';
        this.data.transferPoints = '';
        console.log(this.add_list);
    };
    TransferRequestAddPage.prototype.DeleteItem = function (i) {
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
    TransferRequestAddPage.prototype.submitTransferRequest = function () {
        var _this = this;
        console.log(this.data);
        console.log(this.add_list);
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
                        if (_this.data.type == 'Transfer') {
                            if (_this.loginDrData.type == 1) {
                                _this.service.addData({ 'data': _this.data }, 'AppStockTransfer/sendCustomerPoints').then(function (result) {
                                    if (result['statusCode'] == 200) {
                                        _this.spinnerLoader = true;
                                        _this.Submit_button = true;
                                        _this.service.successToast(result['statusMsg']);
                                        _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_4__transfer_request_listing_transfer_request_listing__["a" /* TransferRequestListingPage */]);
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
                            else {
                                _this.service.addData({ 'data': _this.data }, 'AppStockTransfer/sendInfluencerPoints').then(function (result) {
                                    if (result['statusCode'] == 200) {
                                        _this.spinnerLoader = true;
                                        _this.Submit_button = true;
                                        _this.service.successToast(result['statusMsg']);
                                        _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_4__transfer_request_listing_transfer_request_listing__["a" /* TransferRequestListingPage */]);
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
                        else {
                            console.log(_this.data.type);
                            _this.service.addData({ 'data': _this.data }, _this.loginDrData.type == 3 ? 'AppStockTransfer/salesReturnInfluencer' : 'AppStockTransfer/salesReturnRetailer').then(function (result) {
                                if (result['statusCode'] == 200 && result['statusMsg'] == 'Success') {
                                    _this.spinnerLoader = true;
                                    _this.Submit_button = true;
                                    _this.service.successToast(result['statusMsg']);
                                    _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_6__return_point_listing_return_point_listing__["a" /* ReturnPointListingPage */]);
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
                }
            ]
        });
        alert.present();
    };
    TransferRequestAddPage.prototype.getfieldsClear = function () {
        this.data.qty = '';
        this.data.transferPoints = '';
    };
    TransferRequestAddPage.prototype.getPointCalculation = function (data) {
        console.log(data);
        console.log(data.product.dealer_point);
        console.log(data.product.influencer_point);
        console.log(data.qty);
        if (this.loginDrData.type == 3) {
            console.log('In Con. 1');
            this.data.transferPoints = data.product.influencer_point * data.qty;
        }
        else {
            console.log('In Con. 2');
            this.data.transferPoints = data.product.dealer_point * data.qty;
        }
        console.log(this.data.transferPoints);
        if (this.data.transferPoints == 0) {
            // this.service.errorToast('Selected Product Point Value is 0');
            this.data.transferPoints = '';
            console.log(this.data.transferPoints);
        }
    };
    TransferRequestAddPage.prototype.stockCheck = function () {
        console.log(this.data);
        console.log(this.data.product.current_stock);
        if (this.data.qty > this.data.product.current_stock) {
            this.service.errorToast('Less Stock!, Current Stock of this product is ' + this.data.product.current_stock);
            this.data.qty = '';
            this.data.transferPoints = '';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dealerSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], TransferRequestAddPage.prototype, "dealerSelectable", void 0);
    TransferRequestAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transfer-request-add',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-request-add\transfer-request-add.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{data.type}} Stock {{data.type == \'Transfer\' ? \'To\' : \'From\'}} {{loginDrData.type == 3 ? \'Plumber\' : \'Dealer\'}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="padding16">\n\n        <div class="edit">\n\n            <!-- <form name="requestform" #requestform="ngForm" (ngSubmit)="requestform.valid && submitTransferRequest()"> -->\n\n                <ion-list>\n\n                    \n\n                    <!-- <ion-item class="cs-normal-select retailerSelectionBox mt16" >\n\n                        <ion-label><span>Select Type <span>*</span></span></ion-label>\n\n                        <ion-select name="type" [(ngModel)]="data.type" #type="ngModel">\n\n                            <ion-option value="Transfer">Transfer</ion-option>\n\n                            <ion-option value="Return">Return</ion-option>\n\n                        </ion-select>\n\n                    </ion-item> -->\n\n                    \n\n                    <ion-item *ngIf="loginDrData.type == 3">\n\n                        <ion-label floating><span>Search Plumber Number <strong>*</strong></span></ion-label>\n\n                        <ion-input type="tel" [(ngModel)]="data.mobile" #mobile="ngModel" name="mobile" (keypress)="MobileNumber($event)" min="0" minLength="10" maxLength="10" (ngModelChange)=" getNetworkList(data.mobile)" required></ion-input>\n\n                    </ion-item>\n\n                    \n\n                    <div class="list-box mt10" *ngIf="loginDrData.type == 3 && data.mobile && data.mobile.length == 10 && tempdrData.name">\n\n                        <div class="mid mt0">\n\n                            <div class="content-info">\n\n                                <div class="left-info">\n\n                                    <div class="circle">{{tempdrData.name ? (tempdrData.name.substring(0,1).toUpperCase()) : \'\'}}</div>\n\n                                </div>\n\n                                <div class="right-info" >\n\n                                    <p>{{tempdrData.name ? tempdrData.name : \'---\'}}</p>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    \n\n                    <ion-item class="cs-normal-select retailerSelectionBox mt16" *ngIf="loginDrData.type != 3">\n\n                        <ion-label><span>Select {{loginDrData.type == 3 ? \' / Search Plumber\' : \'Dealer\'}} <span>*</span></span></ion-label>\n\n                        <ionic-selectable name="drData" item-content [(ngModel)]="data.drData" #drData="ngModel" [items]="networkList" itemValueField="id" itemTextField="name" [hasVirtualScroll]="true" [canSearch]="true" #dealerSelectable (onSearch)="searchNetwork($event)" required></ionic-selectable>\n\n                    </ion-item>\n\n                    \n\n                    <ion-item class="cs-normal-select retailerSelectionBox mt16">\n\n                        <ion-label><span>Select Product<span>*</span></span></ion-label>\n\n                        <ionic-selectable item-content name="product" [(ngModel)]="data.product " #product="ngModel" [items]="productList" itemValueField="id" itemTextField="display_name" [hasVirtualScroll]="true" [canSearch]="true" #distributorSelectable (onSearch)="searchProduct($event)" (ngModelChange)="getfieldsClear()" required></ionic-selectable>\n\n                    </ion-item>\n\n                    \n\n                    <ion-item>\n\n                        <ion-label floating><span>Qty <strong>*</strong></span></ion-label>\n\n                        <ion-input type="number" name="qty" #qty="ngModel" [(ngModel)]="data.qty" [disabled]= "!data.product" (keypress)="MobileNumber($event)"  (ngModelChange)="getPointCalculation(data);stockCheck(data.qty)" required *ngIf="data.type == \'Transfer\'"></ion-input>\n\n                        <ion-input type="number" name="qty" #qty="ngModel" [(ngModel)]="data.qty" [disabled]= "!data.product" (keypress)="MobileNumber($event)"  required  *ngIf="data.type == \'Return\'"></ion-input>\n\n                    </ion-item>\n\n                    \n\n                    <ion-item hidden>\n\n                        <ion-label floating><span>Points <strong>*</strong></span></ion-label>\n\n                        <ion-input type="text" name="transferPoints" #transferPoints="ngModel" [(ngModel)]="data.transferPoints" readonly required></ion-input>\n\n                    </ion-item>\n\n                    \n\n                    <div class="mt16">\n\n                        <button type="text" ion-button class="cs-btn" [disabled]="!data.type || (loginDrData.type == 3 ?  !data.mobile : !data.drData) || !data.product || !data.qty" (click)="addToList()">Add To List</button>\n\n                    </div>\n\n                    \n\n                    <div class="cs-heading1 pl0" *ngIf="add_list.length">\n\n                        <p>PRODUCT INFORMATION</p>\n\n                    </div>\n\n                    \n\n                    <div class="list-box mt10"  *ngFor="let row of add_list;let i=index">\n\n                        <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n                            <div class="content-info">\n\n                                <div class="right-info">\n\n                                    <div class="mt2 mb2" style="display:flex; flex-direction:row">\n\n                                        <p class="pr2" style="color:rgb(255, 153, 0)">#{{i+1}} </p>\n\n                                        <p> {{row.product.product_name}} ({{row.product.product_code}})</p>\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                            <div class="tag-info">\n\n                                <button><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></button>\n\n                            </div>\n\n                        </div>\n\n                        \n\n                        <div class="three_boxes">\n\n                            <div class="lower ">\n\n                                <p class="font10">Qty</p>\n\n                                <p class="font10">{{row.qty}}</p>\n\n                            </div>\n\n                            \n\n                            <!-- <div class="lower ">\n\n                                <p class="font10">Scheme Points</p>\n\n                                <p class="font10">{{row.transferPoints}}</p>\n\n                            </div> -->\n\n                        </div>\n\n                    </div>\n\n                    \n\n                    <!-- <ion-item class="cs-textarea1">\n\n                        <ion-label floating><span>Remark</span></ion-label>\n\n                        <ion-textarea name="remark" [(ngModel)]="data.remark" #remark="ngModel"></ion-textarea>\n\n                    </ion-item> -->\n\n                </ion-list>\n\n                \n\n                \n\n                <div class="text-right mt16">\n\n                    <button ion-button block color="primary" [disabled]="Submit_button || !add_list.length" (click)="submitTransferRequest()">\n\n                        <ion-spinner *ngIf="spinnerLoader"></ion-spinner>\n\n                        Submit\n\n                    </button>\n\n                </div>\n\n                <!-- </form> -->\n\n            </div>\n\n        </div>\n\n    </ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-request-add\transfer-request-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], TransferRequestAddPage);
    return TransferRequestAddPage;
}());

//# sourceMappingURL=transfer-request-add.js.map

/***/ }),

/***/ 1408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferRequestListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_request_detail_transfer_request_detail__ = __webpack_require__(1414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transfer_request_add_transfer_request_add__ = __webpack_require__(1407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_myservice_myservice__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
* Generated class for the TransferRequestListingPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var TransferRequestListingPage = /** @class */ (function () {
    function TransferRequestListingPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.transferReqList = [];
        this.transferReqCounts = [];
        this.ActiveTab = 'Pending';
        this.filter = {};
    }
    TransferRequestListingPage.prototype.ionViewWillEnter = function () {
        this.getTransferRequestList(this.ActiveTab);
    };
    TransferRequestListingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransferRequestListingPage');
    };
    TransferRequestListingPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getTransferRequestList(this.ActiveTab);
        refresher.complete();
    };
    TransferRequestListingPage.prototype.goToTransferReqyestDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__transfer_request_detail_transfer_request_detail__["a" /* TransferRequestDetailPage */], { id: id });
    };
    TransferRequestListingPage.prototype.goToSendPoints = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__transfer_request_add_transfer_request_add__["a" /* TransferRequestAddPage */]);
    };
    TransferRequestListingPage.prototype.getTransferRequestList = function (ActiveTab) {
        var _this = this;
        console.log(ActiveTab);
        console.log(this.filter.master_search);
        this.service.presentLoading();
        this.service.addData({ ActiveTab: ActiveTab, master_search: this.filter.master_search }, 'AppStockTransfer/customerPointsRequestListing').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.transferReqList = result['result'];
                _this.transferReqCounts = result['count'];
                console.log(_this.transferReqList);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    TransferRequestListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transfer-request-listing',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-request-listing\transfer-request-listing.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Dealer Transfer Requests</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <div class="search add-search">\n\n            <div class="filter">\n\n                <ion-searchbar type=\'text\' name="master_search" [(ngModel)]="filter.master_search" (keyup.enter)="getTransferRequestList(ActiveTab)"></ion-searchbar>\n\n            </div>\n\n        </div>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    \n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n    <div class="capsule-tabs">\n\n        <ul>\n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Pending\'}" (click)="ActiveTab=\'Pending\' ;getTransferRequestList(ActiveTab)">\n\n                <p>Pending\n\n                    <span>{{transferReqCounts.Pending}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Approved\'}" (click)="ActiveTab=\'Approved\';getTransferRequestList(ActiveTab)">\n\n                <p>Approved\n\n                    <span>{{transferReqCounts.Approved}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Reject\'}" (click)="ActiveTab=\'Reject\';getTransferRequestList(ActiveTab)">\n\n                <p>Rejected\n\n                    <span>{{transferReqCounts.Reject}}</span>\n\n                </p>\n\n            </li>\n\n        </ul>\n\n    </div>\n\n    \n\n    <div class="padding16">\n\n        <div class="list-box" *ngFor="let row of transferReqList" (click)="goToTransferReqyestDetail(row.id)">\n\n            <div class="mid mt0">\n\n                <div class="content-info">\n\n                    <div class="left-info" >\n\n                        <div class="circle">{{row.company_name.substring(0,1).toUpperCase()}}</div>\n\n                    </div>\n\n                    \n\n                    <div class="right-info" >\n\n                        <p>{{row.company_name.toUpperCase()}}</p>\n\n                        <p>{{row.name | titlecase}} ({{row.mobile}})</p>\n\n                    </div>\n\n                </div>\n\n                \n\n                <div class="tag-info">\n\n                    <a><i class="material-icons">chevron_right</i></a>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="upper">\n\n                <div class="left-date">\n\n                    <div class="date-section">\n\n                        <p>{{row.date_created | date:\'d MMM y hh:mm a\'}}</p>\n\n                        <p>Date Created</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{row.total_items ? row.total_items : \'0\'}}</p>\n\n                        <p>Total Item</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{row.total_item_qty ? row.total_item_qty : \'0\'}}</p>\n\n                        <p>Total Item Qty</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="lower" *ngIf="row.remark">\n\n                <p>Reject Remark</p>\n\n                <p>{{row.remark ? row.remark : \'-\'}}</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="nothing-here" style="height: 70%;" *ngIf="!transferReqList?.length">\n\n        <div class="outer">\n\n            <div class="innear">\n\n                <img src="assets/imgs/no_found.svg" alt="">\n\n                <p>Data Not Available</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    \n\n    <ion-fab right bottom>\n\n        <button ion-fab color="primary" (click)="goToSendPoints()">\n\n            <ion-icon name="add"></ion-icon>\n\n        </button>\n\n    </ion-fab>\n\n    \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-request-listing\transfer-request-listing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], TransferRequestListingPage);
    return TransferRequestListingPage;
}());

//# sourceMappingURL=transfer-request-listing.js.map

/***/ }),

/***/ 1411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReturnPointDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_constant_constant__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReturnPointDetailPage = /** @class */ (function () {
    function ReturnPointDetailPage(navCtrl, navParams, service, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.constant = constant;
        this.loginDrData = {};
        this.returnPointData = {};
        this.productDetails = [];
        this.inputFieldFlag = [false];
        this.loginDrData = this.constant.UserLoggedInData;
        console.log(this.loginDrData);
        if (this.navParams.get('id')) {
            this.returnID = this.navParams.get('id');
            console.log(this.returnID);
            this.getReturnPointDetail(this.returnID);
        }
    }
    ReturnPointDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReturnPointDetailPage');
    };
    ReturnPointDetailPage.prototype.getReturnPointDetail = function (returnID) {
        var _this = this;
        console.log(returnID);
        this.service.presentLoading();
        this.service.addData({ "returnID": returnID }, this.loginDrData.type == 3 ? "AppStockTransfer/salesReturnInfluencerDetail" : "AppStockTransfer/salesReturnRetailerDetail").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.returnPointData = result['result'];
                _this.productDetails = _this.returnPointData['product_detail'];
                console.log(_this.productDetails);
                console.log(_this.returnPointData);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    ReturnPointDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-return-point-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\return-point-detail\return-point-detail.html"*/'\n\n<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Return Detail</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="list-box">\n\n        <div class="mid mt0">\n\n            <div class="content-info">                \n\n                <div class="right-info" >\n\n                    <p *ngIf="returnPointData.company_name">{{returnPointData.company_name}}</p>\n\n                    <p>{{returnPointData.returner_detail | titlecase}}</p>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="tag-info">\n\n                <a href="tel:{{returnPointData.mobile}}"><i class="material-icons">phone</i></a>\n\n            </div>\n\n        </div>\n\n        \n\n        <div class="upper">\n\n            <div class="left-date">\n\n                <div class="date-section">\n\n                    <p>{{returnPointData.date_created| date:\'d MMM y\'}}</p>\n\n                    <p>Date Created</p>\n\n                </div>\n\n                \n\n                <div class="date-section">\n\n                    <p>{{returnPointData.total_items ? returnPointData.total_items : \'0\'}}</p>\n\n                    <p>Total Item</p>\n\n                </div>\n\n                \n\n                <div class="date-section">\n\n                    <p>{{returnPointData.total_items_qty ? returnPointData.total_items_qty : \'0\'}}</p>\n\n                    <p>Total Item Qty</p>\n\n                </div>\n\n            </div>\n\n        </div>\n\n\    </div>\n\n    \n\n    <div class="pl16 pr16 mb25">\n\n        <ng-container>\n\n            <div class="summary-heading font14 mb8" *ngIf="productDetails && productDetails.length">ITEM INFORMATION</div>\n\n            \n\n            \n\n            <div class="attendance-list" style="padding : 5px 10px;" *ngFor="let item of productDetails; let i = index;">\n\n                <div class="center-block flat-block">\n\n                    <h1>{{item.product_detail}}</h1>\n\n                </div>\n\n                \n\n                <div class="slab slab-three boder-top1 pt5 mt5 dflex jcc align-center">\n\n                    <div class="slab-day">\n\n                        <p>{{item.product_qty}}</p>\n\n                        <span>Qty</span>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ng-container>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\return-point-detail\return-point-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_constant_constant__["a" /* ConstantProvider */]])
    ], ReturnPointDetailPage);
    return ReturnPointDetailPage;
}());

//# sourceMappingURL=return-point-detail.js.map

/***/ }),

/***/ 1413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReturnPointListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transfer_request_add_transfer_request_add__ = __webpack_require__(1407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__return_point_detail_return_point_detail__ = __webpack_require__(1411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ReturnPointListingPage = /** @class */ (function () {
    function ReturnPointListingPage(navCtrl, navParams, service, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.constant = constant;
        this.returnList = [];
        this.returnCounts = [];
        this.ActiveTab = 'Transfer';
        this.filter = {};
        this.loginDrData = {};
        this.loginDrData = this.constant.UserLoggedInData;
        console.log(this.loginDrData);
    }
    ReturnPointListingPage.prototype.ionViewWillEnter = function () {
        this.getReturnList(this.ActiveTab);
    };
    ReturnPointListingPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getReturnList(this.ActiveTab);
        refresher.complete();
    };
    ReturnPointListingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReturnPointListingPage');
    };
    ReturnPointListingPage.prototype.getReturnList = function (ActiveTab) {
        var _this = this;
        console.log(ActiveTab);
        console.log(this.filter.master_search);
        this.service.presentLoading();
        this.service.addData({ ActiveTab: ActiveTab, master_search: this.filter.master_search }, this.loginDrData.type == 3 ? 'AppStockTransfer/salesReturnInfluencerListing' : 'AppStockTransfer/salesReturnRetailerListing').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.returnList = result['result'];
                _this.returnCounts = result['count'];
                console.log(_this.returnList);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    ReturnPointListingPage.prototype.goToReturnPointRequestAdd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__transfer_request_add_transfer_request_add__["a" /* TransferRequestAddPage */], { 'type': 'Return' });
    };
    ReturnPointListingPage.prototype.goOnReturnPointReqDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__return_point_detail_return_point_detail__["a" /* ReturnPointDetailPage */], { id: id });
    };
    ReturnPointListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-return-point-listing',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\return-point-listing\return-point-listing.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Return Listing</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar>\n\n    <div class="search add-search">\n\n      <div class="filter">\n\n        <ion-searchbar type=\'text\' name="master_search" [(ngModel)]="filter.master_search" (keyup.enter)="getReturnList(ActiveTab)"></ion-searchbar>\n\n      </div>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  \n\n  <div class="capsule-tabs">\n\n    <ul>\n\n      <li [ngClass]="{\'active\' : ActiveTab==\'Transfer\'}" (click)="ActiveTab=\'Transfer\' ;getReturnList(ActiveTab)">\n\n        <p>Transfer\n\n          <!-- <span>{{returnCounts.Transfer}}</span> -->\n\n        </p>\n\n      </li>\n\n      \n\n      <li [ngClass]="{\'active\' : ActiveTab==\'Scan\'}" (click)="ActiveTab=\'Scan\';getReturnList(ActiveTab)">\n\n        <p>Scan\n\n          <!-- <span>{{returnCounts.Scan}}</span> -->\n\n        </p>\n\n      </li>\n\n    </ul>\n\n  </div>\n\n  \n\n  <div class="padding16">\n\n    <div class="list-box" *ngFor="let row of returnList" (click)="goOnReturnPointReqDetail(row.id)">\n\n      <div class="mid mt0">\n\n        <div class="content-info">\n\n          <div class="left-info" *ngIf="row.company_name">\n\n            <div class="circle">{{row.company_name.substring(0,1).toUpperCase()}}</div>\n\n          </div>\n\n          \n\n          <div class="right-info">\n\n            <p *ngIf="row.company_name">{{row.company_name | titlecase}}</p>\n\n            <p>{{row.influencer_detail | titlecase}}</p>\n\n          </div>\n\n        </div>\n\n        \n\n        <div class="tag-info">\n\n          <a><i class="material-icons">chevron_right</i></a>\n\n        </div>\n\n      </div>\n\n      \n\n      <div class="upper">\n\n        <div class="left-date">\n\n          <div class="date-section">\n\n            <p>{{row.date_created | date:\'d MMM y hh:mm a\'}}</p>\n\n            <p>Date Created</p>\n\n          </div>\n\n          \n\n          <div class="date-section">\n\n            <p>{{row.total_items}}</p>\n\n            <p>Total Item</p>\n\n          </div>\n\n          \n\n          <div class="date-section">\n\n            <p>{{row.total_items_qty}}</p>\n\n            <p>Total Item Qty</p>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  \n\n  <div class="nothing-here" *ngIf="!returnList?.length">\n\n    <div class="outer">\n\n      <div class="innear">\n\n        <img src="assets/imgs/no_found.svg" alt="">\n\n        <p>Data Not Available</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  \n\n  <ion-fab right bottom>\n\n    <button ion-fab color="primary" (click)="goToReturnPointRequestAdd()">\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\return-point-listing\return-point-listing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */]])
    ], ReturnPointListingPage);
    return ReturnPointListingPage;
}());

//# sourceMappingURL=return-point-listing.js.map

/***/ }),

/***/ 1414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferRequestDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_profile_view_profile__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transfer_request_listing_transfer_request_listing__ = __webpack_require__(1408);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TransferRequestDetailPage = /** @class */ (function () {
    function TransferRequestDetailPage(constant, navCtrl, navParams, service, alertCtrl, modalCtrl) {
        this.constant = constant;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.transferRequestsDetail = {};
        this.productDetails = [];
        this.data = {};
        this.inputFieldFlag = [false];
        this.savingFlag = false;
        this.url = constant.upload_url1 + 'point_transfer_bill/';
        if (this.navParams.get('id')) {
            this.requestID = this.navParams.get('id');
            console.log(this.requestID);
            this.getTransferRequestsDetail(this.requestID);
        }
    }
    TransferRequestDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransferRequestDetailPage');
    };
    TransferRequestDetailPage.prototype.MobileNumber = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    TransferRequestDetailPage.prototype.getTransferRequestsDetail = function (requestID) {
        var _this = this;
        console.log(requestID);
        console.log(this.productDetails);
        this.service.presentLoading();
        this.service.addData({ "requestID": requestID }, "AppStockTransfer/customerPointsRequestDetail").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.transferRequestsDetail = result['result'];
                for (var i = 0; i < result['result']['productDetails'].length; i++) {
                    _this.productDetails.push({ 'product_qty': result['result']['productDetails'][i]['product_qty'],
                        'product_detail': result['result']['productDetails'][i]['product_detail'],
                        'id': result['result']['productDetails'][i]['id'],
                        'product_id': result['result']['productDetails'][i]['product_id'],
                        'inputFieldFlag': _this.inputFieldFlag[i] = false });
                }
                console.log(_this.transferRequestsDetail);
                console.log(_this.productDetails);
                // ------//
                _this.data.requestStatus = 'Approved';
                console.log(_this.data);
                // ------//
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    TransferRequestDetailPage.prototype.ChangeRequestStatus = function (tempData, transferRequestsDetail) {
        var _this = this;
        console.log(tempData);
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
                        var data = { 'formData': tempData, 'transferRequestsDetail': transferRequestsDetail };
                        console.log(_this.data);
                        _this.service.addData({ data: data }, "AppStockTransfer/approveRequest").then(function (result) {
                            console.log(result);
                            if (result['statusCode'] == 200 && result['statusMsg'] == 'Success') {
                                _this.transferRequestsDetail = result['result'];
                                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_5__transfer_request_listing_transfer_request_listing__["a" /* TransferRequestListingPage */]);
                                _this.service.successToast(result['statusMsg']);
                            }
                            else {
                                _this.service.dismissLoading();
                                _this.service.errorToast(result['statusMsg']);
                            }
                        }, function (err) {
                            _this.service.dismissLoading();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    TransferRequestDetailPage.prototype.delete_item = function (index, id, requestID) {
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
    TransferRequestDetailPage.prototype.delete_req_item = function (index, id, requestID) {
        var _this = this;
        // this.service.presentLoading();
        this.service.addData({ 'productID': id, 'requestID': requestID }, 'AppStockTransfer/deleteProduct').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.productDetails.splice(index, 1);
                // this.service.dismissLoading();
                _this.service.successToast(result['statusMsg']);
                _this.getTransferRequestsDetail(_this.requestID);
                _this.productDetails = [];
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                // this.service.dismissLoading();
            }
        });
    };
    TransferRequestDetailPage.prototype.getEditfieldEnable = function (index) {
        console.log(index);
        this.inputFieldFlag[index] = true;
    };
    TransferRequestDetailPage.prototype.item_update_data = function (productDetails, index) {
        var _this = this;
        console.log(productDetails);
        this.service.addData({ 'requestID': this.requestID, 'data': productDetails }, "AppStockTransfer/updateDistributorPointTransferRequest").then(function (result) {
            if (result['statusCode'] == 200 && result['statusMsg'] == 'Success') {
                _this.inputFieldFlag[index] = false;
                _this.getTransferRequestsDetail(_this.requestID);
                _this.productDetails = [];
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
                _this.getTransferRequestsDetail(_this.requestID);
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismissLoading();
        });
    };
    TransferRequestDetailPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    TransferRequestDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transfer-request-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-request-detail\transfer-request-detail.html"*/'<ion-header class="catalogue-header">\n\n    <ion-navbar>\n\n        <ion-title>Transfer Request Detail</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    \n\n    <div class="list-box">\n\n        <div class="mid mt0">\n\n            <div class="content-info">\n\n                <!-- <div class="left-info" >\n\n                    <div class="circle">{{transferRequestsDetail.company_name.substring(0,1).toUpperCase()}}</div>\n\n                </div> -->\n\n                \n\n                <div class="right-info" >\n\n                    <p>{{transferRequestsDetail.company_name}}</p>\n\n                    <p>{{transferRequestsDetail.name | titlecase}} ({{transferRequestsDetail.mobile}})</p>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="tag-info">\n\n                <a href="tel:{{transferRequestsDetail.mobile}}"><i class="material-icons">phone</i></a>\n\n            </div>\n\n        </div>\n\n        \n\n        <div class="upper">\n\n            <div class="left-date">\n\n                <div class="date-section">\n\n                    <p>{{transferRequestsDetail.date_created | date:\'d MMM y hh:mm a\'}}</p>\n\n                    <p>Date Created</p>\n\n                </div>\n\n                \n\n                <div class="date-section">\n\n                    <p>{{transferRequestsDetail.total_items ? transferRequestsDetail.total_items : \'0\'}}</p>\n\n                    <p>Total Item</p>\n\n                </div>\n\n                \n\n                <div class="date-section">\n\n                    <p>{{transferRequestsDetail.total_item_qty ? transferRequestsDetail.total_item_qty : \'0\'}}</p>\n\n                    <p>Total Item Qty</p>\n\n                </div>\n\n            </div>\n\n        </div>\n\n        \n\n        <div class="slab mt10">\n\n            <div class="slab-day">\n\n                <span>Status</span>\n\n                <p class="bold" [ngClass]="{\'pending\' : transferRequestsDetail.status == \'Pending\' , \'approved\' : transferRequestsDetail.status == \'Approved\' , \'reject\' : transferRequestsDetail.status == \'Reject\'}">{{transferRequestsDetail.status}}</p>\n\n            </div>\n\n\n\n            <div class="slab-day" *ngIf="transferRequestsDetail.status == \'Reject\'">\n\n                <span>{{transferRequestsDetail.status}} Remark</span>\n\n                <p class="bold">{{transferRequestsDetail.reject_reason}}</p>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="upload-doc padding0" *ngIf="transferRequestsDetail.bill_image">\n\n            <div class="">\n\n                Attachment\n\n            </div>\n\n            <ul class="padding0">\n\n                <li class="image-upload">\n\n                    <img (click)="imageModal(url+transferRequestsDetail.bill_image)" src="{{url+transferRequestsDetail.bill_image}}">\n\n                </li>\n\n            </ul>\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="pl16 pr16 mb25">\n\n        <ng-container>\n\n            <div class="summary-heading font14 mb8" *ngIf="productDetails.length > 0">ITEM INFORMATION</div>\n\n          \n\n            <div class="attendance-list" style="padding : 5px 10px;" *ngFor="let item of productDetails; let i = index;">\n\n                <div class="center-block flat-block">\n\n                    <h1>{{item.product_detail}}</h1>\n\n                    \n\n                    <ng-container *ngIf="transferRequestsDetail.status == \'Pending\'">\n\n                        <a class="cell-phone" (click)="delete_item(i,item.id,transferRequestsDetail.id)">\n\n                            <i class="material-icons">delete_sweep</i>\n\n                        </a>\n\n                    </ng-container>\n\n                </div>\n\n                \n\n                <div class="slab boder-top1 pt5 mt5 dflex jcc align-center">\n\n                    <div class="slab-day">\n\n                        <p class="font10" *ngIf="inputFieldFlag[i] == true">\n\n                            <input class="w60" name="product_qty" [(ngModel)]="item.product_qty" #product_qty="ngModel" type="number" placeholder="Enter Quantity">\n\n                        </p>\n\n                        <p *ngIf="inputFieldFlag[i] == false">{{item.product_qty}}</p>\n\n                        <span>Qty</span>\n\n                    </div>\n\n\n\n                    <div class="slab-day" *ngIf="transferRequestsDetail.status == \'Pending\'">\n\n                        <button class="slab-btn edit-bg mr10" [disabled]="inputFieldFlag[i] == true" (click)="getEditfieldEnable(i)">\n\n                            <i class="material-icons">edit</i>\n\n                        </button>\n\n                        \n\n                        <button class="slab-btn save-bg" [disabled]="inputFieldFlag[i] == false" (click)="item_update_data(item,i)">\n\n                            <i class="material-icons">save</i>\n\n                        </button>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ng-container>\n\n    </div>\n\n    \n\n    <div class="padding16" *ngIf="transferRequestsDetail.status == \'Pending\'">\n\n        <div class="edit">\n\n            <ion-list>\n\n                <ion-item class="cs-normal-select mt0 mb0">\n\n                    <ion-label><span>Change Status <strong>*</strong></span></ion-label>\n\n                    <ion-select name="requestStatus" [(ngModel)]="data.requestStatus" #requestStatus="ngModel" required>\n\n                        <ion-option value="Approved">Approved</ion-option>\n\n                        <ion-option value="Reject">Reject</ion-option>\n\n                    </ion-select>\n\n                </ion-item>\n\n                \n\n                <ion-item class="cs-textarea1" *ngIf="data.requestStatus == \'Reject\'">\n\n                    <ion-label floating><span>Remark</span></ion-label>\n\n                    <ion-textarea name="remark" [(ngModel)]="data.remark" #remark="ngModel"></ion-textarea>\n\n                </ion-item>\n\n            </ion-list>\n\n        </div>\n\n        \n\n        <div class="text-right mt16">\n\n            <button ion-button block color="primary" [disabled]="(Submit_button) || !data.requestStatus || ((data.requestStatus==\'Reject\' && !data.remark) ?true:false)" (click)="ChangeRequestStatus(data,transferRequestsDetail)">\n\n                <ion-spinner *ngIf="spinnerLoader"></ion-spinner>\n\n                Submit\n\n            </button>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Transfer-Points\transfer-request-detail\transfer-request-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], TransferRequestDetailPage);
    return TransferRequestDetailPage;
}());

//# sourceMappingURL=transfer-request-detail.js.map

/***/ })

});
//# sourceMappingURL=3.js.map