webpackJsonp([33],{

/***/ 1361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandAuditDetailPageModule", function() { return BrandAuditDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brand_audit_detail__ = __webpack_require__(1429);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BrandAuditDetailPageModule = /** @class */ (function () {
    function BrandAuditDetailPageModule() {
    }
    BrandAuditDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__brand_audit_detail__["a" /* BrandAuditDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__brand_audit_detail__["a" /* BrandAuditDetailPage */]),
            ],
        })
    ], BrandAuditDetailPageModule);
    return BrandAuditDetailPageModule;
}());

//# sourceMappingURL=brand-audit-detail.module.js.map

/***/ }),

/***/ 1429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandAuditDetailPage; });
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





var BrandAuditDetailPage = /** @class */ (function () {
    function BrandAuditDetailPage(navCtrl, navParams, constant, alertCtrl, service, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.constant = constant;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.brandAuditDetail = {};
        this.docImg = [];
        this.data = {};
        this.star = '';
        this.url = '';
        this.start_rating = {};
        this.url = this.constant.upload_url1 + 'brandAudit/';
        this.service.presentLoading();
        if (this.navParams.get('id')) {
            this.id = this.navParams.get('id');
        }
        if (this.id) {
            this.getBrandAuditDetail();
        }
    }
    BrandAuditDetailPage.prototype.ionViewDidLoad = function () {
    };
    BrandAuditDetailPage.prototype.getBrandAuditDetail = function () {
        var _this = this;
        this.service.addData({ 'id': this.id }, 'AppBrandAudit/getBrandAuditDetail').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.brandAuditDetail = result['data'];
                _this.docImg = _this.brandAuditDetail.img;
                _this.star = _this.brandAuditDetail.feedback_star;
                _this.service.dismissLoading();
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        }, function (er) {
            _this.service.dismissLoading();
        });
    };
    BrandAuditDetailPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    BrandAuditDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-brand-audit-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-detail\brand-audit-detail.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Brand Audit Detail</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="attendance-list flat-list">\n\n    <div class="slab slab-bg">\n\n      <div class="slab-day">\n\n        <p>{{brandAuditDetail.date_created != \'0000-00-00 00:00:00\' ? (brandAuditDetail.date_created | date:\'d MMM yyy , hh:mm a\') : \'---\'  }}</p>\n\n        <span>Date Created</span>\n\n      </div>\n\n      <div class="slab-day">\n\n        <p># {{brandAuditDetail.id}}</p>\n\n        <span >Brand Audit Id</span>\n\n      </div>\n\n    </div>\n\n    <div class="center-block">\n\n      <div class="circle" >{{brandAuditDetail.customer_name?.substring(0,1).toUpperCase()}}</div>\n\n      <h1 class="f12" >{{brandAuditDetail.customer_name?.toUpperCase()}}</h1>\n\n      <p>{{brandAuditDetail.customer_type}}</p>\n\n  </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Brand Detail :</strong> {{brandAuditDetail.brand_detail ? brandAuditDetail.brand_detail : \'---\'}}</p>\n\n    </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Branding Required :</strong> {{brandAuditDetail.branding_required ? brandAuditDetail.branding_required : \'No\'}}</p>\n\n    </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Remark :</strong> {{brandAuditDetail.message}}</p>\n\n    </div>\n\n  </div>\n\n  \n\n  \n\n  \n\n  <div class="upload-doc pl16 pr16">\n\n    <ng-container *ngIf="docImg.length > 0">\n\n      <div class="">\n\n        Brand Audit Image\n\n      </div>\n\n      <ul class="no-padding" >\n\n        <li class="image-upload" *ngFor="let image of docImg; index as i" (click)="imageModal(url+image.document_name)">\n\n          <img src="{{url+image.document_name}}">\n\n        </li>\n\n      </ul>\n\n    </ng-container>\n\n    \n\n  </div>\n\n  \n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-detail\brand-audit-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], BrandAuditDetailPage);
    return BrandAuditDetailPage;
}());

//# sourceMappingURL=brand-audit-detail.js.map

/***/ })

});
//# sourceMappingURL=33.js.map