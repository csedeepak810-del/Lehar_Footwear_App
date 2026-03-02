webpackJsonp([46],{

/***/ 1381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecondaryBillUploadDetailPageModule", function() { return SecondaryBillUploadDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_detail__ = __webpack_require__(1416);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SecondaryBillUploadDetailPageModule = /** @class */ (function () {
    function SecondaryBillUploadDetailPageModule() {
    }
    SecondaryBillUploadDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_detail__["a" /* SecondaryBillUploadDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_detail__["a" /* SecondaryBillUploadDetailPage */]),
            ],
        })
    ], SecondaryBillUploadDetailPageModule);
    return SecondaryBillUploadDetailPageModule;
}());

//# sourceMappingURL=secondary-bill-upload-detail.module.js.map

/***/ }),

/***/ 1416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecondaryBillUploadDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_profile_view_profile__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SecondaryBillUploadDetailPage = /** @class */ (function () {
    function SecondaryBillUploadDetailPage(constant, navCtrl, navParams, service, alertCtrl, modalCtrl) {
        this.constant = constant;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.secBillUploadData = {};
        this.secBillUploadItems = [];
        this.secBillUploadBillDocs = [];
        this.url = constant.upload_url1 + 'secondary_orders_bill_doc/';
        if (this.navParams.get('id')) {
            this.BillID = this.navParams.get('id');
            console.log(this.BillID);
            this.getsecBillUploadDetail(this.BillID);
        }
    }
    SecondaryBillUploadDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SecondaryBillUploadDetailPage');
    };
    SecondaryBillUploadDetailPage.prototype.getsecBillUploadDetail = function (BillID) {
        var _this = this;
        console.log(BillID);
        this.service.presentLoading();
        this.service.addData({ "bill_id": BillID }, "AppOrder/secondaryOrdersBillDetails").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.secBillUploadData = result['result'];
                _this.secBillUploadItems = result['result']['bill_items'];
                _this.secBillUploadBillDocs = result['result']['bill_docs'];
                console.log(_this.secBillUploadItems);
                console.log(_this.secBillUploadData);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SecondaryBillUploadDetailPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    SecondaryBillUploadDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-secondary-bill-upload-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-detail\secondary-bill-upload-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Secondary Bill Upload Detail</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="list-box">\n\n    \n\n    <div class="mid mt0">\n\n      <div class="content-info">\n\n        <div class="right-info" >\n\n          <p>{{secBillUploadData.distributor_company_name}}</p>\n\n          <p>{{secBillUploadData.distributor_name | titlecase}} ({{secBillUploadData.distributor_mobile}})</p>\n\n        </div>\n\n      </div>\n\n      \n\n      <div class="tag-info">\n\n        <a href="tel:{{secBillUploadData.distributor_mobile}}"><i class="material-icons">phone</i></a>\n\n      </div>\n\n    </div>\n\n    \n\n    <div class="upper">\n\n      <div class="left-date">\n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.bill_date | date:\'d MMM y\'}}</p>\n\n          <p>Bill Date</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.bill_no}}</p>\n\n          <p>Bill No.</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>₹ {{secBillUploadData.bill_amount}}</p>\n\n          <p>Bill Amount</p>\n\n        </div>\n\n\n\n        <div class="date-section" *ngIf="secBillUploadData.approved_amount">\n\n          <p>₹ {{secBillUploadData.approved_amount}}</p>\n\n          <p>Approved Amount</p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="upper">\n\n      <div class="left-date">\n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.date_created | date:\'d MMM y\'}}</p>\n\n          <p>Date Created</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.total_items ? secBillUploadData.total_items : \'0\'}}</p>\n\n          <p>Total Item</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.total_items_qty ? secBillUploadData.total_items_qty : \'0\'}}</p>\n\n          <p>Total Item Qty</p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    \n\n    <div class="slab mt10">\n\n      <div class="slab-day">\n\n        <span>Status</span>\n\n        <p class="bold" [ngClass]="{\'pending\' : secBillUploadData.status == \'Pending\' , \'approved\' : secBillUploadData.status == \'Approved\' , \'reject\' : secBillUploadData.status == \'Reject\'}">{{secBillUploadData.status}}</p>\n\n      </div>\n\n      <div class="slab-day" *ngIf="secBillUploadData.status != \'Pending\'">\n\n        <span>{{secBillUploadData.status}} Remark</span>\n\n        <p class="bold">{{secBillUploadData.remark}}</p>\n\n      </div>\n\n    </div>\n\n    \n\n    <div class="upload-doc padding0" *ngIf="secBillUploadBillDocs.length > 0">\n\n      <div class="">\n\n        Bill Images\n\n      </div>\n\n      <ul class="padding0" >\n\n        <li class="image-upload" *ngFor="let image of secBillUploadBillDocs">\n\n          <img (click)="imageModal(url+image.bill_doc)" src="{{url+image.bill_doc}}">\n\n        </li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n  \n\n  <div class="pl16 pr16 mb25">\n\n    <ng-container>\n\n      <div class="summary-heading font14 mb8" *ngIf="secBillUploadItems.length > 0">ITEM INFORMATION</div>\n\n      \n\n      \n\n      <div class="attendance-list" style="padding : 5px 10px;" *ngFor="let item of secBillUploadItems; let i = index;">\n\n        <div class="center-block flat-block">\n\n          <h1>{{item.product_details}}</h1>\n\n        </div>\n\n        \n\n        <div class="slab slab-three boder-top1 pt5 mt5 dflex jcc align-center">\n\n          <div class="slab-day">\n\n            <p>{{item.product_qty}}</p>\n\n            <span>Qty</span>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </ng-container>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-detail\secondary-bill-upload-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], SecondaryBillUploadDetailPage);
    return SecondaryBillUploadDetailPage;
}());

//# sourceMappingURL=secondary-bill-upload-detail.js.map

/***/ })

});
//# sourceMappingURL=46.js.map