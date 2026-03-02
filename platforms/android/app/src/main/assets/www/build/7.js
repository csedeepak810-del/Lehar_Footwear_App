webpackJsonp([7],{

/***/ 1362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandAuditListPageModule", function() { return BrandAuditListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brand_audit_list__ = __webpack_require__(1439);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BrandAuditListPageModule = /** @class */ (function () {
    function BrandAuditListPageModule() {
    }
    BrandAuditListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__brand_audit_list__["a" /* BrandAuditListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__brand_audit_list__["a" /* BrandAuditListPage */]),
            ],
        })
    ], BrandAuditListPageModule);
    return BrandAuditListPageModule;
}());

//# sourceMappingURL=brand-audit-list.module.js.map

/***/ }),

/***/ 1428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandAuditAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__support_list_support_list__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var BrandAuditAddPage = /** @class */ (function () {
    function BrandAuditAddPage(storage, navCtrl, openNativeSettings, Device, diagnostic, navParams, service, actionSheetController, camera, alertCtrl, toastCtrl, loadingCtrl) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.openNativeSettings = openNativeSettings;
        this.Device = Device;
        this.diagnostic = diagnostic;
        this.navParams = navParams;
        this.service = service;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.data = {};
        this.selectImage = [];
        this.brandList = [];
        this.savingFlag = false;
        this.spinnerLoader = false;
        this.networkType = [];
        this.drList = [];
        this.service.presentLoading();
        console.log(this.navParams, 'this.navParams');
    }
    BrandAuditAddPage.prototype.ionViewWillEnter = function () {
        this.data.branding_required = 'Yes';
        if (this.navParams.get('checkin_id')) {
            this.checkin_id = this.navParams.get('checkin_id');
            this.data.checkin_id = this.navParams.get('checkin_id');
            this.data.customer_type = this.navParams.get('dr_type');
            if (this.data.customer_type) {
                this.data.customer_name = this.navParams.get('dr_id');
                this.getBrandAuditData();
                this.getNetworkType();
            }
        }
        else if (this.navParams.get('fromPage') == 'distDetail') {
            this.data.customer_type = this.navParams.get('dr_type');
            if (this.data.customer_type) {
                this.data.customer_name = this.navParams.get('dr_id');
                this.getBrandAuditData();
                this.getNetworkType();
            }
        }
        else {
            this.getBrandAuditData();
            this.getNetworkType();
        }
    };
    BrandAuditAddPage.prototype.getBrandAuditData = function () {
        var _this = this;
        this.service.addData({}, 'AppBrandAudit/getBrandCategory').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.brandList = result['data'];
                _this.service.dismissLoading();
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        });
    };
    BrandAuditAddPage.prototype.getNetworkType = function () {
        var _this = this;
        this.service.addData({}, "AppFollowup/allNetworkModule").then((function (result) {
            if (result['statusCode'] == 200) {
                _this.networkType = result['modules'];
                if (_this.checkin_id || _this.navParams.get('fromPage') == 'distDetail') {
                    _this.getCustomerData(_this.data.customer_type);
                }
            }
            else {
                _this.service.errorToast(result['statusMsg']);
            }
        }));
    };
    BrandAuditAddPage.prototype.getCustomerData = function (data) {
        var _this = this;
        var Index = this.networkType.findIndex(function (row) { return row.type == data; });
        if (Index != -1) {
            this.data.module_name = this.networkType[Index]['module_name'];
        }
        this.service.addData({ 'dr_type': data }, 'AppOrder/followupCustomer').then(function (result) {
            _this.drList = result['result'];
        });
    };
    BrandAuditAddPage.prototype.onUploadChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: "Upload Image",
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: 'Gallery',
                    icon: 'image',
                    handler: function () {
                        _this.getImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionsheet.present();
    };
    BrandAuditAddPage.prototype.takePhoto = function () {
        var _this = this;
        this.diagnostic.requestCameraAuthorization().then(function (isAvailable) {
            var options = {
                quality: 70,
                destinationType: _this.camera.DestinationType.DATA_URL,
                targetWidth: 500,
                targetHeight: 400
            };
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.start('Lehar Footwear', 'Your Camera Is Opened.');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                var image = 'data:image/jpeg;base64,' + imageData;
                _this.selectImage.push(image);
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
            }, function (err) {
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
            });
        }).catch(function (error) {
            _this.presentConfirm('Error Occured', error);
        });
    };
    BrandAuditAddPage.prototype.presentConfirm = function (title, msg) {
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
    BrandAuditAddPage.prototype.openSettings = function () {
        this.openNativeSettings.open("application_details");
    };
    BrandAuditAddPage.prototype.getImage = function () {
        var _this = this;
        this.diagnostic.requestCameraAuthorization().then(function (isAvailable) {
            var options = {
                quality: 70,
                destinationType: _this.camera.DestinationType.DATA_URL,
                sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                saveToPhotoAlbum: false
            };
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.start('Advance Laminates', 'Your Camera Is Opened.');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                var image = 'data:image/jpeg;base64,' + imageData;
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
                _this.selectImage.push(image);
            }, function (err) {
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
            });
        }).catch(function (error) {
            _this.presentConfirm('Error Occured', error);
        });
    };
    BrandAuditAddPage.prototype.delete_img = function (index) {
        this.selectImage.splice(index, 1);
    };
    BrandAuditAddPage.prototype.confirmAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: "Are you sure !",
            message: "Do you want to save this brand Audit ?",
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
    BrandAuditAddPage.prototype.submit = function () {
        var _this = this;
        this.data.image = this.selectImage;
        this.data.customer_type = this.data.module_name;
        this.savingFlag = true;
        this.spinnerLoader = true;
        this.data.brand_detail = (this.data.brand_detail).toString();
        var customerIndex;
        if (this.checkin_id || this.navParams.get('fromPage') == 'distDetail') {
            customerIndex = this.drList.findIndex(function (row) { return row.id == _this.data.customer_name; });
        }
        if (!this.checkin_id && this.navParams.get('fromPage') != 'distDetail') {
            customerIndex = this.drList.findIndex(function (row) { return row.id == _this.data.customer_name.id; });
        }
        if (customerIndex != -1) {
            this.data.customer_id = this.drList[customerIndex]['id'];
            this.data.customer_name = this.drList[customerIndex]['display_name'];
        }
        this.service.addData({ 'data': this.data }, 'AppBrandAudit/addBrandAudit')
            .then(function (result) {
            if (result['statusCode'] == 200) {
                _this.spinnerLoader = true;
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_5__support_list_support_list__["a" /* SupportListPage */]);
                _this.service.successToast(result['statusMsg']);
                _this.savingFlag = false;
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.savingFlag = false;
            }
        }, function (error) {
            _this.savingFlag = false;
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], BrandAuditAddPage.prototype, "selectComponent", void 0);
    BrandAuditAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-brand-audit-add',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-add\brand-audit-add.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add Brand Audit</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <form #f="ngForm" (ngSubmit)="f.form.valid && confirmAlert()">\n\n    <div class="form">\n\n      <ion-list no-lines class="padding10">\n\n        <ion-item [ngClass]="{\'error\':f.submitted && customer_type?.invalid}">\n\n          <ion-label floating>Select Customer Type <span class="red-text">*</span></ion-label>\n\n          <ion-select interface="action-sheet" name="customer_type" #customer_type="ngModel"\n\n            [(ngModel)]="data.customer_type" (ngModelChange)="getCustomerData(data.customer_type)"\n\n            [disabled]="checkin_id || this.navParams.get(\'fromPage\') == \'distDetail\'" required>\n\n            <ion-option *ngFor="let row of networkType" value="{{row.type}}">{{row.module_name == \'Enquiry\' ? \'New Leads\' : (row.module_name == \'Lead\' ? \'Project\' : row.module_name) \n\n              }}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && customer_type?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n\n\n\n\n        <ng-container *ngIf="checkin_id || this.navParams.get(\'fromPage\') == \'distDetail\'">\n\n          <ion-item [ngClass]="{\'error\':f.submitted && data.customer_name?.invalid}">\n\n            <ion-label floating>{{data.module_name == \'Enquiry\' ? \'New Leads\' : (data.module_name == \'Lead\' ? \'Project\' : data.module_name) \n\n            }} <span class="red-text">*</span></ion-label>\n\n            <ion-select interface="action-sheet" name="customer_name" #customer_name="ngModel"\n\n              [(ngModel)]="data.customer_name" [disabled]="checkin_id || this.navParams.get(\'fromPage\') == \'distDetail\'"\n\n              required>\n\n              <ion-option *ngFor="let row of drList" value="{{row.id}}">{{row.display_name}}</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n        </ng-container>\n\n        <ng-container *ngIf="!checkin_id && this.navParams.get(\'fromPage\') != \'distDetail\'">\n\n          <ion-item [ngClass]="{\'error\':f.submitted && customer_name?.invalid}" *ngIf="data.customer_type">\n\n            <ion-label floating>{{data.module_name}} <span class="red-text">*</span></ion-label>\n\n\n\n            <ionic-selectable item-content name="customer_name" #customer_name="ngModel"\n\n              [(ngModel)]="data.customer_name" [items]="drList" itemValueField="id" itemTextField="display_name"\n\n              [canSearch]="true" #selectComponent>\n\n            </ionic-selectable>\n\n          </ion-item>\n\n          <div class="eror" *ngIf="f.submitted && customer_name?.invalid">\n\n            <p> {{ \'This field is required\'}}</p>\n\n          </div>\n\n        </ng-container>\n\n\n\n\n\n        <ion-item class="multiselectionSelectionBox" [ngClass]="{\'error\':f.submitted && brand_detail?.invalid}">\n\n          <ion-label floating>Visibility of Competition Brand <span class="red-text">*</span></ion-label>\n\n          <ion-select [multiple]="true" name="brand_detail" #brand_detail="ngModel" [(ngModel)]="data.brand_detail"\n\n            required>\n\n            <ion-option *ngFor="let row of brandList" value="{{row.category_name}}">{{row.category_name |\n\n              titlecase}}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && brand_detail?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n        <div class="radio-section">\n\n          <h2 style="font-size: 12px;">Branding Required <span class="red-text">*</span></h2>\n\n          <ion-list class="choose mb0" radio-group name="branding_required" [(ngModel)]="data.branding_required"\n\n            #branding_required="ngModel" [ngClass]="{\'error\':f.submitted && branding_required?.invalid}" required>\n\n            <ion-item>\n\n              <ion-radio checked="true" value="Yes"></ion-radio>\n\n              <ion-label>Yes</ion-label>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label>No</ion-label>\n\n              <ion-radio value="No"></ion-radio>\n\n            </ion-item>\n\n          </ion-list>\n\n          <div class="eror" *ngIf="f.submitted && branding_required?.invalid">\n\n            <p> {{ \'This field is required\'}}</p>\n\n          </div>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && remarks?.invalid}" *ngIf="data.branding_required == \'Yes\'">\n\n          <ion-label floating>Remark <span class="red-text">*</span></ion-label>\n\n          <ion-textarea name="remarks" #remarks="ngModel" [(ngModel)]="data.remarks"></ion-textarea>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && remarks?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n      </ion-list>\n\n\n\n      <div class="upload-doc upload-doc mt0  pt0 padding10">\n\n        <div class="">\n\n          Attach Image\n\n        </div>\n\n        <ul class="no-padding">\n\n          <li class="add-image" (click)="onUploadChange()">\n\n            <i class="material-icons">add_a_photo</i>\n\n          </li>\n\n          <li class="image-upload" *ngFor="let image of selectImage;index as i">\n\n            <img src="{{image}}">\n\n            <button class="del" (click)="delete_img(i)"><i class="material-icons">delete_sweep</i></button>\n\n          </li>\n\n        </ul>\n\n      </div>\n\n      <button ion-button color="primary" block [disabled]="savingFlag == true">\n\n        <ion-spinner *ngIf="spinnerLoader"></ion-spinner>&nbsp;{{savingFlag == true ? \'Please Wait\': \'Save\' }}\n\n      </button>\n\n    </div>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-add\brand-audit-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__["a" /* OpenNativeSettings */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], BrandAuditAddPage);
    return BrandAuditAddPage;
}());

