webpackJsonp([0],{

/***/ 1399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceHomePageModule", function() { return ServiceHomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_home__ = __webpack_require__(1453);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServiceHomePageModule = /** @class */ (function () {
    function ServiceHomePageModule() {
    }
    ServiceHomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__service_home__["a" /* ServiceHomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__service_home__["a" /* ServiceHomePage */]),
            ],
        })
    ], ServiceHomePageModule);
    return ServiceHomePageModule;
}());

//# sourceMappingURL=service-home.module.js.map

/***/ }),

/***/ 1409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceInvoiceDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_payment_add_payment__ = __webpack_require__(1412);
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
* Generated class for the ServiceInvoiceDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var ServiceInvoiceDetailPage = /** @class */ (function () {
    function ServiceInvoiceDetailPage(navCtrl, navParams, serve, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.db = db;
        this.invoice_detail = {};
        this.add_list = [];
        console.log(this.navParams);
        this.id = this.navParams.data.id;
        // this.complaint_id = this.navParams.get('id');
        // console.log(this.complaint_id );
    }
    ServiceInvoiceDetailPage.prototype.ionViewDidLoad = function () {
        this.getInvoiceDetail(this.id);
        console.log('ionViewDidLoad ServiceInvoiceDetailPage');
    };
    ServiceInvoiceDetailPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getInvoiceDetail(this.id);
        refresher.complete();
    };
    ServiceInvoiceDetailPage.prototype.getInvoiceDetail = function (id) {
        var _this = this;
        this.db.presentLoading();
        this.db.addData({ 'invoice_id': id }, 'AppServiceTask/serviceInvoiceDetail').then(function (response) {
            if (response['statusCode'] == 200) {
                console.log(response);
                _this.db.dismissLoading();
                _this.invoice_detail = response['result'];
                _this.invoice_detail.type = response['result']['type'];
                _this.invoice_detail.status = response['result']['status'];
                _this.add_list = response['result']['add_list'];
                console.log(_this.invoice_detail);
            }
            else {
                _this.db.errorToast(response['statusMsg']);
                _this.db.dismissLoading();
            }
        });
    };
    ServiceInvoiceDetailPage.prototype.gotoPayment = function (invoice_no, complaint_no, invoice_final_amount) {
        console.log(invoice_no);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__add_payment_add_payment__["a" /* AddPaymentPage */], { "invoice_no": invoice_no, "complaint_no": complaint_no, "invoice_final_amount": invoice_final_amount });
    };
    ServiceInvoiceDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-service-invoice-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\service-invoice-detail\service-invoice-detail.html"*/'<!--\n\n  Generated template for the ServiceInvoiceDetailPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Invoice Detail</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="detais">\n\n\n\n\n\n    <div class="attendance-list flat-list">\n\n      <div class="slab slab-bg" style="display: flex; justify-content: space-between;">\n\n        <div class="slab-day">\n\n          <p>\n\n            {{invoice_detail.date_created | date:\'d MMM y\'}}\n\n          </p>\n\n          <span>Date Created</span>\n\n        </div>\n\n\n\n        <div class="slab-day">\n\n          <p>{{invoice_detail.complaint_no ? invoice_detail.complaint_no : \'---\'}}</p>\n\n          <span>Complaint No</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p>{{invoice_detail.invoice_no ? invoice_detail.invoice_no : \'---\'}}</p>\n\n          <span>Invoice No</span>\n\n        </div>\n\n\n\n      </div>\n\n      <div class="center-block">\n\n        <div class="circle">{{invoice_detail.customer_name?.substring(0,1).toUpperCase()}}</div>\n\n        <h1 class="f12">{{invoice_detail.customer_name ? (invoice_detail.customer_name | titlecase) : \'---\'}}</h1>\n\n        <p>{{invoice_detail.customer_mobile ? invoice_detail.customer_mobile : \'---\'}}</p>\n\n\n\n      </div>\n\n\n\n      <div class="slab" style="display: flex; justify-content: space-between; align-items: flex-end;margin-top: 10px;">\n\n        <div class="slab-day">\n\n          <p>{{invoice_detail.type ? (invoice_detail.type | titlecase) : \'---\'}}</p>\n\n          <span>Invoice Type</span>\n\n        </div>\n\n\n\n\n\n        <div class="slab-day">\n\n          <p class="bold">{{invoice_detail.status ? (invoice_detail.status | titlecase) :\'---\'}}</p>\n\n          <span>Payment Status</span>\n\n        </div>\n\n\n\n\n\n\n\n      </div>\n\n    </div>\n\n\n\n\n\n    <div class="attendance-list flat-list" *ngIf="invoice_detail.status == \'Paid\'">\n\n      <div class="slab" style="display: flex; justify-content: space-between; align-items: flex-end;margin-top: 10px;">\n\n        <div class="slab-day">\n\n          <p>\n\n            {{invoice_detail.invoice_final_amount}}\n\n          </p>\n\n          <span>Amount Paid</span>\n\n        </div>\n\n\n\n\n\n        <div class="slab-day">\n\n          <p>\n\n            {{invoice_detail.transaction_no ? invoice_detail.transaction_no :\'---\'}}\n\n          </p>\n\n          <span>{{invoice_detail.payment_mode}}</span>\n\n        </div>\n\n\n\n        <div class="slab-day">\n\n          <p>{{invoice_detail.payment_remark ? (invoice_detail.payment_remark |titlecase) :\'---\'}}</p>\n\n          <span>Payment Remark</span>\n\n        </div>\n\n\n\n      </div>\n\n\n\n    </div>\n\n\n\n\n\n    <div class="border-container mt16" *ngIf="invoice_detail.type == \'Spare Part\'">\n\n      <div class="summary-heading">Invoice Summary</div>\n\n      <div class="payment-box">\n\n        <div class="credit-table">\n\n          <table>\n\n            <tr>\n\n              <th class="w70">Part No</th>\n\n              <th class="w70  text-center">Amount</th>\n\n\n\n              <th class="w50 text-center">QTY</th>\n\n              <th class="w75 text-center">Discount</th>\n\n              <th class="w80 text-center">Net Amount</th>\n\n            </tr>\n\n            <ng-container *ngFor="let item of add_list;let i = index">\n\n              <tr>\n\n                <td class="w70">\n\n                  {{ item.part_no | titlecase}}\n\n                </td>\n\n                <td class="w70 text-center">\n\n\n\n                  {{item.amount}}/-\n\n                </td>\n\n\n\n                <td class="w50 text-center">\n\n                  {{item.qty}}\n\n                </td>\n\n                <td class="w75  text-center">\n\n                  {{item.discount_amount}}/-\n\n                </td>\n\n                <td class="w80 text-center">\n\n                  {{item.final_amount}}/-\n\n                </td>\n\n              </tr>\n\n            </ng-container>\n\n          </table>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n\n\n\n\n    <div class="border-container mt16">\n\n\n\n      <ng-container>\n\n        <div class="pb100">\n\n          <div class="remarkSent">\n\n            <p class="remarkMsg">Sub Total</p>\n\n            <div class="dateCreated"><span>{{invoice_detail.sub_amount}}/-</span></div>\n\n          </div>\n\n          <div class="remarkSent">\n\n            <p class="remarkMsg">Discount</p>\n\n            <div class="dateCreated"><span>{{invoice_detail.discount_amount}}/-</span></div>\n\n          </div>\n\n          <div class="remarkSent">\n\n            <p class="remarkMsg">GST(18%)</p>\n\n            <div class="dateCreated"><span>{{invoice_detail.gst_amount}}/-</span></div>\n\n          </div>\n\n          <div class="remarkSent">\n\n            <p class="remarkMsg">Net Amount</p>\n\n            <div class="dateCreated"><span>{{invoice_detail.invoice_final_amount}}/-</span></div>\n\n          </div>\n\n        </div>\n\n\n\n      </ng-container>\n\n    </div>\n\n\n\n\n\n\n\n    <div class="enquiry-btn add-btns mt20" *ngIf="invoice_detail.status == \'Pending\'">\n\n      <button ion-button block class="h40 green-color" style="letter-spacing: 1px;"\n\n        (click)="gotoPayment(invoice_detail.invoice_no , invoice_detail.complaint_no ,invoice_detail.invoice_final_amount)">\n\n        <p>Add Payment</p>\n\n      </button>\n\n    </div>\n\n\n\n\n\n  </div>\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\service-invoice-detail\service-invoice-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], ServiceInvoiceDetailPage);
    return ServiceInvoiceDetailPage;
}());

