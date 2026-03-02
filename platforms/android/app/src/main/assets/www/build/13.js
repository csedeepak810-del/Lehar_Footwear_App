webpackJsonp([13],{

/***/ 1402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StockListpagePageModule", function() { return StockListpagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stock_listpage__ = __webpack_require__(1454);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StockListpagePageModule = /** @class */ (function () {
    function StockListpagePageModule() {
    }
    StockListpagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__stock_listpage__["a" /* StockListpagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__stock_listpage__["a" /* StockListpagePage */]),
            ],
        })
    ], StockListpagePageModule);
    return StockListpagePageModule;
}());

//# sourceMappingURL=stock-listpage.module.js.map

/***/ }),

/***/ 1434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockDetailpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
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
 * Generated class for the StockDetailpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StockDetailpagePage = /** @class */ (function () {
    function StockDetailpagePage(navCtrl, navParams, serve) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.data = {};
        this.filter = {};
        this.sizeList = [];
        this.thicknessList = [];
        this.ProductItem = [];
        this.ProductItemDetail = [];
        this.sendRequest = false;
        this.Stock_detail = [];
        this.CateogryList = [];
        this.StocKListData = [];
        this.ProductList = [];
        this.brandList = [];
        this.warehousename = {};
        if (this.navParams.get('id')) {
            console.log(navParams);
            this.id = this.navParams.get('id');
        }
        if (this.id) {
            this.get_StockWarehouse_list();
            this.GetProducts();
            // this.get_task_detail();
        }
    }
    StockDetailpagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StockDetailpagePage');
    };
    StockDetailpagePage.prototype.get_task_detail = function () {
        var _this = this;
        console.log(this.data.items.id);
        this.sendRequest = false;
        this.serve.addData({ 'filter': this.filter, 'id': this.id, 'product_id': this.data.items.id }, 'AppStock/fetchProductData').then(function (result) {
            if (result['statusCode'] == 200) {
                console.log(result);
                _this.Stock_detail = result['result'];
                // this.warehousename = result['warehouse'];
                // this.sendRequest = true
                // console.log(this.warehousename)
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismiss();
        });
    };
    StockDetailpagePage.prototype.get_StockWarehouse_list = function () {
        var _this = this;
        this.sendRequest = false;
        this.serve.addData({ 'id': this.id }, 'AppStock/fetchWarehouse').then(function (result) {
            if (result['statusCode'] == 200) {
                console.log(result);
                _this.StocKListData = result['result'];
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismissLoading();
        });
    };
    StockDetailpagePage.prototype.SegmentItemDetails = function () {
        var _this = this;
        this.serve.addData({ 'category_id': this.data.Cateogry.id, 'product_name': this.data.product.product_name, 'brand_code': this.data.brand.brand_code, "thickness": this.data.thickness, 'size': this.data.size }, "AppOrder/segmentItemsDetails")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.ProductItemDetail = resp['result'];
                console.log(_this.ProductItemDetail);
                _this.ProductItem = resp['result'][0];
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) { });
    };
    StockDetailpagePage.prototype.GetProducts = function () {
        var _this = this;
        this.serve.addData({}, "AppOrder/getProductName")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.ProductList = resp['result'];
                console.log(_this.ProductList);
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) { });
    };
    StockDetailpagePage.prototype.getBrands = function () {
        var _this = this;
        console.log(this.data.product);
        console.log(this.data.product.product_name);
        this.serve.addData({ 'product_name': this.data.product.product_name }, "AppOrder/getBrand")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.brandList = resp['result'];
                console.log(resp);
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) { });
    };
    StockDetailpagePage.prototype.GetCateogryList = function () {
        var _this = this;
        console.log(this.data.brand);
        console.log(this.data.brand.brand_code);
        this.serve.addData({ 'product_name': this.data.product.product_name, 'brand_code': this.data.brand.brand_code }, "AppOrder/getCategory")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.CateogryList = resp['result'];
                console.log(_this.CateogryList);
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) { });
    };
    StockDetailpagePage.prototype.getThickness = function (Cateogry) {
        var _this = this;
        console.log(Cateogry);
        console.log(Cateogry.id);
        this.serve.addData({ 'category_id': Cateogry.id, 'product_name': this.data.product.product_name, 'brand_code': this.data.brand.brand_code }, "AppOrder/productThikness")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.thicknessList = resp['result'];
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) { });
        // this.data.qty = '';
        // this.data.size = '';
    };
    StockDetailpagePage.prototype.getSize = function (thickness) {
        var _this = this;
        console.log(this.data.Cateogry);
        console.log(this.data.Cateogry.id);
        this.serve.addData({ 'category_id': this.data.Cateogry.id, 'product_name': this.data.product.product_name, 'brand_code': this.data.brand.brand_code, "thickness": thickness }, "AppOrder/productSize")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                console.log(resp);
                _this.sizeList = resp['result'];
                console.log(_this.sizeList);
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) { });
        // this.data.qty = '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"])
    ], StockDetailpagePage.prototype, "navBar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('itemselectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], StockDetailpagePage.prototype, "itemselectable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('subCategory'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], StockDetailpagePage.prototype, "subcatSelectable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('productCode'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], StockDetailpagePage.prototype, "prod_codeSelectable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], StockDetailpagePage.prototype, "selectComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('distributorSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], StockDetailpagePage.prototype, "distributorSelectable", void 0);
    StockDetailpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stock-detailpage',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\stock-detailpage\stock-detailpage.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title> Product Stock Detail</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <div class="other-block" *ngFor="let val of StocKListData">\n\n\n\n    <p><strong>WareHouse :-</strong>\n\n      {{val?.display_name}}\n\n    </p>\n\n  </div>\n\n\n\n  <div class="edit">\n\n    <ion-list>\n\n      <ion-item class="cs-normal-select retailerSelectionBox">\n\n        <ion-label>Product<strong class="red-text">*</strong></ion-label>\n\n        <ionic-selectable item-content name="product" #product="ngModel" [(ngModel)]="data.product"\n\n          [items]="ProductList" itemValueField="product_name" itemTextField="product_name" [canSearch]="true"\n\n          #itemselectable (ngModelChange)="getBrands()" modalCssClass="f1"></ionic-selectable>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item class="cs-normal-select retailerSelectionBox mt16">\n\n        <ion-label>Brand <strong class="red-text">*</strong></ion-label>\n\n        <ionic-selectable item-content name="brand" #brand="ngModel" [(ngModel)]="data.brand" [items]="brandList"\n\n          itemValueField="brand_code" itemTextField="brand_code" [canSearch]="true" #itemselectable modalCssClass="f1"\n\n          (ngModelChange)="GetCateogryList()"></ionic-selectable>\n\n\n\n      </ion-item>\n\n\n\n      <ion-item class="cs-normal-select retailerSelectionBox mt16" *ngIf="data.brand">\n\n        <ion-label>Category<strong class="red-text">*</strong></ion-label>\n\n        <ionic-selectable item-content name="Cateogry" #Cateogry="ngModel" [(ngModel)]="data.Cateogry"\n\n          [items]="CateogryList" itemValueField="id" itemTextField="category" [canSearch]="true" #itemselectable\n\n          modalCssClass="f1" (ngModelChange)="getThickness(data.Cateogry);"></ionic-selectable>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item class="cs-normal-select retailerSelectionBox mt16" *ngIf="data.Cateogry">\n\n        <ion-label>Thickness <strong class="red-text">*</strong></ion-label>\n\n        <ion-select interface="action-sheet" name="thickness" [(ngModel)]="data.thickness" #thickness="ngModel"\n\n          (ngModelChange)="getSize(data.thickness);">\n\n          <ion-option *ngFor="let row of thicknessList" value="{{row.thickness}}">{{row.thickness}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item class="cs-normal-select retailerSelectionBox mt16">\n\n        <ion-label>Size <strong class="red-text">*</strong></ion-label>\n\n        <ion-select interface="action-sheet" name="size" [(ngModel)]="data.size" #size="ngModel"\n\n          (ngModelChange)="SegmentItemDetails();">\n\n          <ion-option *ngFor="let row of sizeList" value="{{row.size}}">{{row.size}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      \n\n      <ion-item class="cs-normal-select retailerSelectionBox mt16" >\n\n        <ion-label>Item <strong class="red-text">*</strong></ion-label>\n\n        <ionic-selectable item-content name="items" #items="ngModel" [(ngModel)]="data.items"\n\n          (ngModelChange)="get_task_detail()"  [items]="ProductItemDetail" itemValueField="id" itemTextField="description" [canSearch]="true"\n\n            #itemselectable modalCssClass="f1" ></ionic-selectable>\n\n    </ion-item>\n\n\n\n\n\n    </ion-list>\n\n\n\n\n\n\n\n    <ng-container *ngFor="let row of Stock_detail">\n\n      <div class="attendance-list flat-list mt10" >\n\n        <div class="slab slab-bg">\n\n       \n\n          <div class="slab-day">\n\n            <p>Category</p>\n\n            <span>{{row.category?row.category:\'-\'}}</span>\n\n          </div>\n\n          <div class="slab-day">\n\n            <p>Sub category</p>\n\n            <span>{{row.sub_category?row.sub_category:\'-\'}}</span>\n\n          </div>\n\n    \n\n          <div class="slab-day">\n\n            <p>Stock</p>\n\n            <span>{{row.stock}}</span>\n\n          </div>\n\n          \n\n        </div>\n\n        <div class="other-block">\n\n          <p><strong>product :</strong>\n\n            {{row.display_name}}\n\n          </p>\n\n        </div>\n\n    \n\n    \n\n        \n\n      \n\n      </div>\n\n    </ng-container> \n\n  \n\n        \n\n\n\n\n\n  </div>\n\n\n\n\n\n\n\n\n\n\n\n      <!-- <div class="nothing-here" *ngIf="!Stock_detail.length && sendRequest == true">\n\n    <div class="outer">\n\n      <div class="innear">\n\n        <img src="assets/imgs/no_found.svg" alt="">\n\n        <p>Data Not Available</p>\n\n      </div>\n\n    </div>\n\n  </div> -->\n\n\n\n  \n\n\n\n\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\stock-detailpage\stock-detailpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], StockDetailpagePage);
    return StockDetailpagePage;
}());