//# sourceMappingURL=brand-audit-add.js.map

/***/ }),

/***/ 1429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandAuditDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_profile_view_profile__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BrandAuditDetailPage = /** @class */ (function () {
    function BrandAuditDetailPage(navCtrl, navParams, constant, alertCtrl, service, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.constant = constant;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.brandAuditDetail = {};
        this.docImg = [];
        this.data = {};
        this.star = '';
        this.url = '';
        this.start_rating = {};
        this.url = this.constant.upload_url1 + 'brandAudit/';
        this.service.presentLoading();
        if (this.navParams.get('id')) {
            this.id = this.navParams.get('id');
        }
        if (this.id) {
            this.getBrandAuditDetail();
        }
    }
    BrandAuditDetailPage.prototype.ionViewDidLoad = function () {
    };
    BrandAuditDetailPage.prototype.getBrandAuditDetail = function () {
        var _this = this;
        this.service.addData({ 'id': this.id }, 'AppBrandAudit/getBrandAuditDetail').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.brandAuditDetail = result['data'];
                _this.docImg = _this.brandAuditDetail.img;
                _this.star = _this.brandAuditDetail.feedback_star;
                _this.service.dismissLoading();
            }
            else {
                _this.service.errorToast(result['statusMsg']);
                _this.service.dismissLoading();
            }
        }, function (er) {
            _this.service.dismissLoading();
        });
    };
    BrandAuditDetailPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    BrandAuditDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-brand-audit-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-detail\brand-audit-detail.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Brand Audit Detail</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="attendance-list flat-list">\n\n    <div class="slab slab-bg">\n\n      <div class="slab-day">\n\n        <p>{{brandAuditDetail.date_created != \'0000-00-00 00:00:00\' ? (brandAuditDetail.date_created | date:\'d MMM yyy , hh:mm a\') : \'---\'  }}</p>\n\n        <span>Date Created</span>\n\n      </div>\n\n      <div class="slab-day">\n\n        <p># {{brandAuditDetail.id}}</p>\n\n        <span >Brand Audit Id</span>\n\n      </div>\n\n    </div>\n\n    <div class="center-block">\n\n      <div class="circle" >{{brandAuditDetail.customer_name?.substring(0,1).toUpperCase()}}</div>\n\n      <h1 class="f12" >{{brandAuditDetail.customer_name?.toUpperCase()}}</h1>\n\n      <p>{{brandAuditDetail.customer_type}}</p>\n\n  </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Brand Detail :</strong> {{brandAuditDetail.brand_detail ? brandAuditDetail.brand_detail : \'---\'}}</p>\n\n    </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Branding Required :</strong> {{brandAuditDetail.branding_required ? brandAuditDetail.branding_required : \'No\'}}</p>\n\n    </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Remark :</strong> {{brandAuditDetail.message}}</p>\n\n    </div>\n\n  </div>\n\n  \n\n  \n\n  \n\n  <div class="upload-doc pl16 pr16">\n\n    <ng-container *ngIf="docImg.length > 0">\n\n      <div class="">\n\n        Brand Audit Image\n\n      </div>\n\n      <ul class="no-padding" >\n\n        <li class="image-upload" *ngFor="let image of docImg; index as i" (click)="imageModal(url+image.document_name)">\n\n          <img src="{{url+image.document_name}}">\n\n        </li>\n\n      </ul>\n\n    </ng-container>\n\n    \n\n  </div>\n\n  \n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-detail\brand-audit-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], BrandAuditDetailPage);
    return BrandAuditDetailPage;
}());

