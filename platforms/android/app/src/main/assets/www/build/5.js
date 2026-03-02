webpackJsonp([5],{

/***/ 1393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallationListPageModule", function() { return InstallationListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__installation_list__ = __webpack_require__(1425);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InstallationListPageModule = /** @class */ (function () {
    function InstallationListPageModule() {
    }
    InstallationListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__installation_list__["a" /* InstallationListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__installation_list__["a" /* InstallationListPage */]),
            ],
        })
    ], InstallationListPageModule);
    return InstallationListPageModule;
}());

//# sourceMappingURL=installation-list.module.js.map

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

/***/ }),

/***/ 1424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddInstallationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media_capture__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__installation_list_installation_list__ = __webpack_require__(1425);
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
 * Generated class for the AddInstallationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddInstallationPage = /** @class */ (function () {
    function AddInstallationPage(navCtrl, navParams, actionSheetController, camera, service, serve, loadingCtrl, alertCtrl, mediaCapture, diagnostic, androidPermissions, dom) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.service = service;
        this.serve = serve;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.mediaCapture = mediaCapture;
        this.diagnostic = diagnostic;
        this.androidPermissions = androidPermissions;
        this.dom = dom;
        this.districtList = [];
        this.stateList = [];
        this.form = {};
        this.savingFlag = false;
    }
    AddInstallationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddInstallationPage');
    };
    AddInstallationPage.prototype.get_district = function (state) {
        var _this = this;
        this.serve.addData({ "state_name": state }, "AppCustomerNetwork/getDistrict")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.districtList = resp['district_list'];
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) {
            _this.serve.errorToast('Something Went Wrong!');
        });
    };
    AddInstallationPage.prototype.get_states = function () {
        var _this = this;
        // this.serve.presentLoading()
        this.serve.addData({}, "AppInfluencerSignup/getStates")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.serve.dismissLoading();
                _this.stateList = resp['state_list'];
            }
            else {
                _this.serve.dismissLoading();
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismiss();
        });
    };
    AddInstallationPage.prototype.saveComplaint = function () {
        var _this = this;
        this.savingFlag = true;
        if (!this.form.id) {
            if (!this.form.assign_dr_id) {
                this.serve.errorToast('Please Select Distributor!');
            }
        }
        this.form.type_id = 3;
        this.serve.addData({ "data": this.form }, "AppCustomerNetwork/addDealer")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.savingFlag = false;
                _this.serve.successToast(resp['statusMsg']);
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_9__installation_list_installation_list__["a" /* InstallationListPage */]);
            }
            else {
                _this.savingFlag = false;
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (error) {
            _this.savingFlag = false;
            _this.serve.Error_msg(error);
            _this.serve.dismiss();
        });
    };
    AddInstallationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-installation',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\add-installation\add-installation.html"*/'<!--\n\n  Generated template for the AddInstallationPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header class="main-header remove">\n\n  <ion-navbar>\n\n      <ion-title>Add New Installation</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content >\n\n  <form class="edit" #f="ngForm" (ngSubmit)="f.form.valid && saveComplaint()">\n\n      <div class="cs-heading1">\n\n          <p class="mb0">Basic information</p>\n\n      </div>\n\n      \n\n      <div class="edit">\n\n          <ion-list>\n\n              <ion-item [ngClass]="{\'error\':f.submitted && mobile?.invalid}" style="background: transparent !important;">\n\n                  <ion-label floating><span>Mobile Number</span> </ion-label>\n\n                  <ion-input type="text" name="mobile" #mobile="ngModel" [(ngModel)]="form.mobile" required></ion-input>\n\n              </ion-item>\n\n              <div *ngIf="f.submitted &&mobile.invalid" class="eror">\n\n                  <p *ngIf="mobile.errors.required">{{\'Mobile Number is Required\'}}</p>\n\n              </div>\n\n              \n\n              <ion-item [ngClass]="{\'error\':f.submitted && name?.invalid}" style="background: transparent !important;">\n\n                  <ion-label floating><span>Name</span></ion-label>\n\n                  <ion-input type="text" name="name" #name="ngModel" [(ngModel)]="form.name" required></ion-input>\n\n              </ion-item>\n\n              <div *ngIf="f.submitted &&name.invalid" class="eror">\n\n                  <p *ngIf="name.errors.required">{{\'Name Number is Required\'}}</p>\n\n              </div>\n\n              \n\n              <ion-item [ngClass]="{\'error\':f.submitted && state?.invalid}">\n\n                  <ion-label floating>State <strong class="red-text">*</strong></ion-label>\n\n                  <ion-select name="state" name="state" #state="ngModel" [(ngModel)]="form.state" (ionChange)="get_district(form.state)" required>\n\n                      <ion-option *ngFor="let row of stateList;let i=index;" value="{{row.state_name}}" >{{row.state_name | titlecase}}</ion-option>\n\n                  </ion-select>\n\n              </ion-item>\n\n              <div *ngIf="f.submitted &&state.invalid" class="eror">\n\n                  <p *ngIf="state.errors.required">{{\'Field is Required\'}}</p>\n\n              </div>\n\n              <ion-item [ngClass]="{\'error\':f.submitted && district?.invalid}">\n\n                  <ion-label floating>District <strong class="red-text">*</strong></ion-label>\n\n                  <ion-select name="district" #district="ngModel" [(ngModel)]="form.district" (ionChange)="getCityList()" required> \n\n                      <ion-option *ngFor="let row of districtList" value="{{row.district_name}}">{{row.district_name}}\n\n                      </ion-option>\n\n                  </ion-select>\n\n              </ion-item>\n\n              <div *ngIf="f.submitted &&district.invalid" class="eror">\n\n                  <p *ngIf="district.errors.required">{{\'Field is Required\'}}</p>\n\n              </div>\n\n              \n\n              <ion-item no-lines [ngClass]="{\'error\':f.submitted &&pincode?.invalid}">\n\n                  <ion-label floating>Pincode<strong class="red-text">*</strong></ion-label>\n\n                  <ion-input type="tel" minLength="6" maxLength="6" name="pincode" (input)="form.pincode.length==6"\n\n                  #pincode="ngModel" [(ngModel)]="form.pincode" required></ion-input>\n\n              </ion-item>\n\n              <div *ngIf="f.submitted &&pincode.invalid" class="eror">\n\n                  <p *ngIf="pincode.errors.required">{{\'Field is Required\'}}</p>\n\n              </div>\n\n              \n\n              <ion-item [ngClass]="{\'error\':f.submitted &&city?.invalid}">\n\n                  <ion-label floating>City</ion-label>\n\n                  <ion-input type="text" name="city" #city="ngModel" [(ngModel)]="form.city" ></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item class="cs-textarea1" [ngClass]="{\'error\':f.submitted && address?.invalid}" style="background: transparent !important;">\n\n                  <ion-label floating><span>Address</span></ion-label>\n\n                  <ion-textarea type="text" name="address" #address="ngModel" [(ngModel)]="form.address" required></ion-textarea>\n\n              </ion-item>\n\n              <div *ngIf="f.submitted &&address.invalid" class="eror">\n\n                  <p *ngIf="address.errors.required">{{\'Field is Required\'}}</p>\n\n              </div>\n\n\n\n              <ion-item class="cs-textarea1" [ngClass]="{\'error\':f.submitted && nature_problem?.invalid}" style="background: transparent !important;">\n\n                  <ion-label floating><span>Nature Of Problem</span></ion-label>\n\n                  <ion-textarea type="text" name="nature_problem" #nature_problem="ngModel" [(ngModel)]="form.nature_problem" required></ion-textarea>\n\n              </ion-item>\n\n              <div *ngIf="f.submitted &&nature_problem.invalid" class="eror">\n\n                  <p *ngIf="nature_problem.errors.required">{{\'Field is Required\'}}</p>\n\n              </div>\n\n              \n\n              \n\n              \n\n          </ion-list>\n\n          \n\n          <div class="cs-heading1 pl0 pb10">\n\n              <p>Upload Image or Video</p>\n\n          </div>\n\n          \n\n          <div class="add-new padding0">\n\n              <div class="uplode-image">\n\n                  <ul>\n\n                      <li *ngFor="let pic of image_data;let i = index;">\n\n                          <img src="{{pic}}">\n\n                          <button><i class="material-icons" (click)="remove_image(i)">clear</i></button>\n\n                      </li>\n\n                      \n\n                      <li *ngIf=\'videoId\'>\n\n                          <label>\n\n                              <div class="other">\n\n                                  <a ><img src="assets/imgs/videos.png"></a>\n\n                                  <button><i class="material-icons" (click)="remove_video()">clear</i></button>\n\n                              </div>\n\n                          </label>\n\n                      </li>\n\n                      \n\n                      <li (click)="captureMedia()">\n\n                          <label>\n\n                              <input type="file" style="display: none;">\n\n                              <div class="other">\n\n                                  <a ><i class="material-icons" >camera_alt</i></a>\n\n                              </div>\n\n                          </label>\n\n                      </li>\n\n                  </ul>\n\n              </div>\n\n          </div>\n\n          \n\n          <div class="enquiry-btn add-btns mt20">\n\n              <button ion-button block class="h40 green-color" style="letter-spacing: 1px;">\n\n                  <p> Submit</p>\n\n              </button>\n\n          </div>\n\n      </div>\n\n      \n\n  </form>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\add-installation\add-installation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */]])
    ], AddInstallationPage);
    return AddInstallationPage;
}());

