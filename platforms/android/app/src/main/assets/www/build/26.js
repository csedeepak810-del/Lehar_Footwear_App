webpackJsonp([26],{

/***/ 1401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SparePageModule", function() { return SparePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spare__ = __webpack_require__(1432);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SparePageModule = /** @class */ (function () {
    function SparePageModule() {
    }
    SparePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__spare__["a" /* SparePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__spare__["a" /* SparePage */]),
            ],
        })
    ], SparePageModule);
    return SparePageModule;
}());

//# sourceMappingURL=spare.module.js.map

/***/ }),

/***/ 1432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SparePage; });
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



/**
 * Generated class for the SparePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SparePage = /** @class */ (function () {
    function SparePage(navCtrl, navParams, serve, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.loadingCtrl = loadingCtrl;
        this.spare_list = [];
        this.filter = {};
        this.flag = '';
    }
    SparePage.prototype.ionViewDidLoad = function () {
        this.getSpareParts();
    };
    SparePage.prototype.doRefresh = function (refresher) {
        this.getSpareParts();
        refresher.complete();
    };
    SparePage.prototype.getSpareParts = function () {
        var _this = this;
        this.serve.addData({ 'search': this.filter.search }, "AppServiceTask/getAssignedParts")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.spare_list = resp['assign_part'];
                console.log(_this.spare_list);
                _this.serve.dismissLoading();
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
                _this.serve.dismiss();
            }
        }, function (err) {
        });
    };
    SparePage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.limit = 5;
        this.filter.start = this.spare_list.length;
        this.serve.addData({ 'filter': this.filter }, 'AppServiceTask/getAssignedParts').then(function (resp) {
            if (resp['result'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.spare_list = _this.spare_list.concat(resp['result']);
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    SparePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-spare',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\spare\spare.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Spare Part</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar>\n\n    <div class="search add-search">\n\n      <div class="filter">\n\n        <ion-searchbar type=\'text\' name=\'search\' [(ngModel)]="filter.search" (keyup)="getSpareParts()">\n\n        </ion-searchbar>\n\n      </div>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="container padding16">\n\n    <div class="main" *ngFor="let list of spare_list; let i = index">\n\n      <div class="part1">\n\n        <span class="circle">{{list.assigned_qty}}</span>\n\n        <span>{{list.part_name | titlecase}}-{{list.part_no | titlecase}}</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="nothing-here" style="height: 50%;" *ngIf="!spare_list?.length">\n\n    <div class="outer">\n\n      <div class="innear">\n\n        <img src="assets/imgs/no_found.svg" alt="">\n\n        <p>Data Not Available</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)" *ngIf="flag!=1">\n\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\'}}">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\spare\spare.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], SparePage);
    return SparePage;
}());

//# sourceMappingURL=spare.js.map

/***/ })

});
//# sourceMappingURL=26.js.map