webpackJsonp([12],{

/***/ 1373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecondaryBillUploadAddPageModule", function() { return SecondaryBillUploadAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_add__ = __webpack_require__(1420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SecondaryBillUploadAddPageModule = /** @class */ (function () {
    function SecondaryBillUploadAddPageModule() {
    }
    SecondaryBillUploadAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_add__["a" /* SecondaryBillUploadAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_add__["a" /* SecondaryBillUploadAddPage */]),
                __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["b" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__["SelectSearchableModule"]
            ],
        })
    ], SecondaryBillUploadAddPageModule);
    return SecondaryBillUploadAddPageModule;
}());

//# sourceMappingURL=secondary-bill-upload-add.module.js.map

/***/ }),

/***/ 1416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecondaryBillUploadDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_profile_view_profile__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SecondaryBillUploadDetailPage = /** @class */ (function () {
    function SecondaryBillUploadDetailPage(constant, navCtrl, navParams, service, alertCtrl, modalCtrl) {
        this.constant = constant;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.secBillUploadData = {};
        this.secBillUploadItems = [];
        this.secBillUploadBillDocs = [];
        this.url = constant.upload_url1 + 'secondary_orders_bill_doc/';
        if (this.navParams.get('id')) {
            this.BillID = this.navParams.get('id');
            console.log(this.BillID);
            this.getsecBillUploadDetail(this.BillID);
        }
    }
    SecondaryBillUploadDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SecondaryBillUploadDetailPage');
    };
    SecondaryBillUploadDetailPage.prototype.getsecBillUploadDetail = function (BillID) {
        var _this = this;
        console.log(BillID);
        this.service.presentLoading();
        this.service.addData({ "bill_id": BillID }, "AppOrder/secondaryOrdersBillDetails").then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.secBillUploadData = result['result'];
                _this.secBillUploadItems = result['result']['bill_items'];
                _this.secBillUploadBillDocs = result['result']['bill_docs'];
                console.log(_this.secBillUploadItems);
                console.log(_this.secBillUploadData);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SecondaryBillUploadDetailPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    SecondaryBillUploadDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-secondary-bill-upload-detail',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-detail\secondary-bill-upload-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Secondary Bill Upload Detail</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="list-box">\n\n    \n\n    <div class="mid mt0">\n\n      <div class="content-info">\n\n        <div class="right-info" >\n\n          <p>{{secBillUploadData.distributor_company_name}}</p>\n\n          <p>{{secBillUploadData.distributor_name | titlecase}} ({{secBillUploadData.distributor_mobile}})</p>\n\n        </div>\n\n      </div>\n\n      \n\n      <div class="tag-info">\n\n        <a href="tel:{{secBillUploadData.distributor_mobile}}"><i class="material-icons">phone</i></a>\n\n      </div>\n\n    </div>\n\n    \n\n    <div class="upper">\n\n      <div class="left-date">\n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.bill_date | date:\'d MMM y\'}}</p>\n\n          <p>Bill Date</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.bill_no}}</p>\n\n          <p>Bill No.</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>₹ {{secBillUploadData.bill_amount}}</p>\n\n          <p>Bill Amount</p>\n\n        </div>\n\n\n\n        <div class="date-section" *ngIf="secBillUploadData.approved_amount">\n\n          <p>₹ {{secBillUploadData.approved_amount}}</p>\n\n          <p>Approved Amount</p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="upper">\n\n      <div class="left-date">\n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.date_created | date:\'d MMM y\'}}</p>\n\n          <p>Date Created</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.total_items ? secBillUploadData.total_items : \'0\'}}</p>\n\n          <p>Total Item</p>\n\n        </div>\n\n        \n\n        <div class="date-section">\n\n          <p>{{secBillUploadData.total_items_qty ? secBillUploadData.total_items_qty : \'0\'}}</p>\n\n          <p>Total Item Qty</p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    \n\n    <div class="slab mt10">\n\n      <div class="slab-day">\n\n        <span>Status</span>\n\n        <p class="bold" [ngClass]="{\'pending\' : secBillUploadData.status == \'Pending\' , \'approved\' : secBillUploadData.status == \'Approved\' , \'reject\' : secBillUploadData.status == \'Reject\'}">{{secBillUploadData.status}}</p>\n\n      </div>\n\n      <div class="slab-day" *ngIf="secBillUploadData.status != \'Pending\'">\n\n        <span>{{secBillUploadData.status}} Remark</span>\n\n        <p class="bold">{{secBillUploadData.remark}}</p>\n\n      </div>\n\n    </div>\n\n    \n\n    <div class="upload-doc padding0" *ngIf="secBillUploadBillDocs.length > 0">\n\n      <div class="">\n\n        Bill Images\n\n      </div>\n\n      <ul class="padding0" >\n\n        <li class="image-upload" *ngFor="let image of secBillUploadBillDocs">\n\n          <img (click)="imageModal(url+image.bill_doc)" src="{{url+image.bill_doc}}">\n\n        </li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n  \n\n  <div class="pl16 pr16 mb25">\n\n    <ng-container>\n\n      <div class="summary-heading font14 mb8" *ngIf="secBillUploadItems.length > 0">ITEM INFORMATION</div>\n\n      \n\n      \n\n      <div class="attendance-list" style="padding : 5px 10px;" *ngFor="let item of secBillUploadItems; let i = index;">\n\n        <div class="center-block flat-block">\n\n          <h1>{{item.product_details}}</h1>\n\n        </div>\n\n        \n\n        <div class="slab slab-three boder-top1 pt5 mt5 dflex jcc align-center">\n\n          <div class="slab-day">\n\n            <p>{{item.product_qty}}</p>\n\n            <span>Qty</span>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </ng-container>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-detail\secondary-bill-upload-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]])
    ], SecondaryBillUploadDetailPage);
    return SecondaryBillUploadDetailPage;
}());

