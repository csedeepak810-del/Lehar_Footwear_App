webpackJsonp([18],{

/***/ 1364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionAddPageModule", function() { return CollectionAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collection_add__ = __webpack_require__(1418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CollectionAddPageModule = /** @class */ (function () {
    function CollectionAddPageModule() {
    }
    CollectionAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__collection_add__["a" /* CollectionAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__collection_add__["a" /* CollectionAddPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["b" /* IonicSelectableModule */]
            ],
        })
    ], CollectionAddPageModule);
    return CollectionAddPageModule;
}());

//# sourceMappingURL=collection-add.module.js.map

/***/ }),

/***/ 1418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__collection_collection__ = __webpack_require__(1419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__ = __webpack_require__(50);
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
 * Generated class for the CollectionAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CollectionAddPage = /** @class */ (function () {
    function CollectionAddPage(events, loadingCtrl, navParams, viewCtrl, service, navCtrl, toastCtrl, alertCtrl, openNativeSettings, Device, diagnostic, storage, modal, platform, camera, actionSheetController, constant, appCtrl) {
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.service = service;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.openNativeSettings = openNativeSettings;
        this.Device = Device;
        this.diagnostic = diagnostic;
        this.storage = storage;
        this.modal = modal;
        this.platform = platform;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.constant = constant;
        this.appCtrl = appCtrl;
        this.data = {};
        this.form = {};
        this.loader = false;
        this.drList = [];
        this.today_date = new Date().toISOString().slice(0, 10);
        this.btndisable = false;
        this.savingFlag = false;
        this.allNetworkType = [];
        this.image = '';
        this.image_data = [];
    }
    CollectionAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CollectionAddPage');
        this.getAllNetworkType();
    };
    CollectionAddPage.prototype.getAllNetworkType = function () {
        var _this = this;
        this.service.addData({}, "AppOrder/orderDrList")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.allNetworkType = resp['modules'];
            }
            else {
                _this.service.errorToast(resp['statusMsg']);
            }
        }, function (err) { });
    };
    CollectionAddPage.prototype.distributors = function (data, masterSearch) {
        var _this = this;
        var type;
        if (this.form.networkType) {
            type = this.form.networkType.type;
        }
        this.loader = true;
        this.service.addData({ 'dr_type': type, 'master_search': masterSearch }, 'AppOrder/followupCustomer').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.loader = false;
                _this.drList = result['result'];
                if (_this.navParams.get('from') && _this.navParams.get('from') == 'DistPrimary') {
                    var existIndex = void 0;
                    existIndex = _this.drList.findIndex(function (row) { return row.id == _this.data.type_name; });
                    if (existIndex != -1) {
                        _this.data.type_name.min_ton = _this.drList[existIndex]['min_ton'];
                        console.log(_this.drList, "dr list");
                    }
                }
            }
            else {
                _this.loader = false;
                _this.service.errorToast(result['statusMsg']);
            }
        });
    };
    CollectionAddPage.prototype.closeDealer = function () {
        this.distributorSelectable._searchText = '';
    };
    CollectionAddPage.prototype.captureMedia = function (type) {
        var _this = this;
        console.log(type);
        var actionsheet = this.actionSheetController.create({
            title: "Upload Image",
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePhoto(type);
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: 'Gallery',
                    icon: 'image',
                    handler: function () {
                        _this.getImage(type);
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
    CollectionAddPage.prototype.takePhoto = function (type) {
        var _this = this;
        this.diagnostic.requestCameraAuthorization().then(function (isAvailable) {
            console.log(type);
            console.log('in take photo', _this.image_data);
            var options = {
                quality: 70,
                destinationType: _this.camera.DestinationType.DATA_URL,
                targetWidth: 500,
                targetHeight: 400
            };
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.start('Advance Laminates', 'Your Camera Is Opened.');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                _this.image = 'data:image/jpeg;base64,' + imageData;
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
                if (_this.image) {
                    // Assuming this.image_data is an array of objects with a 'travelClass' property
                    _this.fileChange(_this.image, type);
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
    CollectionAddPage.prototype.presentConfirm = function (title, msg) {
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
    CollectionAddPage.prototype.openSettings = function () {
        this.openNativeSettings.open("application_details");
    };
    CollectionAddPage.prototype.fileChange = function (img, type) {
        this.image_data.push(img);
        this.image = '';
    };
    CollectionAddPage.prototype.remove_image = function (i) {
        this.image_data.splice(i, 1);
    };
    CollectionAddPage.prototype.showLimit = function () {
        console.log('Image Data', this.image_data);
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: "You can upload only 1 bill images",
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
    CollectionAddPage.prototype.getImage = function (type) {
        var _this = this;
        this.diagnostic.requestCameraAuthorization().then(function (isAvailable) {
            var options = {
                quality: 70,
                destinationType: _this.camera.DestinationType.DATA_URL,
                mediaType: _this.camera.MediaType.PICTURE,
                sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                saveToPhotoAlbum: false,
                cameraDirection: 1,
                correctOrientation: true,
            };
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.start('Advance Laminates', 'Your Camera Is Opened.');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                _this.image = 'data:image/jpeg;base64,' + imageData;
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
                if (_this.image) {
                    // Assuming this.image_data is an array of objects with a 'travelClass' property
                    _this.fileChange(_this.image, type);
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
    CollectionAddPage.prototype.submit = function () {
        var _this = this;
        this.savingFlag = true;
        if (this.image_data) {
            this.form.image = this.image_data;
        }
        if (this.form.type_name) {
            this.form.drId = this.form.type_name.id;
            console.log(this.form.drId);
        }
        this.service.addData({ 'data': this.form }, "AppOrder/addCollection")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.savingFlag = false;
                _this.service.successToast(resp['statusMsg']);
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_7__collection_collection__["a" /* CollectionPage */]);
            }
            else {
                _this.service.errorToast(resp['statusMsg']);
                _this.savingFlag = false;
            }
        }, function (err) { });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('distributorSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], CollectionAddPage.prototype, "distributorSelectable", void 0);
    CollectionAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-collection-add',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\collection-add\collection-add.html"*/'<!--\n\n  Generated template for the CollectionAddPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-header>\n\n    <ion-navbar>\n\n      <ion-title class="f14">\n\n        Add Collection\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n\n\n\n\n\n\n  <form class="form" #f="ngForm" (ngSubmit)="f.form.valid && submit()">\n\n     <div class="form" >\n\n      <ion-list>\n\n\n\n        <ion-item [ngClass]="{\'error\': f.submitted && collectionDate?.invalid}" style="background: transparent !important;">\n\n          <ion-label floating><span>Collection Date<strong>*</strong></span></ion-label>\n\n          <ion-datetime display-format="MMM DD, YYYY" max="{{today_date}}" type="text"  #collectionDate="ngModel"\n\n            [(ngModel)]="form.collectionDate" [ngModelOptions]="{standalone: true}"\n\n            class="calander date" required>\n\n          </ion-datetime>\n\n        </ion-item>\n\n\n\n        <ion-item class="mt4" [ngClass]="{\'error\': f.submitted && networkType?.invalid}" style="background: transparent !important;">\n\n          <ion-label floating>Select Type<strong class="red-text">*</strong></ion-label>\n\n          <ionic-selectable item-content name="networkType" #networkType="ngModel" [(ngModel)]="form.networkType"\n\n            [items]="allNetworkType" itemValueField="type" itemTextField="module_name" [canSearch]="true" (ngModelChange)="distributors(form.networkType)"\n\n            modalCssClass="f1" required>\n\n          </ionic-selectable>\n\n        </ion-item>\n\n        \n\n        <ion-item class="mt4" [ngClass]="{\'error\': f.submitted && type_name?.invalid}" style="background: transparent !important;">\n\n          <ion-label floating><span>{{form.networkType?.module_name?form.networkType?.module_name:\'Select party Name\'}}<strong class="red-text">*</strong></span></ion-label>\n\n          <ionic-selectable item-content name="type_name" [(ngModel)]="form.type_name" #type_name="ngModel" [items]="drList"\n\n            itemValueField="id" itemTextField="display_name" [canSearch]="true"\n\n            (onClose)="closeDealer()" required>\n\n          </ionic-selectable>\n\n        </ion-item>\n\n        \n\n        <ion-item class="mt4" [ngClass]="{\'error\': f.submitted && collectionType?.invalid}">\n\n          <ion-label floating>Collect Type<strong class="red-text">*</strong></ion-label>\n\n          <ion-select interface="action-sheet" name="collectionType" [(ngModel)]="form.collectionType" #collectionType="ngModel" required>\n\n            <ion-option value="Cash">Cash</ion-option>\n\n            <ion-option value="Cheque ">Cheque</ion-option>\n\n            <ion-option value="UPI ">UPI</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        \n\n        <ion-item class="mt4" [ngClass]="{\'error\': f.submitted && collectionAmt?.invalid}">\n\n          <ion-label floating><span>Collect Amount</span></ion-label>\n\n          <ion-input type="number" name="collectionAmt" #collectionAmt="ngModel"\n\n            [(ngModel)]="form.collectionAmt"\n\n            onkeypress="return event.charCode>=48 && event.charCode<=57" required>\n\n          </ion-input>\n\n        </ion-item>\n\n        \n\n        <ion-item class="mt4" class="cs-textarea1">\n\n          <ion-label floating><span>Any Remarks</span></ion-label>\n\n          <ion-textarea  name="remark" [(ngModel)]="form.remark" onpaste="return false;"></ion-textarea>\n\n        </ion-item>\n\n        \n\n      </ion-list>\n\n\n\n      <div class="upload-doc">\n\n        <ul class="no-padding">\n\n          <li class="image-upload" *ngFor="let pic of image_data;let i = index;">\n\n            <img src="{{pic}}">\n\n            <button class="del"><i class="material-icons" (click)="remove_image(i)">delete_sweep</i></button>\n\n          </li>\n\n          <li class="add_image mt4" (click)="image_data.length <= 10 ?  captureMedia(\'Cheque\') : showLimit()">\n\n            <img src="assets/imgs/upload_imae_icon.png" alt="">\n\n            Collection Image Upload <span>here</span>\n\n          </li>\n\n        </ul>\n\n      </div>\n\n\n\n      <div class="enquiry-btn add-btns mt20">\n\n        <button ion-button block class="h40 green-color" style="letter-spacing: 1px;">\n\n          <p> Submit</p>\n\n        </button>\n\n      </div>\n\n    </div> \n\n\n\n   \n\n\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\collection-add\collection-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"],
            __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"]])
    ], CollectionAddPage);
    return CollectionAddPage;
}());

//# sourceMappingURL=collection-add.js.map

/***/ }),

/***/ 1419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__travel_pop_over_travel_pop_over__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__collection_add_collection_add__ = __webpack_require__(1418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__view_profile_view_profile__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__ = __webpack_require__(5);
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
 * Generated class for the CollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CollectionPage = /** @class */ (function () {
    function CollectionPage(navCtrl, navParams, constant, popoverCtrl, modalCtrl, serve, alertCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.constant = constant;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        this.serve = serve;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.collection_list = [];
        this.sortVisible = false;
        this.sortValue = "";
        this.Type = 'My';
        this.status = 'Pending';
        this.sort = '';
        this.data = {};
        this.user_list = [];
        this.filter = {};
        this.order = {};
        this.focusDealer = false;
        this.Employee_Type = {};
        this.date1 = new Date();
        this.currentMonth = this.date1.getMonth();
        this.currentYear = this.date1.getFullYear();
        this.yearData = [];
        this.availableMonths = [];
        this.monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthMapping = [
            { name: 'January', value: '01' },
            { name: 'February', value: '02' },
            { name: 'March', value: '03' },
            { name: 'April', value: '04' },
            { name: 'May', value: '05' },
            { name: 'June', value: '06' },
            { name: 'July', value: '07' },
            { name: 'August', value: '08' },
            { name: 'September', value: '09' },
            { name: 'October', value: '10' },
            { name: 'November', value: '11' },
            { name: 'December', value: '12' },
        ];
        this.error_msg = '';
        this.count = {};
        this.DrTypeName = this.navParams.get('moduleName');
        console.log(this.DrTypeName, "Module name in retailer");
        console.log(this.navParams);
        this.storage.get('team_count').then(function (team_count) {
            _this.teamCount = team_count;
        });
        var currentYear = new Date().getFullYear();
        this.yearData = Array.from({ length: 4 }, function (_, i) { return currentYear - i; });
        console.log(this.yearData);
    }
    CollectionPage.prototype.ionViewDidEnter = function () {
        // if(this.Type=='My'){
        this.collection_data(this.status);
        this.getYearsAll();
        // }else{
        this.get_user();
        // }
    };
    CollectionPage.prototype.presentPopover = function (myEvent, from) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__travel_pop_over_travel_pop_over__["a" /* TravelPopOverPage */], { 'from': from, 'dr_type': this.DrTypeName, Type: this.Type });
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (resultData) {
            if (resultData) {
                _this.Type = resultData.TabStatus;
                _this.sort = resultData.sort;
                console.log(resultData);
                // if(this.Type=='My'){
                _this.collection_data(_this.status);
                _this.get_user();
                // }else{
                // }
            }
        });
    };
    CollectionPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: this.error_msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    CollectionPage.prototype.collection_data = function (status) {
        var _this = this;
        if (this.Type == 'My') {
            this.data = {};
        }
        if (!this.search) {
            this.serve.presentLoading();
        }
        if (this.order.year) {
            this.filter.year = this.order.year;
        }
        if (this.order.month) {
            this.filter.month = this.order.month;
        }
        this.limit = 20;
        this.start = 0;
        var customerApi = '';
        customerApi = 'AppOrder/collectionList';
        this.serve.addData({ 'Type': this.DrType, 'sort': this.sortValue, 'User_id': this.data.id, 'filter': this.filter, 'Mode': this.Type, status: status, 'Master_Search': this.search, 'limit': this.limit, 'start': this.start }, customerApi).then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.collection_list = resp['result'];
                console.log(_this.collection_list);
                _this.count = resp['statusCount'];
                // this.start = this.collection_list.length
                _this.serve.dismissLoading();
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
                _this.serve.dismissLoading();
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismiss();
        });
    };
    CollectionPage.prototype.loadData = function (infiniteScroll, status) {
        var _this = this;
        this.start = this.collection_list.length;
        this.serve.addData({ 'Mode': this.Type, 'Master_Search': this.search, status: status, 'limit': this.limit, 'start': this.start }, "AppCustomerNetwork/focusDealerList").then(function (resp) {
            if (resp['result'] == '') {
                _this.flag = 1;
                _this.filter = '';
            }
            else {
                setTimeout(function () {
                    _this.collection_list = _this.collection_list.concat(resp['result']);
                    infiniteScroll.complete();
                }, 1000);
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismiss();
        });
    };
    CollectionPage.prototype.doRefresh = function (refresher, status) {
        if (this.filter) {
            this.filter.year = '';
            this.filter.month = '';
        }
        if (this.search)
            this.filter = '';
        this.search = '';
        this.order.year = '';
        this.order.month = '';
        this.collection_data(status);
        setTimeout(function () {
            refresher.complete();
        }, 1000);
    };
    CollectionPage.prototype.imageModal = function (src) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": src }).present();
    };
    CollectionPage.prototype.get_user = function () {
        var _this = this;
        this.serve.addData({ 'user_id': this.data.user }, "AppAttendence/getAllAsm")
            .then(function (result) {
            if (result['statusCode'] == 200) {
                _this.user_list = result['asm_id'];
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismiss();
        });
    };
    CollectionPage.prototype.refreshUserList = function () {
        this.data = {};
        this.collection_data(this.status);
    };
    CollectionPage.prototype.addCollection = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__collection_add_collection_add__["a" /* CollectionAddPage */]);
    };
    CollectionPage.prototype.getYearsAll = function () {
        for (var j = 0; j <= this.currentMonth; j++) {
            this.availableMonths.push(this.monthList[j]);
        }
    };
    CollectionPage.prototype.getMonthValue = function (monthName) {
        console.log(monthName);
        var month = this.monthMapping.find(function (m) { return m.name === monthName; });
        return month ? month.value : '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], CollectionPage.prototype, "selectComponent", void 0);
    CollectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-collection',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\collection\collection.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title *ngIf="Type==\'My\'">Collection List</ion-title>\n\n    <ion-title *ngIf="Type!=\'My\'">Team Collection List</ion-title>\n\n\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar>\n\n    <ion-searchbar class="distributorSearchbar p10" (keydown.enter)="collection_data(status)" [(ngModel)]="search"\n\n      name="search">\n\n    </ion-searchbar>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <div class="two-col-main mb10">\n\n    <ion-item>\n\n      <ion-label floating><span>Year</span></ion-label>\n\n      <ion-select name="year" #year="ngModel" [(ngModel)]="order.year" required>\n\n        <ion-option *ngFor="let row of yearData" [value]="row">{{row}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label floating><span>Month</span></ion-label>\n\n      <ion-select name="month" [(ngModel)]="order.month" [disabled]="!order.year" required #month="ngModel" (ngModelChange)="collection_data(status)">\n\n        <ng-container *ngIf="order.year == currentYear">  \n\n          <ion-option *ngFor="let row of availableMonths" [value]="getMonthValue(row)">{{row}}</ion-option>\n\n        </ng-container>\n\n        <ng-container *ngIf="order.year != currentYear">\n\n          <ion-option *ngFor="let row of monthList" [value]="getMonthValue(row)">{{row}}</ion-option>\n\n        </ng-container>\n\n      </ion-select>\n\n    </ion-item>\n\n  </div>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event,status)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <ng-container *ngIf="Type != \'My\'">\n\n    <div class="fix-toolbar mt10 row" style="display: flex; align-items: center;">\n\n      <div class="edit flat" style="flex: 1;">\n\n        <ion-list style="border: 2px dashed #ac9e9e; margin-right: 10px;">\n\n          <ng-container>\n\n            <ion-item class="cs-normal-select retailerSelectionBox mt0 mb0">\n\n              <ion-label>Select Team Member</ion-label>\n\n              <ionic-selectable item-content name="data" [(ngModel)]="data" [items]="user_list" itemValueField="id"\n\n                itemTextField="name" [canSearch]="true" #selectComponent (ngModelChange)="collection_data(status)">\n\n              </ionic-selectable>\n\n            </ion-item>\n\n          </ng-container>\n\n        </ion-list>\n\n      </div>\n\n      <ion-icon name="refresh" slot="end" style="font-size: 24px; cursor: pointer;margin-right: 15px;"\n\n        (click)="refreshUserList()"></ion-icon>\n\n    </div>\n\n  </ng-container>\n\n\n\n\n\n  <div class="bg-white">\n\n    <div class="capsule-tabs">\n\n      <ul>\n\n        <li [ngClass]="{\'active\':status == \'Pending\'}" (click)="status = \'Pending\';start=0;collection_data(status);">\n\n          <p><i class="material-icons" style="color: #eb2222">pending_actions</i>Pending\n\n            ({{count.Pending?count.Pending:\'0\'}})</p>\n\n        </li>\n\n        <li [ngClass]="{\'active\':status == \'Approved\'}" (click)="status = \'Approved\';start=0;collection_data(status)">\n\n          <p><i class="material-icons" style="color: #21a421;">task_alt</i>Approved\n\n            ({{count.Approved?count.Approved:\'0\'}})</p>\n\n        </li>\n\n        <li [ngClass]="{\'active\':status == \'Reject\'}" (click)="status = \'Reject\';start=0;collection_data(status)">\n\n          <p><i class="material-icons" style="color: #ca8d2c;">close</i>Reject\n\n            ({{count.Reject?count.Reject:\'0\'}})</p>\n\n        </li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n  <div class="pl16 pr16 mt15 mb50">\n\n    <div class="attendance-list" *ngFor="let data of collection_list">\n\n      <div class="slab slab-bg">\n\n\n\n        <div class="slab-day">\n\n          <p>{{data.dateCreated | date:\'d MMM y\'}}</p>\n\n          <span>Date Created</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p>{{data.collectionDate| date:\'d MMM y\'}}</p>\n\n          <span>Collection Date</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p>{{data.collectionType}}</p>\n\n          <span>Collection Type</span>\n\n        </div>\n\n      </div>\n\n      <div class="center-block">\n\n        <div class="circle">{{data.companyName.trim().substring(0,1).toUpperCase()}}</div>\n\n        <h1>{{data.companyName.toUpperCase()}}</h1>\n\n        <!-- <p *ngIf="data.collectedByName != null">Created By : {{data.collectedByName ? data.collectedByName : \'N/A\'}}</p> -->\n\n        <p *ngIf="data.remark != null">Remark : {{data.remark ? data.remark : \'N/A\'}}</p>\n\n      </div>\n\n\n\n      <div class="slab slab-bg mt5" style="background-color: beige;">\n\n\n\n        <div class="slab-day">\n\n          <p>{{data.typeName}}</p>\n\n          <span>Party Type</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p>{{data.collectionAmt}}</p>\n\n          <span>Collection Amount</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <div class="list-content">\n\n            <ul class="no-padding">\n\n              <li class="image-upload">\n\n                <a *ngIf="data.image" class="openImageButton" (click)="imageModal(constant.upload_url1+\'collectionImage/\'+data.image)">View {{data.expName}} Image</a>\n\n                <a *ngIf="!data.image" class="openImageButton"  disabled>Not Uploaded</a>\n\n              </li>\n\n            </ul>\n\n            <span>Image</span>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n\n\n      <!-- <div class="slab mt5">\n\n        <div class="slab-day">\n\n          <p>{{row.order_item ? row.order_item : \'0\'}}</p>\n\n          <span>Total Item</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p class="bold">{{row.total_order_qty ? row.total_order_qty : \'0\'}}</p>\n\n          <span>Total Item Qty</span>\n\n        </div>\n\n        <div class="slab-day">\n\n          <p class="bold">{{row.weight ? (row.weight | number:\'1.2-2\') : \'0\'}} Ton</p>\n\n          <span>Weight</span>\n\n        </div>\n\n\n\n      </div> -->\n\n\n\n    </div>\n\n  </div>\n\n  <!-- <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event,status)" *ngIf="flag!=1">\n\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll> -->\n\n  <div class="nothing-here" style="height: 60%;" *ngIf="!collection_list.length">\n\n    <div class="outer">\n\n      <div class="innear">\n\n        <img src="assets/imgs/no_found.svg" alt="">\n\n        <p>No Data Available</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="primary" (click)="addCollection()">\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\collection\collection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], CollectionPage);
    return CollectionPage;
}());

//# sourceMappingURL=collection.js.map

/***/ })

});
//# sourceMappingURL=18.js.map