//# sourceMappingURL=add-installation.js.map

/***/ }),

/***/ 1425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstallationListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_installation_add_installation__ = __webpack_require__(1424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__installation_detail_installation_detail__ = __webpack_require__(1410);
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
* Generated class for the InstallationListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var InstallationListPage = /** @class */ (function () {
    function InstallationListPage(navCtrl, navParams, service, alertCtrl, loadingCtrl, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.db = db;
        this.installation_list = [];
        this.filter = {};
        this.flag = '';
        this.count = [];
        this.total_count = [];
        this.data = {};
        this.installtion_type = 'Pending';
        this.installationList();
    }
    InstallationListPage.prototype.ionViewDidLoad = function () {
        this.filter.status = 'Pending';
        console.log('ionViewDidLoad InstallationListPage');
    };
    InstallationListPage.prototype.add_page = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_installation_add_installation__["a" /* AddInstallationPage */], { "type": '' });
    };
    InstallationListPage.prototype.doRefresh = function (refresher) {
        this.installationList();
        refresher.complete();
    };
    InstallationListPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    InstallationListPage.prototype.installationList = function () {
        var _this = this;
        this.flag = 0;
        this.filter.limit = 20;
        this.filter.start = 0;
        this.filter.master = '';
        this.filter.status = this.installtion_type;
        this.db.presentLoading();
        this.db.addData({ 'filter': this.filter }, 'AppServiceTask/serviceInstallationList').then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.installation_list = resp['result'];
                _this.count = resp['tab_count'];
                _this.total_count = resp['tab_count'];
                _this.db.dismissLoading();
            }
            else {
                _this.db.errorToast(resp['statusMsg']);
                _this.db.dismissLoading();
            }
        }, function (error) {
            _this.db.Error_msg(error);
            _this.db.dismiss();
        });
    };
    InstallationListPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.limit = 10;
        this.filter.start = this.installation_list.length;
        this.db.addData({ 'filter': this.filter }, 'AppServiceTask/serviceInstallationList').then(function (resp) {
            if (resp['result'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.installation_list = _this.installation_list.concat(resp['result']);
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    InstallationListPage.prototype.goInstallationDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__installation_detail_installation_detail__["a" /* InstallationDetailPage */], { id: id });
    };
    InstallationListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-installation-list',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\installation-list\installation-list.html"*/'<!--\n\n  Generated template for the InstallationListPage page.\n\n  \n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Installation</ion-title>\n\n    <!-- <ion-buttons end>\n\n      <button ion-button icon-only (click)="presentPopover($event)">\n\n        <ion-icon name="more"></ion-icon>\n\n      </button>\n\n    </ion-buttons> -->\n\n  </ion-navbar>\n\n  <ion-toolbar>\n\n    <div class="search add-search">\n\n      <div class="filter">\n\n        <ion-searchbar (ngModelChange)="installationList()" [(ngModel)]="filter.master" name="master"></ion-searchbar>\n\n      </div>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n    refreshingText="Refreshing...">\n\n  </ion-refresher-content>\n\n</ion-refresher>\n\n<ng-container *ngIf="showRelatedTab!=false">\n\n  <div class="capsule-tabs" style="border-bottom: 0px;">\n\n    <ul>\n\n      <li [ngClass]="{\'active\':installtion_type == \'All\'}" (click)="installtion_type = \'All\';installationList()">\n\n        <p>All<span>{{count.all_count}}</span></p>\n\n      </li>\n\n      <li [ngClass]="{\'active\':installtion_type == \'Pending\'}"\n\n      (click)="installtion_type = \'Pending\';installationList()">\n\n      <p>Pending<span>{{count.pending_count}}</span></p>\n\n    </li>\n\n    <li [ngClass]="{\'active\':installtion_type == \'Done\'}" (click)="installtion_type = \'Done\';installationList()">\n\n      <p>Complete<span>{{count.done_count}}</span></p>\n\n    </li>\n\n    \n\n    <li [ngClass]="{\'active\':installtion_type == \'Reject\'}"\n\n    (click)="installtion_type = \'Reject\';installationList()">\n\n    <p>Reject<span>{{count.reject_count}}</span></p>\n\n  </li>\n\n</ul>\n\n</div>\n\n<div class="pl16 pr16 mt15 mb50">\n\n  \n\n  <div class="attendance-list" *ngFor="let row of installation_list; let i=index"\n\n  (click)="goInstallationDetail(row.id)">\n\n  <div class="slab slab-bg" style="display: flex; justify-content: space-between;">\n\n    <div class="slab-day">\n\n      <p>{{row.date_created | date:\'d MMM y\' }}</p>\n\n      <span>Date</span>\n\n    </div>\n\n    <div class="slab-day">\n\n      <p>{{row.complain_no}}</p>\n\n      <span>Id</span>\n\n    </div>\n\n    \n\n    <div class="slab-day">\n\n      <p class="bold">{{row.complaint_status}}</p>\n\n      <span>Status</span>\n\n    </div>\n\n    <div class="slab-day">\n\n      <p>{{row.pending_at?row.pending_at:\'--\'}}</p>\n\n      <span>TAT</span>\n\n    </div>\n\n  </div>\n\n  \n\n  <div class="center-block">\n\n    <div class="circle">{{row.customer_name?.substring(0,1).toUpperCase()}}</div>\n\n    <span>{{row.customer_name}}</span>\n\n    <p>{{row.customer_mobile}}</p>\n\n  </div>\n\n  \n\n  <div class="slab mt5">\n\n    <div class="slab-day">\n\n      <p>{{ row.city | titlecase }} , {{row.district | titlecase }} , {{row.state | titlecase}} , {{row.pincode}}\n\n      </p>\n\n      <span>Customer Address</span>\n\n    </div>\n\n  </div>\n\n  \n\n</div>\n\n</div>\n\n<ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)" *ngIf="flag!=1">\n\n  <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n\n  </ion-infinite-scroll-content>\n\n</ion-infinite-scroll>\n\n\n\n<div class="nothing-here" style="height: 60%;" *ngIf="!installation_list.length">\n\n  <div class="outer">\n\n    <div class="innear">\n\n      <img src="assets/imgs/no_found.svg" alt="">\n\n      <p>No Data Available</p>\n\n    </div>\n\n  </div>\n\n</div>\n\n</ng-container>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\installation\installation-list\installation-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], InstallationListPage);
    return InstallationListPage;
}());

//# sourceMappingURL=installation-list.js.map

/***/ })

});
//# sourceMappingURL=5.js.map