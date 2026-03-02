webpackJsonp([35],{

/***/ 1359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingTotalOverduePageModule", function() { return BillingTotalOverduePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__billing_total_overdue__ = __webpack_require__(1438);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BillingTotalOverduePageModule = /** @class */ (function () {
    function BillingTotalOverduePageModule() {
    }
    BillingTotalOverduePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__billing_total_overdue__["a" /* BillingTotalOverduePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__billing_total_overdue__["a" /* BillingTotalOverduePage */]),
            ],
        })
    ], BillingTotalOverduePageModule);
    return BillingTotalOverduePageModule;
}());

//# sourceMappingURL=billing-total-overdue.module.js.map

/***/ }),

/***/ 1438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillingTotalOverduePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__billing_list_billing_list__ = __webpack_require__(980);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(977);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { DbserviceProvider } from '../../providers/dbservice/dbservice';



/**
* Generated class for the BillingTotalOverduePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var BillingTotalOverduePage = /** @class */ (function () {
    function BillingTotalOverduePage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.overdue_summary = [];
        this.chart_Data = [];
        // labels:any=[['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
        this.labels = [];
    }
    BillingTotalOverduePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BillingTotalOverduePage');
    };
    BillingTotalOverduePage.prototype.ionViewWillEnter = function () {
        this.get_outstanding_data();
    };
    BillingTotalOverduePage.prototype.get_outstanding_data = function () {
        var _this = this;
        this.service.addData({ 'balance_type': 'over-due' }, 'InvoiceBilling/outstanding_and_overdue_days_interval')
            .then(function (res) {
            console.log(res);
            _this.overdue_summary = res['previous_summary'];
            _this.chart_Data = [];
            _this.labels = [];
            for (var index = 0; index < res['previous_summary'].length; index++) {
                _this.chart_Data.push(parseInt(res['previous_summary'][index].value));
                _this.labels.push((res['previous_summary'][index].days + ' days'));
            }
            console.log(_this.chart_Data);
            console.log(_this.labels);
            _this.pie_chart();
        }, function (err) {
        });
    };
    BillingTotalOverduePage.prototype.go_to_billing_list = function (days) {
        console.log("go_to_billing_list method calls");
        console.log(days);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__billing_list_billing_list__["a" /* BillingListPage */], { 'from': 'over-due', 'days': days });
    };
    BillingTotalOverduePage.prototype.pie_chart = function () {
        this.pieChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](this.pieCanvas.nativeElement, {
            type: "pie",
            data: {
                labels: this.labels,
                datasets: [
                    {
                        data: this.chart_Data,
                        backgroundColor: [
                            "#ffc107", "#f44336", "#ff80ab", "#ea80fc", "#d500f9", "#f50057", "#673ab7", "#3f51b5", "#2196f3", "#7c4dff", "#536dfe", "#009688", "#03a9f4", "#004d40", "#00acc1", "#b388ff", "#4caf50", "#8bc34a", "#cddc39", "#00c853", "#76ff03", "#c6ff00", "#ffeb3b", "#ff9800", "#795548", "#263238", "#3e2723", "#ffff00", "#e53935", "#9c27b0"
                        ],
                        hoverBackgroundColor: ["#fff350", "#ff7961", "#9b2450", "#ef9a9a", "#f48fb1", "#ce93d8", "#ff8a80", "#ff80ab", "#ea80fc", "#d500f9", "#f50057", "#673ab7", "#3f51b5", "#2196f3", "#7c4dff", "#536dfe", "#009688", "#03a9f4", "#004d40", "#00acc1", "#b388ff", "#4caf50", "#8bc34a", "#cddc39", "#00c853", "#76ff03", "#c6ff00", "#ffeb3b", "#ff9800", "#795548", "#263238", "#3e2723", "#ffff00", "#e53935", "#9c27b0"]
                    }
                ]
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("pieCanvas"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BillingTotalOverduePage.prototype, "pieCanvas", void 0);
    BillingTotalOverduePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-billing-total-overdue',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\billing-total-overdue\billing-total-overdue.html"*/'<ion-header  class="home-header">\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Over Due\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n  <ion-refresher (ionRefresh)="get_outstanding_data()">\n\n    <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="Pull to refresh"     refreshingSpinner="circles" refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n \n\n\n\n  <div class="pie-chart">\n\n    <canvas  width="300" height="300" #pieCanvas></canvas>\n\n  </div>\n\n  \n\n\n\n  <div class="pd-left-right16 button-space pt20" *ngFor="let overdue_data of overdue_summary; let i=index">\n\n    <div class="go-btn" (click)="go_to_billing_list(overdue_data.days)" >\n\n      <div class="g-left wp50">\n\n        <p>{{overdue_data.days}}</p>\n\n        <p>Days</p>\n\n      </div>\n\n      <div class="g-right">\n\n        <div class="g-content">\n\n          <p>&#8377; {{overdue_data.value}}</p>\n\n          <p ><span>Amount</span></p>\n\n        </div>\n\n        <div class="g-count">\n\n          <i class="material-icons">keyboard_arrow_right</i>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  \n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\billing-total-overdue\billing-total-overdue.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], BillingTotalOverduePage);
    return BillingTotalOverduePage;
}());

//# sourceMappingURL=billing-total-overdue.js.map

/***/ })

});
//# sourceMappingURL=35.js.map