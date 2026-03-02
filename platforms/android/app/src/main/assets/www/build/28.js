webpackJsonp([28],{

/***/ 1395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KriKpaTargetPageModule", function() { return KriKpaTargetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__kri_kpa_target__ = __webpack_require__(1450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var KriKpaTargetPageModule = /** @class */ (function () {
    function KriKpaTargetPageModule() {
    }
    KriKpaTargetPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__kri_kpa_target__["a" /* KriKpaTargetPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__kri_kpa_target__["a" /* KriKpaTargetPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["b" /* IonicSelectableModule */]
            ],
        })
    ], KriKpaTargetPageModule);
    return KriKpaTargetPageModule;
}());

//# sourceMappingURL=kri-kpa-target.module.js.map

/***/ }),

/***/ 1450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KriKpaTargetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__travel_pop_over_travel_pop_over__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(6);
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
 * Generated class for the KriKpaTargetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KriKpaTargetPage = /** @class */ (function () {
    function KriKpaTargetPage(navCtrl, navParams, storage, service, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.service = service;
        this.popoverCtrl = popoverCtrl;
        this.filter = {};
        this.targetData = {};
        this.teamCount = '';
        this.user_list = [];
        this.totalWeightAge = 0;
        this.totalScore = 0;
        this.target_Type = 'My';
        this.getKRIKPAData();
    }
    KriKpaTargetPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('team_count').then(function (team_count) {
            _this.teamCount = team_count;
        });
        console.log('ionViewDidLoad KriKpaTargetPage');
    };
    KriKpaTargetPage.prototype.getKRIKPAData = function () {
        var _this = this;
        this.service.presentLoading();
        this.service.addData({ 'filter': this.filter, 'target_type': this.target_Type }, 'AppTarget/UserKRIData').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.targetData = result['result'];
                for (var i = 0; i < _this.targetData.kra.length; i++) {
                    _this.totalWeightAge += _this.targetData.kra[i].weightage;
                    _this.totalScore += _this.targetData.kra[i].score;
                }
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
    KriKpaTargetPage.prototype.getSpaceFullName = function (name) {
        return name.replaceAll('_', ' ');
    };
    KriKpaTargetPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__travel_pop_over_travel_pop_over__["a" /* TravelPopOverPage */], { 'from': 'kra_kpi', });
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (resultData) {
            if (resultData) {
                _this.target_Type = resultData.TabStatus;
                _this.getUserList();
            }
        });
    };
    KriKpaTargetPage.prototype.getUserList = function () {
        var _this = this;
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
            _this.service.addData({ 'user_id': _this.userId }, 'AppExpense/allASM').then(function (result) {
                if (result['statusCode'] == 200) {
                    _this.user_list = result['asm_id'];
                }
                else {
                    _this.service.errorToast(result['statusMsg']);
                }
            }, function (err) {
                _this.service.Error_msg(err);
            });
        });
    };
    KriKpaTargetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kri-kpa-target',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\kri-kpa-target\kri-kpa-target.html"*/'<!--\n\n  Generated template for the KriKpaTargetPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>KRA/KPI Target</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only *ngIf="teamCount > 0" (click)="presentPopover($event)">\n\n        <ion-icon name="more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="edit flat" *ngIf="target_Type==\'Team\'">\n\n    <ion-list>\n\n      <ng-container>\n\n        <ion-item class="cs-normal-select retailerSelectionBox mt0 mb0">\n\n          <ion-label>Select Team Member</ion-label>\n\n          <ionic-selectable item-content name="data" [(ngModel)]="filter.team" [items]="user_list" itemValueField="id"\n\n            itemTextField="name" [canSearch]="true" #selectComponent\n\n            (ngModelChange)="getKRIKPAData()"></ionic-selectable>\n\n        </ion-item>\n\n      </ng-container>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <div class="product-item-table">\n\n    <table class="scroll-150">\n\n      <tr>\n\n        <th class="w70 text-center">KRA</th>\n\n        <th class="w70 text-center">Weightage (%)</th>\n\n        <th class="w60 text-right">Achievement (%)</th>\n\n        <th class="w60 text-right">Score (%)</th>\n\n        <!-- <th class="w60 text-right">Amount</th> -->\n\n      </tr>\n\n      <tr *ngFor="let ro of targetData.kra; let i=index">\n\n        <td class="w70 text-center">{{ro.kra_name}}</td>\n\n        <td class="w70 text-center">{{ro.weightage}}</td>\n\n        <td class="w60 text-right">{{ro.achieve}}</td>\n\n        <td class="w60 text-right">{{ro.score}}</td>\n\n      </tr>\n\n      <tr>\n\n        <td class="w70 text-center">Grand Total</td>\n\n        <td class="w70 text-center">{{totalWeightAge}}</td>\n\n        <td class="w60 text-right"></td>\n\n        <td class="w60 text-right">{{totalScore}}</td>\n\n      </tr>\n\n    </table>\n\n  </div>\n\n\n\n  <div class="nothing-here" style="height: 50%;" *ngIf="targetData == \'\'">\n\n    <div class="outer">\n\n      <div class="innear">\n\n        <img src="assets/imgs/no_found.svg" alt="">\n\n        <p>Data Not Available</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\kri-kpa-target\kri-kpa-target.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"]])
    ], KriKpaTargetPage);
    return KriKpaTargetPage;
}());

//# sourceMappingURL=kri-kpa-target.js.map

/***/ })

});
//# sourceMappingURL=28.js.map