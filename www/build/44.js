webpackJsonp([44],{

/***/ 1389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReturnPointDetailPageModule", function() { return ReturnPointDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__return_point_detail__ = __webpack_require__(1411);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReturnPointDetailPageModule = /** @class */ (function () {
    function ReturnPointDetailPageModule() {
    }
    ReturnPointDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__return_point_detail__["a" /* ReturnPointDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__return_point_detail__["a" /* ReturnPointDetailPage */]),
            ],
        })
    ], ReturnPointDetailPageModule);
    return ReturnPointDetailPageModule;
}());

//# sourceMappingURL=return-point-detail.module.js.map

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

/***/ })

});
//# sourceMappingURL=44.js.map