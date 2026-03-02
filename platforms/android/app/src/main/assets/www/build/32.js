webpackJsonp([32],{

/***/ 1363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloseComplaintPageModule", function() { return CloseComplaintPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__close_complaint__ = __webpack_require__(1440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CloseComplaintPageModule = /** @class */ (function () {
    function CloseComplaintPageModule() {
    }
    CloseComplaintPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__close_complaint__["a" /* CloseComplaintPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__close_complaint__["a" /* CloseComplaintPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["b" /* IonicSelectableModule */]
            ],
        })
    ], CloseComplaintPageModule);
    return CloseComplaintPageModule;
}());

//# sourceMappingURL=close-complaint.module.js.map

/***/ }),

/***/ 1440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloseComplaintPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_open_native_settings__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__complaints_complaint_detail_complaint_detail__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_android_permissions__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__ = __webpack_require__(23);
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
* Generated class for the CloseComplaintPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var CloseComplaintPage = /** @class */ (function () {
    function CloseComplaintPage(navCtrl, navParams, Device, service, loadingCtrl, barcodeScanner, alertCtrl, serve, platform, openNativeSettings, actionSheetController, diagnostic, androidPermissions, dom, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Device = Device;
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
        this.dealer_list = [];
        this.prv_otp = 0;
        this.mobile_no = 0;
        this.resendActiveClass = false;
        this.counter = 30 * 60;
        this.tick = 1000;
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
        this.maxtime = 30;
        this.maxTime = 0;
        this.hidevalue = false;
        console.log(this.navParams);
        this.id = this.navParams.data.id;
        this.customer_mobile = this.navParams.data.customer_mobile;
        this.closing_type = this.navParams.data.closing_type;
        console.log(this.id);
        console.log(this.customer_mobile);
        console.log(this.closing_type);
        this.getDealerList('');
    }
    CloseComplaintPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CloseComplaintPage');
        this.prv_otp = this.navParams.get('otp');
        this.time_counter();
    };
    CloseComplaintPage.prototype.time_counter = function () {
        var _this = this;
        this.countDown = __WEBPACK_IMPORTED_MODULE_11_rxjs__["Observable"].timer(0, this.tick)
            .take(this.counter)
            .map(function () {
            --_this.counter;
            if (_this.counter == 0) {
                _this.prv_otp = Math.floor(100000 + Math.random() * 900000);
            }
        });
    };
    CloseComplaintPage.prototype.getDealerList = function (id) {
        var _this = this;
        console.log(id);
        this.service.addData({}, 'AppServiceTask/dealerList').then(function (r) {
            console.log(r);
            _this.dealer_list = r['dealer'];
            // // this.karigar_id=r['id'];
            console.log(_this.dealer_list);
        });
        if (id) {
            var index = this.dealer_list.findIndex(function (d) { return d.id == id; });
            if (index != -1) {
                this.formData.dealer_id = this.dealer_list[index].id;
                this.formData.dealer_name = this.dealer_list[index].name;
                this.formData.company_name = this.dealer_list[index].company_name;
                this.formData.dealer_mobile = this.dealer_list[index].mobile;
            }
            console.log(this.formData.dealer_id);
            console.log(this.formData.dealer_name);
            console.log(this.formData.dealer_mobile);
        }
    };
    // getDealerList(search, id) {
    //   console.log(id);
    //   console.log(search)
    //   this.service.addData({ 'search': search }, 'AppServiceTask/dealerList').then(r => {
    //     console.log(r);
    //     this.dealer_list = r['dealer'];
    //     // // this.karigar_id=r['id'];
    //     console.log(this.dealer_list);
    //   });
    //   if (id) {
    //     let index = this.dealer_list.findIndex(d => d.id == id);
    //     if (index != -1) {
    //       this.formData.dealer_id = this.dealer_list[index].id;
    //       this.formData.dealer_name = this.dealer_list[index].name;
    //       this.formData.dealer_company_name = this.dealer_list[index].company_name;
    //       this.formData.dealer_mobile = this.dealer_list[index].mobile;
    //     }
    //     console.log(this.formData.dealer_id);
    //     console.log(this.formData.dealer_name);
    //     console.log(this.formData.dealer_company_name);
    //     console.log(this.formData.dealer_mobile);
    //   }
    // }
    CloseComplaintPage.prototype.closeDealer = function () {
        this.distributorSelectable._searchText = '';
    };
    // searchDealer(data, event) {
    //   console.log(event.text);
    //   console.log(data)
    //   if (event.text == '') {
    //     this.getDealerList('',0);
    //   }
    //   this.search = event.text;
    //   let wordSearch = this.search;
    //   setTimeout(() => {
    //     if (wordSearch == this.search) {
    //       if (this.search) {
    //         this.getDealerList(this.search, '');
    //       }
    //     }
    //   }, 500);
    // }
    CloseComplaintPage.prototype.Scaning = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var options = {
                prompt: ""
            };
            _this.barcodeScanner.scan(options).then(function (resp) {
                console.log(resp.text);
                _this.formData.new_serial_no = resp.text;
            }, function (err) {
                console.log(err);
                _this.serve.dismissLoading();
                _this.selectComponent.close();
                _this.presentConfirm('Turn On Camera permisssion !', 'please go to <strong>Settings</strong> -> Camera to turn on <strong>Camera permission</strong>');
            });
        });
    };
    CloseComplaintPage.prototype.presentConfirm = function (title, msg) {
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
    CloseComplaintPage.prototype.openSettings = function () {
        this.openNativeSettings.open("application_details");
    };
    CloseComplaintPage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CloseComplaintPage.prototype.isCameraAvailable = function () {
        var _this = this;
        this.diagnostic.isCameraPresent()
            .then(function (isAvailable) {
            _this.isCameraEnabled = true;
        })
            .catch(function (error) {
            console.dir('Camera is:' + error);
        });
    };
    CloseComplaintPage.prototype.captureMedia = function () {
        var _this = this;
        if (this.videoId) {
            this.captureImageVideo();
        }
        else {
            var actionsheet = this.actionSheetController.create({
                // title:"Upload",
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
    CloseComplaintPage.prototype.showLimit = function () {
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
    CloseComplaintPage.prototype.captureImageVideo = function () {
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
    CloseComplaintPage.prototype.takePhoto = function () {
        var _this = this;
        console.log("i am in camera function");
        this.diagnostic.requestCameraAuthorization().then(function (isAvailable) {
            var options = {
                quality: 70,
                destinationType: _this.camera.DestinationType.DATA_URL,
                targetWidth: 500,
                targetHeight: 400
            };
            console.log(options);
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.start('Advance Laminates', 'Your Camera Is Opened.');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                _this.image = 'data:image/jpeg;base64,' + imageData;
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
                // this.image=  imageData;
                // this.image= imageData.substr(imageData.lastIndexOf('/') + 1);
                console.log(_this.image);
                if (_this.image) {
                    _this.fileChange(_this.image);
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
    CloseComplaintPage.prototype.getImage = function () {
        var _this = this;
        this.diagnostic.requestCameraAuthorization().then(function (isAvailable) {
            var options = {
                quality: 70,
                destinationType: _this.camera.DestinationType.DATA_URL,
                sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                saveToPhotoAlbum: false
            };
            console.log(options);
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.start('Advance Laminates', 'Your Camera Is Opened.');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                _this.image = 'data:image/jpeg;base64,' + imageData;
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
                // this.image=  imageData;
                // this.image= imageData.substr(imageData.lastIndexOf('/') + 1);
                console.log(_this.image);
                if (_this.image) {
                    _this.fileChange(_this.image);
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
    CloseComplaintPage.prototype.fileChange = function (img) {
        this.image_data.push({ "image": img });
        console.log(this.image_data);
        this.image = '';
    };
    CloseComplaintPage.prototype.remove_image = function (i) {
        this.image_data.splice(i, 1);
    };
    CloseComplaintPage.prototype.MobileNumber = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    CloseComplaintPage.prototype.send_otp = function () {
        var _this = this;
        this.presentLoading();
        this.maxTime = 30;
        this.StartTimer();
        if (this.counter == 0) {
            this.counter = 30 * 60;
            ;
            this.time_counter();
        }
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
                _this.loading.dismiss();
            }
            else {
                _this.loading.dismiss();
                _this.serve.errorToast(result['statusMsg']);
            }
        });
        this.resendActiveClass = true;
        setTimeout(function () {
            _this.resendActiveClass = false;
        }, 30000);
    };
    CloseComplaintPage.prototype.verify_otp = function (value) {
        // console.log(value);
        // console.log(this.data.otp);
        console.log('confirm otp', value);
        if (value.length == 6) {
            if (this.otp == this.data.otp) {
                // console.log('if case')
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
    CloseComplaintPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CloseComplaintPage.prototype.getdealer = function (id, name) {
        console.log(id);
        console.log(name);
        // this.formData.name=this.dealer_list.name;
    };
    CloseComplaintPage.prototype.closeComplaint = function () {
        var _this = this;
        this.formData.complaint_id = this.id;
        // this.formData.name=this.dealer_list.name;
        //  this.formData.mobile=this.dealer_list.mobile
        this.formData.closing_type = this.closing_type;
        this.formData.image = this.image_data ? this.image_data : [];
        console.log(this.formData);
        this.serve.presentLoading();
        this.serve.addData({ "data": this.formData, }, 'AppServiceTask/complaintStatus').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.serve.dismissLoading();
                _this.showSuccess("Complaint Closed Successfully!");
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_6__complaints_complaint_detail_complaint_detail__["a" /* ComplaintDetailPage */], { id: _this.id });
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
            console.log(result);
        });
    };
    CloseComplaintPage.prototype.StartTimer = function () {
        var _this = this;
        this.timer = setTimeout(function (x) {
            if (_this.maxtime <= 0) { }
            _this.maxTime -= 1;
            if (_this.maxTime > 0) {
                _this.hidevalue = true;
                _this.StartTimer();
            }
            else {
                _this.maxtime = 30;
                _this.hidevalue = false;
            }
        }, 1000);
    };
    // resendOtp()
    // {
    //   this.presentLoading();
    //   this.maxTime=30;
    //   this.StartTimer();
    //   if(this.counter == 0)
    //   {
    //     this.counter = 30*60;;
    //     this.time_counter();
    //   }
    //   console.log('send otp')
    //   console.log(this.customer_mobile, 'customer_mobile');
    //   console.log(this.formData)
    //   if (this.mobile_number == 8287803853) {
    //     console.log('if')
    //     this.formData.otp = 123456;
    //     this.btndisable = true;
    //   }
    //   else {
    //     this.formData.otp = Math.floor(100000 + Math.random() * 900000);
    //     // this.form.otp = 123456;
    //   }
    //   let data = { 'phone': this.customer_mobile, 'otp': this.formData.otp }
    //   this.service.addData(data, 'AppServiceTask/sendOtp').then((result) => {
    //     this.otp = result['otp']
    //     console.log(this.otp);
    //     if (result['statusCode'] == 200) {
    //       console.log("inside the api")
    //       this.Otp_verify = true
    //       console.log(this.Otp_verify);
    //       this.OTP_flag = true
    //       this.sendOTP = true
    //       this.loading.dismiss();
    //     }
    //     else {
    //       this.loading.dismiss();
    //       this.serve.errorToast(result['statusMsg'])
    //     }
    //   })
    //   this.resendActiveClass=true;
    //   setTimeout(()=>{
    //     this.resendActiveClass=false;
    //   },30000);
    // }
    CloseComplaintPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], CloseComplaintPage.prototype, "selectComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('distributorSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], CloseComplaintPage.prototype, "distributorSelectable", void 0);
    CloseComplaintPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-close-complaint',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\close-complaint\close-complaint.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Change Status</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <form name="f" #f="ngForm" (ngSubmit)="f.valid && send_otp(\'Confirm\');">\n\n    <div class=" form">\n\n      <ion-list no-lines class="padding10">\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && complaint_status?.invalid}">\n\n          <ion-label floating>Status<span>*</span></ion-label>\n\n          <ion-select interface="action-sheet" name="complaint_status" #complaint_status="ngModel"\n\n            [(ngModel)]="formData.complaint_status" required>\n\n            <ion-option value="Closed">Closed</ion-option>\n\n            <ion-option value="Cancel">Cancel</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && complaint_status?.invalid" class="eror">\n\n          <p *ngIf="complaint_status.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <div class="outline-btn scan" (click)="Scaning()"\n\n          *ngIf="closing_type == \'Replacement\' && formData.complaint_status==\'Closed\'">\n\n          <div class="icons"><i class="material-icons">qr_code_scanner</i></div>\n\n          {{\'Scan\'}}\n\n        </div>\n\n\n\n        <!-- <ion-item *ngIf="closing_type == \'Replacement\' && formData.complaint_status==\'Closed\'"\n\n          [ngClass]="{\'error\':f.submitted && new_serial_no?.invalid}">\n\n          <ion-label floating>Serial No.<span>*</span></ion-label>\n\n          <ion-input type="text" name="new_serial_no" #new_serial_no="ngModel" [(ngModel)]="formData.new_serial_no"\n\n            required></ion-input>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && new_serial_no?.invalid" class="eror">\n\n          <p *ngIf="new_serial_no.errors.required">{{\'Field is Required\'}}</p>\n\n        </div> -->\n\n        <ion-item [ngClass]="{\'error\':f.submitted && replacement_type?.invalid}"\n\n          *ngIf="closing_type == \'Replacement\' && formData.complaint_status==\'Closed\' ">\n\n          <ion-label floating>Replacement Type<span>*</span></ion-label>\n\n          <ion-select name="replacement_type" #replacement_type="ngModel" [(ngModel)]="formData.replacement_type"\n\n            required>\n\n            <ion-option value="Dealer">Dealer</ion-option>\n\n            <ion-option value="Company">Company</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && replacement_type?.invalid" class="eror">\n\n          <p *ngIf="replacement_type.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item *ngIf="formData.replacement_type == \'Dealer\' && formData.complaint_status==\'Closed\'"\n\n          [ngClass]="{\'error\':f.submitted && dealer_id?.invalid}">\n\n          <ion-label floating>Select Dealer<span>*</span></ion-label>\n\n          <ion-select name="dealer_id" [(ngModel)]="formData.dealer_id" #dealer_id="ngModel" required\n\n            (ionChange)="getDealerList(formData.dealer_id)">\n\n            <ion-option *ngFor="let row of dealer_list" value="{{row.id}}">{{row.name}}/{{row.mobile}}\n\n            </ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n\n\n\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && product_type?.invalid}"\n\n          *ngIf="closing_type == \'Replacement\' && formData.complaint_status==\'Closed\'">\n\n          <ion-label floating>Product Type<span>*</span></ion-label>\n\n          <ion-select name="product_type" #product_type="ngModel" [(ngModel)]="formData.product_type" required>\n\n            <ion-option value="Reuse">Reuse</ion-option>\n\n            <ion-option value="New">New</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && product_type?.invalid" class="eror">\n\n          <p *ngIf="product_type.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && remarks ?.invalid}" *ngIf="formData.complaint_status==\'Closed\' ">\n\n          <ion-label floating>Remark <strong>*</strong></ion-label>\n\n          <ion-textarea name="remarks" #remarks="ngModel" [(ngModel)]="formData.remarks" required></ion-textarea>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && remarks?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && status_reason ?.invalid}"\n\n          *ngIf="formData.complaint_status==\'Cancel\' ">\n\n          <ion-label floating>Cancel Reason <strong>*</strong></ion-label>\n\n          <ion-textarea name="status_reason" #status_reason="ngModel" [(ngModel)]="formData.status_reason"\n\n            required></ion-textarea>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && status_reason?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n\n\n\n\n      </ion-list>\n\n\n\n      <div class="add-new padding0">\n\n        <div class="uplode-image">\n\n          <ul>\n\n            <li *ngFor="let pic of image_data;let i = index;">\n\n              <img src="{{pic.image}}">\n\n              <button><i class="material-icons" (click)="remove_image(i)">clear</i></button>\n\n            </li>\n\n            <li (click)="image_data.length < 5 ?  captureImageVideo() : showLimit()">\n\n              <label>\n\n                <input type="file" style="display: none;">\n\n                <div class="other">\n\n                  <a><i class="material-icons">camera_alt</i></a>\n\n                </div>\n\n              </label>\n\n            </li>\n\n          </ul>\n\n        </div>\n\n      </div>\n\n\n\n\n\n\n\n      <div class="enquiry-btn add-btns mt20">\n\n        <button ion-button class="Buttons1" *ngIf="OTP_flag != true">\n\n          <p>Confirm</p>\n\n        </button>\n\n      </div>\n\n\n\n\n\n      <div *ngIf="Otp_verify==true">\n\n        <ion-list class="mb20">\n\n          <ion-item class="cs-textarea">\n\n            <ion-input placeholder="Enter OTP" type="text" (keypress)="MobileNumber($event)" name="otp" #otp="ngModel"\n\n              [(ngModel)]="data.otp" minLength="6" maxLength="6" (input)="verify_otp(data.otp)" required></ion-input>\n\n          </ion-item>\n\n        </ion-list>\n\n        <div *ngIf="f.submitted && otp?.invalid" class="eror">\n\n          <p *ngIf="otp.errors.required">{{\'OTP is Required\'}}</p>\n\n        </div>\n\n      </div>\n\n\n\n      <div class="resend opacity" *ngIf="resendActiveClass==true && !data.otp">\n\n        <a>Resend Otp will Be available in {{maxTime}} sec</a>\n\n      </div>\n\n      <div class="resend " *ngIf="resendActiveClass==false && OTP_flag == true ">\n\n        <a (click)="send_otp()">Resend OTP</a>\n\n      </div>\n\n\n\n      <div class="enquiry-btn add-btns mt20" *ngIf=" OTP_flag==true">\n\n        <button ion-button block class="Buttons1 green-color" style="letter-spacing: 1px;" [disabled]="isDisabled"\n\n          (click)="closeComplaint()">\n\n          <p> Submit</p>\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\close-complaint\close-complaint.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_open_native_settings__["a" /* OpenNativeSettings */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */]])
    ], CloseComplaintPage);
    return CloseComplaintPage;
}());

//# sourceMappingURL=close-complaint.js.map

/***/ })

});
//# sourceMappingURL=32.js.map