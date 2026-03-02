webpackJsonp([37],{

/***/ 1355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddsitecontactpagePageModule", function() { return AddsitecontactpagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addsitecontactpage__ = __webpack_require__(1435);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddsitecontactpagePageModule = /** @class */ (function () {
    function AddsitecontactpagePageModule() {
    }
    AddsitecontactpagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__addsitecontactpage__["a" /* AddsitecontactpagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__addsitecontactpage__["a" /* AddsitecontactpagePage */]),
            ],
        })
    ], AddsitecontactpagePageModule);
    return AddsitecontactpagePageModule;
}());

//# sourceMappingURL=addsitecontactpage.module.js.map

/***/ }),

/***/ 1435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddsitecontactpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
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
 * Generated class for the AddsitecontactpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddsitecontactpagePage = /** @class */ (function () {
    function AddsitecontactpagePage(navCtrl, navParams, serve, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.viewCtrl = viewCtrl;
        this.data = {};
        this.Productdescription = [];
        this.categorylist = [];
        this.total_qty = 0;
        this.from_page = '';
        this.savingFlag = false;
        this.product_list = [];
        this.brandlist = [];
        console.log(navParams);
        this.from_page = this.navParams.get("from");
        console.log(this.from_page);
        if (this.from_page == 'site_contact') {
            this.leadtype = this.navParams.get("lead_type");
            this.Siteid = this.navParams.get("site_id");
            console.log(this.Siteid);
            console.log(this.leadtype);
            this.data.owner_designation = this.leadtype;
            console.log(this.data.owner_designation);
            this.getBrands();
        }
    }
    AddsitecontactpagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddsitecontactpagePage');
    };
    AddsitecontactpagePage.prototype.getBrands = function () {
        var _this = this;
        this.serve.addData({}, "AppEnquiry/brandList")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.brandlist = resp['result'];
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) {
            _this.serve.errorToast('Something Went Wrong!');
        });
    };
    AddsitecontactpagePage.prototype.blankValueproduct = function () {
        this.data.brand = '';
        this.data.Cateogry = '';
        this.data.product_id = '';
        this.data.spec = '';
        this.data.qty = '';
    };
    AddsitecontactpagePage.prototype.DeleteItem = function (index) {
        this.product_list.splice(index, 1); // Removes the item at the specified index
    };
    AddsitecontactpagePage.prototype.addToListProduct = function () {
        var _this = this;
        if (this.product_list.length > 0) {
            var existIndex = void 0;
            existIndex = this.product_list.findIndex(function (row) { return row.product_id == _this.data.product_id; });
            console.log(existIndex);
            if (existIndex != -1) {
                this.product_list[existIndex]['qty'] += parseFloat(this.data.qty);
                this.blankValueproduct();
            }
            else {
                if (this.data.product_id) {
                    var index = void 0;
                    index = this.Productdescription.findIndex(function (row) { return row.id == _this.data.product_id; });
                    if (index != -1) {
                        this.data.productdisplay_name = this.Productdescription[index].display_name;
                        console.log(this.data.productdisplay_name);
                    }
                }
                this.product_list.push({
                    'brand': this.data.brand,
                    'product_category': this.data.Cateogry,
                    'product_id': this.data.product_id,
                    'product_description': this.data.productdisplay_name,
                    'spec': this.data.spec,
                    'qty': parseFloat(this.data.qty),
                });
                this.blankValueproduct();
            }
        }
        else {
            if (this.data.product_id) {
                var index = void 0;
                index = this.Productdescription.findIndex(function (row) { return row.id == _this.data.product_id; });
                if (index != -1) {
                    this.data.productdisplay_name = this.Productdescription[index].display_name;
                    console.log(this.data.productdisplay_name);
                }
            }
            this.product_list.push({
                'brand': this.data.brand,
                'product_category': this.data.Cateogry,
                'product_id': this.data.product_id,
                'product_description': this.data.productdisplay_name,
                'spec': this.data.spec,
                'qty': parseFloat(this.data.qty),
            });
            console.log(this.product_list);
            this.blankValueproduct();
        }
        this.total_qty = 0;
        for (var i = 0; i < this.product_list.length; i++) {
            this.total_qty += parseInt(this.product_list[i]['qty']);
        }
    };
    AddsitecontactpagePage.prototype.addNewContact = function () {
        var _this = this;
        this.savingFlag = true;
        this.serve.addData({ "data": { 'id': this.Siteid, 'contactDetails': [this.data], 'productdata': this.product_list } }, 'AppEnquiry/addSiteContactPerson')
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.savingFlag = false;
                _this.serve.successToast(resp['statusMsg']);
                _this.viewCtrl.dismiss(true);
            }
            else {
                _this.savingFlag = false;
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (error) {
            _this.savingFlag = false;
            _this.serve.Error_msg(error);
        });
    };
    AddsitecontactpagePage.prototype.getCateogry = function () {
        var _this = this;
        console.log('helo');
        this.serve.addData({ 'brand_code': this.data.brand }, "AppEnquiry/productCategory")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.categorylist = resp['result'];
                console.log(_this.categorylist);
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) {
            _this.serve.errorToast('Something Went Wrong!');
        });
    };
    AddsitecontactpagePage.prototype.getProductDescription = function () {
        var _this = this;
        console.log('helo');
        this.serve.addData({ 'product_name': this.data.Cateogry }, "AppEnquiry/productDescription")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.Productdescription = resp['result'];
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) {
            _this.serve.errorToast('Something Went Wrong!');
        });
    };
    AddsitecontactpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addsitecontactpage',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\addsitecontactpage\addsitecontactpage.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add new Site Contact</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <form #f="ngForm" (ngSubmit)="f.valid && addNewContact()">\n\n    <div class="form pt10 padding0">\n\n      <ion-list no-lines class="padding10 pt0">\n\n        <ion-item [ngClass]="{\'error\':f.submitted && ownerName.invalid}">\n\n          <ion-label floating>{{\'Name\'}} <strong class="red-text">*</strong></ion-label>\n\n          <ion-input type="text" name="ownerName" #ownerName="ngModel" [(ngModel)]="data.ownerName"\n\n            required></ion-input>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && ownerName.invalid" class="eror">\n\n          <p *ngIf="ownerName.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && ownerMobile.invalid}">\n\n          <ion-label floating>{{\'Mobile Number\'}}<strong class="red-text">*</strong></ion-label>\n\n          <ion-input type="tel" minlength="10" maxlength="10" name="ownerMobile" #ownerMobile="ngModel"\n\n            [(ngModel)]="data.ownerMobile" pattern="^[6-9][0-9]{0,9}$" required></ion-input>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && ownerMobile.invalid" class="eror">\n\n          <p *ngIf="ownerMobile.errors.required">{{\'Field is Required\'}}</p>\n\n          <p *ngIf="ownerMobile.errors?.pattern">Invalid Mobile Number</p>\n\n          <p\n\n            *ngIf="!ownerMobile.errors?.pattern  && (ownerMobile.errors?.maxlength || ownerMobile.errors?.minlength)">\n\n            Mobile\n\n            No should be of 10 digits..\n\n          </p>\n\n        </div>\n\n        <ion-item [ngClass]="{\'error\':f.submitted && owner_designation.invalid}">\n\n          <ion-label floating>Lead Type <strong class="red-text">*</strong></ion-label>\n\n          <ion-select name="owner_designation" [(ngModel)]="data.owner_designation" #owner_designation="ngModel"\n\n            interface="action-sheet" required>\n\n            <ion-option value="PROJECT">PROJECT</ion-option>\n\n            <ion-option value="END USER">END USER</ion-option>\n\n            <ion-option value="ARCHITECT">ARCHITECT</ion-option>\n\n            <ion-option value="INTERIOR DESIGNER">INTERIOR DESIGNER</ion-option>\n\n            <ion-option value="CONTRACTOR">CONTRACTOR</ion-option>\n\n            <ion-option value="BUILDER">BUILDER</ion-option>\n\n          </ion-select>\n\n\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && owner_designation.invalid" class="eror">\n\n          <p *ngIf="owner_designation.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n\n\n        <ion-item [ngClass]="{\'error\':f.submitted && ICBP.invalid}">\n\n          <ion-label floating>ICBP <strong class="red-text">*</strong></ion-label>\n\n          <ion-select name="ICBP" [(ngModel)]="data.ICBP" #ICBP="ngModel" interface="action-sheet" required>\n\n  \n\n            <ion-option value="Yes">Yes</ion-option>\n\n            <ion-option value="No">No</ion-option>\n\n          \n\n          </ion-select>\n\n        </ion-item>\n\n        <div *ngIf="f.submitted && ICBP.invalid" class="eror">\n\n          <p *ngIf="ICBP.errors.required">{{\'Field is Required\'}}</p>\n\n        </div>\n\n\n\n  <ion-item [ngClass]="{\'error\':f.submitted && email.invalid}">\n\n    <ion-label floating><span>Email ID <strong class="red-text">*</strong></span></ion-label>\n\n    <ion-input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" name="email" #email="ngModel"\n\n      [(ngModel)]="data.email" [ngClass]="{\'is-invalid\':f.submitted && email?.invalid}" required></ion-input>\n\n  </ion-item>\n\n  <div *ngIf="f.submitted && email.invalid" class="eror">\n\n    <p *ngIf="email.errors.required" class="eror">{{\'Field is Required\'}}</p>\n\n    <p *ngIf="f.submitted && email?.invalid && data.email" class="eror">Email Is Invalid</p>\n\n  </div>\n\n\n\n<ng-container>\n\n\n\n  <div class="heading mb0">\n\n    <h1>Product Details</h1>\n\n  </div>\n\n\n\n<ion-item class="cs-normal-select retailerSelectionBox">\n\n<ion-label floating>Brand </ion-label>\n\n<ion-select name="brand" [(ngModel)]="data.brand"  #brand="ngModel" (ngModelChange)="getCateogry()"interface="action-sheet"  >\n\n  <ion-option  *ngFor="let val of brandlist" value="{{val.brand_code}}">{{val.brand_code}}</ion-option>\n\n</ion-select>\n\n</ion-item>\n\n\n\n<ion-item class="cs-normal-select retailerSelectionBox">\n\n<ion-label floating>Product Cateogry </ion-label>\n\n<ion-select name="Cateogry" [(ngModel)]="data.Cateogry" #Cateogry="ngModel" interface="action-sheet" (ngModelChange)="getProductDescription()" >\n\n  \n\n  <ion-option  *ngFor="let val of categorylist"  value="{{val.product_name}}">{{val.product_name}}</ion-option>\n\n</ion-select>\n\n</ion-item>\n\n\n\n\n\n<ion-item class="cs-normal-select retailerSelectionBox">\n\n<ion-label floating>Product Description </ion-label>\n\n<ion-select name="product_id" [(ngModel)]="data.product_id" #product_id="ngModel"    interface="action-sheet" >\n\n  <ion-option  *ngFor="let val of  Productdescription" value="{{val.id}}">{{val.display_name}}</ion-option>\n\n</ion-select>\n\n</ion-item>\n\n\n\n\n\n<ion-item class="cs-normal-select retailerSelectionBox ">\n\n<ion-label floating>SPEC</ion-label>\n\n<ion-select name="spec" [(ngModel)]="data.spec" #spec="ngModel" interface="action-sheet" >\n\n  <ion-option  value="Single">Single</ion-option>\n\n  <ion-option  value="Multiple">Multiple</ion-option>\n\n  \n\n</ion-select>\n\n</ion-item>\n\n\n\n<ion-item [ngClass]="{\'error\':f.submitted && qty.invalid}">\n\n<ion-label floating>Qty</ion-label>\n\n<ion-input type="number" name="qty" #qty="ngModel" [(ngModel)]="data.qty"\n\n(ngModelChange)="(data.qty == \'\' || data.qty == null || data.qty<1 )?(addToListButton = true):(addToListButton = false);"\n\n    onkeypress="return event.charCode>=48 && event.charCode<=57"\n\n  ></ion-input>\n\n</ion-item>\n\n\n\n<div class="mt16" *ngIf="data.qty">\n\n<button ion-button class="cs-btn" [disabled]="addToListButton" (click)="addToListProduct()">Add To List</button>\n\n</div>\n\n\n\n\n\n\n\n\n\n<div class="list-box mt20" *ngFor="let row of product_list;let i=index">\n\n  <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n      <div class="content-info">\n\n          <div class="right-info">\n\n              <p style="color:rgb(0, 119, 255)">{{row.product_description}}</p>\n\n            \n\n          </div>\n\n      </div>\n\n      <div class="tag-info">\n\n          <button><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></button>\n\n      </div>\n\n  </div>\n\n\n\n  <div class="three_boxes">\n\n      <div class="lower">\n\n          <p class="font10">Brand</p>\n\n          <p class="font10">{{row.brand}}</p>\n\n      </div>\n\n      <div class="lower ml5">\n\n          <p class="font10">Product Category</p>\n\n          <p class="font10">{{row.product_category}}</p>\n\n      </div>\n\n      <div class="lower ml5">\n\n          <p class="font10">Spec</p>\n\n          <p class="font10">{{row.spec}}</p>\n\n      </div>\n\n  </div>\n\n\n\n  <div class="three_boxes">\n\n      <div class="lower">\n\n          <p class="font10">Qty</p>\n\n          <p class="font10">{{row.qty}}</p>\n\n      </div>\n\n \n\n  \n\n\n\n\n\n  </div>\n\n</div>\n\n\n\n</ng-container>\n\n\n\n\n\n      </ion-list>\n\n      <div class="pl10 pr10">\n\n        <button ion-button block color="primary" [disabled]="savingFlag">\n\n          <ion-spinner *ngIf="savingFlag"></ion-spinner>&nbsp;Save\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </form>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\addsitecontactpage\addsitecontactpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], AddsitecontactpagePage);
    return AddsitecontactpagePage;
}());

//# sourceMappingURL=addsitecontactpage.js.map

/***/ })

});
//# sourceMappingURL=37.js.map