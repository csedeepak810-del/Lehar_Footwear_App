webpackJsonp([21],{

/***/ 1399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceInvoiceDetailPageModule", function() { return ServiceInvoiceDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_invoice_detail__ = __webpack_require__(1409);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServiceInvoiceDetailPageModule = /** @class */ (function () {
    function ServiceInvoiceDetailPageModule() {
    }
    ServiceInvoiceDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__service_invoice_detail__["a" /* ServiceInvoiceDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__service_invoice_detail__["a" /* ServiceInvoiceDetailPage */]),
            ],
        })
    ], ServiceInvoiceDetailPageModule);
    return ServiceInvoiceDetailPageModule;
}());

//# sourceMappingURL=service-invoice-detail.module.js.map

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

/***/ })

});
//# sourceMappingURL=21.js.map