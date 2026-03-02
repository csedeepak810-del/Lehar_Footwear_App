webpackJsonp([38],{

/***/ 1354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddinvoicePageModule", function() { return AddinvoicePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addinvoice__ = __webpack_require__(1435);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddinvoicePageModule = /** @class */ (function () {
    function AddinvoicePageModule() {
    }
    AddinvoicePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__addinvoice__["a" /* AddinvoicePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__addinvoice__["a" /* AddinvoicePage */]),
            ],
        })
    ], AddinvoicePageModule);
    return AddinvoicePageModule;
}());

//# sourceMappingURL=addinvoice.module.js.map

/***/ }),

/***/ 1435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddinvoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_open_native_settings__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__complaints_complaint_detail_complaint_detail__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_selectable__ = __webpack_require__(7);
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
* Generated class for the AddinvoicePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var AddinvoicePage = /** @class */ (function () {
    function AddinvoicePage(navCtrl, navParams, service, loadingCtrl, barcodeScanner, alertCtrl, serve, platform, openNativeSettings, actionSheetController, diagnostic, androidPermissions, dom, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.serve = serve;
        this.platform = platform;
        this.openNativeSettings = openNativeSettings;
        this.actionSheetController = actionSheetController;
        this.diagnostic = diagnostic;
        this.androidPermissions = androidPermissions;
        this.dom = dom;
        this.camera = camera;
        this.formData = {};
        this.tmpformData = {};
        this.spare_list = [];
        this.spare_list_array = [];
        this.add_list = [];
        this.savingFlag = false;
        // console.log(this.navParams);
        this.id = this.navParams.data.id;
    }
    AddinvoicePage.prototype.ionViewDidLoad = function () {
        this.formData.discount_amount = 0;
        this.getSpareParts();
        console.log('ionViewDidLoad AddinvoicePage');
    };
    AddinvoicePage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    AddinvoicePage.prototype.addInvoice = function () {
        var _this = this;
        this.savingFlag = true;
        this.formData.complaint_id = this.id;
        console.log(this.formData);
        this.serve.presentLoading();
        this.serve.addData({ "add_list": this.add_list, "data": this.formData }, 'AppServiceTask/serviceInvoiceAdd').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.savingFlag = false;
                _this.serve.dismissLoading();
                _this.showSuccess("Invoice Added Successfully!");
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_9__complaints_complaint_detail_complaint_detail__["a" /* ComplaintDetailPage */], { id: _this.id });
            }
            else {
                _this.savingFlag = false;
                _this.serve.dismissLoading();
                _this.serve.errorToast(result['statusMsg']);
            }
            console.log(result);
        });
    };
    AddinvoicePage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    AddinvoicePage.prototype.getSpareParts = function () {
        var _this = this;
        this.serve.addData({ 'complaint_id': this.id }, "AppServiceTask/getComplaintInstalledSparePartList")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.spare_list = resp['spare_part'];
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) {
        });
    };
    AddinvoicePage.prototype.addToList = function () {
        var _this = this;
        this.formData.amount = 0;
        this.formData.disc = 0;
        this.formData.discount_amount = 0;
        // this.tmpformData.discount_amount=0;
        // this.tmpformData.final_amount=0;
        this.formData.gst_amount = 0;
        this.formData.final_amount = 0;
        if (this.add_list.length == 0) {
            this.add_list.push({ 'amount': this.tmpformData.amount, 'discount': this.tmpformData.discount, 'mrp': this.tmpformData.mrp, 'part_name': this.tmpformData.part_name, 'totalQty': this.tmpformData.totalQty, 'part_id': this.tmpformData.part_id, 'discount_amount': this.tmpformData.discount_amount, 'final_amount': this.tmpformData.final_amount, 'part_no': this.tmpformData.part_no });
            console.log(this.add_list);
        }
        else {
            this.add_list.push({ 'amount': this.tmpformData.amount, 'discount': this.tmpformData.discount, 'mrp': this.tmpformData.mrp, 'part_name': this.tmpformData.part_name, 'totalQty': this.tmpformData.totalQty, 'part_id': this.tmpformData.part_id, 'discount_amount': this.tmpformData.discount_amount, 'final_amount': this.tmpformData.final_amount, 'part_no': this.tmpformData.part_no });
        }
        console.log(this.add_list);
        console.log(this.tmpformData.amount);
        console.log(this.tmpformData.discount);
        for (var index_1 = 0; index_1 < this.add_list.length; index_1++) {
            this.tmpformData.discount_amount += (this.add_list[index_1].amount) * (parseFloat(this.add_list[index_1].discount) / 100);
            this.tmpformData.final_amount += (this.add_list[index_1].amount) - (parseFloat(this.tmpformData.discount_amount));
            this.formData.amount += (this.add_list[index_1].mrp) * parseFloat(this.add_list[index_1].totalQty);
            this.formData.discount_amount += (parseFloat(this.add_list[index_1].totalQty) * parseFloat(this.add_list[index_1].mrp)) * (parseFloat(this.add_list[index_1].discount) / 100);
            this.formData.gst_amount = (parseFloat(this.formData.amount) - parseFloat(this.formData.discount_amount)) * (parseFloat('18') / 100);
            this.formData.gst_amount = (this.formData.gst_amount.toFixed(2));
            this.formData.final_amount = (parseFloat(this.formData.amount) - parseFloat(this.formData.discount_amount)) + (parseFloat(this.formData.gst_amount));
            this.formData.final_amount = (this.formData.final_amount.toFixed(2));
        }
        // this.spare_list_array.push({'amount': this.tmpformData.amount,'discount': this.tmpformData.discount,'mrp': this.tmpformData.mrp,'part_name': this.tmpformData.part_name,'totalQty': this.tmpformData.totalQty, 'final_amount': this.tmpformData.final_amount,'discount_amount': this.tmpformData.discount_amount ,'part_no': this.tmpformData.part_no ,'part_id': this.tmpformData.part_id });
        // this.tmpformData.part_id
        // console.log(this.spare_list_array);
        console.log(this.tmpformData.part_id);
        var index = this.spare_list.findIndex(function (d) { return d.part_id == _this.tmpformData.part_id; });
        console.log(index);
        if (index != -1) {
            this.spare_list.splice(index, 1);
            console.log(this.spare_list);
        }
        this.tmpformData.totalQty = '';
        this.tmpformData.mrp = '';
        this.tmpformData.discount = '';
        this.tmpformData.amount = '';
        this.tmpformData.part_name = '';
    };
    AddinvoicePage.prototype.DeleteItem = function (i) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: 'You want to delete this item',
            cssClass: 'alert-modal',
            buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.add_list.splice(i, 1);
                    }
                }]
        });
        alert.present();
    };
    AddinvoicePage.prototype.partDetail = function (id) {
        var index = this.spare_list.findIndex(function (d) { return d.part_id == id; });
        if (index != -1) {
            this.tmpformData.totalQty = this.spare_list[index].totalQty;
            this.tmpformData.mrp = this.spare_list[index].mrp;
            this.tmpformData.part_name = this.spare_list[index].part_name;
            this.tmpformData.part_no = this.spare_list[index].part_no;
            this.tmpformData.part_id = this.spare_list[index].part_id;
            this.tmpformData.discount = 0;
            this.tmpformData.amount = this.tmpformData.mrp * this.tmpformData.totalQty - this.tmpformData.discount;
            // this.tmpformData.totalQty = this.spare_list[index].totalQty;
        }
    };
    AddinvoicePage.prototype.calculate = function (amount) {
        console.log(amount);
        this.formData.subtotal = parseInt(amount);
        this.formData.subtotal = this.formData.subtotal - this.formData.discount_amount;
        this.formData.gst_amount = this.formData.subtotal * 18 / 100;
        this.formData.gst_amount = (this.formData.gst_amount).toFixed(2);
        this.formData.final_amount = parseInt(this.formData.subtotal) + parseInt(this.formData.gst_amount);
    };
    AddinvoicePage.prototype.max = function () {
        if (parseInt(this.formData.discount_amount) > parseInt(this.formData.amount)) {
            this.serve.errorToast('Discount Should Be Less Then MRP');
            this.formData.discount_amount = '';
        }
    };
    AddinvoicePage.prototype.calculation = function () {
        if (this.tmpformData.discount == '') {
            this.tmpformData.discount = 0;
        }
        this.tmpformData.amount = (parseFloat(this.tmpformData.mrp) * parseInt(this.tmpformData.totalQty));
        this.tmpformData.total = (parseFloat(this.tmpformData.mrp) * parseInt(this.tmpformData.totalQty)) - (((parseFloat(this.tmpformData.mrp) * parseInt(this.tmpformData.totalQty)) / 100) * this.tmpformData.discount);
        this.tmpformData.discount_amount = (parseFloat(this.tmpformData.mrp) * parseInt(this.tmpformData.totalQty)) * (parseFloat(this.tmpformData.discount) / 100);
        console.log(this.tmpformData.discount_amount);
        this.tmpformData.final_amount = (parseFloat(this.tmpformData.mrp) * parseInt(this.tmpformData.totalQty)) - (parseFloat(this.tmpformData.discount_amount));
        // console.log( this.tmpformData.discount);
        // console.log( this.tmpformData.amount);
        if (parseInt(this.tmpformData.discount) > 100) {
            this.serve.errorToast('Discount Should Not Be Greater Then 100%');
            this.tmpformData.discount = 0;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('distributorSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], AddinvoicePage.prototype, "distributorSelectable", void 0);
    AddinvoicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addinvoice',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\addinvoice\addinvoice.html"*/'<!--\n\n  Generated template for the AddinvoicePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add Invoice</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <form name="f" #f="ngForm" (ngSubmit)="f.valid && addInvoice()">\n\n\n\n    <div class=" form">\n\n      <ion-list no-lines class="padding10">\n\n\n\n        <ion-list no-lines>\n\n          <ion-item [ngClass]="{\'error\':f.submitted && invoice_type?.invalid}">\n\n            <ion-label floating>Select Invoice Type<span>*</span></ion-label>\n\n            <ion-select name="invoice_type" #invoice_type="ngModel" [(ngModel)]="formData.invoice_type" required>\n\n              <ion-option value="Service">Service</ion-option>\n\n              <ion-option value="Spare Part">Spare Part</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <div *ngIf="f.submitted && invoice_type?.invalid" class="eror">\n\n            <p *ngIf="invoice_type.errors.required">{{\'Invoice Type is Required\'}}</p>\n\n          </div>\n\n\n\n\n\n        </ion-list>\n\n\n\n\n\n        <ng-container *ngIf="formData.invoice_type==\'Spare Part\'">\n\n          <ion-item [ngClass]="{\'error\':f.submitted && part_id?.invalid}">\n\n            <ion-label floating>Select Part<span>*</span></ion-label>\n\n            <ion-select name="part_id" [(ngModel)]="tmpformData.part_id" #part_id="ngModel" required\n\n              (ngModelChange)="partDetail(tmpformData.part_id)">\n\n              <ion-option *ngFor="let row of spare_list" value="{{row.part_id}}">{{row.part_name}}\n\n              </ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <div *ngIf="f.submitted && part_id?.invalid" class="eror">\n\n            <!-- <p *ngIf="part_id.errors.required">{{\'This Field is Required\'}}</p> -->\n\n          </div>\n\n\n\n          <div style="display: flex; justify-content: space-between;">\n\n            <ion-item [ngClass]="{\'error\':f.submitted && totalQty?.invalid}" style="width: 90px;">\n\n              <ion-label floating>Qty<span>*</span></ion-label>\n\n              <ion-input type="text" name="totalQty" #totalQty="ngModel" [(ngModel)]="tmpformData.totalQty"\n\n                onkeypress="return event.charCode>=48 && event.charCode<=57" readonly></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="f.submitted && totalQty?.invalid" class="eror">\n\n              <!-- <p *ngIf="assigned_qty.errors.required">{{\'This Field is Required\'}}</p> -->\n\n            </div>\n\n\n\n\n\n            <ion-item [ngClass]="{\'error\':f.submitted && mrp?.invalid}" style="width: 90px;">\n\n              <ion-label floating>Rate<span>*</span></ion-label>\n\n              <ion-input type="text" name="mrp" #mrp="ngModel" [(ngModel)]="tmpformData.mrp"\n\n                onkeypress="return event.charCode>=48 && event.charCode<=57" readonly></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="f.submitted && mrp?.invalid" class="eror">\n\n              <!-- <p *ngIf="price.errors.required">{{\'This Field is Required\'}}</p> -->\n\n            </div>\n\n\n\n\n\n            <ion-item [ngClass]="{\'error\':f.submitted && discount?.invalid}" style="width: 90px;">\n\n              <ion-label floating>Discount(%)</ion-label>\n\n              <ion-input type="text" name="discount" #discount="ngModel" [(ngModel)]="tmpformData.discount"\n\n                onkeypress="return event.charCode>=48 && event.charCode<=57"\n\n                (ngModelChange)="calculation()"></ion-input>\n\n            </ion-item>\n\n\n\n            <div *ngIf="f.submitted && discount?.invalid" class="eror">\n\n              <!-- <p *ngIf="discount.errors.required">{{\'This Field is Required\'}}</p> -->\n\n            </div>\n\n          </div>\n\n          <div style="display: flex; justify-content: space-between; align-items: flex-end;">\n\n            <ion-item [ngClass]="{\'error\':f.submitted && amount?.invalid}" style="width: 90px;">\n\n              <ion-label floating>Amount<span>*</span></ion-label>\n\n              <ion-input type="text" name="amount" #amount="ngModel" [(ngModel)]="tmpformData.amount"\n\n                onkeypress="return event.charCode>=48 && event.charCode<=57" readonly></ion-input>\n\n            </ion-item>\n\n            <a ion-fab color="success" style=" border-radius:1%;" (click)="addToList()"\n\n              *ngIf="formData.invoice_type==\'Spare Part\' &&  tmpformData.totalQty"><ion-icon name="add"></ion-icon></a>\n\n          </div>\n\n\n\n        </ng-container>\n\n\n\n\n\n\n\n\n\n        <ng-container no-lines style="display: flex; justify-content: space-between;"\n\n          *ngIf="formData.invoice_type==\'Service\'">\n\n\n\n          <ion-item [ngClass]="{\'error\':f.submitted && amount?.invalid}" style="width: 250px;">\n\n            <ion-label floating>Amount<span>*</span></ion-label>\n\n            <ion-input type="text" name="amount" #amount="ngModel" [(ngModel)]="formData.amount"\n\n              onkeypress="return event.charCode>=48 && event.charCode<=57" required\n\n              (ngModelChange)="calculate(formData.amount)"></ion-input>\n\n          </ion-item>\n\n          <div *ngIf="f.submitted && amount?.invalid" class="eror">\n\n            <!-- <p *ngIf="Amount.errors.required">{{\'Amount is Required\'}}</p> -->\n\n          </div>\n\n\n\n          <ion-item [ngClass]="{\'error\':f.submitted && discount_amount?.invalid}" style="width: 250px;">\n\n            <ion-label floating>Discount</ion-label>\n\n            <ion-input type="text" name="discount_amount" #discount_amount="ngModel"\n\n              [(ngModel)]="formData.discount_amount" onkeypress="return event.charCode>=48 && event.charCode<=57"\n\n              (ngModelChange)="calculate(formData.amount);max();"></ion-input>\n\n          </ion-item>\n\n          <!-- <div *ngIf="f.submitted && Discount?.invalid" class="eror">\n\n            <p *ngIf="Amount.errors.required">{{\'Amount is Required\'}}</p>\n\n          </div> -->\n\n\n\n\n\n        </ng-container>\n\n\n\n\n\n\n\n        <div class="list-box mt10" *ngIf="formData.invoice_type==\'Spare Part\'">\n\n          <div *ngFor="let row of add_list; let i = index">\n\n            <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n              <div class="content-info">\n\n                <div class="right-info">\n\n                  <div class="mt2 mb2 ml2" style="display:flex; flex-direction:row">\n\n                    <p class="pr2" style="color:rgb(255, 153, 0)">\n\n                      #{{i+1}}\n\n                    </p>\n\n                    <p class="font14">\n\n                      {{row.part_name|titlecase}}\n\n                      <!-- {{row.part_name | titlecase}} ({{row.part_no | titlecase}}) -->\n\n                    </p>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div class="tag-info">\n\n                <a><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></a>\n\n              </div>\n\n            </div>\n\n\n\n            <div class="three_boxes">\n\n              <div class="lower ">\n\n                <p class="font10">Qty</p>\n\n                <p class="font10">\n\n                  {{row.totalQty}}\n\n                  <!-- {{row.qty}} -->\n\n                </p>\n\n              </div>\n\n              <div class="lower ">\n\n                <p class="font10">Rate</p>\n\n                <p class="font10">\n\n\n\n                  {{row.mrp}}\n\n                </p>\n\n              </div>\n\n              <div class="lower ">\n\n                <p class="font10">Discount(%)</p>\n\n                <p class="font10">\n\n\n\n                  {{row.discount}}\n\n                </p>\n\n              </div>\n\n              <div class="lower ">\n\n                <p class="font10">Amount</p>\n\n                <p class="font10">\n\n\n\n                  {{row.amount}}\n\n                </p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n\n\n\n\n\n\n        <div class="border-container mt16" *ngIf="formData.amount && formData.invoice_type==\'Service\'">\n\n          <!-- <div class="summary-heading">Summary</div> -->\n\n          <ng-container>\n\n            <div class="pb100">\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">Sub Total</p>\n\n                <div class="dateCreated"><span>{{formData.amount}}</span></div>\n\n              </div>\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">Discount</p>\n\n                <div class="dateCreated"><span>{{formData.discount_amount}}</span></div>\n\n              </div>\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">GST(18%)</p>\n\n                <div class="dateCreated"><span>{{formData.gst_amount}}</span></div>\n\n              </div>\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">Net Amount</p>\n\n                <div class="dateCreated"><span>{{formData.final_amount}}</span></div>\n\n              </div>\n\n            </div>\n\n\n\n          </ng-container>\n\n        </div>\n\n\n\n\n\n        <div class="border-container mt16" *ngIf="formData.invoice_type!=\'Service\'&& add_list.length">\n\n\n\n          <ng-container>\n\n            <div class="pb100">\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">Sub Total</p>\n\n                <div class="dateCreated"><span>{{formData.amount}}</span></div>\n\n              </div>\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">Discount</p>\n\n                <div class="dateCreated"><span>{{formData.discount_amount}}</span></div>\n\n              </div>\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">GST(18%)</p>\n\n                <div class="dateCreated"><span>{{formData.gst_amount}}</span></div>\n\n              </div>\n\n              <div class="remarkSent">\n\n                <p class="remarkMsg">Net Amount</p>\n\n                <div class="dateCreated"><span>{{formData.final_amount}}</span></div>\n\n              </div>\n\n            </div>\n\n\n\n          </ng-container>\n\n        </div>\n\n\n\n\n\n        <div class="enquiry-btn add-btns mt20"\n\n          *ngIf="formData.invoice_type==\'Service\'||(formData.invoice_type!=\'Service\'&& add_list.length)">\n\n          <button ion-button class="Buttons1">\n\n            <p>Submit</p>\n\n          </button>\n\n        </div>\n\n      </ion-list>\n\n\n\n    </div>\n\n\n\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\addinvoice\addinvoice.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_open_native_settings__["a" /* OpenNativeSettings */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
    ], AddinvoicePage);
    return AddinvoicePage;
}());

//# sourceMappingURL=addinvoice.js.map

/***/ })

});
//# sourceMappingURL=38.js.map