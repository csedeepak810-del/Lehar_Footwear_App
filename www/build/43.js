webpackJsonp([43],{

/***/ 1379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendPointReqDetailPageModule", function() { return SendPointReqDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__send_point_req_detail__ = __webpack_require__(1417);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SendPointReqDetailPageModule = /** @class */ (function () {
    function SendPointReqDetailPageModule() {
    }
    SendPointReqDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__send_point_req_detail__["a" /* SendPointReqDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__send_point_req_detail__["a" /* SendPointReqDetailPage */]),
            ],
        })
    ], SendPointReqDetailPageModule);
    return SendPointReqDetailPageModule;
}());

//# sourceMappingURL=send-point-req-detail.module.js.map

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

/***/ })

});
//# sourceMappingURL=43.js.map