//# sourceMappingURL=stock-detailpage.js.map

/***/ }),

/***/ 1454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockListpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stock_detailpage_stock_detailpage__ = __webpack_require__(1434);
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
 * Generated class for the StockListpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StockListpagePage = /** @class */ (function () {
    function StockListpagePage(navCtrl, navParams, serve) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.sendRequest = false;
        this.filter = {};
        this.StocKListData = [];
    }
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad StockListpagePage');
    // }
    StockListpagePage.prototype.ionViewDidEnter = function () {
        this.get_StockWarehouse_list();
    };
    StockListpagePage.prototype.get_StockWarehouse_list = function () {
        var _this = this;
        this.sendRequest = false;
        this.serve.addData({ 'filter': this.filter }, 'AppStock/fetchWarehouse').then(function (result) {
            if (result['statusCode'] == 200) {
                console.log(result);
                _this.StocKListData = result['result'];
                _this.sendRequest = true;
            }
            else {
                _this.serve.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismissLoading();
        });
    };
    StockListpagePage.prototype.Stock_detail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__stock_detailpage_stock_detailpage__["a" /* StockDetailpagePage */], { 'id': id, });
    };
    StockListpagePage.prototype.doRefresh = function (refresher) {
        this.get_StockWarehouse_list();
        setTimeout(function () {
            refresher.complete();
        }, 1000);
    };
    StockListpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stock-listpage',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\stock-listpage\stock-listpage.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title> Product Stock List</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content >\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n<div class="nothing-here" *ngIf="!StocKListData.length && sendRequest == true">\n\n  <div class="outer">\n\n    <div class="innear">\n\n      <img src="assets/imgs/no_found.svg" alt="">\n\n      <p>Data Not Available</p>\n\n    </div>\n\n  </div>\n\n</div>\n\n  <div class="pd-left-right16 mt16 mb100">\n\n    <ng-container  *ngFor="let data of StocKListData" >\n\n    \n\n    <div class="attendance-list green_bg" (click)="Stock_detail(data.id)"  >\n\n   \n\n      <div class="other-block">\n\n        <p><strong>Ware House :</strong> \n\n         {{data.display_name}}\n\n        </p>\n\n      </div>\n\n      <div class="next-forword">\n\n        <i class="material-icons">chevron_right</i>\n\n      </div>\n\n    </div>\n\n  </ng-container>\n\n  </div>\n\n  \n\n  <!-- <ion-fab right bottom *ngIf="team_exist==true" (click)="goToSupportAdd()">\n\n    <button ion-fab color="primary"><ion-icon name="add"></ion-icon></button>\n\n  </ion-fab> -->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\stock-listpage\stock-listpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */]])
    ], StockListpagePage);
    return StockListpagePage;
}());

//# sourceMappingURL=stock-listpage.js.map

/***/ })

});
//# sourceMappingURL=13.js.map