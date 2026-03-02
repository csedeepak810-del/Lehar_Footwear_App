webpackJsonp([31],{

/***/ 1366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpareAddPageModule", function() { return SpareAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spare_add__ = __webpack_require__(1441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SpareAddPageModule = /** @class */ (function () {
    function SpareAddPageModule() {
    }
    SpareAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__spare_add__["a" /* SpareAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__spare_add__["a" /* SpareAddPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["b" /* IonicSelectableModule */]
            ],
        })
    ], SpareAddPageModule);
    return SpareAddPageModule;
}());

//# sourceMappingURL=spare-add.module.js.map

/***/ }),

/***/ 1441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpareAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__complaint_detail_complaint_detail__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__ = __webpack_require__(7);
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
 * Generated class for the SpareAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SpareAddPage = /** @class */ (function () {
    function SpareAddPage(navCtrl, navParams, serve, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serve = serve;
        this.alertCtrl = alertCtrl;
        this.form = {};
        this.data = {};
        this.spare_list = [];
        this.savingFlag = false;
        this.addToListButton = false;
        this.add_list = [];
        this.spareData = {};
        console.log(this.navParams);
        this.id = this.navParams.data.id;
        this.complain_no = this.navParams.data.complain_no;
        this.getSpareParts('');
    }
    SpareAddPage.prototype.ionViewDidLoad = function () {
    };
    SpareAddPage.prototype.getSpareParts = function (id) {
        var _this = this;
        this.serve.addData({ 'search': this.search }, "AppServiceTask/getAssignedParts")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.spare_list = resp['assign_part'];
                // this.assignedQty=this.spare_list[0]['assigned_qty']
                // if (id) {
                //   let index = this.spare_list.findIndex(d => d.part_id == id);
                //   if (index != -1) {
                //     this.spareData.part_id = this.spare_list[index].part_id;
                //     this.spareData.part_no = this.spare_list[index].part_no;
                //     this.spareData.part_name = this.spare_list[index].part_name;
                //     this.spareData.assigned_qty = this.spare_list[index].assigned_qty;
                //   }
                // }
            }
            else {
                _this.serve.errorToast(resp['statusMsg']);
            }
        }, function (err) {
        });
    };
    SpareAddPage.prototype.closeDealer = function () {
        this.distributorSelectable._searchText = '';
    };
    SpareAddPage.prototype.searchSpare = function (data, event) {
        var _this = this;
        if (event.text == '') {
            this.getSpareParts('');
        }
        this.search = event.text;
        var wordSearch = this.search;
        setTimeout(function () {
            if (wordSearch == _this.search) {
                if (_this.search) {
                    _this.getSpareParts(_this.search);
                }
            }
        }, 500);
    };
    SpareAddPage.prototype.max = function () {
        // console.log(this.spareData.assigned_qty);
        console.log(this.spareData.part_id);
        if (parseInt(this.spareData.qty) > parseInt(this.spareData.part_id.assigned_qty)) {
            this.serve.errorToast('Qty Should Be Less Then Assigned Qty');
            this.spareData.qty = 0;
        }
    };
    SpareAddPage.prototype.DeleteItem = function (i) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: 'You want to delete this item',
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
                        _this.add_list.splice(i, 1);
                    }
                }]
        });
        alert.present();
    };
    SpareAddPage.prototype.addToList = function () {
        var _this = this;
        if (this.add_list.length == 0) {
            this.add_list.push({ 'part_id': this.spareData.part_id.part_id, 'part_name': this.spareData.part_id.part_name, 'part_no': this.spareData.part_id.part_no, 'qty': this.spareData.qty, });
        }
        else {
            var existIndex = this.add_list.findIndex(function (row) { return (row.part_id == _this.spareData['part_id']['part_id']); });
            if (existIndex != -1) {
                this.add_list[existIndex].qty = this.spareData.qty;
            }
            else {
                this.add_list.push({ 'part_id': this.spareData.part_id.part_id, 'part_name': this.spareData.part_id.part_name, 'part_no': this.spareData.part_id.part_no, 'qty': this.spareData.qty, });
            }
        }
        this.spareData.qty = '';
        this.spareData.part_id = '';
    };
    SpareAddPage.prototype.saveInstallation = function () {
        var _this = this;
        this.savingFlag = true;
        this.spareData.add_list = this.add_list;
        this.spareData.complaint_id = this.id;
        this.spareData.complaint_no = this.complain_no;
        this.serve.addData({ "data": this.spareData }, "AppServiceTask/saveComplaintSparePart")
            .then(function (resp) {
            if (resp['statusCode'] == 200) {
                _this.savingFlag = false;
                _this.serve.successToast(resp['statusMsg']);
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_3__complaint_detail_complaint_detail__["a" /* ComplaintDetailPage */]);
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('distributorSelectable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["a" /* IonicSelectableComponent */])
    ], SpareAddPage.prototype, "distributorSelectable", void 0);
    SpareAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-spare-add',template:/*ion-inline-start:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\complaints\spare-add\spare-add.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add Spare Part</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <form name="f" #f="ngForm" (ngSubmit)="f.valid && saveInstallation()">\n\n    <div class=" form">\n\n      <ion-list no-lines class="padding10">\n\n        <ion-list no-lines class="padding10">\n\n          <div class="cs-heading1 pl0">\n\n            <p>Spare Part</p>\n\n          </div>\n\n          <ion-item [ngClass]="{\'error\':f.submitted && part_id?.invalid}">\n\n            <ion-label floating>Select Spare<span>*</span></ion-label>\n\n            <ionic-selectable item-content #part_id="ngModel" [(ngModel)]="spareData.part_id" [items]="spare_list"\n\n              itemValueField="id" itemTextField="part_detail" [canSearch]="true" #distributorSelectable\n\n              (ngModelChange)="getSpareParts(spareData.part_id)" (onSearch)="searchSpare(spareData.part_name,$event);"\n\n              (onClose)="closeDealer()" [disabled]="(disableSelect == true || disableSelectFromCheckin == true)"\n\n              [ngModelOptions]="{standalone: true}">\n\n            </ionic-selectable>\n\n          </ion-item>\n\n          <div *ngIf="f.submitted && part_id.invalid" class="eror">\n\n            <p *ngIf="part_id.errors.required">{{\'Field is Required\'}}</p>\n\n          </div>\n\n          <ion-item>\n\n            <ion-label floating>Qty<span>*</span></ion-label>\n\n            <ion-input type="text" name="qty" #qty="ngModel" [(ngModel)]="spareData.qty" (input)="max()"\n\n              onkeypress="return event.charCode>=48 && event.charCode<=57"></ion-input>\n\n          </ion-item>\n\n        </ion-list>\n\n      </ion-list>\n\n      <div class="mt16">\n\n        <button type="text" ion-button class="cs-btn" (click)="addToList()"\n\n          [disabled]="!spareData.part_id || !spareData.qty">Add To List</button>\n\n      </div>\n\n\n\n      <div class="cs-heading1 pl0" *ngIf="add_list.length">\n\n        <p>Spare Information</p>\n\n      </div>\n\n\n\n      <div class="list-box mt10" *ngFor="let row of add_list;let i=index">\n\n        <div class="mid mt0" style="display: flex;justify-content: space-between;">\n\n          <div class="content-info">\n\n            <div class="right-info">\n\n              <div class="mt2 mb2" style="display:flex; flex-direction:row">\n\n                <p class="pr2" style="color:rgb(255, 153, 0)">#{{i+1}} </p>\n\n                <p class="font14"> {{row.part_name | titlecase}} ({{row.part_no | titlecase}})</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n          <div class="tag-info">\n\n            <a><i class="material-icons red-clr" (click)="DeleteItem(i)">delete_sweep</i></a>\n\n          </div>\n\n        </div>\n\n\n\n        <div class="three_boxes">\n\n          <div class="lower ">\n\n            <p class="font10">Qty</p>\n\n            <p class="font10">{{row.qty}}</p>\n\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class="enquiry-btn add-btns mt20" *ngIf="add_list.length">\n\n        <button ion-button block class="h40 green-color" style="letter-spacing: 1px;">\n\n          <p> Submit</p>\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"D:\Project\Lehar\Lehar_Footwear_App\src\pages\complaints\spare-add\spare-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_myservice_myservice__["a" /* MyserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], SpareAddPage);
    return SpareAddPage;
}());

//# sourceMappingURL=spare-add.js.map

/***/ })

});
//# sourceMappingURL=31.js.map