//# sourceMappingURL=service-invoice-detail.js.map

/***/ }),

/***/ 1412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_invoice_detail_service_invoice_detail__ = __webpack_require__(1409);
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
* Generated class for the AddPaymentPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var AddPaymentPage = /** @class */ (function () {
    function AddPaymentPage(navCtrl, navParams, serve, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formData = {};
        console.log(this.navParams);
        this.invoice_final_amount = this.navParams.data.invoice_final_amount;
        this.complaint_no = this.navParams.data.complaint_no;
        this.invoice_no = this.navParams.data.invoice_no;
        this.id = this.navParams.data.id;
        this.formData.invoice_final_amount = this.invoice_final_amount;
    }
    AddPaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddPaymentPage');
    };
    // doRefresh(refresher){
    //     console.log('Begin async operation', refresher);
    //     refresher.complete();
    //   }
    AddPaymentPage.prototype.AddPayment = function () {
        var _this = this;
        console.log(this.formData);
        this.formData.invoice_no = this.invoice_no;
        this.formData.complaint_no = this.complaint_no;
        this.serve.presentLoading();
        this.serve.addData({ "data": this.formData, }, 'AppServiceTask/savePaymentData').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.serve.dismissLoading();
                _this.showSuccess("Payment Added Successfully!");
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_3__service_invoice_detail_service_invoice_detail__["a" /* ServiceInvoiceDetailPage */], { id: _this.id });
            }
            else {
                _this.serve.dismissLoading();
                _this.serve.errorToast(result['statusMsg']);
            }
            console.log(result);
        });
    };
    AddPaymentPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    AddPaymentPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    AddPaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-payment',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\add-payment\add-payment.html"*/'<!--\n\n  Generated template for the AddPaymentPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add Payment <span style="color: darksalmon; font-weight: 600;">{{this.invoice_no}}</span></ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <!-- <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher> -->\n\n  <form name="f" #f="ngForm" (ngSubmit)="f.valid && AddPayment()">\n\n    <div class=" form">\n\n      <ng-container>\n\n        <ion-item [ngClass]="{\'error\':f.submitted && payment_mode?.invalid}">\n\n          <ion-label floating>Payment Mode<span>*</span></ion-label>\n\n          <ion-select interface="action-sheet" name="payment_mode" #payment_mode="ngModel"\n\n            [(ngModel)]="formData.payment_mode" required>\n\n            <ion-option value="Cash">Cash</ion-option>\n\n            <ion-option value="Paytm">Paytm</ion-option>\n\n            <ion-option value="Google Pay">Google Pay</ion-option>\n\n            <ion-option value="Phone Pay">Phone Pay</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && payment_mode?.invalid" class="eror">\n\n          <p *ngIf="payment_mode.errors.required">{{\' This Field is Required\'}}</p>\n\n        </div>\n\n\n\n\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && transaction_no?.invalid}" *ngIf="formData.payment_mode != \'Cash\'">\n\n          <ion-label floating>Transaction No<span>*</span></ion-label>\n\n          <ion-input type="text" name="transaction_no" #transaction_no="ngModel" [(ngModel)]="formData.transaction_no"\n\n            required></ion-input>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && transaction_no?.invalid" class="eror">\n\n          <p *ngIf="transaction_no.errors.required">{{\' This Field is Required\'}}</p>\n\n        </div>\n\n      </ng-container>\n\n\n\n      <ion-item [ngClass]="{\'error\':f.submitted && invoice_final_amount?.invalid}">\n\n        <ion-label floating>Amount<span>*</span></ion-label>\n\n        <ion-input type="text" name="invoice_final_amount" #invoice_final_amount="ngModel"\n\n          [(ngModel)]="formData.invoice_final_amount" readonly></ion-input>\n\n      </ion-item>\n\n      <!-- <div *ngIf="f.submitted && amount?.invalid" class="eror">\n\n        <p *ngIf="Amount.errors.required">{{\'Amount is Required\'}}</p>\n\n      </div> -->\n\n\n\n\n\n      <ion-item [ngClass]="{\'error\':f.submitted && payment_remark ?.invalid}">\n\n        <ion-label floating>Remark <strong>*</strong></ion-label>\n\n        <ion-textarea name="payment_remark" #payment_remark="ngModel" [(ngModel)]="formData.payment_remark"\n\n          required></ion-textarea>\n\n      </ion-item>\n\n      <div class="eror" *ngIf="f.submitted && payment_remark?.invalid">\n\n        <p> {{ \'This field is required\'}}</p>\n\n      </div>\n\n\n\n\n\n\n\n      <div class="enquiry-btn add-btns mt20 ">\n\n        <button ion-button block class="Buttons1 green-color" style="letter-spacing: 1px;">\n\n          <p>Add</p>\n\n        </button>\n\n      </div>\n\n    </div>\n\n\n\n\n\n  </form>\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\add-payment\add-payment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], AddPaymentPage);
    return AddPaymentPage;
}());

