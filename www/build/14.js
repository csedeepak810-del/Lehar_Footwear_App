webpackJsonp([14],{

/***/ 1397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopRequisitionPageModule", function() { return PopRequisitionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pop_requisition__ = __webpack_require__(1451);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopRequisitionPageModule = /** @class */ (function () {
    function PopRequisitionPageModule() {
    }
    PopRequisitionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__pop_requisition__["a" /* PopRequisitionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__pop_requisition__["a" /* PopRequisitionPage */]),
            ],
        })
    ], PopRequisitionPageModule);
    return PopRequisitionPageModule;
}());

//# sourceMappingURL=pop-requisition.module.js.map

/***/ }),

/***/ 1431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopRequisitionAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__support_list_support_list__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PopRequisitionAddPage = /** @class */ (function () {
    function PopRequisitionAddPage(storage, navCtrl, navParams, service, alertCtrl, toastCtrl, loadingCtrl) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.data = {};
        this.selectImage = [];
        this.brandList = [];
        this.Allgifts = [];
        this.savingFlag = false;
        this.spinnerLoader = false;
        this.networkType = [];
        this.drList = [];
        this.getAllGifts();
    }
    PopRequisitionAddPage.prototype.getAllGifts = function () {
        var _this = this;
        console.log('in');
        this.service.addData({}, "AppPopGift/popGiftList")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.Allgifts = resp['result'];
            }
            else {
                _this.service.errorToast(resp['statusMsg']);
            }
        }, function (err) {
            _this.service.errorToast('Something Went Wrong!');
        });
    };
    PopRequisitionAddPage.prototype.confirmAlert = function () {
        var _this = this;
        console.log('====================================');
        console.log(this.data.gift_type);
        console.log('====================================');
        var alert = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: "Are you sure !",
            message: "Do you want to save ?",
            cssClass: 'alert-modal',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.submit();
                    }
                }
            ]
        });
        alert.present();
    };
    PopRequisitionAddPage.prototype.submit = function () {
        var _this = this;
        this.savingFlag = true;
        this.service.addData({ 'data': this.data }, 'AppPopGift/popApprovalRequest')
            .then(function (result) {
            if (result['statusCode'] == 200) {
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_4__support_list_support_list__["a" /* SupportListPage */]);
                _this.service.successToast(result['statusMsg']);
                _this.savingFlag = false;
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.savingFlag = false;
            }
        }, function (error) {
            _this.savingFlag == false;
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], PopRequisitionAddPage.prototype, "selectComponent", void 0);
    PopRequisitionAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pop-requisition-add',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\pop-requisition-add\pop-requisition-add.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add Pop Requisition</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <form #f="ngForm" (ngSubmit)="f.form.valid && confirmAlert()">\n\n    <div class="form">\n\n      <ion-list no-lines class="padding10">\n\n        <ion-item [ngClass]="{\'error\':f.submitted && data.gift_type?.invalid}">\n\n          <ion-label floating>Gift Type <span class="red-text">*</span></ion-label>\n\n          <ion-select interface="action-sheet" name="gift_type" #gift_type="ngModel" [(ngModel)]="data.gift_type"\n\n            [disabled]="checkin_id || this.navParams.get(\'fromPage\') == \'distDetail\'" required>\n\n            <!-- <ion-option value="POP Material">POP Material</ion-option> -->\n\n            <ion-option *ngFor="let row of Allgifts" value="{{row.item_name}}">{{row.item_name}}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <ion-item [ngClass]="{\'error\':f.submitted && qty?.invalid}">\n\n          <ion-label floating>Qty <span class="red-text">*</span></ion-label>\n\n          <ion-input type="number" name="qty" [(ngModel)]="data.qty" #size="ngModel"\n\n            (ngModelChange)="(data.qty == \'\' || data.qty == null || data.qty<1 )?(savingFlag = true):(savingFlag = false);"\n\n            onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && qty?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n        <ion-item [ngClass]="{\'error\':f.submitted && remark?.invalid}">\n\n          <ion-label floating>Remark <span class="red-text">*</span></ion-label>\n\n          <ion-textarea name="remark" #remark="ngModel" [(ngModel)]="data.remark"></ion-textarea>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && remark?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n      </ion-list>\n\n\n\n      <button ion-button color="primary" block [disabled]="savingFlag == true">\n\n        <ion-spinner *ngIf="savingFlag"></ion-spinner>&nbsp; <strong>Save</strong>\n\n      </button>\n\n    </div>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\pop-requisition-add\pop-requisition-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], PopRequisitionAddPage);
    return PopRequisitionAddPage;
}());

//# sourceMappingURL=pop-requisition-add.js.map

/***/ }),

