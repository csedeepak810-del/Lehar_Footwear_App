webpackJsonp([24],{

/***/ 1387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpenseAddNewPageModule", function() { return ExpenseAddNewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__expense_add_new__ = __webpack_require__(1447);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ExpenseAddNewPageModule = /** @class */ (function () {
    function ExpenseAddNewPageModule() {
    }
    ExpenseAddNewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__expense_add_new__["a" /* ExpenseAddNewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__expense_add_new__["a" /* ExpenseAddNewPage */]),
            ],
        })
    ], ExpenseAddNewPageModule);
    return ExpenseAddNewPageModule;
}());

//# sourceMappingURL=expense-add-new.module.js.map

/***/ }),

/***/ 1447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseAddNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__expense_list_expense_list__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_attendenceservice_attendenceservice__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_image_picker__ = __webpack_require__(1448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_open_native_settings__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ExpenseAddNewPage = /** @class */ (function () {
    function ExpenseAddNewPage(navCtrl, navParams, attendence_serv, imagePicker, serve, events, storage, openNativeSettings, diagnostic, camera, toastCtrl, actionSheetController, alertCtrl, Device, constant) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.attendence_serv = attendence_serv;
        this.imagePicker = imagePicker;
        this.serve = serve;
        this.events = events;
        this.storage = storage;
        this.openNativeSettings = openNativeSettings;
        this.diagnostic = diagnostic;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.actionSheetController = actionSheetController;
        this.alertCtrl = alertCtrl;
        this.Device = Device;
        this.constant = constant;
        this.item = [];
        this.expense = {};
        this.formData = new FormData();
        this.travelForm = {};
        this.travelInfo = [];
        this.hotelForm = {};
        this.hotelInfo = [];
        this.isShowErrorBox = false;
        this.expenseAddError = false;
        this.errorMsg = '';
        this.foodForm = {};
        this.foodInfo = [];
        this.localConvForm = {};
        this.isDisabled = false;
        this.localConvForm1 = {};
        this.localConvForm1Data = {};
        this.Submit_button = false;
        this.spinnerLoader = false;
        this.localConvInfo = [];
        this.miscExpForm = {};
        this.miscExpInfo = [];
        this.allowanceData = {};
        this.allowancecar = [];
        this.allowancebike = [];
        this.show_amount_input = true;
        this.roleId = '';
        this.expand_local = false;
        this.expand_travel = false;
        this.expand_food = false;
        this.expand_hotel = false;
        this.expand_misc = false;
        this.today_date = new Date().toISOString().slice(0, 10);
        this.hotelamount = [];
        this.allowancehotelamount = [];
        this.foodamount = [];
        this.allowancefoodamount = [];
        this.localamount = [];
        this.localamount1 = [];
        this.allowanceta = [];
        this.km = [];
        this.yesterday_date = '';
        this.allowanceLocalDaAmt = '';
        this.AllLocalfoodamt = '';
        this.local = [];
        this.flag_upload = true;
        this.flag_play = true;
        this.image = '';
        this.image_data = [];
        // this.expense.expType = 'Outstation Travel';
        var today = new Date();
        today.setDate(today.getDate()); // Subtract 1 day
        this.yesterday_date = today.toISOString().slice(0, 10);
        // console.log(yesterday_date,'yesterday_date');
        this.expense.totalAmt = 0;
        this.storage.get('role_id').then(function (roleId) {
            if (typeof (roleId) !== 'undefined' && roleId) {
                _this.roleId = roleId;
            }
        });
        this.storage.get('displayName').then(function (displayName) {
            if (typeof (displayName) !== 'undefined' && displayName) {
                _this.expense.userName = displayName;
            }
        });
        // setTimeout(() => {
        //   this.getallowanceData();
        // }, 500);
        if (this.navParams.get('data')) {
            this.expense = this.navParams.get('data');
            this.travelForm.expense_type = this.expense.expenseType;
            if (this.expense.localConv.length) {
                this.item = this.expense.localConv;
                this.expense.localConv = [];
            }
            if (this.expense.outstation.length) {
                this.item = this.expense.outstation;
                this.expense.outstation = [];
            }
            if (this.expense.other.length) {
                this.item = this.expense.other;
                this.expense.other = [];
            }
            for (var index = 0; index < this.item.length; index++) {
                this.item[index].total_amt = this.item[index].amount;
                this.item[index].expense_type = this.item[index].travel_type;
            }
            this.image_data = this.expense.expBills;
            this.isDisabled = true;
            // this.expense.expType = this.expense.expenseType;
            if (this.expense.expType == 'Outstation Travel') {
                this.image_data = [];
            }
        }
    }
    ExpenseAddNewPage.prototype.Calculateamount = function (amount) {
        console.log(amount);
        if (this.travelForm.expense_type == 'Local') {
            if (this.travelForm.travel_sub_type == 'Four Wheeler') {
                this.travelForm.total_amt = parseFloat(this.allowanceData.localfourwheeler) * parseFloat(this.travelForm.distance);
            }
            else if (this.travelForm.travel_sub_type == 'Two Wheeler') {
                this.travelForm.total_amt = parseFloat(this.allowanceData.localtwowheeler) * parseFloat(this.travelForm.distance);
            }
        }
        if (this.travelForm.expense_type == 'Outstation') {
            if (this.travelForm.travel_sub_type_outs == 'Four Wheeler') {
                this.travelForm.total_amt = parseFloat(this.allowanceData.outstationfourwheeler) * parseFloat(this.travelForm.distance);
            }
            else if (this.travelForm.travel_sub_type_outs == 'Two Wheeler') {
                this.travelForm.total_amt = parseFloat(this.allowanceData.outstationtwowheeler) * parseFloat(this.travelForm.distance);
            }
        }
    };
    ExpenseAddNewPage.prototype.getallowanceData = function () {
        var _this = this;
        // this.expense.expType = 'Outstation Travel';
        this.serve.presentLoading();
        this.serve.addData({ 'claimDate': this.expense.claimDate, 'roleId': this.roleId }, 'AppExpense/travelMode').then(function (result) {
            if (result['statusCode'] == 200) {
                _this.serve.dismissLoading();
                _this.allowanceData = result['expense'];
                //condition add in case of checkin is less than six
                if (_this.allowanceData.checkinCount >= 7) {
                    _this.isShowErrorBox = false;
                }
                else {
                    _this.isShowErrorBox = true;
                    if (_this.expense.claimDate) {
                        var date = new Date(_this.expense.claimDate);
                        _this.expense.claimDate = __WEBPACK_IMPORTED_MODULE_2_moment_moment__(date).format('MMM DD, YYYY'); // If using Moment.js
                    }
                    _this.errorMsg = 'You Are Not Eligible For DA Allowance Because Your Checkin Count Is Less Than Seven';
                }
                //condition add in case of total km after start attendence is less than 60km
                // if(this.allowanceData.kmPerDate>=60){
                //   this.isShowErrorBoxinKm = false;
                // }else{
                //     this.isShowErrorBoxinKm = true;
                //     if (this.expense.claimDate) {
                //       let date = new Date(this.expense.claimDate);
                //       this.expense.claimDate = moment(date).format('MMM DD, YYYY');  // If using Moment.js
                //     }
                // }
                //condition add in case of user not start attendence
                if (_this.allowanceData.attendanceFlag == 0) {
                    _this.expenseAddError = true;
                }
                else {
                    _this.expenseAddError = false;
                }
                console.log(_this.allowanceData, 'this.allowanceData');
                _this.localConvForm.modeOfTravel = 'Public Vehicle';
            }
            else {
                _this.serve.dismissLoading();
                _this.serve.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.serve.Error_msg(error);
            _this.serve.dismissLoading();
        });
    };
    ExpenseAddNewPage.prototype.blankValue = function () {
        this.travelForm.travel_sub_type_outs = '';
        this.travelForm.travel_sub_type = '';
        this.travelForm.distance = '';
        this.travelForm.total_amt = '';
        this.travelForm.remark = '';
        this.travelForm.bill_of_private_vehicle_out = '';
        this.travelForm.bill_privatevehile = '';
    };
    ExpenseAddNewPage.prototype.blankClassValue = function () {
        this.travelForm.distance = '';
        this.travelForm.travelAmount = '';
    };
    ExpenseAddNewPage.prototype.blankValueLocalConveyance = function () {
        this.localConvForm1.travelClass = '';
        this.localConvForm1.date = '';
        this.localConvForm1.distance = '';
        this.localConvForm1.amount = '';
        this.localConvForm.travelClass = '';
        this.localConvForm.date = '';
        this.localConvForm.distance = '';
        this.localConvForm.amount = '';
    };
    ExpenseAddNewPage.prototype.blankClassValueLocalConveyance = function () {
        this.localConvForm1.distance = '';
        this.localConvForm1.amount = '';
        // this.localConvForm.distance = '';
        this.localConvForm.amount = '';
    };
    ExpenseAddNewPage.prototype.calculateTravelAmount3 = function () {
        if (this.localConvForm1.travelClass == 'Car') {
            this.show_amount_input = true;
            this.allowancecar = parseInt(this.allowanceData.car);
            this.localamount = parseInt(this.localConvForm1.amount);
            this.localConvForm1.caramount = this.allowanceData.car;
            this.localConvForm1.bikeamount = this.allowanceData.bike;
            this.localConvForm1.amount = parseInt(this.localConvForm1.distance) * parseFloat(this.allowanceData.car);
        }
        else if (this.localConvForm1.travelClass == 'Bike') {
            this.show_amount_input = true;
            this.allowancebike = parseInt(this.allowanceData.bike);
            this.localConvForm1.amount = parseInt(this.localConvForm1.distance) * parseFloat(this.allowanceData.bike);
            this.localamount1 = parseInt(this.localConvForm1.amount);
        }
        else if (this.localConvForm.travelClass == 'Car') {
            this.show_amount_input = true;
            this.allowancecar = parseInt(this.allowanceData.car);
            this.localConvForm.amount = parseInt(this.localConvForm.distance) * parseFloat(this.allowanceData.car);
        }
        else if (this.localConvForm.travelClass == 'Bike') {
            this.show_amount_input = true;
            this.allowancebike = parseInt(this.allowanceData.bike);
            this.localConvForm.amount = parseInt(this.localConvForm.distance) * parseFloat(this.allowanceData.bike);
        }
        else if (this.travelForm.travelMode == 'Car' && this.travelForm.arrivalDistance) {
            this.show_amount_input = true;
            this.allowancecar = parseInt(this.allowanceData.car);
            this.localConvForm1.caramount = this.allowanceData.car;
            this.travelForm.arrivalAmount = parseInt(this.travelForm.arrivalDistance) * parseFloat(this.allowanceData.car);
        }
        else if (this.travelForm.travelMode == 'Car' && this.travelForm.depatureDistance) {
            this.show_amount_input = true;
            this.allowancecar = parseInt(this.allowanceData.car);
            this.localConvForm1.caramount = this.allowanceData.car;
            this.travelForm.depatureAmount = parseInt(this.travelForm.depatureDistance) * parseFloat(this.allowanceData.car);
        }
        else {
            this.show_amount_input = false;
            this.allowanceta = parseInt(this.allowanceData.ta);
            this.local = parseInt(this.localConvForm1.amount);
        }
    };
    ExpenseAddNewPage.prototype.CheckAllowance = function () {
        console.log("hyy");
        if (this.travelForm.travelClass == 'Logding' && this.travelForm.travelAmount > this.allowanceData.LoadgingAllowance) {
            this.serve.errorToast(this.travelForm.travelClass + " amoutnt can't be greater than " + this.allowanceData.LoadgingAllowance);
            this.travelForm.travelAmount = '';
            return;
        }
        if (this.travelForm.travelClass == 'Boarding' && this.travelForm.travelAmount > this.allowanceData.BoardingAllowance) {
            this.serve.errorToast(this.travelForm.travelClass + " amoutnt can't be greater than " + this.allowanceData.BoardingAllowance);
            this.travelForm.travelAmount = '';
            return;
        }
    };
    ExpenseAddNewPage.prototype.calculateTravelAmount2 = function () {
        if (this.travelForm.travelClass == 'Car') {
            this.show_amount_input = true;
            this.allowancecar = parseInt(this.allowanceData.car);
            this.localamount = parseInt(this.travelForm.amount);
            this.travelForm.caramount = this.allowanceData.car;
            this.travelForm.bikeamount = this.allowanceData.bike;
            this.travelForm.travelAmount = parseInt(this.travelForm.distance) * parseFloat(this.allowanceData.car);
        }
        else if (this.travelForm.travelClass == 'Bike') {
            this.show_amount_input = true;
            this.allowancebike = parseInt(this.allowanceData.bike);
            this.travelForm.travelAmount = parseInt(this.travelForm.distance) * parseFloat(this.allowanceData.bike);
            this.localamount1 = parseInt(this.travelForm.travelAmount);
        }
        else {
            this.show_amount_input = false;
            this.allowanceta = parseInt(this.allowanceData.ta);
            this.local = parseInt(this.travelForm.travelAmount);
        }
    };
    ExpenseAddNewPage.prototype.addToList = function () {
        var _this = this;
        if (!this.travelForm.total_amt || !this.travelForm.remark) {
            this.serve.errorToast('Please Fill All Required Fields!');
            return;
        }
        this.isDisabled = true;
        this.AllLocalfoodamt = parseInt(this.travelForm.total_amt);
        this.allowanceLocalDaAmt = parseInt(this.allowanceData.localDa);
        //In case of Local expense showing this error
        if (this.AllLocalfoodamt > this.allowanceLocalDaAmt && this.travelForm.expense_type == 'Local' && this.travelForm.travel_sub_type == 'DA') {
            this.serve.errorToast("Entered amount can't greater than" + ' ' + 'Rs.' + this.allowanceLocalDaAmt);
            return;
        }
        //In case of OutStation expense showing this error
        // if (this.AllLocalfoodamt > this.allowanceLocalDaAmt && this.travelForm.expense_type == 'Local' && this.travelForm.travel_sub_type_outs=='DA') {
        //   this.serve.errorToast("Entered amount can't greater than" + ' ' + 'Rs.' + this.allowanceLocalDaAmt)
        //   return;
        // }
        //  Filter image_data based on the current travel class
        var currentImageData = this.image_data.filter(function (image) { return image.expense_type === _this.travelForm.expense_type; });
        console.log(currentImageData);
        if (this.item.length > 0) {
            console.log(this.travelForm.travel_sub_type);
            console.log(this.travelForm.travel_sub_type_outs);
            // let existIndex = this.item.findIndex(row =>{console.log( row.travel_sub_type == this.travelForm.travel_sub_type,row.travel_sub_type_outs == this.travelForm.travel_sub_type_outs) ;return row.travel_sub_type == this.travelForm.travel_sub_type ||row.travel_sub_type_outs == this.travelForm.travel_sub_type_outs});
            var existIndex = this.item.findIndex(function (row) { return (row.travel_sub_type == _this.travelForm.travel_sub_type && _this.travelForm.travel_sub_type != '' && _this.travelForm.travel_sub_type != undefined) || (row.travel_sub_type_out == _this.travelForm.travel_sub_type_outs && _this.travelForm.travel_sub_type_outs != '' && _this.travelForm.travel_sub_type_outs != undefined); });
            console.log(existIndex);
            if (existIndex != -1) {
                this.serve.errorToast("Travel Sub Type is already added");
                return;
            }
            else {
                this.item.push({
                    'expense_type': this.travelForm.expense_type,
                    'travel_sub_type': this.travelForm.travel_sub_type,
                    'travel_sub_type_out': this.travelForm.travel_sub_type_outs,
                    'total_amt': this.travelForm.total_amt,
                    'bill_privatevehile': this.travelForm.bill_privatevehile,
                    'distance': this.travelForm.distance,
                    'totaltrainmetro_amt': this.travelForm.totaltrainmetro_amt,
                    'total_food_amt': this.travelForm.total_food_amt,
                    'total_amt_hotelbill': this.travelForm.total_amt_hotelbill,
                    'bill_of_private_vehicle_out': this.travelForm.bill_of_private_vehicle_out,
                    'remark': this.travelForm.remark,
                    'imageData': currentImageData
                });
                console.log(this.item);
                this.blankValue();
            }
        }
        else {
            this.item.push({
                'expense_type': this.travelForm.expense_type,
                'travel_sub_type': this.travelForm.travel_sub_type,
                'travel_sub_type_out': this.travelForm.travel_sub_type_outs,
                'total_amt': this.travelForm.total_amt,
                'bill_privatevehile': this.travelForm.bill_privatevehile,
                'distance': this.travelForm.distance,
                'totaltrainmetro_amt': this.travelForm.totaltrainmetro_amt,
                'total_food_amt': this.travelForm.total_food_amt,
                'total_amt_hotelbill': this.travelForm.total_amt_hotelbill,
                'bill_of_private_vehicle_out': this.travelForm.bill_of_private_vehicle_out,
                'remark': this.travelForm.remark,
                'imageData': currentImageData
            });
            console.log(this.item);
            this.blankValue();
        }
        this.expense.totalAmt = 0;
        for (var i = 0; i < this.item.length; i++) {
            this.expense.totalAmt += parseFloat(this.item[i]['total_amt']);
            console.log(this.expense.totalAmt);
        }
    };
    //   addToList() {
    //     if (!this.travelForm.travelClass) {
    //         this.serve.errorToast('Select Expense type first');
    //         return;
    //     }
    //     if ((this.travelForm.travelClass == 'Bike' || this.travelForm.travelClass == 'Car') && !this.travelForm.distance) {
    //         this.serve.errorToast('Enter distance(kM)');
    //         return;
    //     }
    //     if (!this.travelForm.travelAmount) {
    //         this.serve.errorToast('Enter amount');
    //         return;
    //     }
    //     if (parseFloat(this.travelForm.travelAmount) <= 0) {
    //         this.serve.errorToast('Enter amount cannot be 0');
    //         return;
    //     }
    //     // Check if the selected travel class requires document upload
    //     const isDocumentRequired = ['Flight', 'Train', 'Bus', 'Taxi','Auto','Loadging','Boarding','Tolltax','Miscellaneous'].includes(this.travelForm.travelClass);
    //     // Filter image_data based on the current travel class
    //     const currentImageData = this.image_data.filter(image => image.travelClass === this.travelForm.travelClass);
    //     if (isDocumentRequired && currentImageData.length === 0) {
    //         this.serve.errorToast('Upload document for ' + this.travelForm.travelClass + ' mode of traveling');
    //         return;
    //     }
    //     if (this.item.length > 0) {
    //         let existIndex = this.item.findIndex(row => row.modeOfTravel == this.travelForm.travelClass);
    //         if (existIndex != -1) {
    //             this.serve.errorToast(this.travelForm.travelClass + " mode of traveling is already added");
    //             return;
    //         } else {
    //             this.item.push({
    //                 'modeOfTravel': this.travelForm.travelClass,
    //                 'remark': this.travelForm.remark,
    //                 'amount': parseFloat(this.travelForm.travelAmount),
    //                 'distance': this.travelForm.distance ? this.travelForm.distance : '0',
    //                 'imageData': currentImageData
    //             });
    //             console.log(this.item, 'item array value');
    //             this.blankValue();
    //         }
    //     } else {
    //         this.item.push({
    //             'modeOfTravel': this.travelForm.travelClass,
    //             'remark': this.travelForm.remark,
    //             'amount': parseFloat(this.travelForm.travelAmount),
    //             'distance': this.travelForm.distance ? this.travelForm.distance : '0',
    //             'imageData': currentImageData
    //         });
    //         this.blankValue();
    //     }
    //     this.expense.totalAmt = 0;
    //     for (let i = 0; i < this.item.length; i++) {
    //         this.expense.totalAmt += parseInt(this.item[i]['amount']);
    //     }
    // }
    ExpenseAddNewPage.prototype.listdelete = function (i) {
        this.expense.totalAmt = 0;
        this.item.splice(i, 1);
        for (var i_1 = 0; i_1 < this.item.length; i_1++) {
            this.expense.totalAmt += parseFloat(this.item[i_1]['total_amt']);
        }
        if (this.travelForm.expense_type != 'Local' && this.travelForm.expense_type != 'Outstation') {
            this.isDisabled = false;
        }
    };
    ExpenseAddNewPage.prototype.fileChange = function (img) {
        this.image_data.push(img);
        this.image = '';
    };
    // remove_image(i: any) {
    //   this.image_data.splice(i, 1);
    // }
    ExpenseAddNewPage.prototype.remove_image = function (index, expensetype, id) {
        var _this = this;
        if (id) {
            this.serve.addData({ 'imageId': id }, "AppExpense/expenseImageDelete").then((function (result) {
                if (result['statusCode'] == '200') {
                    _this.image_data.splice(index, 1);
                }
                else {
                }
            }));
        }
        else {
            // Assuming this.image_data is an array of objects with 'image' and 'travelClass' properties
            this.image_data.splice(index, 1);
            // Update any other logic related to the removal of images
            // Optional: If needed, you can update the 'item' array to remove the image associated with the removed travelClass
            var itemIndex = this.item.findIndex(function (item) { return item.modeOfTravel === expensetype; });
            if (itemIndex !== -1) {
                this.item[itemIndex].imageData = this.item[itemIndex].imageData.filter(function (img) { return img.expense_type !== expensetype; });
            }
        }
    };
    ExpenseAddNewPage.prototype.showLimit = function () {
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
    ExpenseAddNewPage.prototype.submitExpense = function () {
        var _this = this;
        if (this.item < 0) {
            this.serve.presentToast('Add at least one mode of travle');
            return;
        }
        // if (this.expense.expType == 'Local Conveyance') {
        //   this.spinnerLoader = true
        //   this.Submit_button = true
        this.expense.billImage = this.image_data;
        this.expense.ExpenseType = this.travelForm.expense_type;
        this.expense.expenseType = this.travelForm.expense_type;
        //   this.expense.localConv1 = this.localConvForm1;
        //   this.expense.date_from = this.localConvForm1.date;
        //   this.expense.date_to = this.localConvForm1.date_to;
        //   this.expense.localConvAmt1 = this.localConvForm1.amount;
        //   this.expense.localConvfoodAmt1 = this.localConvForm1.food_expense_amount || '0';
        //   this.expense.miscellaneousDetail = this.localConvForm1.miscellaneous_detail;
        //   this.expense.miscellaneousAmount = this.localConvForm1.miscellaneous_amount || '0';
        //   this.expense.totalAmt = Number(this.localConvForm1.amount) + Number(this.expense.localConvfoodAmt1) + Number(this.expense.miscellaneousAmount);
        // } else if (this.expense.expType == 'Outstation Travel') {
        //   this.spinnerLoader = true
        //   this.Submit_button = true
        //   this.expense.billImage = this.image_data;
        //   this.expense.travel = this.travelInfo;
        //   this.expense.hotel = this.hotelInfo;
        //   this.expense.food = this.foodInfo;
        //   this.expense.localConv = this.localConvInfo;
        //   this.expense.miscExp = this.miscExpInfo;
        // }
        this.spinnerLoader = true;
        this.Submit_button = true;
        this.expense.modeItem = this.item;
        var header;
        if (this.expense.id) {
            header = "AppExpense/editExpense";
        }
        else {
            header = "AppExpense/submitExpense";
        }
        this.serve.addData({ 'expenseData': this.expense, 'expenseId': this.expense.id }, header).then(function (result) {
            if (result['statusCode'] == 200) {
                _this.spinnerLoader = false;
                _this.Submit_button = false;
                _this.serve.successToast(result['statusMsg']);
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_6__expense_list_expense_list__["a" /* ExpenseListPage */]);
            }
            else {
                _this.spinnerLoader = false;
                _this.Submit_button = false;
                _this.serve.errorToast(result['statusMsg']);
            }
        }, function (error) {
            _this.Submit_button = false;
            _this.spinnerLoader = false;
            _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_6__expense_list_expense_list__["a" /* ExpenseListPage */]);
            _this.serve.Error_msg(error);
            // this.serve.dismiss();
        });
    };
    ExpenseAddNewPage.prototype.captureMediaMultiple = function (event) {
        var _this = this;
        console.log(event);
        var files = event.target.files;
        console.log(files);
        if (files) {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                console.log("in for");
                var reader = new FileReader();
                console.log(this.image_data);
                reader.onload = function (e) {
                    _this.image_data.push(e.target.result);
                    console.log(_this.image_data);
                };
                reader.readAsDataURL(file);
            }
        }
    };
    ExpenseAddNewPage.prototype.caputureUsingImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 6,
            quality: 70,
            outputType: 1,
            width: 600,
            height: 600
        };
        this.imagePicker.requestReadPermission().then(function (result) {
            if (result == false) {
                _this.imagePicker.requestReadPermission();
            }
            else {
                _this.imagePicker.getPictures(options).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        _this.image = 'data:image/jpeg;base64,' + results[i];
                        if (_this.image) {
                            _this.fileChange(_this.image);
                        }
                    }
                }, function (err) {
                    console.log(err);
                    _this.serve.errorToast(err);
                });
            }
        });
    };
    // captureMedia() {
    //   let actionsheet = this.actionSheetController.create({
    //     title: "Upload Image",
    //     cssClass: 'cs-actionsheet',
    //     buttons: [
    //       {
    //         cssClass: 'sheet-m1',
    //         text: 'Gallery',
    //         icon: 'image',
    //         handler: () => {
    //           this.getImage();
    //         }
    //       },
    //       {
    //         cssClass: 'cs-cancel',
    //         text: 'Cancel',
    //         role: 'cancel',
    //         icon: 'cancel',
    //         handler: () => {
    //         }
    //       }
    //     ]
    //   });
    //   actionsheet.present();
    // }
    ExpenseAddNewPage.prototype.captureMedia = function () {
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
    // takePhoto() {
    //   console.log('in take photo', this.image_data)
    //   const options: CameraOptions = {
    //     quality: 70,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     targetWidth: 500,
    //     targetHeight: 400
    //   }
    //   // this.service.dismiss();
    //   cordova.plugins.foregroundService.start('Camera', 'is running');
    //   this.camera.getPicture(options).then((imageData) => {
    //     this.image = 'data:image/jpeg;base64,' + imageData;
    //     cordova.plugins.foregroundService.stop();
    //     if (this.image) {
    //       this.fileChange(this.image);
    //     }
    //   }, (err) => {
    //   });
    // }
    ExpenseAddNewPage.prototype.takePhoto = function () {
        var _this = this;
        this.diagnostic.requestCameraAuthorization().then(function (isAvailable) {
            console.log('in take photo', _this.image_data);
            var options = {
                quality: 70,
                destinationType: _this.camera.DestinationType.DATA_URL,
                targetWidth: 500,
                targetHeight: 400
            };
            if (_this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.start('Camera', 'is running');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                _this.image = 'data:image/jpeg;base64,' + imageData;
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
                if (_this.image) {
                    // Assuming this.image_data is an array of objects with a 'travelClass' property
                    _this.fileChange({ image: _this.image, ExpenseType: _this.travelForm.expense_type });
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
    ExpenseAddNewPage.prototype.presentConfirm = function (title, msg) {
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
    ExpenseAddNewPage.prototype.openSettings = function () {
        this.openNativeSettings.open("application_details");
    };
    // getImage() {
    //   const options: CameraOptions =
    //   {
    //     quality: 70,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     mediaType: this.camera.MediaType.PICTURE,
    //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //     saveToPhotoAlbum: false,
    //     cameraDirection: 1,
    //     correctOrientation: true,
    //   }
    //   cordova.plugins.foregroundService.start('Camera', 'is running');
    //   this.camera.getPicture(options).then((imageData) => {
    //     this.image = 'data:image/jpeg;base64,' + imageData;
    //     cordova.plugins.foregroundService.stop();
    //     if (this.image) {
    //       this.fileChange(this.image);
    //     }
    //   }, (err) => {
    //   });
    // }
    ExpenseAddNewPage.prototype.getImage = function () {
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
                cordova.plugins.foregroundService.start('Camera', 'is running');
            }
            _this.camera.getPicture(options).then(function (imageData) {
                _this.image = 'data:image/jpeg;base64,' + imageData;
                if (_this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
                if (_this.image) {
                    // Assuming this.image_data is an array of objects with a 'travelClass' property
                    _this.fileChange({ image: _this.image, ExpenseType: _this.travelForm.expense_type });
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
    ExpenseAddNewPage.prototype.submitNewExpense = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Save Expense',
            message: 'Do you want to Save this Expense?',
            cssClass: 'alert-modal',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (!_this.expense.claimDate) {
                            // && this.expense.expType == 'Outstation Travel'
                            _this.serve.errorToast('Claim Date Is Required');
                            return;
                        }
                        if (_this.miscExpForm.amount == undefined || _this.miscExpForm.amount == '') {
                            _this.miscExpForm.amount = 0;
                        }
                        _this.expense.totalAmt += parseInt(_this.miscExpForm.amount);
                        _this.submitExpense();
                    }
                }
            ]
        });
        alert.present();
    };
    ExpenseAddNewPage.prototype.getYesterday = function () {
        var newDate = new Date();
        newDate.setDate(newDate.getDate() - 2);
        return newDate.toISOString().slice(0, 10);
        // let newDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
        // return newDate;
        // shortcut
        //  var yesterday = new Date(Date.now() - 864e5); // 864e5 == 86400000 == 24*60*60*1000
        //  console.log(yesterday);
        // return yesterday.toISOString().slice(0, 10)
    };
    ExpenseAddNewPage.prototype.getLastMonthDate = function () {
        var lastMonthDate = __WEBPACK_IMPORTED_MODULE_2_moment_moment__().subtract(28, 'months').format('YYYY-MM-DD');
        return lastMonthDate;
    };
    ExpenseAddNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-expense-add-new',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\expense-add-new\expense-add-new.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{expense.id ? \'Update\': \'Add\'}} Expense</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n\n\n    <form name="outstation_form" #outstation_form="ngForm"\n\n        (ngSubmit)="item?.length && outstation_form.submitted && submitNewExpense(outstation_form)">\n\n        <div class="form">\n\n            <ion-list no-lines class="padding10 pt0">\n\n                <ion-item [ngClass]="{\'error\':outstation_form.submitted && claimDate?.invalid}">\n\n                    <ion-label floating><span>Claim Date<strong>*</strong></span></ion-label>\n\n                    <ion-datetime display-format="MMM DD, YYYY" min={{getYesterday()}} max={{yesterday_date}}\n\n                        type="text" name="claimDate" #claimDate="ngModel" [(ngModel)]="expense.claimDate"\n\n                        (ngModelChange)="getallowanceData()" class="calander date" required>\n\n                    </ion-datetime>\n\n                </ion-item>\n\n                <div *ngIf="outstation_form.submitted && claimDate.invalid" class="eror">\n\n                    <p *ngIf="claimDate.errors.required">Field is Required</p>\n\n                </div>\n\n\n\n                <ng-container *ngIf="this.allowanceData.attendanceFlag==1 && expenseAddError==false">\n\n                    <ion-item [ngClass]="{\'error\':outstation_form.submitted && expense_type?.invalid}">\n\n                        <ion-label floating><span>Expense Type<strong>*</strong></span></ion-label>\n\n                        <ion-select interface="action-sheet" name="expense_type" [(ngModel)]="travelForm.expense_type"\n\n                            #expense_type="ngModel" [disabled]="isDisabled">\n\n                            <ion-option value="Local">Local</ion-option>\n\n                            <ion-option value="Outstation">Outstation</ion-option>\n\n                            <!-- <ion-option value="Carpenter Meet">Carpenter Meet</ion-option> -->\n\n\n\n                            <!-- <ion-option value="Architect Meet">Architect Meet</ion-option> -->\n\n                            <!-- <ion-option value="Retailer Meet">Retailer Meet</ion-option> -->\n\n                            <!-- <ion-option value="Seasonal Expense">Seasonal Expense</ion-option> -->\n\n                            <!-- <ion-option value="Entertainment Expenses">Entertainment Expenses</ion-option> -->\n\n                            <!-- <ion-option value="Others">Others</ion-option> -->\n\n\n\n                        </ion-select>\n\n                    </ion-item>\n\n\n\n                    <ng-container *ngIf="travelForm.expense_type==\'Local\'">\n\n                        <ion-item [ngClass]="{\'error\':outstation_form.submitted && travel_sub_type?.invalid}">\n\n                            <ion-label floating><span>Travel Sub Type<strong>*</strong></span></ion-label>\n\n                            <ion-select interface="action-sheet" name="travel_sub_type"\n\n                                [(ngModel)]="travelForm.travel_sub_type" #travel_sub_type="ngModel">\n\n                                <ion-option value="DA">DA</ion-option>\n\n                                <ion-option value="Auto">Auto</ion-option>\n\n                                <ion-option value="Toll Tax/Parking">Toll Tax/Parking</ion-option>\n\n                                <ion-option value="Two Wheeler">Two Wheeler</ion-option>\n\n                                <ion-option value="Four Wheeler">Four Wheeler</ion-option>\n\n                                <ion-option value="Train/Metro ticket">Train/Metro ticket</ion-option>\n\n                                <ion-option value="CyberCafe /PhotoCopy /Stationery">Cyber Cafe/Photo\n\n                                    Copy/Stationery</ion-option>\n\n                                <ion-option value="Postage & Courier">Postage & Courier</ion-option>\n\n                                <ion-option value="Carpenter Meet">Carpenter Meet</ion-option>\n\n                                <ion-option value="Architect Meet">Architect Meet</ion-option>\n\n                                <ion-option value="Retailer Meet">Retailer Meet</ion-option>\n\n                                <ion-option value="Others">Others</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n\n\n                        <!-- <ng-container\n\n                            *ngIf="travelForm.travel_sub_type==\'DA\' && this.allowanceData.kmPerDate>=60 && isShowErrorBoxinKm == false">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total D/A Amt</span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container> -->\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type==\'Auto\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Auto Amount<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container\n\n                        *ngIf="travelForm.travel_sub_type==\'DA\' && this.allowanceData.checkinCount>=7 && isShowErrorBox == false">\n\n                        <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                            <ion-label floating><span>Total D/A Amt<strong>*</strong></span></ion-label>\n\n                            <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                [(ngModel)]="travelForm.total_amt"\n\n                                onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                        </ion-item>\n\n                       </ng-container> \n\n\n\n                        <div class="errorBox"\n\n                            *ngIf="travelForm.travel_sub_type==\'DA\' && isShowErrorBox && this.allowanceData.checkinCount<7">\n\n                            <i class="material-icons">error</i>\n\n                            <p>\n\n                                You Are Not Eligible For DA Allowance Because this Date\n\n                                <span style="color: #e71c1c; font-weight: bold;">{{ expense.claimDate}}</span>\n\n                                your Checkin is\n\n                                <span style="color: #0000ff; font-weight: bold;">{{ allowanceData.checkinCount }}\n\n                                    Checkin</span>,\n\n                                This Checkin is Less than <span style="color: #212185; font-weight: bold;">Seven,</span> You\n\n                                Are Not Eligible For DA Allowance.\n\n                            </p>\n\n                        </div>\n\n\n\n                        <ng-container\n\n                            *ngIf="travelForm.travel_sub_type==\'Two Wheeler\'||travelForm.travel_sub_type==\'Four Wheeler\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && distance?.invalid}">\n\n                                <ion-label floating><span>Total No of Km</span></ion-label>\n\n                                <ion-input type="number" name="distance" #distance="ngModel"\n\n                                    [(ngModel)]="travelForm.distance" (keyup)="Calculateamount(travelForm.distance)"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57" readonly></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n                        <ng-container *ngIf="travelForm.travel_sub_type==\'Carpenter Meet\' || travelForm.travel_sub_type==\'Architect Meet\' || travelForm.travel_sub_type==\'Retailer Meet\' || travelForm.travel_sub_type==\'Others\' ">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n                        \n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type==\'Toll Tax/Parking\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Toll Tax/Parking Amount<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type==\'Postage & Courier\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Postage & Courier<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type==\'CyberCafe /PhotoCopy /Stationery\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt Cyber Cafe/Photo Copy/Stationery<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type==\'Private Vehicle\'">\n\n                            <!-- <ion-item [ngClass]="{\'error\':outstation_form.submitted && bill_privatevehile?.invalid}">\n\n                                <ion-label floating><span>Bill of Private Vehicle</span></ion-label>\n\n                                <ion-input type="number" name="bill_privatevehile" #bill_privatevehile="ngModel"\n\n                                    [(ngModel)]="travelForm.bill_privatevehile"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item> -->\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type==\'Train/Metro ticket\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Train/Metro ticket Amt<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n\n\n\n\n                    </ng-container>\n\n\n\n                    <ng-container *ngIf="travelForm.expense_type==\'Outstation\'">\n\n\n\n                        <ion-item [ngClass]="{\'error\':outstation_form.submitted && travel_sub_type_outs?.invalid}">\n\n                            <ion-label floating><span>Travel Sub Type<strong>*</strong></span></ion-label>\n\n                            <ion-select interface="action-sheet" name="travel_sub_type_outs"\n\n                                [(ngModel)]="travelForm.travel_sub_type_outs" #travel_sub_type_outs="ngModel">\n\n                                <!-- <ion-option value="DA">DA</ion-option> -->\n\n                                <ion-option value="Hotel">Hotel</ion-option>\n\n                                <ion-option value="Toll Tax/Parking">Toll Tax/Parking</ion-option>\n\n                                <ion-option value="CAB/Auto">CAB/Auto</ion-option>\n\n                                <ion-option value="Food">Food</ion-option>\n\n                                <ion-option value="Two Wheeler">Two Wheeler</ion-option>\n\n                                <ion-option value="Four Wheeler">Four Wheeler</ion-option>\n\n                                <ion-option value="Train/Metro Ticket">Train/Metro Ticket</ion-option>\n\n                                <!-- <ion-option value="Laundry">Laundry</ion-option> -->\n\n                                <ion-option value="CyberCafe /PhotoCopy /Stationery">Cyber Cafe/Photo\n\n                                    Copy/Stationery</ion-option>\n\n                                <ion-option value="Postage & Courier">Postage & Courier</ion-option>\n\n                                <ion-option value="Carpenter Meet">Carpenter Meet</ion-option>\n\n                                <ion-option value="Architect Meet">Architect Meet</ion-option>\n\n                                <ion-option value="Retailer Meet">Retailer Meet</ion-option>\n\n                                <ion-option value="Others">Others</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'Toll Tax/Parking\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Toll Tax/Parking Amount<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'Hotel\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt Of Hotel Bill<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'Postage & Courier\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt Postage & Courier<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n                        <ng-container\n\n                            *ngIf="travelForm.travel_sub_type_outs==\'Two Wheeler\'||travelForm.travel_sub_type_outs==\'Four Wheeler\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && distance?.invalid}">\n\n                                <ion-label floating><span>Total No of Km</span></ion-label>\n\n                                <ion-input type="number" name="distance" #distance="ngModel"\n\n                                    [(ngModel)]="travelForm.distance" (keyup)="Calculateamount(travelForm.distance)"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57" readonly></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'CyberCafe /PhotoCopy /Stationery\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt Cyber Cafe/Photo Copy/Stationery<strong>*</strong></span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'CAB/Auto\' || travelForm.travel_sub_type_outs==\'Carpenter Meet\'  || travelForm.travel_sub_type_outs==\'Architect Meet\' || travelForm.travel_sub_type_outs==\'Retailer Meet\' || travelForm.travel_sub_type_outs==\'Others\' ">\n\n                            <!-- <ion-item\n\n                                [ngClass]="{\'error\':outstation_form.submitted && bill_of_private_vehicle_out?.invalid}">\n\n                                <ion-label floating><span> Bill of CAB/Auto</span></ion-label>\n\n                                <ion-input type="number" name="bill_of_private_vehicle_out"\n\n                                    #bill_of_private_vehicle_out="ngModel"\n\n                                    [(ngModel)]="travelForm.bill_of_private_vehicle_out"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item> -->\n\n\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Amt<strong>*</strong> </span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n\n\n\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'Food\'">\n\n\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Food Amt<strong>*</strong> </span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'Train/Metro Ticket\'">\n\n\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Train/Metro Ticket Amt<strong>*</strong> </span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n                        <ng-container *ngIf="travelForm.travel_sub_type_outs==\'Laundry\'">\n\n                            <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                                <ion-label floating><span>Total Laundry Bill<strong>*</strong> </span></ion-label>\n\n                                <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                    [(ngModel)]="travelForm.total_amt"\n\n                                    onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                            </ion-item>\n\n                        </ng-container>\n\n\n\n\n\n\n\n                    </ng-container>\n\n\n\n                    <ng-container\n\n                        *ngIf="travelForm.expense_type && (travelForm.expense_type != \'Local\' && travelForm.expense_type != \'Outstation\')">\n\n                        <ion-item [ngClass]="{\'error\':outstation_form.submitted && total_amt?.invalid}">\n\n                            <ion-label floating><span>Total Amount<strong>*</strong> </span></ion-label>\n\n                            <ion-input type="number" name="total_amt" #total_amt="ngModel"\n\n                                [(ngModel)]="travelForm.total_amt"\n\n                                onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n                        </ion-item>\n\n                    </ng-container>\n\n                    <ion-item>\n\n                        <ion-label floating><span>Remark<strong>*</strong></span></ion-label>\n\n                        <ion-textarea name="remark" #remark="ngModel" [(ngModel)]="travelForm.remark" required></ion-textarea>\n\n                    </ion-item>\n\n\n\n                    <div class="upload-doc mt0 pl10 pr10" *ngIf="travelForm.expense_type">\n\n                        <ul class="no-padding">\n\n                            <li class="add_image mt0" *ngIf="image_data.length<=12"\n\n                                (click)="image_data.length <= 12?  captureMedia() : showLimit()">\n\n                                <img src="assets/imgs/upload_imae_icon.png" alt="">\n\n                                Upload {{travelForm.expense_type}} Bill <span>here</span>\n\n                            </li>\n\n                        </ul>\n\n                    </div>\n\n                    <ng-container *ngIf="travelForm.expense_type == \'Local\' || travelForm.expense_type == \'Outstation\'">\n\n                        <button type="button" ion-button block color="primary" class="mt16" (click)="addToList()"\n\n                            [disabled]="isDisabled || travelForm.travel_sub_type!=\'Food\'?image_data.length<=0:\'\' || (isShowErrorBox == false && travelForm.travel_sub_type_outs==\'DA\')">Add\n\n                            To List</button>\n\n                    </ng-container>\n\n                    <ng-container *ngIf="travelForm.expense_type != \'Local\' && travelForm.expense_type != \'Outstation\'">\n\n                        <button type="button" ion-button block color="primary" class="mt16" (click)="addToList()"\n\n                            [disabled]="isDisabled || travelForm.travel_sub_type!=\'Food\'?image_data.length<=0:\'\'">Add To\n\n                            List</button>\n\n                    </ng-container>\n\n                </ng-container>\n\n\n\n                <ng-container *ngIf="allowanceData.attendanceFlag == 0 && expenseAddError">\n\n                    <div class="errorBox1">\n\n                        <i class="material-icons error-icon">error</i>\n\n                        <p>\n\n                            <strong>You Are Not Eligible For Expense Add.</strong>  \n\n                            Because Your attendance is <span class="highlight-red">not present</span> on  \n\n                            <span class="highlight-red">{{ expense.claimDate }}</span>.  \n\n                            <strong>You cannot add expense for this date.</strong>\n\n                        </p>\n\n                    </div>\n\n                </ng-container>\n\n                \n\n\n\n\n\n\n\n            </ion-list>\n\n\n\n\n\n            <div class="pl10 pr10" *ngIf="item.length > 0">\n\n                <div class="cs-heading1 pl0">\n\n                    <p>Expense List</p>\n\n                </div>\n\n                <div class="list-box mt10" *ngFor="let row of item;let i=index">\n\n                    <div class="three_boxes">\n\n                        <div class="lower">\n\n                            <p class="font10">Type</p>\n\n                            <p class="font10">{{row.expense_type}}</p>\n\n                        </div>\n\n                        <div class="lower ml5" *ngIf="row.travel_sub_type">\n\n                            <p class="font10">Travel Sub Type</p>\n\n                            <p class="font10">{{row.travel_sub_type ? row.travel_sub_type : \'---\'}}</p>\n\n\n\n                        </div>\n\n                        <div class="lower ml5" *ngIf="row.travel_sub_type_out">\n\n                            <p class="font10">Travel Sub Type</p>\n\n                            <p class="font10">{{row.travel_sub_type_out ? row.travel_sub_type_out : \'---\'}}</p>\n\n\n\n                        </div>\n\n                        <div class="lower ml5" *ngIf="row.total_amt">\n\n                            <p class="font10">Total Amount</p>\n\n                            <p class="font10">{{row.total_amt ? (\'Rs. \' + row.total_amt) : \'--\'}}</p>\n\n                        </div>\n\n                        <div class="lower ml5" *ngIf="row.total_kmpetrol">\n\n                            <p class="font10">Total km petrol amt </p>\n\n                            <p class="font10">{{row.total_kmpetrol ? \'Rs. \' + row.total_kmpetrol: \'--\'}}</p>\n\n                        </div>\n\n                        <div class="lower ml5" *ngIf="row.total_amt_hotelbill">\n\n                            <p class="font10">Total Hotel Bill Amt </p>\n\n                            <p class="font10">{{row.total_amt_hotelbill ? \'Rs. \' + row.total_amt_hotelbill: \'--\'}}</p>\n\n                        </div>\n\n\n\n                        <div class="lower ml5" *ngIf="row.toll_parking_amt">\n\n                            <p class="font10"> Toll tax or Parking</p>\n\n                            <p class="font10">{{row.toll_parking_amt ? \'Rs. \' + row.toll_parking_amt: \'--\'}}</p>\n\n                        </div>\n\n\n\n                        <div class="lower ml5">\n\n                            <div class="tag-info text-center">\n\n                                <a><i class="material-icons red-clr" (click)="listdelete(i)">delete_sweep</i></a>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="three_boxes">\n\n                        <div class="lower">\n\n                            <p class="font10">Remark</p>\n\n                            <p class="font10">{{row.remark ? row.remark: \'--\'}}</p>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="summary-table" *ngIf="item.length > 0">\n\n                <table>\n\n                    <tr>\n\n                        <td class="text-left">Total Summary</td>\n\n                        <td class="text-right w120"><span>&#8377; {{expense.totalAmt||\'00.00\'}}</span></td>\n\n                    </tr>\n\n\n\n                </table>\n\n            </div>\n\n\n\n            <div class="upload-doc mt0 pl10 pr10">\n\n                <ul class="no-padding">\n\n\n\n                    <li class="image-upload" *ngFor="let pic of image_data; let i = index;">\n\n                        <img src="{{pic.id ? constant.upload_url1+\'expense/\'+pic.image: pic.image }}">\n\n                        <button class="del" (click)="remove_image(i, pic.expense_type,pic.id)"><i\n\n                                class="material-icons">delete_sweep</i></button>\n\n                    </li>\n\n\n\n                </ul>\n\n\n\n            </div>\n\n\n\n            <!-- <div class="upload-doc mt0 pl10 pr10"> -->\n\n\n\n            <div class="text-right" *ngIf="item.length > 0  ">\n\n                <button [disabled]="Submit_button" ion-button block color="success" type="submit"\n\n                    class="mt16"><ion-spinner *ngIf="spinnerLoader"></ion-spinner>Submit</button>\n\n            </div>\n\n            <!-- </div> -->\n\n\n\n        </div>\n\n    </form>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\expense-add-new\expense-add-new.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_7__providers_attendenceservice_attendenceservice__["a" /* AttendenceserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_3__providers_myservice_myservice__["a" /* MyserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__["a" /* ConstantProvider */]])
    ], ExpenseAddNewPage);
    return ExpenseAddNewPage;
}());

//# sourceMappingURL=expense-add-new.js.map

/***/ }),