//# sourceMappingURL=add-payment.js.map

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

/***/ }),

/***/ 1433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceInvoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_invoice_detail_service_invoice_detail__ = __webpack_require__(1409);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ServiceInvoicePage = /** @class */ (function () {
    function ServiceInvoicePage(navCtrl, navParams, service, alertCtrl, loadingCtrl, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.db = db;
        this.invoice_list = [];
        this.filter = {};
        this.flag = '';
        this.count = [];
        this.total_count = [];
        this.data = {};
        this.status = 'Pending';
        console.log(this.navParams);
        this.data.type = this.navParams.data.type;
        console.log(this.data.type);
        this.presentLoading();
        this.getInvoiceList();
        if (this.navParams.get('dr_id')) {
            this.dr_id = this.navParams.get('dr_id');
        }
    }
    ServiceInvoicePage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getInvoiceList();
        refresher.complete();
    };
    // onComplaintdetail(id)
    // {
    //   this.navCtrl.push(ServiceInvoiceDetailPage,{'id':id});
    // }
    ServiceInvoicePage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ServiceInvoicePage.prototype.getInvoiceList = function () {
        var _this = this;
        this.flag = 0;
        this.filter.limit = 5;
        this.filter.start = 0;
        this.filter.master = '';
        this.filter.status = this.status;
        this.db.presentLoading();
        this.db.addData({ 'filter': this.filter }, 'AppServiceTask/serviceInvoiceList').then(function (result) {
            if (result['statusCode'] == 200) {
                console.log(result);
                _this.invoice_list = result['result'];
                _this.invoice_list.status = result['result']['status'];
                _this.count = result['count'];
                _this.total_count = result['tab_count'];
                _this.db.dismissLoading();
            }
            else {
                _this.db.errorToast(result['statusMsg']);
                _this.db.dismissLoading();
            }
        }, function (error) {
            _this.db.Error_msg(error);
            _this.db.dismiss();
        });
    };
    ServiceInvoicePage.prototype.goinvoiceDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__service_invoice_detail_service_invoice_detail__["a" /* ServiceInvoiceDetailPage */], { id: id });
    };
    ServiceInvoicePage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.limit = 5;
        this.filter.start = this.invoice_list.length;
        this.db.addData({ 'filter': this.filter }, 'AppServiceTask/serviceInvoiceList').then(function (resp) {
            console.log('load');
            if (resp['result'] == '') {
                console.log('load');
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.invoice_list = _this.invoice_list.concat(resp['result']);
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    ServiceInvoicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-service-invoice',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\service-invoice\service-invoice.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Invoice</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar>\n\n    <div class="search add-search">\n\n      <div class="filter">\n\n        <ion-searchbar (ngModelChange)="getInvoiceList()" [(ngModel)]="filter.master" name="master"></ion-searchbar>\n\n      </div>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <ng-container *ngIf="showRelatedTab!=false">\n\n    <div class="capsule-tabs" style="border-bottom: 0px;">\n\n      <ul>\n\n\n\n        <li [ngClass]="{\'active\':status == \'Pending\'}" (click)="status= \'Pending\';getInvoiceList()">\n\n          <p>Pending<span>{{total_count.pending_count}}</span></p>\n\n        </li>\n\n        <li [ngClass]="{\'active\':status == \'Paid\'}" (click)="status = \'Paid\';getInvoiceList()">\n\n          <p>Paid<span>{{total_count.paid_count}}</span></p>\n\n        </li>\n\n\n\n      </ul>\n\n    </div>\n\n\n\n\n\n    <div class="pl16 pr16 mt15 mb50">\n\n\n\n      <div class="attendance-list" *ngFor="let row of invoice_list; let i=index" (click)="goinvoiceDetail(row.id)">\n\n        <div class="slab slab-bg" style="display: flex; justify-content: space-between;">\n\n          <div class="slab-day">\n\n            <p>{{row.date_created | date : "d MMM y" }}</p>\n\n            <span>Date Created</span>\n\n          </div>\n\n          <div class="slab-day">\n\n            <p>{{row.complaint_no}}</p>\n\n            <span>Complaint No</span>\n\n          </div>\n\n          <div class="slab-day">\n\n            <p>{{row.invoice_no}}</p>\n\n            <span>Invoice No</span>\n\n          </div>\n\n        </div>\n\n        <div class="center-block">\n\n          <div class="circle">{{row.customer_name?.substring(0,1).toUpperCase()}}</div>\n\n          <span>{{row.customer_name | titlecase}}</span>\n\n          <p>{{row.customer_mobile}}</p>\n\n        </div>\n\n        <div style="display: flex; justify-content: space-between;align-items: flex-end;">\n\n          <div class="slab mt5">\n\n            <div class="slab-day">\n\n              <p>{{row.type | titlecase}}</p>\n\n              <span>Invoice Type</span>\n\n            </div>\n\n          </div>\n\n          <div class="slab mt5">\n\n            <div class="slab-day">\n\n              <p>{{row.invoice_final_amount}}/-</p>\n\n              <span>Amount</span>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <div class="next-forword">\n\n          <i class="material-icons">chevron_right</i>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)" *ngIf="flag!=1">\n\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\'}}">\n\n      </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n    <div class="nothing-here" style="height: 60%;" *ngIf="!invoice_list.length">\n\n      <div class="outer">\n\n        <div class="innear">\n\n          <img src="assets/imgs/no_found.svg" alt="">\n\n          <p>No Data Available</p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </ng-container>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\service-invoice\service-invoice.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], ServiceInvoicePage);
    return ServiceInvoicePage;
}());

//# sourceMappingURL=service-invoice.js.map

/***/ }),