/***/ 1451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopRequisitionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pop_requisition_add_pop_requisition_add__ = __webpack_require__(1431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PopRequisitionPage = /** @class */ (function () {
    function PopRequisitionPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.PopRequisitionData = [];
        this.activeTab = 'Pending';
        this.filter = {};
        this.Frompage = '';
        this.Dr_id = '';
        this.flag = '';
    }
    PopRequisitionPage.prototype.ionViewDidEnter = function () {
        this.getPopRequisitionList(this.activeTab);
    };
    PopRequisitionPage.prototype.getPopRequisitionList = function (tab) {
        var _this = this;
        this.filter.limit = 20;
        this.filter.start = 0;
        this.filter.status = tab;
        this.service.presentLoading();
        this.service.addData(this.filter, 'AppPopGift/popRequestList').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.PopRequisitionData = result['data'];
                _this.service.dismissLoading();
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    PopRequisitionPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.start = this.PopRequisitionData.length;
        this.filter.status = this.activeTab;
        this.service.addData(this.filter, 'AppPopGift/popRequestList').then(function (r) {
            if (r == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.PopRequisitionData = _this.PopRequisitionData.concat(r['data']);
                    infiniteScroll.complete();
                }, 1000);
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    PopRequisitionPage.prototype.doRefresh = function (refresher) {
        this.getPopRequisitionList(this.activeTab);
        setTimeout(function () {
            refresher.complete();
        }, 1000);
    };
    PopRequisitionPage.prototype.goPopRequisitionAdd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pop_requisition_add_pop_requisition_add__["a" /* PopRequisitionAddPage */]);
    };
    PopRequisitionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pop-requisition',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\pop-requisition\pop-requisition.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>POP Requisition</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar color="white">\n\n    <div class=" mb10">\n\n      <ion-segment [(ngModel)]="activeTab">\n\n        <ion-segment-button value="Pending" (click)="getPopRequisitionList(\'Pending\')">\n\n          Pending\n\n        </ion-segment-button>\n\n        <ion-segment-button value="Approved" (click)="getPopRequisitionList(\'Approved\')">\n\n          Approved\n\n        </ion-segment-button>\n\n        <ion-segment-button value="Rejected" (click)="getPopRequisitionList(\'Reject\')">\n\n          Rejected\n\n        </ion-segment-button>\n\n      </ion-segment>\n\n    </div>\n\n\n\n   \n\n  </ion-toolbar>\n\n  <ion-toolbar>\n\n    <div class="search add-search">\n\n      <div class="filter mt10 mb10">\n\n        <ion-searchbar (ngModelChange)="getPopRequisitionList()" [(ngModel)]="filter.name" name="name"></ion-searchbar>\n\n      </div>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="nothing-here" *ngIf="PopRequisitionData.length <= 0">\n\n    <div class="outer">\n\n      <div class="innear">\n\n        <img src="assets/imgs/no_found.svg" alt="">\n\n        <p>Data Not Available</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="pd-left-right16 mt16 mb100">\n\n    <div class="attendance-list" *ngFor="let data of PopRequisitionData">\n\n      <div class="slab slab-bg">\n\n        <div class="slab-day">\n\n          <p>{{data.date_created != \'0000-00-00 00:00:00\' ? (data.date_created | date:\'d MMM yyy\') : \'---\' }}\n\n          </p>\n\n          <span>Date Created</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p># {{data.created_by_name}}</p>\n\n          <span>Created By</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p># {{data.id}}</p>\n\n          <span>Gift Type Id</span>\n\n        </div>\n\n      </div>\n\n      <div class="center-block">\n\n        <div class="circle">{{data.gift_type?.substring(0,1).toUpperCase()}}</div>\n\n        <h1 class="f12">{{data.gift_type?.toUpperCase()}}</h1>\n\n        <p><strong>QTY:</strong> {{data.qty}}</p>\n\n      </div>\n\n      <div class="other-block pb0" *ngIf="data.gift_type==\'POP Material\'">\n\n        <p><strong>Item Name :</strong> {{data.item_name}}</p>\n\n      </div>\n\n      <div class="other-block pb0" *ngIf="activeTab==\'Approved\'">\n\n        <p><strong>Approved Qty :</strong> {{data.approved_qty}}</p>\n\n      </div>\n\n      <div class="other-block pb0" *ngIf="activeTab==\'Approved\'">\n\n        <p><strong>Truck/courier no :</strong> {{data.truck_courier_no}}</p>\n\n        <p><strong>Party Name:</strong> {{data.party_name}}</p>\n\n      </div>\n\n      <div class="other-block pb0" *ngIf="activeTab==\'Rejected\'">\n\n        <p><strong>Reason :</strong> {{data.reason}}</p>\n\n      </div>\n\n      <div class="slab slab-bg mt5" style="background-color: beige;">\n\n        <div class="slab-day">\n\n          <p>{{data.remark? data.remark  : \'---\' }}</p>\n\n          <span>Remark</span>\n\n        </div>\n\n        <!-- <div class="slab-day">\n\n          <p># {{data.id}}</p>\n\n          <span>Gift Type Id</span>\n\n        </div> -->\n\n      </div>\n\n    </div>\n\n\n\n\n\n\n\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)" *ngIf="flag!=1">\n\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n\n      </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div>\n\n\n\n  <ion-fab right bottom (click)="goPopRequisitionAdd()" *ngIf="Frompage != \'audit\'">\n\n    <button ion-fab color="primary"><ion-icon name="add"></ion-icon></button>\n\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\pop-requisition\pop-requisition.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], PopRequisitionPage);
    return PopRequisitionPage;
}());

//# sourceMappingURL=pop-requisition.js.map

/***/ })

});
//# sourceMappingURL=14.js.map