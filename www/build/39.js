webpackJsonp([39],{

/***/ 1352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddVisitingCardPageModule", function() { return AddVisitingCardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_visiting_card__ = __webpack_require__(1426);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddVisitingCardPageModule = /** @class */ (function () {
    function AddVisitingCardPageModule() {
    }
    AddVisitingCardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_visiting_card__["a" /* AddVisitingCardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__add_visiting_card__["a" /* AddVisitingCardPage */]),
            ],
        })
    ], AddVisitingCardPageModule);
    return AddVisitingCardPageModule;
}());

//# sourceMappingURL=add-visiting-card.module.js.map

/***/ }),

/***/ 1426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddVisitingCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddVisitingCardPage = /** @class */ (function () {
    function AddVisitingCardPage(navCtrl, events, loadingCtrl, navParams, viewCtrl, service1, toastCtrl, storage, modal, platform, service, appCtrl) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.service1 = service1;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.modal = modal;
        this.platform = platform;
        this.service = service;
        this.appCtrl = appCtrl;
        this.data = {};
        this.distributor_network_list = [];
    }
    AddVisitingCardPage.prototype.ionViewDidLoad = function () {
    };
    AddVisitingCardPage.prototype.addVisitingCardRequest = function () {
        console.log(this.data);
    };
    AddVisitingCardPage.prototype.get_network_list = function (network_type) {
        var _this = this;
        this.data.type_name = {};
        this.service1.show_loading();
        this.service1.addData({ 'type': network_type }, 'DealerData/get_type_list').then(function (result) {
            console.log(result);
            _this.distributor_network_list = result;
            console.log(_this.distributor_network_list);
            _this.service1.dismiss();
        });
    };
    AddVisitingCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-visiting-card',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\add-visiting-card\add-visiting-card.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n  <ion-title>Add Visiting Card</ion-title>\n\n  </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content >\n\n  <div class="edit mt16">\n\n  <ion-list>\n\n  <ng-container> \n\n\n\n    <ion-item  class="cs-normal-select mt16">\n\n      <ion-label>Select type</ion-label>\n\n      <ion-select  placeholder="Select Type" name="type"  [(ngModel)]="data.networkType" (ngModelChange)="get_network_list(data.networkType)">\n\n          <ion-option value="1">Distributor/Retailer</ion-option>\n\n          <ion-option value="7">Direct Dealer</ion-option>\n\n          <ion-option value="3">Retailer</ion-option>\n\n      </ion-select>\n\n  </ion-item>\n\n  \n\n\n\n  </ng-container>\n\n  <ion-item style="background: transparent !important;">\n\n  <ion-label floating><span> Request Quantity</span></ion-label>\n\n  <ion-input type="text" name="request_qty" #request_qty="ngModel" [(ngModel)]="data.request_qty"></ion-input>\n\n  </ion-item> \n\n    </ion-list>\n\n  <ion-list *ngIf="data.networkType">            \n\n    <ion-item class="cs-select mt16" >\n\n        <ion-label *ngIf="data.networkType == \'1\'">Distributor/Dealer</ion-label>\n\n        <ion-label *ngIf="data.networkType == \'3\'">Retailer</ion-label>\n\n        <ion-label *ngIf="data.networkType == \'7\'">Direct Dealer</ion-label>\n\n    \n\n    <ion-select  [(ngModel)]="data.type_name">\n\n      <ion-option *ngFor="let item of distributor_network_list;" value="{{item.networkType}}">{{item.company_name }} </ion-option>\n\n</ion-select>\n\n\n\n</ion-item>		\n\n\n\n\n\n</ion-list>\n\n\n\n\n\n  <button ion-button block class="h35 green-color mt20" style="letter-spacing: 1px;" (click)="addVisitingCardRequest()">Save</button>\n\n  \n\n  </div>\n\n  </ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\add-visiting-card\add-visiting-card.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"]])
    ], AddVisitingCardPage);
    return AddVisitingCardPage;
}());

//# sourceMappingURL=add-visiting-card.js.map

/***/ })

});
//# sourceMappingURL=39.js.map