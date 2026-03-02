webpackJsonp([47],{

/***/ 1369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrGiftGalleryListingPageModule", function() { return DrGiftGalleryListingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dr_gift_gallery_listing__ = __webpack_require__(1442);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DrGiftGalleryListingPageModule = /** @class */ (function () {
    function DrGiftGalleryListingPageModule() {
    }
    DrGiftGalleryListingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__dr_gift_gallery_listing__["a" /* DrGiftGalleryListingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__dr_gift_gallery_listing__["a" /* DrGiftGalleryListingPage */]),
            ],
        })
    ], DrGiftGalleryListingPageModule);
    return DrGiftGalleryListingPageModule;
}());

//# sourceMappingURL=dr-gift-gallery-listing.module.js.map

/***/ }),

/***/ 1442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrGiftGalleryListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
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





var DrGiftGalleryListingPage = /** @class */ (function () {
    function DrGiftGalleryListingPage(navCtrl, navParams, service, loadingCtrl, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.constant = constant;
        this.giftType = 'Gift';
        this.filter = {};
        this.gift_list = [];
        this.total_point = {};
        this.today_date = new Date();
        this.total_balance_point = 0;
        this.flag = '';
        this.uploadUrl = this.constant.upload_url1 + 'gift_gallery/';
        this.today_date = __WEBPACK_IMPORTED_MODULE_3_moment___default()().format("Y-M-D");
        this.getGiftList('');
    }
    DrGiftGalleryListingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DrGiftGalleryListingPage');
    };
    DrGiftGalleryListingPage.prototype.typeofValue = function (value) {
        if (isNaN(value)) {
            return value;
        }
        else {
            return 'to ' + value + ' Points';
        }
    };
    DrGiftGalleryListingPage.prototype.doRefresh = function (refresher) {
        this.getGiftList('');
        refresher.complete();
    };
    DrGiftGalleryListingPage.prototype.getGiftList = function (search, type) {
        var _this = this;
        if (type === void 0) { type = 'Gift'; }
        this.filter.limit = 20;
        this.filter.start = 0;
        this.filter.search = search;
        // this.filter.redeemable = this.mode;
        this.service.presentLoading();
        this.service.addData({ 'filter': this.filter, 'gift_type': type }, 'AppGiftGallery/giftGalleryList').then(function (result) {
            _this.total_point = result['wallet_point'];
            _this.gift_list = result['gift_master_list'];
            if (result['statusCode'] == 200) {
                _this.gift_list = result['gift_master_list'];
                _this.service.dismissLoading();
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        }, function (err) {
            _this.service.Error_msg(err);
            _this.service.dismissLoading();
        });
    };
    DrGiftGalleryListingPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.start = this.gift_list.length;
        this.service.addData({ 'filter': this.filter, gift_type: 'Gift' }, 'AppGiftGallery/giftGalleryList').then(function (r) {
            if (r == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.gift_list = _this.gift_list.concat(r['gift_master_list']);
                    infiniteScroll.complete();
                }, 1000);
            }
        }, function (err) {
            _this.service.Error_msg(err);
            _this.service.dismissLoading();
        });
    };
    DrGiftGalleryListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-dr-gift-gallery-listing',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\DrGiftGallery\dr-gift-gallery-listing\dr-gift-gallery-listing.html"*/'\n\n<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>Gift Gallery</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n\n		<ion-refresher-content pullingIcon="arrow-dropdown" pullingText="{{\'Pull to refresh\'}}" refreshingSpinner="circles" refreshingText="{{\'Refreshing...\'}}">\n\n		</ion-refresher-content>\n\n	</ion-refresher>\n\n	<div class="my-points">\n\n		<p> \n\n			<i class="material-icons">account_balance_wallet</i>\n\n			{{\'Total Points Earn\'}}\n\n		</p>\n\n		<h1>{{total_point?total_point:0}} PT </h1>\n\n	</div>\n\n	<ng-container *ngFor="let list of gift_list; let i=index" >\n\n		<div class="gift-item flat" >\n\n			<div class="headerBox">\n\n				<!-- <div class="point-column">\n\n					<h6>{{list.title | uppercase}}</h6>\n\n					<p>Category</p>\n\n				</div> -->\n\n				<div class="point-column">\n\n					<h6>{{list.gift_reward | titlecase}}</h6>\n\n					<p>Gift</p>\n\n				</div>\n\n				<div class="point-column">\n\n					<h6>{{list.date_from | date:\'dd MMM yyyy\'}} - {{list.date_to | date:\'dd MMM yyyy\'}}</h6>\n\n					<p>Time Period</p>\n\n				</div>\n\n			</div>\n\n			\n\n			<div class="card-box">\n\n				<div class="card-info">\n\n					<h5><span>Point Range : </span> {{list.range_start}} {{typeofValue(list.range_end)}}</h5>\n\n				</div>\n\n				\n\n				<div class="card-info">\n\n					<p><span>Current Points :</span> {{list.current_points}}</p>\n\n				</div>\n\n				<div class="card-info">\n\n					<p><span>Description :</span> {{list.termsNcondition}}</p>\n\n				</div>\n\n				\n\n				\n\n				<div class="highlight">\n\n					<div class="required-content">\n\n						<p>Required Rate Per Day : <b>{{list.required_rate | number : \'1.0-0\'}}</b></p>\n\n						<p>Day\'s Left <b>{{list.days_left}}</b></p>\n\n					</div>\n\n					<div class="progressBar">\n\n						<div class="progressValue {{\'wp\'+list.achieve_percent}}"><span>{{list.achieve_percent}} %</span></div>\n\n					</div>\n\n				</div>\n\n			</div>\n\n			\n\n		</div>\n\n	</ng-container>\n\n	\n\n	<div class="nothing-here" style="height: 60%;"  *ngIf="gift_list.length == 0">\n\n		<div class="outer">\n\n			<div class="innear">\n\n				<img alt="" src="assets/imgs/no_found.svg">\n\n				<p>No Data Available</p>\n\n			</div>\n\n		</div>\n\n	</div>\n\n	<ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)" *ngIf="flag!=1">\n\n		<ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\'}}">\n\n		</ion-infinite-scroll-content>\n\n	</ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\DrGiftGallery\dr-gift-gallery-listing\dr-gift-gallery-listing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__["a" /* ConstantProvider */]])
    ], DrGiftGalleryListingPage);
    return DrGiftGalleryListingPage;
}());

//# sourceMappingURL=dr-gift-gallery-listing.js.map

/***/ })

});
//# sourceMappingURL=47.js.map