/***/ 1453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__complaints_complaint_history_complaint_history__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spare_spare__ = __webpack_require__(1432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loyalty_loyalty_profile_loyalty_profile__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loyalty_loyalty_about_loyalty_about__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loyalty_loyalty_contact_loyalty_contact__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_dbservice_dbservice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_open_native_settings__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__announcement_notices_list_announcement_notices_list__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__view_profile_view_profile__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__service_invoice_service_invoice__ = __webpack_require__(1433);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var ServiceHomePage = /** @class */ (function () {
    function ServiceHomePage(navCtrl, events, modalCtrl, alertCtrl, service, loadingCtrl, db, storage, constant, navParams, platform, openNativeSettings) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.db = db;
        this.storage = storage;
        this.constant = constant;
        this.navParams = navParams;
        this.platform = platform;
        this.openNativeSettings = openNativeSettings;
        this.influencer_detail = {};
        this.appbanner = [];
        this.qr_code = '';
        this.influencerUser = [];
        this.uploadurl = '';
        this.skLoading = true;
        this.filter = {};
        this.giftMasterList = [];
        this.contact = {};
        this.uploadurl = constant.upload_url1 + 'influencer_doc/';
        this.bannerURL = constant.upload_url1 + 'banner/';
    }
    ServiceHomePage.prototype.ionViewWillEnter = function () {
        this.influencerDetail();
    };
    ServiceHomePage.prototype.doRefresh = function (refresher) {
        this.influencerDetail();
        refresher.complete();
    };
    ServiceHomePage.prototype.influencerDetail = function () {
        var _this = this;
        this.skLoading = true;
        this.service.addData({ dr_id: this.constant.UserLoggedInData.id, type: this.constant.UserLoggedInData.type }, 'login/login_data').then(function (res) {
            if (res['statusCode'] == 200) {
                _this.skLoading = false;
                _this.influencer_detail = res['loginData']['login_data'];
            }
            else {
                _this.skLoading = false;
                _this.service.errorToast(res['statusMsg']);
            }
        }, function (err) {
        });
    };
    ServiceHomePage.prototype.openSettings = function () {
        this.openNativeSettings.open("application_details");
    };
    ServiceHomePage.prototype.contactDetails = function () {
        var _this = this;
        this.service.presentLoading();
        this.service.addData({}, 'AppContactUs/contactDetail').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.contact = result['contact_detail'];
                _this.service.dismissLoading();
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        });
    };
    ServiceHomePage.prototype.presentConfirm = function (title, msg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: title,
            message: msg,
            cssClass: 'alert-modal',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Settings',
                    handler: function () {
                        _this.openSettings();
                    }
                }
            ]
        });
        alert.present();
    };
    ServiceHomePage.prototype.alertPresent = function (msg) {
        var alert = this.alertCtrl.create({
            title: '',
            subTitle: msg + ("<a href=tel:" + this.contact.contact_number + ">" + this.contact.contact_number + "</a>"),
            buttons: [
                {
                    text: 'Okay',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    ServiceHomePage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    ServiceHomePage.prototype.announcementModal = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__announcement_notices_list_announcement_notices_list__["a" /* AnnouncementNoticesListPage */]);
    };
    ServiceHomePage.prototype.goToComplaint = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__complaints_complaint_history_complaint_history__["a" /* ComplaintHistoryPage */]);
    };
    ServiceHomePage.prototype.goToSpare = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__spare_spare__["a" /* SparePage */]);
    };
    ServiceHomePage.prototype.goToInvoice = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__service_invoice_service_invoice__["a" /* ServiceInvoicePage */]);
    };
    ServiceHomePage.prototype.goToProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__loyalty_loyalty_profile_loyalty_profile__["a" /* LoyaltyProfilePage */]);
    };
    ServiceHomePage.prototype.goToAbout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__loyalty_loyalty_about_loyalty_about__["a" /* LoyaltyAboutPage */]);
    };
    ServiceHomePage.prototype.goToContact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__loyalty_loyalty_contact_loyalty_contact__["a" /* LoyaltyContactPage */]);
    };
    ServiceHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-service-home',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\service-home\service-home.html"*/'<ion-header>\n\n  <ion-toolbar color="white">\n\n    <ion-title>\n\n      <div class="company-logo">\n\n        <img src="assets/imgs/logo.png" alt="">\n\n      </div>\n\n    </ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only class="share-text" (click)="announcementModal()">\n\n        <ion-icon name="notifications" color="secondary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  \n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n    refreshingText="Refreshing...">\n\n  </ion-refresher-content>\n\n</ion-refresher>\n\n\n\n<div *ngIf="skLoading == false">\n\n  <div class="slide-image" *ngIf="appbanner.length > 0">\n\n    <ion-slides *ngIf="appbanner.length " [initialSlide]="0" pager autoplay="1000" speed="1000">\n\n      <ion-slide *ngFor="let row of appbanner">\n\n        <img src="{{bannerURL+row.banner}}">\n\n      </ion-slide>\n\n    </ion-slides>\n\n  </div>\n\n  \n\n  <div class="pl16 pr16">\n\n    <div class="center-card">\n\n      <div class="cs-profile">\n\n        <img src="{{uploadurl+profile}}" (click)="imageModal(uploadurl+profile)">\n\n        <ion-icon name="person"></ion-icon>\n\n      </div>\n\n      \n\n      <div class="profile-progress">\n\n        <h1>{{\'Welcome\'}}</h1>\n\n        <h2>{{influencer_detail.name | titlecase}}</h2>\n\n      </div>\n\n    </div>\n\n    \n\n    \n\n    <div class="home-btn-group">\n\n      <div class="outline-btn" (click)="goToComplaint()">\n\n        <i class="material-icons">support_agent</i>\n\n        {{\'Complaint\'}}\n\n      </div>\n\n      \n\n      <div class="outline-btn" (click)="goToSpare()">\n\n        <i class="material-icons">build</i>\n\n        {{\'Spare\'}}\n\n      </div>\n\n\n\n      <div class="outline-btn" (click)="goToInvoice()">\n\n        <i class="material-icons">build</i>\n\n        {{\'Invoice\'}}\n\n      </div>\n\n      \n\n      <div class="outline-btn" (click)="goToAbout();">\n\n        <i class="material-icons">info</i>\n\n        {{\'About Us\'}}\n\n      </div>\n\n      \n\n      <div class="outline-btn" (click)="goToContact();">\n\n        <i class="material-icons">contact_phone</i>\n\n        {{\'Contact Us\'}}\n\n      </div>\n\n\n\n      <div class="outline-btn" (click)="goToProfile();">\n\n        <i class="material-icons">person</i>\n\n        {{\'Profile\'}}\n\n      </div>\n\n\n\n    </div>\n\n    \n\n  </div>\n\n  \n\n</div>\n\n<ng-container>\n\n  <div *ngIf="skLoading">\n\n    <div class="slide-image">\n\n      <ion-slides>\n\n        <ion-slide>\n\n        </ion-slide>\n\n      </ion-slides>\n\n    </div>\n\n    <div class="pl16 pr16">\n\n      <div class="center-card sk-loading">\n\n        <div class="cs-profile sk-loading" ></div>\n\n      </div>\n\n      <div class="home-btn-group">\n\n        <ng-container>\n\n          <div class="outline-btn sk-loading">\n\n            <div class="icons"></div>\n\n          </div>\n\n        </ng-container>\n\n        <div class="outline-btn sk-loading">\n\n          <div class="icons"></div>\n\n          \n\n        </div>\n\n        \n\n        <div class="outline-btn sk-loading">\n\n          <div class="icons"></div>\n\n          \n\n        </div>\n\n        \n\n        <div class="outline-btn sk-loading">\n\n          <div class="icons"></div>\n\n          \n\n        </div>\n\n        <div class="outline-btn sk-loading">\n\n          <div class="icons"></div>\n\n          \n\n        </div>\n\n        \n\n        \n\n        <div class="outline-btn sk-loading">\n\n          <div class="icons"></div>\n\n          \n\n        </div>\n\n          \n\n        <div class="outline-btn sk-loading">\n\n          <div class="icons"></div>\n\n          \n\n        </div>\n\n\n\n      </div>\n\n      \n\n    </div>\n\n  </div>\n\n</ng-container>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\service-home\service-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_7__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_9__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_open_native_settings__["a" /* OpenNativeSettings */]])
    ], ServiceHomePage);
    return ServiceHomePage;
}());

//# sourceMappingURL=service-home.js.map

/***/ })

});
//# sourceMappingURL=0.js.map