webpackJsonp([15],{

/***/ 1394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallationDetailPageModule", function() { return InstallationDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__installation_detail__ = __webpack_require__(1410);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InstallationDetailPageModule = /** @class */ (function () {
    function InstallationDetailPageModule() {
    }
    InstallationDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__installation_detail__["a" /* InstallationDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__installation_detail__["a" /* InstallationDetailPage */]),
            ],
        })
    ], InstallationDetailPageModule);
    return InstallationDetailPageModule;
}());

//# sourceMappingURL=installation-detail.module.js.map

/***/ }),

/***/ 1410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstallationDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__close_installtion_close_installtion__ = __webpack_require__(1415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__view_profile_view_profile__ = __webpack_require__(22);
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
* Generated class for the InstallationDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var InstallationDetailPage = /** @class */ (function () {
    function InstallationDetailPage(sanitizer, navCtrl, navParams, serve, loadingCtrl, modalCtrl, alertCtrl, db, constant) {
        this.sanitizer = sanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.constant = constant;
        this.complaint_id = '';
        this.installtion_detail = {};
        this.installation_remark = [];
        this.complaint_images = [];
        this.closing_image = [];
        this.complaint_media = [];
        this.item_details = [];
        this.rating_star = '';
        this.star = '';
        this.amount = {};
        this.installation_type = 'Details';
        this.data = {};
        // console.log(this.navParams);
        this.id = this.navParams.data.id;
        // console.log(this.id);
        this.bannerURL = constant.upload_url1 + 'service_task/';
        this.complaint_id = this.navParams.get('id');
    }
    InstallationDetailPage_1 = InstallationDetailPage;
    InstallationDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InstallationDetailPage');
    };
    InstallationDetailPage.prototype.ionViewWillEnter = function () {
        this.getInstallationDetail(this.complaint_id);
    };
    InstallationDetailPage.prototype.imageModal = function (src) {
        // console.log(src);
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    // getInstallationDetail(id) {
    //   this.db.presentLoading();
    //   this.db.addData({ 'complaint_id': id }, 'AppServiceTask/serviceInstallationDetail').then(response => {
    //     console.log(response);
    //     this.loading.dismiss();
    //     this.installtion_detail = response['result'];
    //     console.log(this.installtion_detail);
    //     this.item_details = response['result']['add_list'];
    //     console.log(this.item_details);
    //     this.installation_remark = response['result']['log'];
    //     this.complaint_images = response['result']['image'];
    //     this.closing_image = response['result']['closing_image'];
    //     console.log(this.installation_remark);
    //   });
    // }
    InstallationDetailPage.prototype.getInstallationDetail = function (id) {
        var _this = this;
        this.db.presentLoading();
        this.db.addData({ 'complaint_id': id }, 'AppServiceTask/serviceInstallationDetail').then(function (response) {
            if (response['statusCode'] == 200) {
                // console.log(response);
                _this.installtion_detail = response['result'];
                // console.log(this.installtion_detail);
                _this.item_details = response['result']['add_list'];
                // console.log(this.item_details);
                _this.installation_remark = response['result']['log'];
                // this.complaint_images = response['result']['image'];
                _this.closing_image = response['result']['closing_image'];
                console.log(_this.installation_remark);
                _this.db.dismissLoading();
            }
            else {
                _this.db.errorToast(response['statusMsg']);
                _this.db.dismissLoading();
            }
        }, function (error) {
            _this.db.Error_msg(error);
            _this.db.dismiss();
        });
    };
    InstallationDetailPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    InstallationDetailPage.prototype.goToClose = function (id, customer_mobile) {
        this.navCtrl.push(this.installtion_detail, { "id": id, "customer_mobile": customer_mobile });
    };
    InstallationDetailPage.prototype.addRemark = function () {
        var _this = this;
        this.db.addData({ "complaint_id": this.id, "msg": this.data.msg }, 'AppServiceTask/addComplaintRemark').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.db.dismissLoading();
                _this.showSuccess("Remark Added Successfully!");
                _this.navCtrl.popTo(InstallationDetailPage_1, { id: _this.id });
            }
            else {
                _this.db.errorToast(result['statusMsg']);
            }
            // console.log(result);
        });
    };
    InstallationDetailPage.prototype.goToClosePage = function (id, customer_mobile, closing_type) {
        if (this.installtion_detail.complaint_status == 'Reject' || this.installtion_detail.complaint_status == 'Done') {
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__close_installtion_close_installtion__["a" /* CloseInstalltionPage */], { "id": id, "customer_mobile": customer_mobile, "closing_type": closing_type });
            this.installation_type = 'Details';
        }
    };
    InstallationDetailPage = InstallationDetailPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-installation-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\installation-detail\installation-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Installation Detail</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="detais">\n\n    <div class="capsule-tabs" style="border-bottom: 0px;">\n\n      <ul>\n\n        <li [ngClass]="{\'active\':installation_type == \'Details\'}" (click)="installation_type = \'Details\';">\n\n          <p>Details</p>\n\n        </li>\n\n        <li [ngClass]="{\'active\':installation_type == \'Remark\'}" (click)="installation_type = \'Remark\';">\n\n          <p>Remark</p>\n\n        </li>\n\n        <li [ngClass]="{\'active\':installation_type == \'Done\'}"\n\n          (click)="installation_type = \'Done\';goToClosePage(installtion_detail.id,installtion_detail.customer_mobile,installtion_detail.closing_type)"\n\n          *ngIf=" installtion_detail.complaint_status==\'Done\'">\n\n          <p>Complete</p>\n\n        </li>\n\n        <li [ngClass]="{\'active\':installation_type == \'Reject\'}" (click)="installation_type = \'Reject\'"\n\n          *ngIf="installtion_detail.complaint_status==\'Reject\'">\n\n          <p>Reject</p>\n\n        </li>\n\n      </ul>\n\n    </div>\n\n    <div class="attendance-list flat-list" *ngIf="installation_type == \'Details\'">\n\n      <div class="slab slab-bg">\n\n        <div class="slab-day">\n\n          <p>\n\n            {{installtion_detail.date_created | date:\'d MMM y\'}}\n\n          </p>\n\n          <span>Date Created</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p>{{installtion_detail.created_name ? (installtion_detail.created_name|titlecase) : \'---\'}}</p>\n\n          <span>Created By</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p>{{installtion_detail.complain_no ? installtion_detail.complain_no : \'---\'}}</p>\n\n          <span>Id</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p>{{installtion_detail.pending_at?installtion_detail.pending_at :\'--\'}}</p>\n\n          <span>TAT</span>\n\n        </div>\n\n\n\n      </div>\n\n      <div class="center-block">\n\n        <div class="circle">{{installtion_detail.customer_name?.substring(0,1).toUpperCase()}}</div>\n\n        <h1 class="f12">{{installtion_detail.customer_name ? (installtion_detail.customer_name|titlecase) : \'---\'}}</h1>\n\n        <p>{{installtion_detail.customer_mobile ? installtion_detail.customer_mobile :\n\n          \'---\'}}</p>\n\n\n\n      </div>\n\n      <div class="other-block">\n\n        <p>\n\n          <strong>Address :</strong>{{ installtion_detail.city | titlecase }} , {{installtion_detail.district |\n\n          titlecase }} , {{installtion_detail.state |\n\n          titlecase}} , {{installtion_detail.pincode}}\n\n        </p>\n\n      </div>\n\n    </div>\n\n\n\n\n\n    <div class="border-container mt16" *ngIf="installation_type == \'Details\'">\n\n      <div class="summary-heading">Product Details</div>\n\n      <div class="payment-box">\n\n        <div class="credit-table">\n\n          <table>\n\n            <tr>\n\n              <th class="text-left">Product Details</th>\n\n              <th class=" w50 text-center">Qty</th>\n\n            </tr>\n\n            <ng-container *ngFor="let row of item_details;">\n\n              <tr>\n\n                <td>{{ row.product_name |titlecase }}-{{row.product_code |titlecase}}</td>\n\n                <td class="w50 text-center">{{row.qty}}</td>\n\n              </tr>\n\n            </ng-container>\n\n          </table>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="border-container mt16" *ngIf="installation_type == \'Remark\'">\n\n      <div class="summary-heading">Remarks</div>\n\n      <ng-container>\n\n        <div class="pb100">\n\n          <div class="remarkSent" *ngFor="let row of installation_remark">\n\n            <p class="remarkMsg">{{row.msg | titlecase}}</p>\n\n            <div class="dateCreated"><span>({{row.created_by_type}})</span> <span>{{row.date_created | date:\'d MMM\n\n                y\'}}</span></div>\n\n          </div>\n\n          <div class="nothing-here" *ngIf="installation_remark == 0">\n\n            <div class="outer">\n\n              <div class="innear">\n\n                <img src="assets/imgs/no_found.svg" alt="">\n\n                <p>Data Not Available</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n\n\n      </ng-container>\n\n    </div>\n\n\n\n    <div class="border-container mt16" *ngIf="installation_type == \'Done\'">\n\n      <div class="summary-heading">Done Details</div>\n\n      <ng-container>\n\n\n\n        <div class="">\n\n\n\n          <table>\n\n            <tr>\n\n              <th class="w100">Installtion Id</th>\n\n              <td>{{installtion_detail.complain_no}}</td>\n\n            </tr>\n\n            <tr>\n\n              <th class="w100">Installtion Date</th>\n\n              <td>{{installtion_detail.closed_date | date:\'d MMM y\'}}</td>\n\n            </tr>\n\n            <tr>\n\n              <th class="w100">Installtion Remark</th>\n\n              <td>{{installtion_detail.closing_remark | titlecase}}</td>\n\n            </tr>\n\n          </table>\n\n        </div>\n\n        <div class="upload-doc mt16">\n\n          <ul class="no-padding">\n\n\n\n            <li class="image-upload" *ngFor="let row of closing_image" (click)="imageModal(bannerURL + row.image)">\n\n              <img src="{{bannerURL + row.image}}">\n\n\n\n            </li>\n\n          </ul>\n\n\n\n        </div>\n\n\n\n      </ng-container>\n\n    </div>\n\n    <div class="border-container mt16" *ngIf="installation_type == \'Reject\'">\n\n      <div class="summary-heading">Reject Details</div>\n\n      <ng-container>\n\n        <div class="">\n\n          <table>\n\n            <tr>\n\n              <th class="w100">Installtion Id</th>\n\n              <td>{{installtion_detail.complain_no }}</td>\n\n            </tr>\n\n            <tr>\n\n              <th class="w100">Cancel Date</th>\n\n              <td>{{installtion_detail.closed_date | date:\'d MMM y\'}}</td>\n\n            </tr>\n\n            <tr>\n\n              <th class="w100">Cancel Remark</th>\n\n              <td>{{installtion_detail.closing_remark | titlecase}}</td>\n\n            </tr>\n\n          </table>\n\n        </div>\n\n        <div class="upload-doc mt16">\n\n          <ul class="no-padding">\n\n\n\n            <li class="image-upload" *ngFor="let row of closing_image" (click)="imageModal(bannerURL + row.image)">\n\n              <img src="{{bannerURL + row.image}}">\n\n\n\n            </li>\n\n          </ul>\n\n\n\n        </div>\n\n\n\n      </ng-container>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n\n\n  <div class="pl16 pr16 mb16">\n\n    <button ion-button block icon-start round color="success"\n\n      (click)="goToClosePage(installtion_detail.id,installtion_detail.customer_mobile,installtion_detail.closing_type)"\n\n      *ngIf="installtion_detail.complaint_status==\'Pending\' && installation_type == \'Details\'">Update\n\n      Status</button>\n\n  </div>\n\n\n\n  <div class="footer-input-block"\n\n    *ngIf="installation_type == \'Remark\' && installtion_detail.complaint_status == \'Pending\' ">\n\n    <textarea type="text" placeholder="Add Remark" name="msg" #msg="ngModel" [(ngModel)]="data.msg"></textarea>\n\n    <button ion-button icon-start color="success" (click)="addRemark()"><ion-icon name="send"></ion-icon></button>\n\n  </div>\n\n</ion-footer>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\installation-detail\installation-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__["a" /* ConstantProvider */]])
    ], InstallationDetailPage);
    return InstallationDetailPage;
    var InstallationDetailPage_1;
}());

