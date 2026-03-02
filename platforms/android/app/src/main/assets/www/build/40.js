webpackJsonp([40],{

/***/ 1354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTargetPageModule", function() { return AddTargetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_target__ = __webpack_require__(1427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AddTargetPageModule = /** @class */ (function () {
    function AddTargetPageModule() {
    }
    AddTargetPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_target__["a" /* AddTargetPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__add_target__["a" /* AddTargetPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["b" /* IonicSelectableModule */]
            ],
        })
    ], AddTargetPageModule);
    return AddTargetPageModule;
}());

//# sourceMappingURL=add-target.module.js.map

/***/ }),

/***/ 1427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTargetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_selectable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_dbservice_dbservice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__target_target__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AddTargetPage = /** @class */ (function () {
    function AddTargetPage(navCtrl, storage, navParams, service, loadingCtrl, alertCtrl, toastCtrl, dbService) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.dbService = dbService;
        this.filter_state_active = false;
        this.filter_district_active = false;
        this.filter_city_active = false;
        this.target_data = {};
        this.filter_active = false;
        this.addToListButton = true;
        this.filter = {};
        this.today_date = new Date().toISOString().slice(0, 10);
        this.state_list = [];
        this.district_list = [];
        this.channel_partners = [];
        this.travel_list = [];
        this.area_list = [];
        this.form1 = {};
        this.city_list = [];
        this.travel_plan_detail_for_update = [];
        this.state = [];
        this.customersList = [];
        this.dateWiseCustomersList = [];
        this.partyList = [];
        this.date = new Date();
        this.customerList = [];
        this.targetItem = [];
        this.remainingMonths = [];
        this.networList = [];
        this.module_name = '';
        this.travelType = '';
        this.assignDistributorList = '';
        this.teamId = '';
        this.salesTargetType = '';
        this.TeamID = '';
        this.buttonDisable = '';
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.totalDistance = 0;
        this.minYear = new Date().getFullYear();
        this.maxYear = (new Date().getFullYear() + 10).toString();
        this.minMonth = new Date().getMonth();
        this.salesTargetType = this.navParams.get('salesTargetType');
        this.TeamID = this.navParams.get('teamId');
        this.updateMonths();
        this.getNetworkList();
    }
    AddTargetPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.salesTargetType != 'Primary') {
                _this.getAssignedDistributor();
            }
            if (_this.salesTargetType == 'Stock Transfer') {
                _this.target_data.dr_type = 'Sub Dealer';
                _this.get_customerList('Sub Dealer');
            }
        }, 100);
    };
    AddTargetPage.prototype.refresh = function () {
        this.target_data.state = [];
        this.target_data.city = [];
        this.target_data.district = [];
    };
    // updateMonths() {
    //   let currentDate = new Date();
    //   let currentMonth = currentDate.getMonth(); // Month index (0-11)
    //   let currentYear = currentDate.getFullYear();
    //   let currentDay = currentDate.getDate();
    //   // Check if the current day is after the 5th
    //   let displayNextMonth = currentDay > 5;
    //   // Calculate next month
    //   let nextMonthIndex = (currentMonth + 1) % 12;
    //   let nextMonthYear = currentYear;
    //   if (nextMonthIndex === 0) {
    //     // If next month is January, increment the year
    //     nextMonthYear++;
    //   }
    //   let currentMonthObj = {
    //     name: this.months[currentMonth],
    //     month: currentMonth + 1, // Adding 1 to make it human-readable (1-12)
    //     year: currentYear
    //   };
    //   let nextMonthObj = {
    //     name: this.months[nextMonthIndex],
    //     month: nextMonthIndex + 1, // Adding 1 to make it human-readable (1-12)
    //     year: nextMonthYear
    //   };
    //   this.remainingMonths = displayNextMonth ? [nextMonthObj] : [currentMonthObj];
    //   // If current date is on or before the 5th, allow selection of current month
    //   if (currentDay <= 5) {
    //     // selectedMonths.push(currentMonthObj);
    //     this.remainingMonths = [currentMonthObj, nextMonthObj];
    //   }
    // }
    AddTargetPage.prototype.updateMonths = function () {
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth(); // Month index (0-11)
        var currentYear = currentDate.getFullYear();
        var currentDay = currentDate.getDate();
        // Check if the current day is after the 5th
        var displayNextMonth = currentDay > 5;
        // Calculate next month
        var nextMonthIndex = (currentMonth + 1) % 12;
        var nextMonthYear = currentYear;
        if (nextMonthIndex === 0) {
            // If next month is January, increment the year
            nextMonthYear++;
        }
        // Format the month with leading zeros
        var formatMonth = function (month) { return (month < 10 ? '0' : '') + month; };
        var currentMonthObj = {
            name: this.months[currentMonth],
            month: formatMonth(currentMonth + 1),
            year: currentYear
        };
        var nextMonthObj = {
            name: this.months[nextMonthIndex],
            month: formatMonth(nextMonthIndex + 1),
            year: nextMonthYear
        };
        this.remainingMonths = displayNextMonth ? [nextMonthObj] : [currentMonthObj];
        // If current date is on or before the 5th, allow selection of current month
        if (currentDay <= 5) {
            // selectedMonths.push(currentMonthObj);
            this.remainingMonths = [currentMonthObj, nextMonthObj];
        }
    };
    AddTargetPage.prototype.setYear = function (MonthYearData) {
        console.log(MonthYearData);
        this.target_data.year = MonthYearData.year;
    };
    AddTargetPage.prototype.getNetworkList = function () {
        var _this = this;
        this.service.addData({}, 'AppEnquiry/networkList').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.networList = result['result'];
            }
            else {
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismiss();
        });
    };
    AddTargetPage.prototype.get_customerList = function (value) {
        var _this = this;
        var cpType = '';
        var header = {};
        if (value == 'Prospect CP') {
            cpType = 'Inactive';
            header = { 'dr_type': '1', 'user_id': this.TeamID, 'active_tab': cpType };
        }
        else if (value == 'Channel Partner') {
            cpType = 'Active';
            header = { 'dr_type': '1', 'user_id': this.TeamID, 'active_tab': cpType };
        }
        else if (value == 'Sub Dealer') {
            cpType = 'Active';
            header = { 'dr_type': '3', 'user_id': this.TeamID, 'active_tab': cpType };
        }
        else if (value == 'Lead') {
            header = { 'dr_type': '15', 'user_id': this.TeamID };
        }
        else {
            var drType = '';
            var Index = this.networList.findIndex(function (row) { return row.module_name == value; });
            if (Index != -1) {
                drType = this.networList[Index]['type'];
            }
            header = { 'dr_type': drType, 'user_id': this.TeamID };
        }
        this.service.addData(header, 'AppTravelPlan/getRetailerList').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.partyList = result['result'];
            }
            else {
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.dismissLoading();
            _this.service.errorToast('Something went wrong');
        });
    };
    AddTargetPage.prototype.getAssignedDistributor = function () {
        var _this = this;
        this.service.addData({ 'dr_type': '1', 'user_id': this.TeamID, 'active_tab': 'Active' }, 'AppTravelPlan/getRetailerList').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.assignDistributorList = result['result'];
            }
            else {
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (err) {
            _this.service.errorToast('Something went wrong');
        });
    };
    AddTargetPage.prototype.getDatesBetween = function (startDate, endDate) {
        var dates = [];
        var currentDate = new Date(startDate);
        var currentEndDate = new Date(endDate);
        while (currentDate <= currentEndDate) {
            var newDate = { date: __WEBPACK_IMPORTED_MODULE_3_moment___default()(new Date(currentDate)).format('YYYY-MM-DD') };
            dates.push(newDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };
    AddTargetPage.prototype.addTargetPlan = function () {
        var _this = this;
        if (this.targetItem.length > 0) {
            var existIndex = void 0;
            existIndex = this.targetItem.findIndex(function (row) { return row.dr_id == _this.selectedCustomer.id; });
            if (existIndex != -1) {
                this.targetItem[existIndex]['target_ton'] = parseInt(this.target_data.target_ton) + parseInt(this.targetItem[existIndex]['target_ton']);
                this.blankValue();
            }
            else {
                this.targetItem.push({
                    'month': this.target_data.month.name,
                    'year': this.target_data.year,
                    'dr_id': this.selectedCustomer.id,
                    'dr_name': this.selectedCustomer.display_name,
                    'supplier_id': this.salesTargetType != 'Primary' ? this.selectedSupplier.id : '',
                    'supplier_name': this.salesTargetType != 'Primary' ? this.selectedSupplier.display_name : '',
                    'target_ton': this.target_data.target_ton
                });
                this.blankValue();
            }
        }
        else {
            this.targetItem.push({
                'month': this.target_data.month.name,
                'year': this.target_data.year,
                'dr_id': this.selectedCustomer.id,
                'dr_name': this.selectedCustomer.display_name,
                'supplier_id': this.salesTargetType != 'Primary' ? this.selectedSupplier.id : '',
                'supplier_name': this.salesTargetType != 'Primary' ? this.selectedSupplier.display_name : '',
                'target_ton': this.target_data.target_ton
            });
            this.blankValue();
        }
    };
    AddTargetPage.prototype.submitTarget = function () {
        var _this = this;
        this.buttonDisable = true;
        var header = '';
        var payload = {};
        if (this.salesTargetType == 'Visit') {
            header = 'AppTarget/addVisitTarget';
            payload = { 'data': this.target_data, 'month': this.target_data.month.month, 'year': this.target_data.year };
        }
        else if (this.salesTargetType == 'Primary') {
            header = 'AppTarget/addTarget';
            payload = { 'data': this.targetItem, 'month': this.target_data.month.month, 'year': this.target_data.year, 'dr_type': this.target_data.dr_type };
        }
        else if (this.salesTargetType == 'Secondary') {
            header = 'AppTarget/addSecondaryTarget';
            payload = { 'data': this.targetItem, 'target_type': "order", 'month': this.target_data.month.month, 'year': this.target_data.year, 'dr_type': this.target_data.dr_type };
        }
        else {
            header = 'AppTarget/addSecondaryTarget';
            payload = { 'data': this.targetItem, 'target_type': "stock", 'month': this.target_data.month.month, 'year': this.target_data.year, 'dr_type': this.target_data.dr_type };
        }
        this.service.addData(payload, header).then(function (result) {
            if (result['statusCode'] == 200) {
                _this.buttonDisable = false;
                _this.service.dismissLoading();
                _this.service.successToast(result['statusMsg']);
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_7__target_target__["a" /* TargetPage */]);
            }
            else {
                _this.buttonDisable = false;
                _this.service.dismissLoading();
                _this.service.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.service.Error_msg(error);
            _this.service.dismissLoading();
        });
    };
    AddTargetPage.prototype.checkAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: 'You want to save',
            cssClass: 'alert-modal',
            buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        _this.service.presentToast('Your Data is Safe');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.submitTarget();
                    }
                }]
        });
        alert.present();
    };
    AddTargetPage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: msg,
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    AddTargetPage.prototype.removeWholeCustomerList = function (i) {
        this.dateWiseCustomersList.splice(i, 1);
        console.log(this.dateWiseCustomersList);
    };
    AddTargetPage.prototype.DeleteItem = function (i, j) {
        this.targetItem.splice(i, 1);
    };
    AddTargetPage.prototype.blankValue = function () {
        this.target_data.target_ton = '';
        this.selectedCustomer = '';
        this.selectedSupplier = '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('district_Selectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], AddTargetPage.prototype, "district_Selectable", void 0);
    AddTargetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-target',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\add-target\add-target.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add {{salesTargetType}} Target / Projection</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content *ngIf="salesTargetType == \'Primary\'">\n\n  <div class="form">\n\n    <ion-list no-lines class="padding10 mb10 pt0">\n\n      <ion-item>\n\n        <ion-label floating><span>Select Month <strong class="reject">*</strong></span></ion-label>\n\n        <ion-select [(ngModel)]="target_data.month" interface="action-sheet" [disabled]="targetItem.length"\n\n          (ngModelChange)="setYear(target_data.month)">\n\n          <ion-option *ngFor="let row of remainingMonths" [value]="row">{{ row.name }} - {{row.year}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label floating>Select Type <strong class="reject">*</strong></ion-label>\n\n        <ion-select name="dr_type" #dr_type="ngModel" [(ngModel)]="target_data.dr_type" interface="action-sheet"\n\n          (ngModelChange)="get_customerList(target_data.dr_type)" required>\n\n          <ng-container *ngFor="let item of networList">\n\n            <ion-option *ngIf="item.type == 1 || item.type == 7"\n\n              [value]="item.module_name">{{item.module_name}}</ion-option>\n\n          </ng-container>\n\n          <!-- <ion-option value="Prospect CP">Prospect CP</ion-option> -->\n\n        </ion-select>\n\n\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="target_data.dr_type">\n\n        <ion-label floating>Select {{target_data.dr_type}} <strong class="reject">*</strong></ion-label>\n\n        <ionic-selectable item-content [(ngModel)]="selectedCustomer" [items]="partyList" itemValueField="id"\n\n          itemTextField="display_name" [canSearch]="true">\n\n        </ionic-selectable>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox" *ngIf="selectedCustomer">\n\n        <ion-label floating>Projection (qty)<strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="target_ton" [(ngModel)]="target_data.target_ton" #size="ngModel"\n\n          (ngModelChange)="(target_data.target_ton == \'\' || target_data.target_ton == null || target_data.target_ton<1 )?(addToListButton = true):(addToListButton = false);"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <div class="pl6 pr6">\n\n      <button ion-button round full color="primary" [disabled]="addToListButton" (click)="addTargetPlan()">\n\n        Add To List\n\n      </button>\n\n    </div>\n\n\n\n  </div>\n\n  <div class="list-box mt10 m16" *ngFor="let row of targetItem;let i=index">\n\n    <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n      <div class="content-info">\n\n        <div class="right-info">\n\n          <p style="color:rgb(4, 81, 169)">{{row.dr_name}}</p>\n\n        </div>\n\n      </div>\n\n      <div class="tag-info">\n\n        <button><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></button>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="three_boxes">\n\n      <div class="lower">\n\n        <p class="font10">Month - Year</p>\n\n        <p class="font10">{{row.month}} - {{row.year}}</p>\n\n      </div>\n\n      <div class="lower ml5">\n\n        <p class="font10">Projection (qty)</p>\n\n        <p class="font10">{{row.target_ton}}</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="pl16 pr16 mb20" *ngIf="targetItem.length">\n\n    <button ion-button round full color="success" [disabled]="!targetItem?.length|| buttonDisable"\n\n      (click)="checkAlert()">\n\n      Save\n\n    </button>\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n<ion-content *ngIf="salesTargetType == \'Visit\'">\n\n  <div class="form">\n\n    <ion-list no-lines class="padding10 mb10 pt0">\n\n\n\n\n\n      <ion-item>\n\n        <ion-label floating><span>Select Month <strong class="reject">*</strong></span></ion-label>\n\n        <ion-select [(ngModel)]="target_data.month" [disabled]="targetItem.length" interface="action-sheet"\n\n          (ngModelChange)="setYear(target_data.month)">\n\n          <ion-option *ngFor="let row of remainingMonths" [value]="row">{{ row.name }} - {{row.year}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox">\n\n        <ion-label floating>Lead Count <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="lead" [(ngModel)]="target_data.lead" #size="ngModel"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox">\n\n        <ion-label floating>Dealer <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="dealer" [(ngModel)]="target_data.dealer" #size="ngModel"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox">\n\n        <ion-label floating>Architect <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="architect" [(ngModel)]="target_data.architect" #size="ngModel"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox">\n\n        <ion-label floating>Interior Designer <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="interior_designer" [(ngModel)]="target_data.interior_designer" #size="ngModel"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox">\n\n        <ion-label floating>Contractor <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="contractor" [(ngModel)]="target_data.contractor" #size="ngModel"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox">\n\n        <ion-label floating>Carpenter <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="carpenter" [(ngModel)]="target_data.carpenter" #size="ngModel"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n\n\n  </div>\n\n  <div class="pl16 pr16 mb20">\n\n    <button ion-button round full color="success"\n\n      [disabled]="!target_data.contractor || !target_data.interior_designer  || !target_data.carpenter||!target_data.architect|| !target_data.dealer|| !target_data.lead || buttonDisable"\n\n      (click)="checkAlert()">\n\n      Save\n\n    </button>\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n<ion-content *ngIf="salesTargetType == \'Secondary\'">\n\n  <div class="form">\n\n    <ion-list no-lines class="padding10 mb10 pt0">\n\n\n\n      <ion-item>\n\n        <ion-label floating><span>Select Month <strong class="reject">*</strong></span></ion-label>\n\n        <ion-select [(ngModel)]="target_data.month" [disabled]="targetItem.length" interface="action-sheet"\n\n          (ngModelChange)="setYear(target_data.month)">\n\n          <ion-option *ngFor="let row of remainingMonths" [value]="row">{{ row.name }} - {{row.year}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item>\n\n        <ion-label floating>Select Type <strong class="red-text">*</strong></ion-label>\n\n        <ion-select name="dr_type" [(ngModel)]="target_data.dr_type" #dr_type="ngModel" interface="action-sheet"\n\n          (ngModelChange)="get_customerList(target_data.dr_type)" required>\n\n          <ng-container *ngFor="let item of networList">\n\n            <ion-option *ngIf="item.type == 13 || item.type == 8 || item.type == 14 || item.type == 16 "\n\n              [value]="item.module_name">{{item.module_name}}</ion-option>\n\n             \n\n          </ng-container>\n\n          <ion-option \n\n          [value]="Lead">Lead</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="target_data.dr_type">\n\n        <ion-label floating>Select {{target_data.dr_type}} <strong class="reject">*</strong></ion-label>\n\n        <ionic-selectable item-content [(ngModel)]="selectedCustomer" [items]="partyList" itemValueField="id"\n\n          itemTextField="display_name" [canSearch]="true">\n\n        </ionic-selectable>\n\n      </ion-item>\n\n      <ion-item *ngIf="selectedCustomer">\n\n        <ion-label floating>Select Supplier <strong class="reject">*</strong></ion-label>\n\n        <ionic-selectable item-content [(ngModel)]="selectedSupplier" [items]="assignDistributorList"\n\n          itemValueField="id" itemTextField="display_name" [canSearch]="true">\n\n        </ionic-selectable>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox" *ngIf="selectedCustomer">\n\n        <ion-label floating>Number of Sheets <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="target_ton" [(ngModel)]="target_data.target_ton" #size="ngModel"\n\n          (ngModelChange)="(target_data.target_ton == \'\' || target_data.target_ton == null || target_data.target_ton<1 )?(addToListButton = true):(addToListButton = false);"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <div class="pl6 pr6">\n\n      <button ion-button round full color="primary" [disabled]="addToListButton" (click)="addTargetPlan()">\n\n        Add To List\n\n      </button>\n\n    </div>\n\n\n\n  </div>\n\n  <div class="list-box mt10 m16" *ngFor="let row of targetItem;let i=index">\n\n    <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n      <div class="content-info">\n\n        <div class="right-info">\n\n          <p style="color:rgb(4, 81, 169)">{{row.dr_name}}</p>\n\n        </div>\n\n      </div>\n\n      <div class="tag-info">\n\n        <button><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></button>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="three_boxes">\n\n      <div class="lower">\n\n        <p class="font10">Month - Year</p>\n\n        <p class="font10">{{row.month}} - {{row.year}}</p>\n\n      </div>\n\n      <div class="lower ml5">\n\n        <p class="font10">Number of Sheets</p>\n\n        <p class="font10">{{row.target_ton}}</p>\n\n      </div>\n\n    </div>\n\n    <div class="three_boxes">\n\n      <div class="lower">\n\n        <p class="font10">Supplied By</p>\n\n        <p class="font10">{{row.supplier_name}}</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="pl16 pr16 mb20" *ngIf="targetItem.length">\n\n    <button ion-button round full color="success" [disabled]="!targetItem?.length || buttonDisable"\n\n      (click)="checkAlert()">\n\n      Save\n\n    </button>\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n<ion-content *ngIf="salesTargetType == \'Stock Transfer\'">\n\n  <div class="form">\n\n    <ion-list no-lines class="padding10 mb10 pt0">\n\n\n\n      <ion-item>\n\n        <ion-label floating><span>Select Month <strong class="reject">*</strong></span></ion-label>\n\n        <ion-select interface="action-sheet" [(ngModel)]="target_data.month" [disabled]="targetItem.length"\n\n          (ngModelChange)="setYear(target_data.month)">\n\n          <ion-option *ngFor="let row of remainingMonths" [value]="row">{{ row.name }} - {{row.year}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label floating>Select {{target_data.dr_type}} <strong class="reject">*</strong></ion-label>\n\n        <ionic-selectable item-content [(ngModel)]="selectedCustomer" [items]="partyList" itemValueField="id"\n\n          itemTextField="display_name" [canSearch]="true">\n\n        </ionic-selectable>\n\n      </ion-item>\n\n      <ion-item *ngIf="selectedCustomer">\n\n        <ion-label floating>Select Supplier <strong class="reject">*</strong></ion-label>\n\n        <ionic-selectable item-content [(ngModel)]="selectedSupplier" [items]="assignDistributorList"\n\n          itemValueField="id" itemTextField="display_name" [canSearch]="true">\n\n        </ionic-selectable>\n\n      </ion-item>\n\n      <ion-item class="cs-normal-select retailerSelectionBox" *ngIf="selectedCustomer">\n\n        <ion-label floating>Number of Sheets <strong class="red-text">*</strong></ion-label>\n\n        <ion-input type="number" name="target_ton" [(ngModel)]="target_data.target_ton" #size="ngModel"\n\n          (ngModelChange)="(target_data.target_ton == \'\' || target_data.target_ton == null || target_data.target_ton<1 )?(addToListButton = true):(addToListButton = false);"\n\n          onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <div class="pl6 pr6">\n\n      <button ion-button round full color="primary" [disabled]="addToListButton" (click)="addTargetPlan()">\n\n        Add To List\n\n      </button>\n\n    </div>\n\n\n\n  </div>\n\n  <div class="list-box mt10 m16" *ngFor="let row of targetItem;let i=index">\n\n    <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n      <div class="content-info">\n\n        <div class="right-info">\n\n          <p style="color:rgb(4, 81, 169)">{{row.dr_name}}</p>\n\n        </div>\n\n      </div>\n\n      <div class="tag-info">\n\n        <button><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></button>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="three_boxes">\n\n      <div class="lower">\n\n        <p class="font10">Month - Year</p>\n\n        <p class="font10">{{row.month}} - {{row.year}}</p>\n\n      </div>\n\n      <div class="lower ml5">\n\n        <p class="font10">Number of Sheets</p>\n\n        <p class="font10">{{row.target_ton}}</p>\n\n      </div>\n\n    </div>\n\n    <div class="three_boxes">\n\n      <div class="lower">\n\n        <p class="font10">Supplied By</p>\n\n        <p class="font10">{{row.supplier_name}}</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="pl16 pr16 mb20" *ngIf="targetItem.length">\n\n    <button ion-button round full color="success" [disabled]="!targetItem?.length || buttonDisable"\n\n      (click)="checkAlert()">\n\n      Save\n\n    </button>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\add-target\add-target.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_6__providers_dbservice_dbservice__["a" /* DbserviceProvider */]])
    ], AddTargetPage);
    return AddTargetPage;
}());

//# sourceMappingURL=add-target.js.map

/***/ })

});
//# sourceMappingURL=40.js.map