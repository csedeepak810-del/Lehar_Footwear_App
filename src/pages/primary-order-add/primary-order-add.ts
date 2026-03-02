import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, Navbar, ModalController, Platform, Nav, App, Events, ActionSheetController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import { ProductsPage } from '../products/products';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { PrimaryOrderMainPage } from '../primary-order-main/primary-order-main';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { ConstantProvider } from '../../providers/constant/constant';
import moment from 'moment';

declare let cordova: any;

@IonicPage()
@Component({
    selector: 'page-primary-order-add',
    templateUrl: 'primary-order-add.html',
})
export class PrimaryOrderAddPage {
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('itemselectable') itemselectable: IonicSelectableComponent;
    @ViewChild('subCategory') subcatSelectable: IonicSelectableComponent;
    @ViewChild('productCode') prod_codeSelectable: IonicSelectableComponent;
    @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
    @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;

    data: any = {};
    form: any = {};
    user_data: any = {};
    btndisable: boolean = false;
    order_data: any = {};
    special_discount: any = 0;
    type: any = '';
    cart_array: any = []
    order_item: any = [];
    userType: any;
    showSave = false;
    showEdit = true;
    active: any = {};
    addToListButton: boolean = true;
    ItemGST: any = '';
    order_total: any = '';
    total_Order_amount: any = ''
    Dist_state = ''
    Dr_type = ''
    color_list: any = [];
    brand_list: any = [];
    product: any = {};
    show_price: any = false;
    SpecialDiscountLable: any = '';
    cash_discount_percent: any = 0;
    cd_value: any = 0;
    ins_value: any = 0;
    tcs_value: any = 0;
    leave: any = 0;
    temp_product_array: any = [];
    distributor_list: any = [];
    grand_amt: any = {};
    sub_total: any = 0;
    dis_amt: any = 0;
    gst_amount: any = 0;
    net_total: any = 0;
    spcl_dis_amt: any = 0
    grand_total: any = 0;
    order_discount: any = 0;
    sub_total_before_cd: any = 0;
    sub_total_after_cd: any = 0;
    grand_total_before_tcs: any = 0;
    distributor_network_list: any = [];
    from_product = false
    filter: any = {};
    no_rec: any = {};
    catList: any = [];
    userId: any = {};
    product_list: any = [];
    order: any = {};
    flag: any = {};
    sizeList: any = {};
    qty: any;
    itemType: any;
    product_resp: boolean;
    mode = 0;
    distributorlist: any = [];
    drtype: any;
    checkin_id: any = 0;
    idMode: any;
    retailerID: any;
    tmpdata: any = {};
    disableSelect: boolean = false;
    disableSelectFromCheckin: boolean = false;
    add_list: any = [];
    temp_add_list: any = [];
    new_add_list: any = [];
    total_qty: any = 0;
    netamount: any = 0;
    total_gst_amount: any = 0;
    order_grand_total: any = 0;
    drList: any = [];
    product_detail: any = {};
    brandList: any = [];
    colorList: any = [];
    btnDisableSave: boolean = false;
    btnDisableDraft: boolean = false;
    search: any;
    image_data: any = [];
    image: any = '';
    loginType: any = {}

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public loadingCtrl: LoadingController,
        public Device: Device,
        public navParams: NavParams,
        private camera: Camera,
        public viewCtrl: ViewController
        , public service: MyserviceProvider,
        public toastCtrl: ToastController,
        private alertCtrl: AlertController,
        public storage: Storage,
        public modal: ModalController,
        public constant: ConstantProvider,
        public actionSheetController: ActionSheetController,
        public platform: Platform,
        public appCtrl: App) {
        this.order_item = this.navParams.get('order_item')
        this.order_data = this.navParams.get('order_data')
        this.drtype = this.navParams['data'].type || '';
        this.checkin_id = this.navParams.get('checkin_id')
        this.categoryList();
        setTimeout(() => {
            this.loginType = this.constant.UserLoggedInData
            console.log(this.loginType)


            // this.get_item_list('', 'blank');
        }, 2000);

    }
    ionViewDidEnter() {
        if (this.navParams.get('checkin_id') || this.navParams.get('Dist_login')) {
            this.disableSelectFromCheckin = true;
            this.drtype = this.navParams.get('order_type');
            this.data.networkType = this.navParams.get('dr_type');
            this.type = this.navParams.get('dr_type');
            this.data.id = this.navParams.get('id');
            this.data.company_name = this.navParams.get('dr_name');
            this.data.display_name = this.navParams.get('display_name');
            this.distributors(this.data, '')
        }

        this.navBar.backButtonClick = () => {
            this.backAction()
        };
        // this.platform.registerBackButtonAction(() => {
        //     this.backAction()
        // });
        let nav = this.appCtrl.getActiveNav();
        if (nav && nav.getActive()) {
            let activeView = nav.getActive().name;
            let previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
        }
        this.data.variableDiscount = 0


    }
    searchDealer(data, event) {
        if (event.text == '') {
            this.distributors(data, '');
        }
        this.search = event.text;
        let wordSearch = this.search;
        setTimeout(() => {
            if (wordSearch == this.search) {
                if (this.search) {
                    this.distributors(data, this.search);
                }
            }
        }, 500);
    }

    closeDealer() {
        this.distributorSelectable._searchText = '';
    }

    networkType: any = []
    distributors(data, masterSearch) {
        // this.data.type_name = []
        this.add_list = []
        this.data.segment = {}
        if (this.navParams.get('checkin_id') || this.navParams.get('Dist_login')) {
            this.service.addData({ 'dr_type': data.networkType, 'checkin_dr_id': this.navParams.get('id'), 'master_search': masterSearch }, 'AppOrder/followupCustomer').then((result) => {
                let TemData
                TemData = result['result'];
                let Index = TemData.findIndex(row => row.id == data.id);

                if (Index != -1) {
                    this.drList.push({ id: TemData[Index].id, company_name: TemData[Index].company_name, display_name: TemData[Index].display_name })
                    this.data.type_name = TemData[Index];
                }
            });
        } else {
            this.Dr_type
            this.service.addData({ 'dr_type': data, 'master_search': masterSearch }, 'AppOrder/followupCustomer').then((result) => {
                if (result['statusCode'] == 200) {
                    this.drList = result['result'];
                } else {
                    this.service.errorToast(result['statusMsg'])
                }
            });
        }
    }


    ionViewDidLoad() {
        this.storage.get('user_type').then((userType) => {
            if (userType == 'OFFICE') {
                this.data.networkType = 3;
                // this.get_network_list(this.data.networkType)
                this.userType = userType
                //   this.get_network_list(1)
            }
        });
    }



    backAction() {

        if (this.add_list.length > 0) {
            let alert = this.alertCtrl.create({
                title: 'Are You Sure?',
                subTitle: 'Your Order Data Will Be Lost',
                cssClass: 'alert-modal',

                buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        this.service.presentToast('Your Data is Safe')
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.navCtrl.pop();
                        this.add_list = [];

                    }
                }]
            });
            alert.present();
        }
        else {
            this.navCtrl.pop();
        }
    }



    Lead_retailer_distributor: any = [];

    get_state_list(name) {
        this.Dist_state = this.data.type_name.state
    }

    get_distributor() {
        // this.service.show_loading();
        this.service.addData({ 'type': 1 }, 'DealerData/get_type_list').then((result) => {
            this.distributor_list = result;

            // this.service.dismiss();
            if (this.distributor_list.length == 1) {
                this.data.distributor_id = this.distributor_list[0]
            }
            else {
                // this.distributorSelectable.open();
            }

        });
    }

    save_orderalert(type) {
        var str

        if (this.grand_total > 20000000) {
            let alert = this.alertCtrl.create({
                title: 'Max order value reached',
                subTitle: 'Maximum order value is 2 Cr. !',
                cssClass: 'alert-modal',

                buttons: [{
                    text: 'Okay',
                    role: 'Okay',
                    handler: () => {

                    }
                },
                ]
            });
            alert.present();
            return
        }
        if (type == 'draft') {
            str = 'You want to save this order as draft ?'
            this.btnDisableDraft = true;
        }
        else {
            str = 'You want to submit this order ?'
            this.btnDisableSave = true;
        }
        let alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: str,
            cssClass: 'alert-modal',

            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    this.btnDisableDraft = false;
                    this.btnDisableSave = false;
                }
            },
            {
                text: 'Confirm',
                cssClass: 'close-action-sheet',
                handler: () => {
                    this.save_order(type)
                }
            }]
        });
        alert.present();
    }



    goToProductPage() {
        if (this.order_data)
            this.data.order_data = this.order_data
        this.navCtrl.push(ProductsPage, { "order": true, "order_data": this.data, "cart_array": this.cart_array });
    }

    item_list: any = [];

    dr_id: any = {};


    searchPorts(event) {
        // let text = event.text.trim().toLowerCase();
        // event.component.startSearch();

        // this.conditionedItemHeader.filter = {}
        // this.conditionedItemHeader.filter.start = 0
        // this.conditionedItemHeader.filter.limit = 20
        // let data = {}

        // this.service.addData(this.conditionedItemHeader, "AppOrder/segmentItems")
        //     .then(resp => {
        //         if (resp['statusCode'] == 200) {
        //             this.item_list = resp['result'];
        //             //    event.component.items = this.filterPorts(ports, text);
        //                event.component.endSearch();
        //         } else {
        //             this.service.errorToast(resp['statusMsg'])
        //         }
        //     },
        //         err => {
        //         })

        //     // 
        // //   }); 
    }
    segmentFilter: any;

    OnlyNumber(event: any) {
        const pattern = /[0-9]+/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) { event.preventDefault(); }
    }





    searchItemList(event, list) {
        console.log(event.text);
        if (event.text == '') {
            this.get_item_list('', list)
        }

        this.search = event.text;
        let wordSearch = this.search;
        setTimeout(() => {
            if (wordSearch == this.search) {
                if (this.search) {
                    this.get_item_list(this.search, list)
                }
            }
        }, 500);
    }

    onCloseItemList() {
        this.itemselectable._searchText = '';
    }
    subCatList = [];
    conditionedItemHeader: any = {}
    without_segment: boolean = false
    // Fetch category list
    categoryList() {
        this.service.addData({}, 'RetailerRequest/category_list').then((result) => {
            if (result['statusCode'] == 200) {
                this.catList = result['category_list'];
            } else {
                this.service.dismissLoading();
                this.service.errorToast(result['statusMsg']);
            }
        }, err => {
            this.service.dismissLoading();
            this.service.errorToast('Something went wrong');
        });
    }

    // Fetch subcategories based on category
    get_subcategory_list() {
        if (!this.data.cat_id) {
            this.subCatList = [];
            return;
        }

        // ✅ Show loader
        this.service.presentLoading();

        this.service.addData(
            { category_id: this.data.cat_id },
            'RetailerRequest/subSegmentList'
        )
            .then((result) => {
                if (result['statusCode'] == 200) {
                    this.subCatList = result['category_list'];  // ✅ corrected key
                } else {
                    this.subCatList = [];
                    this.service.errorToast(result['statusMsg']);
                }

                // ✅ Always dismiss loader
                this.service.dismissLoading();

            }, err => {
                this.subCatList = [];
                this.service.errorToast('Something went wrong');
                this.service.dismissLoading(); // ✅ dismiss even on error
            });
    }



    // Fetch items based on subcategory
    get_item_list(search, list) {
        this.itemType = list;
        this.conditionedItemHeader.filter = {};
        this.conditionedItemHeader.filter.start = 0;
        this.conditionedItemHeader.filter.limit = 20;
        this.conditionedItemHeader.filter.order_type = 'primary';
        this.conditionedItemHeader.filter.cat_id = this.data.cat_id;
        this.conditionedItemHeader.filter.sub_cat_id = this.data.subcategory_id;  // ✅ Subcategory added

        console.log("Cat_ID -->", this.conditionedItemHeader.filter.cat_id);
        console.log("SubCat_ID -->", this.conditionedItemHeader.filter.sub_cat_id);

        this.conditionedItemHeader.filter.search = search;

        // if (this.add_list.length > 0) {
        //     this.conditionedItemHeader.filter.gst = this.product_detail.gst;
        //     this.conditionedItemHeader.filter.fixed_brand = this.brandList;
        // }

        if (this.drList.length > 0 && this.data.type_name) {
            let newIndex = this.drList.findIndex(row => row.id == this.data.type_name.id);
            if (newIndex !== -1) {
                this.conditionedItemHeader.filter.brand = this.drList[newIndex]['brand'] || this.data.type_name.brand;
                this.conditionedItemHeader.filter.dr_id = this.drList[newIndex]['id'];
            }
        }

        // ✅ Show loader
        this.service.presentLoading();

        this.service.addData(this.conditionedItemHeader, "AppOrder/segmentItems")
            .then(resp => {
                if (resp['statusCode'] == 200) {
                    this.item_list = resp['result'];
                    for (let index = 0; index < this.item_list.length; index++) {
                        this.item_list[index].display_name = this.item_list[index].display_name + " " + this.item_list[index].product_code;
                    }
                } else {
                    this.service.errorToast(resp['statusMsg']);
                }

                // ✅ Always dismiss loader after success or failure
                this.service.dismissLoading();

            }, err => {
                this.service.errorToast("Something went wrong");
                this.service.dismissLoading(); // ✅ Dismiss on error
            });
    }





    get_product_details(event) {
        this.data.brand = '';
        this.data.color = '';
        this.service.addData({ 'product_id': event.id, 'order_type': 'primary', 'brand': this.data.type_name.brand || 'Soulwud' }, "AppOrder/segmentItemsDetails")
            .then(resp => {
                if (resp['statusCode'] == 200) {
                    this.product_detail = resp['result'];
                    this.brandList = this.product_detail['brand'];
                    this.colorList = this.product_detail['color'];
                    if (this.brandList.length == 1) {
                        this.data.brand = this.brandList[0];
                    }
                    if (this.colorList.length == 1) {
                        this.data.color = this.colorList[0];
                    }

                } else {
                    this.service.errorToast(resp['statusMsg'])
                }
            })
    }

    itemsFilter: any;
    getMoreItems(event: { component: IonicSelectableComponent; text: string }) {

        this.conditionedItemHeader.filter.start = this.item_list.length;
        this.service.addData(this.conditionedItemHeader, "AppOrder/segmentItems")
            .then(resp => {
                if (resp['statusCode'] == 200) {
                    // this.item_list = resp['result'];
                    this.item_list = this.item_list.concat(resp['result']);
                    for (let index = 0; index < this.item_list.length; index++) {
                        this.item_list[index].display_name = this.item_list[index].product_code + " " + this.item_list[index].display_name
                    }
                    setTimeout(() => {
                        event.component.items = this.item_list
                        event.component.endInfiniteScroll();
                    }, 1000);
                } else {
                    this.service.errorToast(resp['statusMsg'])

                }
            },
                err => {
                })
    }

    get_product_Size(dr_id) {
        this.service.presentLoading();
        let Feature_Api = "";

        let Index = this.item_list.findIndex(row => row.id == this.data.product_id.id);
        if (Index != -1) {
            this.data.product_name = this.item_list[Index].product_name;
            this.data.feature_apply = this.item_list[Index].feature_apply;
            this.data.product_code = this.item_list[Index].product_code;
        }

        this.addToListButton = true;

        setTimeout(() => {
            this.service.addData(
                {
                    state_name: this.Dist_state,
                    dr_id: dr_id,
                    category_id: this.data.cat_id,
                    gst_percent: this.data.product_id.gst,
                    product_id: this.data.product_id.id,
                    standard_discount: this.product_list.length > 0 ? this.product_list[0].standard_discount : 0,
                    quantity_discount: this.product_list.length > 0 ? this.product_list[0].quantity_discount : 0,
                    cash_discount: this.product_list.length > 0 ? this.product_list[0].cash_discount : 0,
                    qty: this.product_list.length > 0 ? this.product_list[0].qty : 0,
                    sub_category_id: this.data.subcategory_id,
                    input_price: this.price
                },
                "AppOrder/segmentItemPriceWithoutFeatures"
            )
                .then(resp => {
                    if (resp['statusCode'] == 200) {
                        this.product_resp = true;
                        this.product_list = resp['result'];

                        if (this.product_list.length > 0) {
                            for (let i = 0; i < this.product_list.length; i++) {
                                this.product_list[i].edit_true = false;
                            }
                            this.price = '';
                        }
                        this.addToListButton = false;

                    } else {
                        this.service.errorToast(resp['statusMsg']);
                        this.product_resp = false;
                    }

                    // ✅ Always dismiss loader (success OR failure inside then)
                    this.service.dismissLoading();

                },
                    err => {
                        this.service.dismissLoading();
                    });
        }, 200);
    }




    priceChangeTimer: any;
    price;

    onPriceChange(value: any, dr_id: any) {
        clearTimeout(this.priceChangeTimer);

        this.priceChangeTimer = setTimeout(() => {
            // Call API only if value is not null, empty, or zero
            if (value && value > 0) {
                this.price = value;
                this.get_product_Size(dr_id); // pass edited price as input_price
            }
        }, 500); // 1 second debounce
    }

    addToList() {
        for (let i = 0; i < this.product_list.length; i++) {
            if (this.product_list[i]['qty'] > 0) {
                let existIndex
                existIndex = this.add_list.findIndex(row => row.product_id == this.product_list[i]['product_id']);


                if (existIndex == -1) {
                    this.product_list[i]['product_name'] = this.data.product_name;
                    this.product_list[i]['segment_id'] = this.data.segment.id;
                    // this.product_list[i]['brand'] = this.data.brand;
                    this.product_list[i]['brand'] = 'Soulwud';
                    this.product_list[i]['color'] = this.data.color;
                    this.product_list[i]['segment_id'] = this.product_detail.category_id;
                    this.product_list[i]['segment_name'] = this.product_detail.category;
                    this.product_list[i]['sub_category_name'] = this.product_detail.sub_category_name;
                    this.product_list[i]['sub_category_id'] = this.product_detail.sub_category_id;
                    this.product_list[i]['product_code'] = this.data.product_code;
                    this.product_list[i]['amount'] = parseFloat(this.product_list[i]['qty']) * (this.product_list[i]['net_price']);
                    this.product_list[i]['gst_amount'] = (((this.product_list[i]['amount']) * (this.product_detail.gst)) / 100);
                    this.product_list[i]['gst_percent'] = (this.product_detail.gst);
                    this.product_list[i]['total_amount'] = parseFloat(this.product_list[i].gst_amount) + parseFloat(this.product_list[i].amount);
                    this.add_list.push(this.product_list[i]);
                    this.temp_add_list.push(this.product_list[i])
                    console.log(this.add_list);
                }
                else {
                    this.product_list[i]['product_name'] = this.data.product_name;
                    this.product_list[i]['segment_id'] = this.data.segment.id;
                    this.product_list[i]['segment_id'] = this.product_detail.category_id;
                    this.product_list[i]['segment_name'] = this.product_detail.category;
                    this.product_list[i]['product_code'] = this.data.product_code;
                    this.product_list[i]['brand'] = this.data.brand;
                    this.product_list[i]['color'] = this.data.color;
                    this.add_list[existIndex]['standard_discount'] = this.product_list[i]['standard_discount'];
                    this.add_list[existIndex]['standard_discount_price'] = this.product_list[i]['standard_discount_price'];
                    this.add_list[existIndex]['quantity_discount'] = this.product_list[i]['quantity_discount'];
                    this.add_list[existIndex]['quantity_discount_price'] = this.product_list[i]['quantity_discount_price'];
                    this.add_list[existIndex]['cash_discount'] = this.product_list[i]['cash_discount'];
                    this.add_list[existIndex]['cash_discount_price'] = this.product_list[i]['cash_discount_price'];

                    this.add_list[existIndex]['qty'] = parseInt(this.add_list[existIndex]['qty']) + parseInt(this.product_list[i]['qty']);
                    this.add_list[existIndex]['amount'] = parseFloat(this.add_list[existIndex]['amount']) + parseInt(this.product_list[i]['qty']) * parseFloat(this.product_list[i]['net_price']);
                    this.add_list[existIndex]['gst_amount'] = ((this.add_list[existIndex]['amount']) * (this.product_detail.gst)) / 100;

                    // this.add_list[existIndex].total_item_discount = parseInt(this.product_list[i].discounted_price) * parseInt(this.product_list[i]['qty'])
                    this.add_list[existIndex].gst_percent = (this.product_detail.gst);
                    this.add_list[existIndex].total_amount = parseFloat(this.add_list[existIndex].gst_amount) + parseFloat(this.add_list[existIndex].amount);
                    console.log(this.add_list);

                }
            } else {
                this.service.errorToast("Please Add Quantity !");
            }

        }

        this.total_qty = 0;
        this.netamount = 0;
        this.total_gst_amount = 0;
        this.order_discount = 0;
        this.total_Order_amount = 0;
        this.order_total = 0;

        for (let i = 0; i < this.add_list.length; i++) {
            this.total_qty = (parseInt(this.total_qty) + parseInt(this.add_list[i]['qty']));
            this.total_Order_amount = parseFloat(this.total_Order_amount) + (parseFloat(this.add_list[i]['product_price']) * this.add_list[i]['qty']);
            this.order_discount = parseFloat(this.add_list[i].discounted_price) * parseFloat(this.add_list[i]['qty']) + parseFloat(this.order_discount);
            this.order_total = parseFloat(this.order_total) + parseFloat(this.add_list[i]['amount']);
            console.log("Order Toal", this.order_total);
            this.total_gst_amount = parseFloat(this.add_list[i].gst_amount) + parseFloat(this.total_gst_amount);
            this.netamount = parseFloat(this.netamount) + parseInt(this.add_list[i]['qty']) * parseFloat(this.add_list[i]['net_price']);
        }

        this.total_Order_amount = parseFloat(this.total_Order_amount);
        this.order_discount = parseFloat(this.order_discount);
        // this.sub_total_before_cd = parseFloat(this.order_total);
        // this.cash_discount_percent = parseFloat(this.data.type_name.cash_discount_percentage);
        // this.cd_value = parseFloat(this.sub_total_before_cd) * this.cash_discount_percent / 100;
        // this.sub_total_after_cd = parseFloat(this.sub_total_before_cd) - parseFloat(this.cd_value);
        // this.ins_value = parseFloat(this.sub_total_after_cd) * 0.06 / 100;
        // this.order_total = parseFloat(this.sub_total_after_cd)
        this.total_gst_amount = parseFloat(this.order_total) * parseFloat(this.product_detail.gst) / 100;
        console.log("GST Total", this.total_gst_amount);
        this.grand_total_before_tcs = (parseFloat(this.order_total) + parseFloat(this.total_gst_amount));
        console.log("Grand Total Before TCS", this.grand_total_before_tcs);
        // this.tcs_value = parseFloat(this.grand_total_before_tcs) * parseFloat(this.data.type_name.tcs_percentage) / 100;
        this.order_grand_total = (parseFloat(this.grand_total_before_tcs));
        console.log("Order Grand Total", this.order_grand_total);

        this.product_list = [];
        this.data.brand = '';
        this.data.color = '';
        this.data.product_id = {};
        this.addToListButton = true;
    }

    DeleteItem(i) {
        let alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: 'Your Want To Delete This Item ',
            cssClass: 'alert-modal',

            buttons: [{
                text: 'No',
                role: 'cancel',
                handler: () => {
                }
            },
            {
                text: 'Yes',
                handler: () => {
                    this.listdelete(i)

                }
            }]
        });
        alert.present();
    }
    listdelete(i) {
        this.add_list.splice(i, 1);
        this.total_qty = 0;
        this.netamount = 0;
        this.total_gst_amount = 0;
        this.order_discount = 0;
        this.total_Order_amount = 0;
        this.order_total = 0;

        for (let i = 0; i < this.add_list.length; i++) {
            this.total_qty = (parseInt(this.total_qty) + parseInt(this.add_list[i]['qty']));
            this.order_total = parseFloat(this.order_total) + parseFloat(this.add_list[i]['amount']);
            this.netamount = parseFloat(this.netamount) + parseInt(this.add_list[i]['qty']) * parseFloat(this.add_list[i]['net_price']);
            this.total_Order_amount = parseFloat(this.total_Order_amount) + (parseFloat(this.add_list[i]['product_price']) * this.add_list[i]['qty']);
            this.total_gst_amount = parseInt(this.add_list[i].gst_amount) + parseInt(this.total_gst_amount);
            this.order_discount = parseInt(this.add_list[i].discounted_price) * parseInt(this.add_list[i]['qty']) + parseInt(this.order_discount);
        }

        this.total_Order_amount = this.total_Order_amount;
        this.order_discount = this.order_discount;
        this.sub_total_before_cd = this.order_total;
        this.cash_discount_percent = this.data.type_name.cash_discount_percentage;
        console.log(this.cash_discount_percent);
        this.cd_value = this.sub_total_before_cd * this.cash_discount_percent / 100;
        console.log(this.cd_value);
        this.sub_total_after_cd = this.sub_total_before_cd - (this.cd_value);
        console.log(this.sub_total_after_cd);

        // this.ins_value = this.sub_total_after_cd * 0.06 / 100;

        this.order_total = this.sub_total_after_cd

        this.total_gst_amount = this.order_total * this.product_detail.gst / 100;

        this.grand_total_before_tcs = (parseFloat(this.order_total) + parseFloat(this.total_gst_amount));

        this.tcs_value = this.grand_total_before_tcs * this.data.type_name.tcs_percentage / 100;

        this.order_grand_total = (parseFloat(this.grand_total_before_tcs) + (this.tcs_value));


    }


    save_order(type) {
        this.btndisable = true;

        this.leave = 1
        this.user_data.type = this.data.networkType;

        if (this.data['type_name'].lead_type == "Lead" && this.data['type_name'].type == "3") {
            this.data.delivery_from = this.data.delivery_from.id;
        } else {
            this.data.delivery_from = this.data['type_name'].id;
        }

        this.special_discount = this.special_discount;
        this.user_data.special_discount_amount = this.spcl_dis_amt;
        this.user_data.Disctype = this.type;
        this.user_data.SpecialDiscountLable = this.SpecialDiscountLable
        this.user_data.dr_id = this.data.type_name.id
        this.user_data.remark = this.data.remark;
        this.user_data.warehouse = this.data.warehouse;

        this.user_data.total_Order_amount = this.total_Order_amount;
        this.user_data.order_discount = this.order_discount;
        this.user_data.sub_total_before_cd = this.sub_total_before_cd;
        this.user_data.cash_discount_percent = this.cash_discount_percent;
        this.user_data.tcs_percent = this.data.type_name.tcs_percentage;

        this.user_data.gst_percent = this.product_detail.gst;
        this.user_data.cd_value = this.cd_value;
        this.user_data.sub_total_after_cd = this.sub_total_after_cd;
        // this.user_data.ins_value = this.ins_value;
        this.user_data.order_total = this.order_total;
        this.user_data.total_gst_amount = this.total_gst_amount;
        this.user_data.grand_total_before_tcs = this.grand_total_before_tcs;
        this.user_data.tcs_value = this.tcs_value;
        this.user_data.order_grand_total = this.order_grand_total;
        this.user_data.image_data = this.image_data;
        this.user_data.order_list = moment(this.data.order_list || new Date()).format('YYYY-MM-DD');



        this.user_data.product_code = this.data.product_code
        if (this.data.distributor_id && this.data.delivery_from)
            this.user_data.distributor_id = this.data.delivery_from

        // var orderData = { 'sub_total': this.netamount, 'dis_amt': this.dis_amt, 'grand_total': this.order_grand_total, 'total_gst_amount': this.total_gst_amount, 'total_qty': this.total_qty, 'net_total': this.netamount, 'special_discount': this.special_discount, 'special_discount_amount': this.spcl_dis_amt }

        this.service.addData({ "cart_data": this.add_list, "user_data": this.user_data, "checkin_id": this.checkin_id }, "AppOrder/primaryOrdersAdd").then(resp => {
            if (resp['statusCode'] == 200) {
                var toastString = ''
                if (this.user_data.order_status == 'Draft') {
                    this.service.successToast(resp['statusMsg'])
                    this.btnDisableDraft = false;
                    this.btnDisableSave = false;
                }
                else {
                    this.service.successToast(resp['statusMsg'])
                    this.btnDisableDraft = false;
                    this.btnDisableSave = false;
                }

                this.navCtrl.popTo(PrimaryOrderMainPage)

            } else {
                this.service.errorToast(resp['statusMsg']);
                this.btnDisableDraft = false;
                this.btnDisableSave = false;
            }
        },
            error => {
                this.btndisable = false;
                this.btnDisableDraft = false;
                this.btnDisableSave = false;
                this.service.Error_msg(error);
                this.service.dismiss();
            })



    }


    editRate(id, index) {
        this.active[index] = Object.assign({ 'qty': "1" });
        this.showSave = true;
        this.idMode = id;
        this.product_list[index].edit_true = false;
    }


    remove_image(i: any) {
        this.image_data.splice(i, 1);
    }


    updateRate(editedRate, index) {
        this.idMode = 0;
        this.active = {};
        this.product_list[index].edit_true = true;
    }


    captureMedia() {
        console.log("hello media")
        let actionsheet = this.actionSheetController.create({
            title: "Upload Image",
            cssClass: 'cs-actionsheet',
            buttons: [{
                cssClass: 'sheet-m',
                text: 'Camera',
                icon: 'camera',
                handler: () => {
                    this.takePhoto();
                }
            },
            {
                cssClass: 'sheet-m1',
                text: 'Gallery',
                icon: 'image',
                handler: () => {

                    this.getImage();
                }
            },
            {
                cssClass: 'cs-cancel',
                text: 'Cancel',
                role: 'cancel',
                icon: 'cancel',
                handler: () => {

                }
            }
            ]
        });
        actionsheet.present();
    }

    captureImage(event) {
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Soulwud', 'Camera Service');
        }
        event.preventDefault();
        let files = event.target.files;
        if (files) {
            for (let file of files) {
                console.log("in for");
                let reader = new FileReader();

                reader.onload = (e: any) => {
                    this.image_data.push(e.target.result);
                    console.log(this.image_data);
                }
                reader.readAsDataURL(file);
            }
        }
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.stop();
        }

    }


    takePhoto() {
        const options: CameraOptions =
        {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 800,
            targetHeight: 600,
            allowEdit: false
        }
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Soulwud', 'Camera Service');
        }
        this.camera.getPicture(options).then((imageData) => {
            this.image = 'data:image/jpeg;base64,' + imageData;
            if (this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.stop();
            }
            if (this.image) {
                this.fileChange(this.image);
            }
        },
            (err) => {
                if (this.Device.platform == 'Android') {
                    cordova.plugins.foregroundService.stop();
                }
            });
    }


    getImage() {
        const options: CameraOptions =
        {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
            cameraDirection: 1,
            correctOrientation: true
        }
        if (this.Device.platform == 'Android') {
            cordova.plugins.foregroundService.start('Soulwud', 'Camera Service');
        }
        this.camera.getPicture(options).then((imageData) => {
            this.image = 'data:image/jpeg;base64,' + imageData;
            if (this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.stop();
            }
            if (this.image) {
                this.fileChange(this.image);
            }
        }, (err) => {
            if (this.Device.platform == 'Android') {
                cordova.plugins.foregroundService.stop();
            }
        });
    }

    fileChange(img) {
        // this.image_data=[];
        this.image_data.push(img);

        this.image = '';
    }

    showLimit() {
        console.log('Image Data', this.image_data)
        let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: "You can upload only 6 Order images",
            cssClass: 'alert-modal',

            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {

                }
            }
            ]
        });
        alert.present();
    }

    hasValidPrice() {
        return this.product_list.some(item => item.product_price != 0);
    }


}
