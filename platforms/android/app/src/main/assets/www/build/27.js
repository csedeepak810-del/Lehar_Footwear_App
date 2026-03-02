webpackJsonp([27],{

/***/ 1398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopRequisitionAddPageModule", function() { return PopRequisitionAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pop_requisition_add__ = __webpack_require__(1431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopRequisitionAddPageModule = /** @class */ (function () {
    function PopRequisitionAddPageModule() {
    }
    PopRequisitionAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__pop_requisition_add__["a" /* PopRequisitionAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__pop_requisition_add__["a" /* PopRequisitionAddPage */]),
            ],
        })
    ], PopRequisitionAddPageModule);
    return PopRequisitionAddPageModule;
}());

//# sourceMappingURL=pop-requisition-add.module.js.map

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

/***/ })

});
//# sourceMappingURL=27.js.map