//# sourceMappingURL=secondary-bill-upload-detail.js.map

/***/ }),

/***/ 1420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecondaryBillUploadAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__secondary_bill_upload_list_secondary_bill_upload_list__ = __webpack_require__(1421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SecondaryBillUploadAddPage = /** @class */ (function () {
    function SecondaryBillUploadAddPage(navCtrl, navParams, service, alertCtrl, constant, actionSheetController, camera, barcodeScanner) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.constant = constant;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.barcodeScanner = barcodeScanner;
        this.selectImage = [];
        this.data = {};
        this.loginDrData = {};
        this.networkList = [];
        this.productList = [];
        this.form = {};
        this.Submit_button = false;
        this.spinnerLoader = false;
        this.add_list = [];
        this.qr_code = '';
        this.getNetworkList('');
        setTimeout(function () {
            _this.getProductList('');
        }, 800);
    }
    SecondaryBillUploadAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SecondaryBillUploadAddPage');
    };
    SecondaryBillUploadAddPage.prototype.searchNetwork = function (event) {
        var _this = this;
        if (event.text == '') {
            this.getNetworkList('');
        }
        this.search = event.text;
        var wordSearch = this.search;
        setTimeout(function () {
            if (wordSearch == _this.search) {
                if (_this.search) {
                    _this.getNetworkList(_this.search);
                }
            }
        }, 500);
    };
    SecondaryBillUploadAddPage.prototype.getNetworkList = function (masterSearch) {
        var _this = this;
        // this.service.presentLoading();
        this.service.addData({ 'master_search': masterSearch.text }, 'AppOrder/assignDistributor').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.networkList = result['result'];
                console.log(_this.networkList);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SecondaryBillUploadAddPage.prototype.searchProduct = function (event) {
        var _this = this;
        if (event.text == '') {
            this.getProductList('');
        }
        this.search = event.text;
        var wordSearch = this.search;
        setTimeout(function () {
            if (wordSearch == _this.search) {
                if (_this.search) {
                    _this.getProductList(_this.search);
                }
            }
        }, 500);
    };
    SecondaryBillUploadAddPage.prototype.getProductList = function (masterSearch) {
        var _this = this;
        // this.service.presentLoading();
        this.service.addData({ 'master_search': masterSearch }, 'AppOrder/fetchProduct').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.productList = result['result'];
                console.log(_this.productList);
                for (var index = 0; index < _this.productList.length; index++) {
                    _this.productList[index].display_name = _this.productList[index].product_name + " - " + _this.productList[index].product_code;
                }
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SecondaryBillUploadAddPage.prototype.getfieldsClear = function () {
        this.data.qty = '';
    };
    SecondaryBillUploadAddPage.prototype.addToList = function () {
        var _this = this;
        console.log(this.data);
        console.log(this.add_list);
        this.data.qty = parseInt(this.data.qty);
        console.log(typeof this.data.qty);
        if (this.data.qty <= 0) {
            console.log('this.data.qty <= 0');
            this.service.errorToast('Qty should be greater than 0');
            return;
        }
        var newData;
        newData = this.data;
        if (this.add_list.length == 0) {
            console.log('1');
            this.add_list.push({ 'product': newData.product, 'qty': newData.qty });
            console.log(newData, 'newData');
            console.log(this.add_list, 'newData');
        }
        else {
            var existIndex = this.add_list.findIndex(function (row) { return (row.product.id == _this.data['product']['id']); });
            console.log(existIndex);
            if (existIndex != -1) {
                // console.log('1');
                // this.service.errorToast('Already same product added to items')
                console.log(typeof newData.qty);
                this.add_list[existIndex].qty = parseInt(this.add_list[existIndex].qty) + parseInt(newData.qty);
            }
            else {
                console.log('1');
                this.add_list.push({ 'product': newData.product, 'qty': newData.qty });
            }
        }
        this.data.product = '';
        this.data.qty = '';
        this.data.scanType = '';
        console.log(this.add_list);
    };
    SecondaryBillUploadAddPage.prototype.DeleteItem = function (i) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: 'Your Want To Remove This Item ',
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
                        _this.data.product = '';
                        _this.data.qty = '';
                        _this.data.scanType = '';
                        _this.add_list.splice(i, 1);
                    }
                }]
        });
        alert.present();
    };
    SecondaryBillUploadAddPage.prototype.submitSecBillUpload = function () {
        var _this = this;
        console.log(this.data);
        console.log(this.add_list);
        this.data.image = this.selectImage;
        if (!this.add_list.length) {
            this.service.errorToast('Add atleast one item');
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Save !',
                message: 'Do you want to Save this ?',
                cssClass: 'alert-modal',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: function () { }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.Submit_button = true;
                            _this.spinnerLoader = true;
                            _this.data.ItemsDetail = _this.add_list;
                            _this.service.addData({ 'data': _this.data }, 'AppOrder/secondaryOrdersBillUpload').then(function (result) {
                                if (result['statusCode'] == 200) {
                                    _this.spinnerLoader = true;
                                    _this.Submit_button = true;
                                    _this.service.successToast(result['statusMsg']);
                                    _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_5__secondary_bill_upload_list_secondary_bill_upload_list__["a" /* SecondaryBillUploadListPage */]);
                                }
                                else {
                                    _this.spinnerLoader = false;
                                    _this.Submit_button = false;
                                    _this.service.errorToast(result['statusMsg']);
                                }
                            }, function (error) {
                                _this.Submit_button = false;
                                _this.spinnerLoader = false;
                                _this.service.Error_msg(error);
                                _this.service.dismiss();
                            });
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    SecondaryBillUploadAddPage.prototype.onUploadChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: 'Upload File',
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
                    handler: function () {
                        _this.selectImage = [];
                    }
                }]
        });
        actionsheet.present();
    };
    SecondaryBillUploadAddPage.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            // quality: 80,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 720,
            quality: 100,
            // targetHeight: 400,
            cameraDirection: 1,
            correctOrientation: true,
        };
        this.camera.getPicture(options).then(function (imageData) {
            var image = 'data:image/jpeg;base64,' + imageData;
            _this.selectImage.push(image);
        }, function (err) {
        });
    };
    SecondaryBillUploadAddPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            var image = 'data:image/jpeg;base64,' + imageData;
            _this.selectImage.push(image);
        }, function (err) {
        });
    };
    SecondaryBillUploadAddPage.prototype.delete_img = function (index) {
        this.selectImage.splice(index, 1);
    };
    SecondaryBillUploadAddPage.prototype.scan = function (scanType) {
        var _this = this;
        // -----------------------------------//                    
        console.log(scanType);
        this.service.presentLoading();
        var options = {
            prompt: ""
        };
        this.barcodeScanner.scan(options).then(function (resp) {
            _this.qr_code = resp.text;
            if (resp.text != '') {
                _this.service.addData({ 'coupon_code': _this.qr_code }, 'AppCouponScan/fetchProduct').then(function (r) {
                    console.log(r);
                    if (r['statusCode'] == 200) {
                        console.log('In Function');
                        _this.service.dismissLoading();
                        _this.data.product = r['result'];
                        _this.data.scanType = scanType;
                        console.log(_this.data);
                        return;
                    }
                    else {
                        _this.service.dismissLoading();
                        _this.service.errorToast('statusMsg');
                    }
                });
            }
        });
        // -----------------------------------// 
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('distributorSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], SecondaryBillUploadAddPage.prototype, "distributorSelectable", void 0);
    SecondaryBillUploadAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-secondary-bill-upload-add',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-add\secondary-bill-upload-add.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Secondary Bill Upload Add</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="edit">\n\n        <form name="f" #f="ngForm" (ngSubmit)="f.submitted && f.form.valid && submitSecBillUpload()">\n\n            <ion-list>\n\n                \n\n                <ion-item class="cs-normal-select retailerSelectionBox mt16" [ngClass]="{\'cs-error\':f.submitted && drData?.invalid}">\n\n                    <ion-label><span>Select Distributor <span>*</span></span></ion-label>\n\n                    <ionic-selectable name="drData" item-content [(ngModel)]="data.drData" #drData="ngModel" [items]="networkList" itemValueField="id" itemTextField="display_name" [canSearch]="true"(onSearch)="getNetworkList($event)"  #distributorSelectable required></ionic-selectable>\n\n                </ion-item>\n\n                <p  *ngIf="f.submitted && drData?.invalid && !form.drData" class="error-line">Field Is Required</p>\n\n                \n\n                <ion-item [ngClass]="{\'cs-error\':f.submitted && bill_number?.invalid}">\n\n                    <ion-label floating><span>Bill Number <strong>*</strong></span></ion-label>\n\n                    <ion-input type="text" name="bill_number" #bill_number="ngModel" [(ngModel)]="data.bill_number" required></ion-input>\n\n                </ion-item>\n\n                <p  *ngIf="f.submitted && bill_number?.invalid && !form.bill_number" class="error-line">Field Is Required</p>\n\n                \n\n                <ion-item [ngClass]="{\'cs-error\':f.submitted && bill_date?.invalid}">\n\n                    <ion-label floating><span>Bill Date <strong>*</strong></span></ion-label>\n\n                    <ion-input type="date" class="calander" name="bill_date" #bill_date="ngModel" [(ngModel)]="data.bill_date" required>\n\n                        <i class="material-icons">date_range</i> \n\n                    </ion-input>\n\n                </ion-item>\n\n                <p  *ngIf="f.submitted && bill_date?.invalid && !form.bill_date" class="error-line">Field Is Required</p>\n\n                \n\n                <ion-item [ngClass]="{\'cs-error\':f.submitted && bill_amount?.invalid}">\n\n                    <ion-label floating><span>Bill Amount (Without GST)<strong>*</strong></span></ion-label>\n\n                    <!-- pattern="^[1-9][0-9]{0,9}$" -->\n\n                    <ion-input type="number"  name="bill_amount" #bill_amount="ngModel" [(ngModel)]="data.bill_amount"  required></ion-input>\n\n                </ion-item>\n\n                <ng-container *ngIf="f.submitted && bill_amount.touched">\n\n                    <p  *ngIf="bill_amount.errors?.required" class="error-line">Field Is Required</p>\n\n                    <!-- <p *ngIf="bill_amount.errors?.pattern" class="error-line">Invalid Amount</p> -->\n\n                </ng-container>\n\n                \n\n                \n\n                <div class="upload-doc">\n\n                    <div class="">\n\n                        Bill Image\n\n                    </div>\n\n                    <ul class="padding0">\n\n                        <li class="add-image" (click)="onUploadChange()">\n\n                            <i class="material-icons">add_a_photo</i>\n\n                        </li>\n\n                        <li class="image-upload" *ngFor="let image of selectImage;index as i">\n\n                            <img src="{{image}}">\n\n                            <button type="text" class="del" (click)="delete_img(i)"><i class="material-icons">delete_sweep</i></button>\n\n                        </li>\n\n                    </ul>\n\n                </div>\n\n                \n\n                <div class="cs-heading1 pl0">\n\n                    <p>PRODUCT INFORMATION</p>\n\n                </div>\n\n                \n\n                <!-- <div class="qr-btns mt16" >\n\n                    <a (click)="scan(\'scanning\')">\n\n                        <i class="material-icons">qr_code_scanner</i>\n\n                        <p>Scan Product</p>\n\n                    </a>\n\n                </div> -->\n\n                \n\n                <div class="list-box mt10" *ngIf="data.product && data.scanType == \'scanning\'">\n\n                    <div class="mid mt0">\n\n                        <div class="content-info">\n\n                            <div class="left-info">\n\n                                <div class="circle">{{data.product.product_detail ? (data.product.product_detail.substring(0,1).toUpperCase()) : \'\'}}</div>\n\n                            </div>\n\n                            <div class="right-info" >\n\n                                <p>{{data.product.product_detail ? data.product.product_detail : \'---\'}}</p>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n                \n\n                <!-- <div class="or-sepration" *ngIf="data.scanType != \'scanning\'">\n\n                    <p>OR</p>\n\n                </div> -->\n\n                \n\n                <ion-item class="cs-normal-select retailerSelectionBox mt16" *ngIf="data.scanType != \'scanning\'">\n\n                    <ion-label><span>Select Product<span>*</span></span></ion-label>\n\n                    <ionic-selectable item-content name="product" [(ngModel)]="data.product " #product="ngModel" [items]="productList" itemValueField="id" itemTextField="display_name" [hasVirtualScroll]="true" [canSearch]="true" #distributorSelectable (onSearch)="searchProduct($event)" (ngModelChange)="getfieldsClear()"></ionic-selectable>\n\n                </ion-item>\n\n                \n\n                <ion-item>\n\n                    <ion-label floating><span>Qty <strong>*</strong></span></ion-label>\n\n                    <ion-input type="number" name="qty" #qty="ngModel" [(ngModel)]="data.qty" [disabled]= "!data.product" pattern="^[1-9][0-9]{0,9}$" ></ion-input>\n\n                </ion-item>\n\n                \n\n                <div class="mt16">\n\n                    <button type="text" ion-button class="cs-btn" [disabled]="!data.product || !data.qty" (click)="addToList()">Add To List</button>\n\n                </div>\n\n                \n\n                <div class="list-box mt10"  *ngFor="let row of add_list;let i=index">\n\n                    <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n                        <div class="content-info">\n\n                            <div class="right-info">\n\n                                <div class="mt2 mb2" style="display:flex; flex-direction:row">\n\n                                    <p class="pr2" style="color:rgb(255, 153, 0)">#{{i+1}} </p>\n\n                                    <p *ngIf="row.product.product_detail"> {{row.product.product_detail}}</p>\n\n                                    <p *ngIf="!row.product.product_detail"> {{row.product.product_name}} ({{row.product.product_code}})</p>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                        <div class="tag-info">\n\n                            <a><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></a>\n\n                        </div>\n\n                    </div>\n\n                    \n\n                    <div class="three_boxes">\n\n                        <div class="lower ">\n\n                            <p class="font10">Qty</p>\n\n                            <p class="font10">{{row.qty}}</p>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </ion-list>\n\n            \n\n            <div class="text-right mt16">\n\n                <button ion-button block color="primary" [disabled]="Submit_button" type="submit">\n\n                    <ion-spinner *ngIf="spinnerLoader"></ion-spinner>\n\n                    Submit\n\n                </button>\n\n            </div>\n\n        </form>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-add\secondary-bill-upload-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], SecondaryBillUploadAddPage);
    return SecondaryBillUploadAddPage;
}());

