webpackJsonp([30],{

/***/ 1385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditInspectionPageModule", function() { return EditInspectionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_inspection__ = __webpack_require__(1446);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditInspectionPageModule = /** @class */ (function () {
    function EditInspectionPageModule() {
    }
    EditInspectionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__edit_inspection__["a" /* EditInspectionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__edit_inspection__["a" /* EditInspectionPage */]),
            ],
        })
    ], EditInspectionPageModule);
    return EditInspectionPageModule;
}());

//# sourceMappingURL=edit-inspection.module.js.map

/***/ }),

/***/ 1446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditInspectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__complaints_complaint_detail_complaint_detail__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_device__ = __webpack_require__(23);
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
 * Generated class for the EditInspectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditInspectionPage = /** @class */ (function () {
    function EditInspectionPage(navCtrl, Device, db, actionSheetController, camera, alertCtrl, diagnostic, androidPermissions, dom, serve, loadingCtrl, navParams, constant) {
        this.navCtrl = navCtrl;
        this.Device = Device;
        this.db = db;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.diagnostic = diagnostic;
        this.androidPermissions = androidPermissions;
        this.dom = dom;
        this.serve = serve;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.constant = constant;
        this.segment_list = [];
        this.segment_detail = [];
        this.segment_sub_list = [];
        this.formData = {};
        this.filter = {};
        this.isCameraEnabled = false;
        this.loading = {};
        // warrantyDetail: any;
        this.flag = true;
        this.bankImageFlag = false;
        this.documentImageFlag = false;
        this.documentBackImageFlag = false;
        this.upl_file = "";
        this.cam = "Camera";
        this.gal = "Gallery";
        this.cancl = "Cancel";
        this.image = '';
        this.image_data = [];
        this.currentDate = new Date().toISOString();
        console.log(this.currentDate);
        this.upload_url1 = this.constant.upload_url1 + 'service_task/';
        this.id = this.navParams.data.detail.id;
        this.detail = this.navParams.data.detail;
        if (this.detail) {
            this.segmentItemsDetail(this.detail.product_id);
            this.formData.serial_no = this.detail.serial_no;
            this.formData.date_of_purchase = this.detail;
            this.formData.warranty_end_date = this.detail;
            this.formData.warranty_status = this.detail.warranty_status;
            this.formData.closing_type = this.detail.closing_type;
            this.formData.inspection_remark = this.detail.inspection_remark;
            this.formData.warranty_status = this.detail.warranty_status;
            this.formData.date_of_purchase = this.detail.date_of_purchase;
            this.formData.warranty_end_date = this.detail.warranty_end_date;
            this.formData.bill_copy_img = this.detail.bill_copy_img;
            if (this.formData.bill_copy_img) {
                this.documentBackImageFlag = true;
            }
            this.formData.warranty_card_copy_img = this.detail.warranty_card_copy_img;
            if (this.formData.warranty_card_copy_img) {
                this.documentImageFlag = true;
            }
            this.get_segment();
            this.formData.category = this.detail.segment_id;
            this.formData.sub_category = this.detail.sub_segment_id;
            this.formData.product_id = this.detail.product_id;
            this.formData.product_name = this.detail.product_name;
            this.formData.product_code = this.detail.product_code;
            this.get_sub_segment(this.formData.category);
            this.get_sub_segmentDetail(this.formData.category, this.formData.sub_category);
        }
    }
    EditInspectionPage.prototype.ionViewDidLoad = function () {
        this.isCameraAvailable();
    };
    EditInspectionPage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    EditInspectionPage.prototype.isCameraAvailable = function () {
        var _this = this;
        this.diagnostic.isCameraPresent()
            .then(function (isAvailable) {
            _this.isCameraEnabled = true;
        })
            .catch(function (error) {
            console.dir('Camera is:' + error);
        });
    };
    EditInspectionPage.prototype.captureMedia = function () {
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
    EditInspectionPage.prototype.showLimit = function () {
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
    EditInspectionPage.prototype.captureImageVideo = function () {
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
    EditInspectionPage.prototype.takePhoto = function () {
        var _this = this;
        console.log("i am in camera function");
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        console.log(options);
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            _this.image = 'data:image/jpeg;base64,' + imageData;
            cordova.plugins.foregroundService.stop();
            console.log(_this.image);
            if (_this.image) {
                _this.fileChange(_this.image);
            }
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            _this.image = 'data:image/jpeg;base64,' + imageData;
            cordova.plugins.foregroundService.stop();
            console.log(_this.image);
            if (_this.image) {
                _this.fileChange(_this.image);
            }
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.fileChange = function (img) {
        this.image_data.push({ "image": img });
        console.log(this.image_data);
        this.image = '';
    };
    EditInspectionPage.prototype.remove_image = function (i) {
        this.image_data.splice(i, 1);
    };
    EditInspectionPage.prototype.get_segment = function () {
        var _this = this;
        this.db.addData({}, "AppCustomerNetwork/segmentList")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.segment_list = resp['data'];
            }
            else {
                _this.db.errorToast(resp['statusMsg']);
            }
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.get_sub_segment = function (id) {
        var _this = this;
        this.db.addData({ 'cat_id': id }, "AppCustomerNetwork/subSegmentList")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.segment_sub_list = resp['data'];
                if (_this.segment_sub_list.length <= 0) {
                    _this.get_sub_segmentDetail(_this.formData.category, '');
                }
            }
            else {
                _this.db.errorToast(resp['statusMsg']);
            }
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.get_sub_segmentDetail = function (category, sub_category) {
        var _this = this;
        this.filter.cat_id = category;
        this.filter.sub_cat_id = sub_category;
        this.filter.product_warranty = 'not_zero';
        this.db.addData({ 'filter': this.filter }, "AppCustomerNetwork/segmentItems")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.segment_detail = resp['data'];
            }
            else {
                _this.db.errorToast(resp['statusMsg']);
            }
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.segmentItemsDetail = function (id) {
        if (id) {
            var index = this.segment_detail.findIndex(function (d) { return d.id == id; });
            if (index != -1) {
                this.formData.product_name = this.segment_detail[index].product_name;
                this.formData.product_code = this.segment_detail[index].product_code;
                this.warranty_period = this.segment_detail[index].warranty_period;
                this.calculateWarrantyEnd();
            }
        }
    };
    EditInspectionPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    EditInspectionPage.prototype.onUploadChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: this.upl_file,
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        _this.takeDocPhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        _this.getDocImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                        _this.formData.doc_edit_id = _this.formData.id;
                    }
                }
            ]
        });
        actionsheet.present();
    };
    EditInspectionPage.prototype.getDocImage = function () {
        var _this = this;
        var options = {
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.formData.doc_edit_id = '';
            _this.documentImageFlag = true;
            _this.formData.docFrontBase64 = true;
            _this.formData.warranty_card_copy_img = 'data:image/jpeg;base64,' + imageData;
            cordova.plugins.foregroundService.stop();
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.takeDocPhoto = function () {
        var _this = this;
        var options = {
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1050,
            targetHeight: 1000
        };
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.formData.doc_edit_id = '',
                _this.formData.docFrontBase64 = true;
            _this.documentImageFlag = true;
            _this.formData.warranty_card_copy_img = 'data:image/jpeg;base64,' + imageData;
            cordova.plugins.foregroundService.stop();
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.onUploadBackChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: this.upl_file,
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        _this.backDocPhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        _this.backDocImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                        _this.formData.doc_back_edit_id = _this.formData.id;
                    }
                }
            ]
        });
        actionsheet.present();
    };
    EditInspectionPage.prototype.backDocPhoto = function () {
        var _this = this;
        var options = {
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1050,
            targetHeight: 1000
        };
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.formData.doc_back_edit_id = '';
            _this.documentBackImageFlag = true;
            _this.formData.docBackBase64 = true;
            _this.formData.bill_copy_img = 'data:image/jpeg;base64,' + imageData;
            cordova.plugins.foregroundService.stop();
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.backDocImage = function () {
        var _this = this;
        var options = {
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Camera', 'is running');
        }
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.formData.doc_back_edit_id = '';
            _this.documentBackImageFlag = true;
            _this.formData.docBackBase64 = true;
            _this.formData.bill_copy_img = 'data:image/jpeg;base64,' + imageData;
            cordova.plugins.foregroundService.stop();
        }, function (err) {
        });
    };
    EditInspectionPage.prototype.saveInspection = function () {
        var _this = this;
        this.formData.complaint_id = this.id;
        this.formData.image = this.image_data ? this.image_data : [];
        this.serve.addData({ "data": this.formData }, 'AppServiceTask/complaintInspection').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.serve.dismissLoading();
                _this.showSuccess("Inspection Successfully!");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__complaints_complaint_detail_complaint_detail__["a" /* ComplaintDetailPage */], { id: _this.id });
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
        });
    };
    EditInspectionPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    EditInspectionPage.prototype.calculateWarrantyEnd = function () {
        var selectedDate = new Date(this.formData.date_of_purchase);
        var monthsToAdd = this.warranty_period;
        var newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + monthsToAdd, selectedDate.getDate());
        var year = newDate.getFullYear();
        var month = String(newDate.getMonth() + 1).padStart(2, '0');
        var day = String(newDate.getDate()).padStart(2, '0');
        var formattedDate = year + "-" + month + "-" + day;
        this.formData.warranty_end_date = formattedDate;
    };
    EditInspectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-inspection',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\edit-inspection\edit-inspection.html"*/'<!--\n\n  Generated template for the EditInspectionPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Edit Inspection</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <form #f="ngForm" (ngSubmit)="f.form.valid && saveInspection()">\n\n    <div class="form">\n\n      <ion-list no-lines class="padding10">\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && category?.invalid}">\n\n          <ion-label floating>Category<span>*</span></ion-label>\n\n          <ion-select name="category" #category="ngModel" [(ngModel)]="formData.category"\n\n            (ngModelChange)="get_sub_segment(formData.category)" required>\n\n            <ion-option *ngFor="let row of segment_list" value="{{row.id}}">{{row.category}}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && category.invalid" class="eror">\n\n          <p *ngIf="category.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && sub_category?.invalid}" *ngIf="segment_sub_list.length > 0">\n\n          <ion-label floating>Sub Category<span>*</span></ion-label>\n\n          <ion-select name="sub_category" #sub_category="ngModel" [(ngModel)]="formData.sub_category"\n\n            (ngModelChange)="get_sub_segmentDetail(formData.category,formData.sub_category)" required>\n\n            <ion-option *ngFor="let row of segment_sub_list" value="{{row.id}}">{{row.sub_category_name}}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && sub_category.invalid" class="eror">\n\n          <p *ngIf="sub_category.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && product_id?.invalid}">\n\n          <ion-label floating>Product<span>*</span></ion-label>\n\n          <ion-select name="product_id" #product_id="ngModel" [(ngModel)]="formData.product_id"\n\n            (ngModelChange)="segmentItemsDetail(formData.product_id)" required>\n\n            <ion-option *ngFor="let row of segment_detail" value={{row.id}}>{{row.product_name}}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && product.invalid" class="eror">\n\n          <p *ngIf="product.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <!-- <ion-item [ngClass]="{\'error\':f.submitted && serial_no?.invalid}">\n\n          <ion-label floating>Serial No.<span>*</span></ion-label>\n\n          <ion-input type="text" name="serial_no" #serial_no="ngModel" [(ngModel)]="formData.serial_no"\n\n            required></ion-input>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && serial_no.invalid" class="eror">\n\n          <p *ngIf="serial_no.errors.required">{{\'Field is Required\'}}</p>\n\n        </div> -->\n\n\n\n        <ion-item [ngClass]="{\'cs-error\':f.submitted && date_of_purchase?.invalid}">\n\n          <ion-label floating>Date of Purchase<span>*</span></ion-label>\n\n          <ion-datetime display-format="MMM DD, YYYY" name="date_of_purchase" [(ngModel)]="formData.date_of_purchase"\n\n            (ngModelChange)="calculateWarrantyEnd()" [max]="currentDate"></ion-datetime>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && date_of_purchase.invalid" class="eror">\n\n          <p *ngIf="date_of_purchase.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'cs-error\':f.submitted && warranty_end_date?.invalid}">\n\n          <ion-label floating>Warranty End Date<span>*</span></ion-label>\n\n          <ion-datetime display-format="MMM DD, YYYY" name="warranty_end_date" [(ngModel)]="formData.warranty_end_date"\n\n            readonly style="pointer-events: none;"></ion-datetime>\n\n        </ion-item>\n\n        <!-- <div *ngIf="f.submitted && warranty_end_date.invalid" class="eror">\n\n          <p *ngIf="warranty_end_date.errors.required">{{\'Field is Required\'}}</p>\n\n        </div> -->\n\n\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && warranty_status?.invalid}">\n\n          <ion-label floating>Warranty Status<span>*</span></ion-label>\n\n          <ion-select name="warranty_status" #warranty_status="ngModel" [(ngModel)]="formData.warranty_status">\n\n            <ion-option value="In Warranty">In Warranty</ion-option>\n\n            <ion-option value="Out Of Warranty">Out Of Warranty</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && warranty_status.invalid" class="eror">\n\n          <p *ngIf="warranty_status.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && closing_type?.invalid}">\n\n          <ion-label floating>Closing Type<span>*</span></ion-label>\n\n          <ion-select name="closing_type" #closing_type="ngModel" [(ngModel)]="formData.closing_type">\n\n            <ion-option value="Service">Service</ion-option>\n\n            <ion-option value="Spare Part Pending">Spare Part Pending</ion-option>\n\n            <ion-option value="Replacement">Replacement</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && closing_type.invalid" class="eror">\n\n          <p *ngIf="closing_type.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && inspection_remark?.invalid}">\n\n          <ion-label floating>Remark <strong>*</strong></ion-label>\n\n          <ion-textarea name="inspection_remark" #inspection_remark="ngModel"\n\n            [(ngModel)]="formData.inspection_remark"></ion-textarea>\n\n        </ion-item>\n\n        <div class="eror" *ngIf="f.submitted && inspection_remark?.invalid">\n\n          <p> {{ \'This field is required\'}}</p>\n\n        </div>\n\n      </ion-list>\n\n      <div class="outer-doc">\n\n        <div class="upload-document" (click)="onUploadChange()">\n\n          <p *ngIf="!formData.warranty_card_copy_img">\n\n            <i class="material-icons">add_circle</i><br>{{\'Upload Warranty Image Here\'}}\n\n          </p>\n\n          <img *ngIf="formData.warranty_card_copy_img" src="{{formData.warranty_card_copy_img}}">\n\n        </div>\n\n        <div class="upload-document mt15" (click)="onUploadBackChange()">\n\n          <p *ngIf="!formData.bill_copy_img">\n\n            <i class="material-icons">add_circle</i><br>{{\'Upload Bill Image Here\'}}\n\n          </p>\n\n          <img *ngIf="formData.bill_copy_img" src="{{formData.bill_copy_img}}">\n\n        </div>\n\n      </div>\n\n      <div class="enquiry-btn add-btns mt20">\n\n        <button ion-button block class="h40 green-color" style="letter-spacing: 1px;">\n\n          <p> Submit</p>\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\edit-inspection\edit-inspection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_9__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__["a" /* ConstantProvider */]])
    ], EditInspectionPage);
    return EditInspectionPage;
}());

//# sourceMappingURL=edit-inspection.js.map

/***/ })

});
//# sourceMappingURL=30.js.map