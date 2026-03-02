webpackJsonp([36],{

/***/ 1357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundTrackListingPageModule", function() { return BackgroundTrackListingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__background_track_listing__ = __webpack_require__(1437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_select_searchable__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ionic_select_searchable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BackgroundTrackListingPageModule = /** @class */ (function () {
    function BackgroundTrackListingPageModule() {
    }
    BackgroundTrackListingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__background_track_listing__["a" /* BackgroundTrackListingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__background_track_listing__["a" /* BackgroundTrackListingPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["b" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_select_searchable__["SelectSearchableModule"]
            ],
        })
    ], BackgroundTrackListingPageModule);
    return BackgroundTrackListingPageModule;
}());

//# sourceMappingURL=background-track-listing.module.js.map

/***/ }),

/***/ 1437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundTrackListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_enquiryservice_enquiryservice__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__view_profile_view_profile__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__background_track_detail_background_track_detail__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var BackgroundTrackListingPage = /** @class */ (function () {
    function BackgroundTrackListingPage(navCtrl, navParams, service, loadingCtrl, formBuilder, db, modalCtrl, storage, toastCtrl, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.db = db;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.constant = constant;
        this.data = {};
        this.usersDataCount = {};
        this.updatedData = {};
        this.filter = {};
        this.user_list = [];
        this.assignUserList = [];
        this.brand = [];
        this.brandList = [];
        this.salesUserList = [];
        this.countryList = [];
        this.state_list = [];
        this.district_list = [];
        this.city_list = [];
        this.upload_url = this.constant.upload_url1 + 'profile/';
    }
    BackgroundTrackListingPage.prototype.ionViewDidLoad = function () {
        this.getuserlist();
        this.get_user();
    };
    BackgroundTrackListingPage.prototype.get_user = function () {
        var _this = this;
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
            _this.service.addData({ 'user_id': _this.userId }, "AppAttendence/getAllAsm")
                .then(function (result) {
                if (result['statusCode'] == 200) {
                    _this.assignUserList = result['asm_id'];
                }
                else {
                    _this.service.errorToast(result['statusMsg']);
                }
            }, function (error) {
                _this.service.Error_msg(error);
                _this.service.dismiss();
            });
        });
    };
    BackgroundTrackListingPage.prototype.getuserlist = function () {
        var _this = this;
        this.service.presentLoading();
        this.filter.user_id = this.data.id;
        this.service.addData(this.filter, 'AppAttendence/getTeamAttendanceToday').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.usersDataCount = result['header_count'];
                _this.user_list = result['attendance'];
                _this.service.dismissLoading();
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        }, function (err) {
            _this.service.Error_msg(err);
            _this.service.dismiss();
        });
    };
    BackgroundTrackListingPage.prototype.doRefresh = function (refresher) {
        if (this.filter)
            this.filter = {};
        this.getuserlist();
        setTimeout(function () {
            refresher.complete();
        }, 1000);
    };
    BackgroundTrackListingPage.prototype.GoToDetail = function (data) {
        console.log(data, "this is data");
        var dateData;
        if (this.filter.date == "") {
            dateData = new Date();
        }
        else {
            dateData = this.filter.date;
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__background_track_detail_background_track_detail__["a" /* BackgroundTrackDetailPage */], { 'from': 'teamMember', 'userDetail': data, 'date': __WEBPACK_IMPORTED_MODULE_6_moment___default()(dateData).format('yyyy-MM-DD') });
    };
    BackgroundTrackListingPage.prototype.refresh = function () {
        this.filter = {};
        this.data = {};
        this.getuserlist();
    };
    BackgroundTrackListingPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    BackgroundTrackListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-background-track-listing',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\background-track-listing\background-track-listing.html"*/'<ion-header>    \n\n  <ion-navbar>\n\n    <ion-title>Team Member</ion-title>\n\n\n\n  </ion-navbar>\n\n      <ion-toolbar>\n\n\n\n        <div class="search add-search">\n\n            <div class="filter">\n\n                  <div class="edit m4" style="flex: 1;">\n\n                    <ion-list>\n\n                      <ng-container>\n\n                        <ion-item class="cs-normal-select retailerSelectionBox mt0 mb0">\n\n                          <ion-label>Select User</ion-label>\n\n                          <ionic-selectable item-content name="data" [(ngModel)]="data" [items]="assignUserList" itemValueField="id"\n\n                            itemTextField="name" (onChange)="getuserlist()" [canSearch]="true" #selectComponent></ionic-selectable>\n\n                        </ion-item>\n\n                      </ng-container>\n\n                    </ion-list>\n\n                  </div>\n\n              \n\n                <a class="date-pick">\n\n                    <label class="chedate">\n\n                        <input type="date" name="date" [(ngModel)]="filter.date"\n\n                            (ngModelChange)="getuserlist()" />\n\n                        <i class="material-icons">date_range</i>\n\n                    </label>\n\n                </a>\n\n            </div>\n\n        </div>\n\n        <ion-buttons end>\n\n          <button class="sortIcon" (click)="refresh()">\n\n            <i class="material-icons">refresh</i>\n\n          </button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<div class="text-line" *ngIf="filter.date">\n\n  <div class="lf-text">\n\n      <p>Date</p>\n\n      <p>{{filter.date | date:\'d MMM y\'}}</p>\n\n  </div>\n\n  <div class="rf-text">\n\n      <i class="material-icons" (click)="filter.date=\'\';getuserlist()">cancel</i>\n\n  </div>\n\n</div>\n\n<ion-content>   \n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n        refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n</ion-refresher>\n\n\n\n  <div class="tabs-count">\n\n    <div class="tab-content present">\n\n        <p>{{usersDataCount.total_present}}</p>\n\n        <span>Present</span>\n\n    </div>\n\n    <div class="tab-content absent">\n\n        <p>{{usersDataCount.total_absent}}</p>\n\n        <span>Absent</span>\n\n    </div>\n\n    <div class="tab-content leave">\n\n        <p>{{usersDataCount.total_leave}}</p>\n\n        <span>Leave</span>\n\n    </div>\n\n    <div class="tab-content holiday">\n\n        <p>{{usersDataCount.total_weekly_off}}</p>\n\n        <span>Holiday</span>\n\n    </div>\n\n</div>\n\n\n\n<div class="pd-left-right16 mt16 mb100">\n\n  <div class="attendance-list" style="padding:0px 10px" *ngFor="let item of user_list" (click)="item.user_data.attendence_status == \'Present\' ? GoToDetail(item) : null">\n\n    \n\n    <div class="User-center-block">\n\n\n\n        <div class="circle">\n\n          <i class="material-icons" *ngIf="!item.user_data.image || item.user_data.image ==\'\'">person</i>\n\n          <img *ngIf="item.user_data.image" (click)="imageModal(upload_url+item.user_data.image)" src="{{upload_url+item.user_data.image}}">\n\n        </div>\n\n        <div>\n\n\n\n          <h1 class="ml8">{{item.user_data.name}} - {{item.user_data.employee_id}}</h1>\n\n          <p class="ml8">{{item.user_data.mobile}}</p>\n\n        </div>\n\n        <div class="left-auto">\n\n          <div class="attendance"\n\n          [ngClass]="{\'leave\':item.user_data.attendence_status==\'Leave\', \'absent\':item.user_data.attendence_status == \'Absent\', \'present\':item.user_data.attendence_status == \'Present\', \'holiday\':item.user_data.attendence_status == \'Holiday\',\'weeklyOff\':item.user_data.attendence_status == \'Weekly Off\' }">\n\n          {{item.user_data.attendence_status}}\n\n      </div>\n\n  </div>\n\n    </div>\n\n    <div class="other-block pb0">\n\n      <div class="type-visit">\n\n        <div class="types">\n\n          <p class="labels">Punch-In</p>\n\n          <p>{{item.attendance_data?.start_time ? (item.attendance_data?.start_time != "00:00:00" ? (item.attendance_data?.start_time_date | date:\'hh:mm a\') : \'---\') : \'---\'}}</p>\n\n\n\n        </div>\n\n        <div class="types">\n\n          <p class="labels">First Check-In</p>\n\n          <p>{{item.first_checkin?.visit_start ? (item.first_checkin?.visit_start | date:\'hh:mm a\') : \'---\'}}</p>\n\n        </div>\n\n        <div class="types">\n\n          <p class="labels">Last Check-In</p>\n\n          <p>{{item.last_checkin?.visit_start ? (item.last_checkin?.visit_start | date:\'hh:mm a\') : \'---\'}}</p>\n\n\n\n        </div>\n\n        <div class="types">\n\n          <p class="labels">Punch-Out</p>\n\n          <p>{{item.attendance_data?.stop_time ? (item.attendance_data?.stop_time != "00:00:00"   ? (item.attendance_data?.stop_time_date | date:\'hh:mm a\') : \'---\') : \'---\'}}</p>\n\n\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="next-forword" *ngIf="item.user_data.attendence_status==\'Present\'">\n\n      <i class="material-icons">chevron_right</i>\n\n    </div>\n\n  </div>\n\n</div>\n\n<div class="nothing-here" *ngIf="!user_list.length">\n\n  <div class="outer">\n\n      <div class="innear">\n\n          <img src="assets/imgs/no_found.svg" alt="">\n\n          <p>Team Data Available</p>\n\n      </div>\n\n  </div>\n\n</div>\n\n</ion-content> \n\n\n\n\n\n\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\background-track-listing\background-track-listing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_4__providers_enquiryservice_enquiryservice__["a" /* EnquiryserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__["a" /* ConstantProvider */]])
    ], BackgroundTrackListingPage);
    return BackgroundTrackListingPage;
}());

//# sourceMappingURL=background-track-listing.js.map

/***/ })

});
//# sourceMappingURL=36.js.map