//# sourceMappingURL=secondary-bill-upload-add.js.map

/***/ }),

/***/ 1421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecondaryBillUploadListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_add_secondary_bill_upload_add__ = __webpack_require__(1420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__secondary_bill_upload_detail_secondary_bill_upload_detail__ = __webpack_require__(1416);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SecondaryBillUploadListPage = /** @class */ (function () {
    function SecondaryBillUploadListPage(navCtrl, service) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.secBillList = [];
        this.secBillCounts = [];
        this.ActiveTab = 'Pending';
        this.filter = {};
        console.log('ionViewDidLoad SecondaryBillUploadListPage');
    }
    SecondaryBillUploadListPage.prototype.goToSecBillUploadAdd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__secondary_bill_upload_add_secondary_bill_upload_add__["a" /* SecondaryBillUploadAddPage */]);
    };
    SecondaryBillUploadListPage.prototype.goOnSecondaryBillUploadDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__secondary_bill_upload_detail_secondary_bill_upload_detail__["a" /* SecondaryBillUploadDetailPage */], { id: id });
    };
    SecondaryBillUploadListPage.prototype.ionViewWillEnter = function () {
        this.getsecBillList(this.ActiveTab);
    };
    SecondaryBillUploadListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SecondaryBillUploadListPage');
    };
    SecondaryBillUploadListPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getsecBillList(this.ActiveTab);
        refresher.complete();
    };
    SecondaryBillUploadListPage.prototype.getsecBillList = function (ActiveTab) {
        var _this = this;
        console.log(ActiveTab);
        console.log(this.filter.master_search);
        this.service.presentLoading();
        this.service.addData({ ActiveTab: ActiveTab, master_search: this.filter.master_search }, 'AppOrder/secondaryOrdersBillListing').then(function (result) {
            console.log(result);
            if (result['statusCode'] == 200) {
                _this.service.dismissLoading();
                _this.secBillList = result['result'];
                _this.secBillCounts = result['tab_count'];
                console.log(_this.secBillList);
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
        });
    };
    SecondaryBillUploadListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-secondary-bill-upload-list',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-list\secondary-bill-upload-list.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Secondary Bill Upload List</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <div class="search add-search">\n\n            <div class="filter">\n\n                <ion-searchbar type=\'text\' name="master_search" [(ngModel)]="filter.master_search" (keyup.enter)="getsecBillList(ActiveTab)"></ion-searchbar>\n\n            </div>\n\n        </div>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n    \n\n    <div class="capsule-tabs">\n\n        <ul>\n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Pending\'}" (click)="ActiveTab=\'Pending\' ;getsecBillList(ActiveTab)">\n\n                <p>Pending\n\n                    <span>{{secBillCounts.Pending}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Verified\'}" (click)="ActiveTab=\'Verified\';getsecBillList(ActiveTab)">\n\n                <p>Verified\n\n                    <span>{{secBillCounts.Verified}}</span>\n\n                </p>\n\n            </li>\n\n            \n\n            <li [ngClass]="{\'active\' : ActiveTab==\'Reject\'}" (click)="ActiveTab=\'Reject\';getsecBillList(ActiveTab)">\n\n                <p>Rejected\n\n                    <span>{{secBillCounts.Reject}}</span>\n\n                </p>\n\n            </li>\n\n        </ul>\n\n    </div>\n\n\n\n    <div class="padding16">\n\n        <div class="list-box" *ngFor="let row of secBillList" (click)="goOnSecondaryBillUploadDetail(row.id)">\n\n            <div class="upper mt0">\n\n                <div class="left-date">\n\n                    <div class="date-section">\n\n                        <p>{{row.bill_date | date:\'d MMM y\'}}</p>\n\n                        <p>Bill Date</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{row.bill_no}}</p>\n\n                        <p>Bill No.</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>₹ {{row.bill_amount}}</p>\n\n                        <p>Bill Amount</p>\n\n                    </div>\n\n\n\n                    <div class="date-section" *ngIf="ActiveTab==\'Verified\'">\n\n                        <p>₹ {{row.approved_amount}}</p>\n\n                        <p>Approved Amount</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="mid mt0">\n\n                <div class="content-info">\n\n                    <div class="left-info" >\n\n                        <div class="circle">{{row.distributor_company_name.substring(0,1).toUpperCase()}}</div>\n\n                    </div>\n\n\n\n                    <div class="right-info" >\n\n                        <p>{{row.distributor_company_name.toUpperCase()}}</p>\n\n                        <p>{{row.distributor_name | titlecase}} ({{row.distributor_mobile}})</p>\n\n                    </div>\n\n                </div>\n\n                \n\n                <div class="tag-info">\n\n                    <a><i class="material-icons">chevron_right</i></a>\n\n                </div>\n\n            </div>\n\n            \n\n            <div class="upper">\n\n                <div class="left-date">\n\n                    <div class="date-section">\n\n                        <p>{{row.date_created | date:\'d MMM y\'}}</p>\n\n                        <p>Date Created</p>\n\n                    </div>\n\n\n\n                    <div class="date-section">\n\n                        <p>{{row.total_items}}</p>\n\n                        <p>Total Item</p>\n\n                    </div>\n\n                    \n\n                    <div class="date-section">\n\n                        <p>{{row.total_items_qty}}</p>\n\n                        <p>Total Item Qty</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    \n\n    <div class="nothing-here" *ngIf="!secBillList?.length">\n\n        <div class="outer">\n\n            <div class="innear">\n\n                <img src="assets/imgs/no_found.svg" alt="">\n\n                <p>Data Not Available</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    \n\n    <ion-fab right bottom>\n\n        <button ion-fab color="primary" (click)="goToSecBillUploadAdd()">\n\n            <ion-icon name="add"></ion-icon>\n\n        </button>\n\n    </ion-fab>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\DMS\Secondary-Bill-Upload\secondary-bill-upload-list\secondary-bill-upload-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], SecondaryBillUploadListPage);
    return SecondaryBillUploadListPage;
}());

//# sourceMappingURL=secondary-bill-upload-list.js.map

/***/ })

});
//# sourceMappingURL=12.js.map