//# sourceMappingURL=installation-detail.js.map

/***/ }),

/***/ 1415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloseInstalltionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_open_native_settings__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__installation_detail_installation_detail__ = __webpack_require__(1410);
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
 * Generated class for the CloseInstalltionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CloseInstalltionPage = /** @class */ (function () {
    function CloseInstalltionPage(navCtrl, navParams, service, loadingCtrl, alertCtrl, serve, platform, openNativeSettings, actionSheetController, diagnostic, androidPermissions, dom, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
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
        this.data = {};
        this.qr_code = '';
        this.sendOTP = false;
        this.Otp_verify = false;
        this.OTP_flag = false;
        this.isDisabled = true;
        this.mobile_number = {};
        this.btnDisableSave = false;
        this.btnDisableDraft = false;
        this.btndisable = false;
        this.isCameraEnabled = false;
        this.otp = {};
        this.image = '';
        this.flag_upload = true;
        this.flag_play = true;
        // getVideo()
        // {
        //   this.fileChooser.open()
        //   .then(uri => {
        //     this.videoId = uri;
        //     this.flag_play = false;
        //     this.flag_upload = false;
        //   })
        //   .catch(e => console.log(e));
        // }
        this.image_data = [];
        console.log(this.navParams);
        this.id = this.navParams.data.id;
        this.customer_mobile = this.navParams.data.customer_mobile;
        this.closing_type = this.navParams.data.closing_type;
        console.log(this.id);
        console.log(this.customer_mobile);
        console.log(this.closing_type);
    }
    CloseInstalltionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CloseInstalltionPage');
    };
    CloseInstalltionPage.prototype.presentConfirm = function (title, msg) {
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
    CloseInstalltionPage.prototype.openSettings = function () {
        this.openNativeSettings.open("application_details");
    };
    CloseInstalltionPage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CloseInstalltionPage.prototype.isCameraAvailable = function () {
        var _this = this;
        this.diagnostic.isCameraPresent()
            .then(function (isAvailable) {
            _this.isCameraEnabled = true;
        })
            .catch(function (error) {
            console.dir('Camera is:' + error);
        });
    };
    CloseInstalltionPage.prototype.captureMedia = function () {
        var _this = this;
        if (this.videoId) {
            this.captureImageVideo();
        }
        else {
            var actionsheet = this.actionSheetController.create({
                title: "Upload",
                cssClass: 'cs-actionsheet',
                buttons: [{
                        cssClass: 'sheet-m',
                        text: 'Image',
                        icon: 'camera',
                        handler: function () {
                            console.log("Image Clicked");
                            _this.captureImageVideo();
                        }
                    },
                    // {
                    //   cssClass: 'sheet-m1',
                    //   text: 'Video',
                    //   icon:'image',
                    //   handler: () => {
                    //     console.log("Video Clicked");
                    //     this.onGetCaptureVideoPermissionHandler();
                    //   }
                    // },
                    {
                        cssClass: 'cs-cancel',
                        text: 'Cancel',
                        role: 'cancel',
                        icon: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionsheet.present();
        }
    };
    CloseInstalltionPage.prototype.showLimit = function () {
        console.log('Image Data', this.image_data);
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: "You can upload only 5 bill images",
            cssClass: 'alert-modal',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    CloseInstalltionPage.prototype.captureImageVideo = function () {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: "Complaint Media",
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        console.log("Camera Clicked");
                        _this.takePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: 'Gallery',
                    icon: 'image',
                    handler: function () {
                        console.log("Gallery Clicked");
                        _this.getImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionsheet.present();
    };
    CloseInstalltionPage.prototype.takePhoto = function () {
        var _this = this;
        console.log("i am in camera function");
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.image = 'data:image/jpeg;base64,' + imageData;
            // this.image=  imageData;
            // this.image= imageData.substr(imageData.lastIndexOf('/') + 1);
            console.log(_this.image);
            if (_this.image) {
                _this.fileChange(_this.image);
            }
        }, function (err) {
        });
    };
    CloseInstalltionPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.image = 'data:image/jpeg;base64,' + imageData;
            // this.image=  imageData;
            // this.image= imageData.substr(imageData.lastIndexOf('/') + 1);
            console.log(_this.image);
            if (_this.image) {
                _this.fileChange(_this.image);
            }
        }, function (err) {
        });
    };
    CloseInstalltionPage.prototype.fileChange = function (img) {
        this.image_data.push({ "image": img });
        console.log(this.image_data);
        this.image = '';
    };
    CloseInstalltionPage.prototype.remove_image = function (i) {
        this.image_data.splice(i, 1);
    };
    CloseInstalltionPage.prototype.MobileNumber = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    CloseInstalltionPage.prototype.send_otp = function () {
        var _this = this;
        console.log('send otp');
        console.log(this.customer_mobile, 'customer_mobile');
        console.log(this.formData);
        if (this.mobile_number == 8287803853) {
            console.log('if');
            this.formData.otp = 123456;
            this.btndisable = true;
        }
        else {
            this.formData.otp = Math.floor(100000 + Math.random() * 900000);
            // this.form.otp = 123456;
        }
        var data = { 'phone': this.customer_mobile, 'otp': this.formData.otp };
        this.service.addData(data, 'AppServiceTask/sendOtp').then(function (result) {
            _this.otp = result['otp'];
            console.log(_this.otp);
            if (result['statusCode'] == 200) {
                console.log("inside the api");
                _this.Otp_verify = true;
                console.log(_this.Otp_verify);
                _this.OTP_flag = true;
                _this.sendOTP = true;
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
        });
    };
    CloseInstalltionPage.prototype.verify_otp = function (value) {
        console.log(value);
        console.log(this.data.otp);
        console.log('confirm otp', value);
        if (value.length == 6) {
            if (this.otp == this.data.otp) {
                console.log('if case');
                this.OTP_flag = true;
                this.isDisabled = false;
                // this.service.successToast('OTP Verified Succesfully')
                //    this.btndisable=true
            }
            else {
                this.isDisabled = true;
                this.service.errorToast('Please Enter Correct OTP.');
            }
        }
    };
    CloseInstalltionPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CloseInstalltionPage.prototype.closeComplaint = function () {
        var _this = this;
        this.formData.complaint_id = this.id;
        this.formData.closing_type = this.closing_type;
        this.formData.image = this.image_data ? this.image_data : [];
        console.log(this.formData);
        this.serve.addData({ "data": this.formData, }, 'AppServiceTask/complaintStatus').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.serve.dismissLoading();
                _this.showSuccess("Installation Closed Successfully!");
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_9__installation_detail_installation_detail__["a" /* InstallationDetailPage */], { id: _this.id });
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
            console.log(result);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], CloseInstalltionPage.prototype, "selectComponent", void 0);
    CloseInstalltionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-close-installtion',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\close-installtion\close-installtion.html"*/'<!--\n\n  Generated template for the CloseInstalltionPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Close Installtion</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <form name="f" #f="ngForm">\n\n    <div class="form">\n\n      <ion-list no-lines class="padding10">\n\n        <ion-item [ngClass]="{\'error\':f.submitted && complaint_status?.invalid}" >\n\n          <ion-label floating>Status<span>*</span></ion-label>\n\n          <ion-select name="complaint_status" #complaint_status="ngModel" [(ngModel)]="formData.complaint_status" required>\n\n            <ion-option value="Done">Done</ion-option>\n\n            <ion-option value="Reject">Reject</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && complaint_status?.invalid" class="eror">\n\n          <p *ngIf="complaint_status.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && remarks ?.invalid}" *ngIf="formData.complaint_status==\'Done\' ">\n\n          <ion-label floating>Remark <strong>*</strong></ion-label>\n\n          <ion-textarea name="remarks" #remarks="ngModel" [(ngModel)]="formData.remarks" required></ion-textarea>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && remarks?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && status_reason ?.invalid}" *ngIf="formData.complaint_status==\'Reject\' ">\n\n          <ion-label floating>Reject Reason <strong>*</strong></ion-label>\n\n          <ion-textarea name="status_reason" #status_reason="ngModel" [(ngModel)]="formData.status_reason" required></ion-textarea>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && status_reason?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n\n\n      </ion-list>\n\n      \n\n      <div class="add-new padding0">\n\n        <div class="uplode-image">\n\n          <ul>\n\n            <li *ngFor="let pic of image_data;let i = index;">\n\n              <img src="{{pic.image}}">\n\n              <button><i class="material-icons" (click)="remove_image(i)">clear</i></button>\n\n            </li>\n\n            <li (click)="image_data.length < 5 ?  captureImageVideo() : showLimit()">\n\n              <label>\n\n                <input type="file" style="display: none;">\n\n                <div class="other">\n\n                  <a ><i class="material-icons" >camera_alt</i></a>\n\n                </div>\n\n              </label>\n\n            </li>\n\n          </ul>\n\n        </div>\n\n      </div>\n\n      \n\n      \n\n      \n\n      <div class="enquiry-btn add-btns mt20">\n\n        <button ion-button  class="Buttons1" (click)="send_otp(\'Confirm\');" *ngIf="sendOTP==false "><p>Confirm</p></button>\n\n      </div>\n\n      \n\n      <div *ngIf="Otp_verify==true"> \n\n        <ion-list class="mb20">\n\n          <ion-item class="cs-textarea">\n\n            <ion-input placeholder="Enter OTP" type="text"  (keypress)="MobileNumber($event)" name="otp"  #otp="ngModel" [(ngModel)]="data.otp" minLength="6" maxLength="6" (input)="verify_otp(data.otp)" required ></ion-input>\n\n          </ion-item>\n\n        </ion-list>\n\n        <div *ngIf="f.submitted && otp?.invalid" class="eror">\n\n          <p *ngIf="otp.errors.required">{{\'OTP is Required\'}}</p>\n\n        </div>\n\n      </div>\n\n      <div class="enquiry-btn add-btns mt20" *ngIf="Otp_verify==true && !data.otp">\n\n        <button ion-button class="Buttons1" (click)="send_otp(\'Confirm\');" *ngIf="sendOTP==true">\n\n          <p>Resend OTP</p>\n\n        </button>\n\n      </div>\n\n      \n\n      <div class="enquiry-btn add-btns mt20"  *ngIf=" OTP_flag==true">\n\n        <button ion-button block class="Buttons1 green-color" style="letter-spacing: 1px;" [disabled]="isDisabled" (click)="closeComplaint()">\n\n          <p> Submit</p>\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\close-installtion\close-installtion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_open_native_settings__["a" /* OpenNativeSettings */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]])
    ], CloseInstalltionPage);
    return CloseInstalltionPage;
}());

//# sourceMappingURL=close-installtion.js.map

/***/ })

});
//# sourceMappingURL=15.js.map