//# sourceMappingURL=brand-audit-detail.js.map

/***/ }),

/***/ 1439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandAuditListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__brand_audit_add_brand_audit_add__ = __webpack_require__(1428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__brand_audit_detail_brand_audit_detail__ = __webpack_require__(1429);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BrandAuditListPage = /** @class */ (function () {
    function BrandAuditListPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.brandAuditData = [];
        this.activeTab = 'Pending';
        this.filter = {};
        this.Frompage = '';
        this.Dr_id = '';
        this.flag = '';
        this.service.presentLoading();
        this.Frompage = this.navParams.get('fromPage');
        this.Dr_id = this.navParams.get('dr_id');
    }
    BrandAuditListPage.prototype.ionViewDidEnter = function () {
        this.getBrandAuditList();
    };
    BrandAuditListPage.prototype.getBrandAuditList = function () {
        var _this = this;
        this.filter.limit = 20;
        this.filter.start = 0;
        var header;
        if (this.Frompage == 'audit') {
            header = { 'filter': this.filter, 'customer_id': this.Dr_id };
        }
        else {
            header = { 'filter': this.filter };
        }
        this.service.addData(header, 'AppBrandAudit/getBrandAuditList').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.brandAuditData = result['data'];
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
    BrandAuditListPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.start = this.brandAuditData.length;
        var header;
        if (this.Frompage == 'audit') {
            header = { 'filter': this.filter, 'customer_id': this.Dr_id };
        }
        else {
            header = { 'filter': this.filter };
        }
        this.service.addData(header, 'AppBrandAudit/getBrandAuditList').then(function (r) {
            if (r == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.brandAuditData = _this.brandAuditData.concat(r['data']);
                    infiniteScroll.complete();
                }, 1000);
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    BrandAuditListPage.prototype.doRefresh = function (refresher) {
        this.getBrandAuditList();
        setTimeout(function () {
            refresher.complete();
        }, 1000);
    };
    BrandAuditListPage.prototype.goToBrandAuditAdd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__brand_audit_add_brand_audit_add__["a" /* BrandAuditAddPage */]);
    };
    BrandAuditListPage.prototype.support_detail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__brand_audit_detail_brand_audit_detail__["a" /* BrandAuditDetailPage */], { 'id': id });
    };
    BrandAuditListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-brand-audit-list',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-list\brand-audit-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Brand Audit</ion-title>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n    refreshingText="Refreshing...">\n\n  </ion-refresher-content>\n\n</ion-refresher>\n\n<div class="nothing-here" *ngIf="!brandAuditData.length">\n\n  <div class="outer">\n\n    <div class="innear">\n\n      <img src="assets/imgs/no_found.svg" alt="">\n\n      <p>Data Not Available</p>\n\n    </div>\n\n  </div>\n\n</div>\n\n<div class="pd-left-right16 mt16 mb100">\n\n  <div class="attendance-list"  *ngFor="let data of brandAuditData" (click)="support_detail(data.id)">\n\n    <div class="slab slab-bg">\n\n      <div class="slab-day">\n\n        <p>{{data.date_created != \'0000-00-00 00:00:00\' ? (data.date_created | date:\'d MMM yyy , hh:mm a\') : \'---\'  }}</p>\n\n        <span>Date Created</span>\n\n      </div>\n\n      <div class="slab-day">\n\n        <p># {{data.id}}</p>\n\n        <span >Brand Audit Id</span>\n\n      </div>\n\n    </div>\n\n    <div class="center-block">\n\n      <div class="circle" >{{data.customer_name?.substring(0,1).toUpperCase()}}</div>\n\n      <h1 class="f12" >{{data.customer_name?.toUpperCase()}}</h1>\n\n      <p>{{data.customer_type}}</p>\n\n  </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Brand Detail :</strong> {{data.brand_detail ? data.brand_detail : \'---\'}}</p>\n\n    </div>\n\n    <div class="other-block pb0">\n\n      <p><strong>Remark :</strong> {{data.message}}</p>\n\n    </div>\n\n \n\n  </div>\n\n\n\n\n\n\n\n  <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n\n		<ion-infinite-scroll-content\n\n		loadingSpinner="bubbles"\n\n		loadingText="Loading more data...">\n\n	</ion-infinite-scroll-content>\n\n</ion-infinite-scroll>\n\n</div>\n\n\n\n<ion-fab right bottom (click)="goToBrandAuditAdd()" *ngIf="Frompage != \'audit\'">\n\n  <button ion-fab color="primary"><ion-icon name="add"></ion-icon></button>\n\n</ion-fab>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\brand-audit-list\brand-audit-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], BrandAuditListPage);
    return BrandAuditListPage;
}());

//# sourceMappingURL=brand-audit-list.js.map

/***/ })

});
//# sourceMappingURL=7.js.map