/***/ 1448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export OutputType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagePicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(20);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OutputType;
(function (OutputType) {
    OutputType[OutputType["FILE_URL"] = 0] = "FILE_URL";
    OutputType[OutputType["DATA_URL"] = 1] = "DATA_URL";
})(OutputType || (OutputType = {}));
/**
 * @name Image Picker
 * @description
 * Cordova Plugin For Multiple Image Selection
 *
 * Requires Cordova plugin: `cordova-plugin-image-picker`.
 * For more info, please see the https://github.com/wymsee/cordova-imagePicker
 *
 * @usage
 * ```typescript
 * import { ImagePicker } from '@ionic-native/image-picker';
 *
 *
 * constructor(private imagePicker: ImagePicker) { }
 *
 * ...
 *
 * this.imagePicker.getPictures(options).then((results) => {
 *   for (var i = 0; i < results.length; i++) {
 *       console.log('Image URI: ' + results[i]);
 *   }
 * }, (err) => { });
 *
 * ```
 * @interfaces
 * ImagePickerOptions
 */
var ImagePicker = (function (_super) {
    __extends(ImagePicker, _super);
    function ImagePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Pick pictures from the library.
     * @param {ImagePickerOptions} options
     * @returns {Promise<any>} Returns a Promise that resolves the image file URI
     * otherwise rejects with an error.
     */
    /**
       * Pick pictures from the library.
       * @param {ImagePickerOptions} options
       * @returns {Promise<any>} Returns a Promise that resolves the image file URI
       * otherwise rejects with an error.
       */
    ImagePicker.prototype.getPictures = /**
       * Pick pictures from the library.
       * @param {ImagePickerOptions} options
       * @returns {Promise<any>} Returns a Promise that resolves the image file URI
       * otherwise rejects with an error.
       */
    function (options) { return; };
    /**
     * Check if we have permission to read images
     * @returns {Promise<boolean>} Returns a promise that resolves with a boolean that indicates whether we have permission
     */
    /**
       * Check if we have permission to read images
       * @returns {Promise<boolean>} Returns a promise that resolves with a boolean that indicates whether we have permission
       */
    ImagePicker.prototype.hasReadPermission = /**
       * Check if we have permission to read images
       * @returns {Promise<boolean>} Returns a promise that resolves with a boolean that indicates whether we have permission
       */
    function () { return; };
    /**
     * Request permission to read images
     * @returns {Promise<any>}
     */
    /**
       * Request permission to read images
       * @returns {Promise<any>}
       */
    ImagePicker.prototype.requestReadPermission = /**
       * Request permission to read images
       * @returns {Promise<any>}
       */
    function () { return; };
    ImagePicker.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])({
            callbackOrder: 'reverse'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ImagePicker.prototype, "getPictures", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])({
            platforms: ['Android']
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ImagePicker.prototype, "hasReadPermission", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])({
            platforms: ['Android']
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ImagePicker.prototype, "requestReadPermission", null);
    /**
     * @name Image Picker
     * @description
     * Cordova Plugin For Multiple Image Selection
     *
     * Requires Cordova plugin: `cordova-plugin-image-picker`.
     * For more info, please see the https://github.com/wymsee/cordova-imagePicker
     *
     * @usage
     * ```typescript
     * import { ImagePicker } from '@ionic-native/image-picker';
     *
     *
     * constructor(private imagePicker: ImagePicker) { }
     *
     * ...
     *
     * this.imagePicker.getPictures(options).then((results) => {
     *   for (var i = 0; i < results.length; i++) {
     *       console.log('Image URI: ' + results[i]);
     *   }
     * }, (err) => { });
     *
     * ```
     * @interfaces
     * ImagePickerOptions
     */
    ImagePicker = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */])({
            pluginName: 'ImagePicker',
            plugin: 'cordova-plugin-telerik-imagepicker',
            pluginRef: 'window.imagePicker',
            repo: 'https://github.com/Telerik-Verified-Plugins/ImagePicker',
            install: 'ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="your usage message"',
            installVariables: ['PHOTO_LIBRARY_USAGE_DESCRIPTION'],
            platforms: ['Android', 'iOS']
        })
    ], ImagePicker);
    return ImagePicker;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=24.js.map