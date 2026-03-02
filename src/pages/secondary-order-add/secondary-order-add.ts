import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, Navbar, ModalController, Platform, Nav, App, Events, ActionSheetController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartDetailPage } from '../cart-detail/cart-detail';
import { ViewChild } from '@angular/core';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { ProductsPage } from '../products/products';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { SecondaryOrderMainPage } from '../secondary-order-main/secondary-order-main';
import { SecondaryOrderDetailPage } from '../secondary-order-detail/secondary-order-detail';
import { ConstantProvider } from '../../providers/constant/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import moment from 'moment';

declare let cordova: any;
@IonicPage()
@Component({
  selector: 'page-secondary-order-add',
  templateUrl: 'secondary-order-add.html',
})
export class SecondaryOrderAddPage {
  @ViewChild(Navbar) navBar: Navbar;

  @ViewChild('category') categorySelectable: IonicSelectableComponent;
  @ViewChild('dealerSelectable') dealerSelectable: IonicSelectableComponent;
  @ViewChild('itemSelectable') itemSelectable: IonicSelectableComponent;
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;

  distributorSelected: any = false
  data: any = {};
  form: any = {};
  user_data: any = {};
  btndisable: boolean = false;
  distributorSelect: boolean = false;
  disabledistFromCheckin: boolean = false;
  order_data: any = {};
  type: any = '';
  total_Order_amount: any = '';
  cart_array: any = []
  OrderItem: any = [];
  order_discount: any = 0;
  Distributor_list: any = [];
  checkinData: any = {};
  userType: any;
  itemType: any;
  prod_cat_list;
  showSave = false;
  showEdit = true;
  active: any = {};
  addToListButton: boolean = true;
  ItemGST: any = '';
  Dist_state = ''
  Dr_type = ''
  color_list: any = [];
  brand_list: any = [];
  product: any = {};
  show_price: any = false;
  SpecialDiscountLable: any = ''
  order_total: any = ''
  leave: any = 0;
  temp_product_array: any = [];
  sub_total: any = 0;
  dis_amt: any = 0;
  gst_amount: any = 0;
  net_total: any = 0;
  grand_total: any = 0;
  from_product = false
  filter: any = {};
  userId: any = {};
  product_list: any = [];
  order: any = {};
  qty: any;
  drtype: any;
  checkin_id: any = 0;
  idMode: any;
  retailerID: any;
  tmpdata: any = {};
  disableSelect: boolean = false;
  disableSelectFromCheckin: boolean = false;
  add_list: any = [];
  total_qty: any = 0;
  netamount: any = 0;
  total_gst_amount: any = 0;
  new_grand_total: any = 0;
  drList: any = [];
  product_detail: any = {};
  brandList: any = [];
  colorList: any = [];
  btnDisableSave: boolean = false;
  btnDisableDraft: boolean = false;
  Dr_Data: any = {};
  search: any;
  image_data: any = [];
  image: any = '';
  catList: any = [];
  networkList: any = [];
  loginType: any = {}



  constructor(
    public navCtrl: NavController,
    public events: Events,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public Device: Device,
    public service: MyserviceProvider,
    public constant: ConstantProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    public storage: Storage,
    public modal: ModalController,
    public platform: Platform,
    public appCtrl: App) {
    this.data.networkType = this.navParams['data'].networkType || '3';

    // console.log(this.navParams['data'].networkType)
    this.data.gst_type = 'Gst Extra';
    this.drtype = this.navParams['data'].type;
    // console.log(this.navParams['data'].dr_type)
    this.checkin_id = this.navParams.get('checkin_id');
    this.customerType();
    this.categoryList();
    setTimeout(() => {
      // this.get_item_list('', 'blank');
      this.loginType = this.constant.UserLoggedInData

    }, 2000);
    this.Dr_Data = this.constant.UserLoggedInData;
    if (this.navParams.get('checkin_id') || this.navParams.get('Dist_login')) {

      this.retailerID = this.navParams.get('id')
      if (this.navParams.get('id')) {
        this.disableSelect = true
      }
      this.tmpdata.id = this.navParams.get('id');
      this.tmpdata.company_name = this.navParams.get('dr_name');
      this.tmpdata.display_name = this.navParams.get('display_name');
      this.tmpdata.dr_id = this.navParams.get('dr_id')
      this.distributors(this.tmpdata);
    } else if (this.navParams.get('order_data') && this.navParams.get('OrderItem')) {
      this.retailerID = this.navParams.get('order_data')['id'];
      if (this.navParams.get('order_data')['id']) {
        this.disableSelect = true;
      }
      this.tmpdata.id = this.navParams.get('order_data')['id']
      this.tmpdata.company_name = this.navParams.get('order_data')['company_name']
      this.tmpdata.dr_id = this.navParams.get('order_data')['dr_id']
      this.tmpdata.dr_name = this.navParams.get('order_data')['dist_company_name']


      this.distributors(this.tmpdata);

    } else {
      this.distributors('')
    }

    if (this.navParams.get('for_order')) {
      this.checkinData = this.navParams.get('for_order')
      this.data.networkType = this.checkinData.dr_type;
    }

    this.order_data = this.navParams.get("order_data");
    this.OrderItem = this.navParams.get("OrderItem");
    if (this.navParams.get("data")) {

      this.data = this.navParams.get("data");
      if (this.data.from_product == true) {
        this.cart_array = this.navParams.get("cart_array");
        if (this.data.order_data) {
          this.order_data = this.data.order_data;
        }

        this.cart_array.map((item) => {
          this.product = item
        })

      }

    }

    if (this.order_data && this.order_data.order_id) {

      this.user_data = this.order_data;
    }

    this.events.subscribe(('AddOrderBackAction'), (data) => {
      this.backAction()

    })






  }
  networkType: any = []
  getNetworkType() {
    this.service.addData('', "Dashboard/allNetworkModule").then((result => {
      this.networkType = result['modules'];
      console.log('all modules', this.networkType)
    }))
  }


  searchDealer(event) {
    if (event.text == '') {
      this.distributors('');
    }
    this.search = event.text;
    let wordSearch = this.search;
    setTimeout(() => {
      if (wordSearch == this.search) {
        if (this.search) {
          this.distributors(this.search);
        }
      }
    }, 500);
  }

  closeDealer() {
    this.dealerSelectable._searchText = '';
  }

  Distributor: any = []

  distributors(masterSearch) {
    if (this.navParams.get('checkin_id') || (this.navParams.get('Dist_login'))) {
      console.log(this.data)
      this.service.addData({ 'dr_type': this.data.networkType, 'checkin_dr_id': this.navParams.get('id'), 'master_search': masterSearch }, 'AppOrder/followupCustomer').then((result) => {
        if (result['statusCode'] == 200) {
          this.drList = result['result'];
          let Index = this.drList.findIndex(row => row.id == this.retailerID)
          if (Index != -1) {
            this.data.type_name = this.drList[Index];
            this.get_distributor_list(this.retailerID)
          } else {
          }
        } else {
          this.service.errorToast(result['statusMsg'])
        }
      });
    } else {
      if (this.Dr_Data.type != 1) {
        this.Dr_type

        this.service.addData({ 'dr_type': this.data.networkType, 'master_search': masterSearch }, 'AppOrder/followupCustomer').then((result) => {
          this.drList = result['result'];
        });
      } else {
        this.Dr_type
        this.service.addData({ 'dr_type': '3', 'master_search': masterSearch }, 'AppOrder/assignedDealer').then((result) => {
          this.drList = result['result'];
        });
      }

    }
  }




  searchDistributor_list(event) {
    let retailer_id

    retailer_id = this.data.type_name.id

    this.service.addData({ 'dealer_id': retailer_id, 'master_search': event.text }, 'AppOrder/getAssignDistributor').then((result) => {
      if (result['statusCode'] == 200) {
        this.Distributor_list = result['distributor_arr'];

      } else {
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {

    });

  }

  customerType() {
    this.service.addData({}, 'AppOrder/secnetworkList').then((result) => {
      if (result['statusCode'] == 200) {
        this.networkList = result['result'];
        console.log(this.networkList, "line 307")

      } else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.dismissLoading();
      this.service.errorToast('Something went wrong')
    });
  }

  get_distributor_list(id) {
    let retailer_id
    if (this.navParams.get('checkin_id')) {
      retailer_id = id
    }
    else if (this.navParams.get('Dist_login')) {
      retailer_id = id
    }
    else {
      retailer_id = id.id
    }
    this.service.presentLoading();
    this.service.addData({ 'dealer_id': retailer_id, }, 'AppOrder/getAssignDistributor').then((result) => {
      if (result['statusCode'] == 200) {
        this.service.dismissLoading();
        this.Distributor_list = result['distributor_arr'];

        if (this.Dr_Data.type == 1) {
          let index = this.Distributor_list.findIndex(r => r.id == this.Dr_Data.id);
          this.data.distributor_id = this.Distributor_list[index];
        }

      } else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.dismissLoading();

    });

  }
  ionViewDidLoad() {

    this.storage.get('user_type').then((userType) => {
      if (userType == 'OFFICE') {
        this.data.networkType = 3;
        this.userType = userType
        //   this.get_network_list(1)
      }

    });
  }

  ionViewDidEnter() {
    this.sub_total = 0;
    this.dis_amt = 0;
    this.gst_amount = 0;
    this.data.dr_disc = 0;
    this.net_total = 0;
    this.grand_total = 0;
    this.cart_array.map((item) => {
      this.product = item
    })
    this.navBar.backButtonClick = () => {

      this.backAction()

    };
    // this.platform.registerBackButtonAction(() => {
    //   this.backAction()
    // });
    let nav = this.appCtrl.getActiveNav();
    if (nav && nav.getActive()) {
      let activeView = nav.getActive().name;
      let previuosView = '';
      if (nav.getPrevious() && nav.getPrevious().name) {
        previuosView = nav.getPrevious().name;
      }
    }
  }

  backAction() {
    if (this.add_list.length > 0) {
      let alert = this.alertCtrl.create({
        title: 'Are You Sure?',
        subTitle: 'Your Order Data Will Be Lost ',
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
          cssClass: 'close-action-sheet',
          handler: () => {

            this.navCtrl.pop();
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
      str = 'You want to save this order as draft ?';
    }
    else {
      str = 'You want to submit this order ?';
    }
    let alert = this.alertCtrl.create({
      title: 'Are You Sure?',
      subTitle: str,
      cssClass: 'alert-modal',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
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

  item_list: any = [];
  dr_id: any = {};


  searchPorts(event: { component: IonicSelectableComponent; text: string }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // this.portsSubscription = this.portService
    //   .getPortsAsync()
    //   .subscribe((ports) => {
    //     // Subscription will be closed when unsubscribed manually.
    //     if (this.portsSubscription.closed) {
    //       return;
    //     }

    // event.component.items = this.filterPorts(ports, text);
    // event.component.endSearch();
    //   }); 
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
    this.itemSelectable._searchText = '';
  }

  subCatList = [];
  conditionedItemHeader: any = {}
  without_segment: boolean = false
  itemsFilter: any;

  // ✅ Fetch categories
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

  // ✅ Fetch subcategories when category is selected
  get_subcategory_list() {
    if (!this.data.cat_id) {
      this.subCatList = [];
      this.item_list = [];
      return;
    }

    this.service.presentLoading();   // ✅ Show loader

    this.service.addData({ category_id: this.data.cat_id }, 'RetailerRequest/subSegmentList')
      .then((result) => {
        if (result['statusCode'] == 200) {
          this.subCatList = result['category_list']; // response JSON has `id` and `sub_category_name`
        } else {
          this.subCatList = [];
          this.service.errorToast(result['statusMsg']);
        }
        this.service.dismissLoading();  // ✅ Always hide loader after success
      }, err => {
        this.subCatList = [];
        this.service.errorToast('Something went wrong');
        this.service.dismissLoading();  // ✅ Always hide loader after error
      });
  }


  // ✅ Fetch items when subcategory is selected
  get_item_list(search, list) {
    this.itemType = list;
    this.conditionedItemHeader.filter = {};
    this.conditionedItemHeader.filter.start = 0;
    this.conditionedItemHeader.filter.limit = 20;
    this.conditionedItemHeader.filter.order_type = 'secondary';
    this.conditionedItemHeader.filter.search = search;

    // pass selected category & subcategory
    this.conditionedItemHeader.filter.cat_id = this.data.cat_id || '';
    this.conditionedItemHeader.filter.sub_cat_id = this.data.subcategory_id || '';

    if (this.data.type_name != undefined) {
      this.conditionedItemHeader.filter.dr_id = this.data.type_name.id;
    }
    if (this.data.distributor_id != undefined) {
      this.conditionedItemHeader.filter.brand = this.data.distributor_id.brand;
    }
    // if (this.add_list.length > 0) {
    //   this.conditionedItemHeader.filter.gst = this.product_detail.gst;
    //   this.conditionedItemHeader.filter.fixed_brand = this.brandList;
    // }

    this.service.presentLoading();  // ✅ Show loader

    this.service.addData(this.conditionedItemHeader, "AppOrder/segmentItems")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.item_list = resp['result'];
          for (let index = 0; index < this.item_list.length; index++) {
            this.item_list[index].display_name =
              this.item_list[index].display_name + " " + this.item_list[index].product_code;
          }
        } else {
          this.service.errorToast(resp['statusMsg']);
        }
        this.service.dismissLoading();  // ✅ Always dismiss on success
      }, err => {
        this.item_list = [];
        this.service.dismissLoading();  // ✅ Always dismiss on error
      });
  }


  getMoreItems(event: { component: IonicSelectableComponent; text: string }) {

    this.conditionedItemHeader.filter.start = this.item_list.length;
    this.service.addData(this.conditionedItemHeader, "AppOrder/segmentItems")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          // this.item_list = resp['result'];
          this.item_list = this.item_list.concat(resp['result']);
          for (let index = 0; index < this.item_list.length; index++) {
            this.item_list[index].display_name = this.item_list[index].display_name + " " + this.item_list[index].product_code;
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
          this.service.Error_msg(err);
        })
  }



  get_product_details(event) {
    this.data.brand = '';
    this.data.color = '';
    this.service.addData({ 'product_id': event.id, 'brand': 'Soulwud', 'order_type': 'secondary' }, "AppOrder/segmentItemsDetails")
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



  async changeDiscount(dr_id, product_id, type, discountValue) {

    if (discountValue == 0) {
      discountValue = ''
    }

    let alert = await this.alertCtrl.create({
      title: 'Are You Sure?',
      subTitle: 'You Want To Change Discount ?',
      cssClass: 'alert-modal',
      inputs: [
        {
          name: 'discountValue',
          placeholder: 'Enter Discount..',
          type: 'number',
          min: 0,
          max: 100,
          value: discountValue,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.data.dr_disc = Math.abs(data.discountValue);
            if (this.data.dr_disc > 0) {
              this.get_product_Size(dr_id, product_id, type, data.discountValue);
            } else {
              this.service.errorToast("Please Update Discount Above Greater Than 0");
            }
          }
        }
      ]
    });
    await alert.present();
  }
  setPrice: any;
  async changePrice(dr_id, product_id, type, set_price) {
    this.setPrice = set_price;
    let productPrice = '';

    let alert = await this.alertCtrl.create({
      title: 'Are You Sure?',
      subTitle: 'You Want To Change Price ?',
      cssClass: 'alert-modal',
      inputs: [
        {
          name: 'productPrice',
          placeholder: 'Enter Price..',
          type: 'number',
          min: 0,
          max: 100,
          value: productPrice,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.data.productPrice = Math.abs(data.productPrice);

            if (set_price < this.data.productPrice) {
              this.get_product_Size(dr_id, product_id, type, data.productPrice);
            }
            else {
              this.service.errorToast("Price cannot be less than Net Price ₹" + set_price);
            }


          }
        }
      ]
    });
    await alert.present();
  }



  timeoutId: any = 0;
  get_product_Size(dr_id, product_id, type, discountValue) {
    let Index = this.item_list.findIndex(row => row.id == this.data.product_id.id);
    if (Index != -1) {
      this.data.product_name = this.item_list[Index].product_name
      this.data.feature_apply = this.item_list[Index].feature_apply
      this.data.product_code = this.item_list[Index].product_code
    }

    let header

    if (type == 'listInput') {
      header = { 'input_price': this.price, 'sub_category_id': this.data.subcategory_id, 'state_name': this.Dist_state, 'order_type': 'secondary', 'dr_id': dr_id, 'input_discount': this.data.dr_disc, 'product_id': this.data.product_id.id, 'gst_type': this.data.gst_type, 'gst_percent': this.data.product_id.gst, 'category_id': this.data.cat_id, 'standard_discount': this.product_list.length > 0 ? this.product_list[0].standard_discount : 0, 'quantity_discount': this.product_list.length > 0 ? this.product_list[0].quantity_discount : 0, 'cash_discount': this.product_list.length > 0 ? this.product_list[0].cash_discount : 0, 'qty': this.product_list.length > 0 ? this.product_list[0].qty : 0 }
    }
    if (type == 'addPrice') {
      header = { 'sub_category_id': this.data.subcategory_id, 'state_name': this.Dist_state, 'order_type': 'secondary', 'dr_id': dr_id, 'input_discount': 0, 'input_price': this.data.productPrice, 'product_id': this.data.product_id.id, 'gst_type': this.data.gst_type, 'gst_percent': this.data.product_id.gst, 'category_id': this.data.cat_id, 'standard_discount': this.product_list.length > 0 ? this.product_list[0].standard_discount : 0, 'quantity_discount': this.product_list.length > 0 ? this.product_list[0].quantity_discount : 0, 'cash_discount': this.product_list.length > 0 ? this.product_list[0].cash_discount : 0, 'qty': this.product_list.length > 0 ? this.product_list[0].qty : 0 }
    }
    if (type == 'addDiscount') {
      header = { 'input_price': this.price, 'sub_category_id': this.data.subcategory_id, 'state_name': this.Dist_state, 'order_type': 'secondary', 'input_discount': this.data.dr_disc, 'dr_id': dr_id, 'product_id': this.data.product_id.id, 'gst_type': this.data.gst_type, 'gst_percent': this.data.product_id.gst, 'category_id': this.data.cat_id, 'standard_discount': this.product_list.length > 0 ? this.product_list[0].standard_discount : 0, 'quantity_discount': this.product_list.length > 0 ? this.product_list[0].quantity_discount : 0, 'cash_discount': this.product_list.length > 0 ? this.product_list[0].cash_discount : 0, 'qty': this.product_list.length > 0 ? this.product_list[0].qty : 0 }
    }

    this.addToListButton = true;

    this.service.presentLoading();  // ✅ Show loader before API call

    this.service.addData(header, "AppOrder/segmentItemPriceWithoutFeatures")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.product_list = resp['result'];
          if (this.product_list.length > 0) {
            for (let i = 0; i < this.product_list.length; i++) {
              this.product_list[i].edit_true = false;
            }
            this.price = '';
          }
          if (this.product_list.length < 1) {
            this.data.product_id = '';
            this.data.brand = '';
            this.data.color = '';
            this.service.errorToast(resp['statusMsg']);
          }
          this.addToListButton = false;
        } else {
          this.service.errorToast(resp['statusMsg'])
        }
        this.service.dismissLoading();  // ✅ Hide loader after success
      },
        err => {
          this.service.Error_msg(err);
          this.service.dismissLoading();  // ✅ Hide loader after error
        });
  }



  priceChangeTimer: any;
  price: any;

  onPriceChange(value: any, dr_id: any) {
    clearTimeout(this.priceChangeTimer);

    this.priceChangeTimer = setTimeout(() => {
      if (value && value > 0) {
        this.price = value;
        this.data.productPrice = value; // store updated price

        // make sure product_id is available
        if (this.data.product_id && this.data.product_id.id) {
          this.get_product_Size(
            dr_id,
            this.data.product_id.id,
            'addPrice',  // because we’re changing price
            ''           // no discount value needed here
          );
        }
      }
    }, 500);
  }


  addToList() {
    for (let i = 0; i < this.product_list.length; i++) {
      if (this.product_list[i]['qty'] > 0 && this.product_list[i]['product_price']) {
        let existIndex = this.add_list.findIndex(row => (row.product_id == this.product_list[i]['product_id'] && row.brand == this.data.brand && row.color == this.data.color));
        if (existIndex != -1) {
          this.add_list.splice(existIndex, 1)
        }
        this.product_list[i]['product_name'] = this.data.product_name;
        this.product_list[i]['product_code'] = this.data.product_code;
        this.product_list[i]['segment_id'] = this.product_detail.category_id;
        this.product_list[i]['sub_category_name'] = this.product_detail.sub_category_name;
        this.product_list[i]['sub_category_id'] = this.product_detail.sub_category_id;
        this.product_list[i]['segment_name'] = this.product_detail.category;
        this.product_list[i]['amount'] = parseFloat(this.product_list[i]['qty']) * parseFloat(this.product_list[i]['net_price']);
        this.product_list[i]['color'] = this.data.color;
        // this.product_list[i]['brand'] = this.data.brand;
        this.product_list[i]['brand'] = "Soulwud";
        this.product_list[i]['discount_amount'] = parseFloat(this.product_list[i]['discounted_price']) * parseFloat(this.product_list[i]['qty']);
        this.product_list[i]['discounted_price'] = parseFloat(this.product_list[i]['discounted_price']);


        if (this.data.gst_type == 'Gst Paid') {
          this.product_list[i]['gst_amount'] = parseFloat(this.product_list[i]['amount']) - ((((this.product_list[i]['amount'] * 100))) / (parseFloat(this.product_list[i]['gst_percent'] + 100)));
          this.product_list[i]['gst_percent'] = this.product_list[i]['gst_percent'];
          this.product_list[i]['total_amount'] = (this.product_list[i]['amount']);
          this.product_list[i]['dr_disc'] = this.product_list[i]['dr_disc'];
          this.add_list.push(this.product_list[i]);
        }
        if (this.data.gst_type == 'Gst Extra') {
          this.product_list[i]['gst_amount'] = (((this.product_list[i]['amount']) * (this.product_list[i]['gst_percent'])) / 100);
          this.product_list[i]['gst_percent'] = this.product_list[i]['gst_percent'];
          this.product_list[i]['total_amount'] = parseFloat(this.product_list[i]['gst_amount']) + (this.product_list[i]['amount']);
          this.product_list[i]['dr_disc'] = this.product_list[i]['dr_disc'];
          this.add_list.push(this.product_list[i]);
        }
      } else {
        this.service.errorToast("Please Add Qty");
      }

    }

    this.total_qty = 0;
    this.netamount = 0;
    this.order_total = 0;
    this.total_gst_amount = 0;
    this.total_Order_amount = 0;
    this.order_discount = 0;


    for (let i = 0; i < this.add_list.length; i++) {
      this.total_qty += parseInt(this.add_list[i]['qty']);
      this.total_gst_amount = parseFloat(this.add_list[i].gst_amount) + parseFloat(this.total_gst_amount);
      this.total_Order_amount = parseFloat(this.total_Order_amount) + (parseFloat(this.add_list[i]['product_price']) * this.add_list[i]['qty']);
      this.netamount = parseFloat(this.netamount) + parseInt(this.add_list[i]['qty']) * parseFloat(this.add_list[i]['net_price']);
      this.order_discount += parseFloat(this.add_list[i].discounted_price) * parseInt(this.add_list[i]['qty']);
      this.order_total = parseFloat(this.order_total) + parseFloat(this.add_list[i]['amount']);
    }
    this.total_gst_amount = parseFloat(this.total_gst_amount);
    this.total_gst_amount = this.total_gst_amount;
    this.total_Order_amount = this.total_Order_amount;
    this.order_total = this.order_total;
    this.order_discount = this.order_discount;
    if (this.data.gst_type == 'Gst Extra') {
      this.new_grand_total = parseFloat(this.netamount) + parseFloat(this.total_gst_amount);
    } else {
      this.new_grand_total = parseFloat(this.netamount)

    }
    this.data.brand = '';
    this.data.color = '';
    this.product_list = [];
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
    this.order_total = 0;
    this.order_discount = 0;
    this.new_grand_total = 0;
    this.total_Order_amount = 0;
    for (let i = 0; i < this.add_list.length; i++) {
      this.total_qty = parseInt(this.total_qty) + parseInt(this.add_list[i]['qty']);
      this.netamount = parseFloat(this.netamount) + parseInt(this.add_list[i]['qty']) * parseFloat(this.add_list[i]['net_price']);
      this.total_Order_amount = parseFloat(this.total_Order_amount) + parseInt(this.add_list[i]['qty']) * parseFloat(this.add_list[i]['product_price']);
      this.order_discount += parseFloat(this.add_list[i].discounted_price) * parseInt(this.add_list[i]['qty']);
      this.total_gst_amount = this.add_list[i].gst_amount + this.total_gst_amount;
      this.order_total += parseFloat(this.add_list[i]['amount']);

    }
    if (this.data.gst_type == 'Gst Extra') {
      this.new_grand_total = parseFloat(this.netamount) + parseFloat(this.total_gst_amount);
    } else {
      this.new_grand_total = parseFloat(this.netamount)

    }
    this.total_qty = parseInt(this.total_qty);
    this.netamount = parseFloat(this.netamount);
    this.total_gst_amount = this.total_gst_amount;
    this.total_Order_amount = this.total_Order_amount;

  }



  save_order(type) {
    this.btndisable = true;

    this.leave = 1
    this.user_data.type = this.data.networkType;

    if (this.data['type_name'].lead_type == "Lead" && this.data['type_name'].type == "3") {
      this.data.delivery_from = this.data.delivery_from.assign_distributor_id;
    } else {
      this.data.delivery_from = this.data['type_name'].assign_distributor_id;
    }
    this.user_data.Disctype = this.type;
    this.user_data.order_discount = this.order_discount;
    this.user_data.gst_type = this.data.gst_type;
    this.user_data.SpecialDiscountLable = this.SpecialDiscountLable
    this.user_data.dr_id = this.data.type_name.id;
    this.user_data.image_data = this.image_data;this.user_data.order_list = moment(this.data.order_list || new Date()).format('YYYY-MM-DD');
    

    if (this.data.distributor_id != undefined) {
      this.user_data.distributor_id = this.data.distributor_id.id;
      console.log(this.data.distributor_id);
    }
    this.user_data.remark = this.data.remark;
    this.user_data.warehouse = this.data.warehouse;
    if (this.data.distributor_id && this.data.delivery_from) {
      this.user_data.distributor_id = this.data.delivery_from;
    }

    var orderData = { 'sub_total': this.netamount, 'dis_amt': this.dis_amt, 'grand_total': this.new_grand_total, 'total_gst_amount': this.total_gst_amount, 'total_qty': this.total_qty, 'net_total': this.netamount }
    if (type == 'draft') {
      this.btnDisableDraft = true;
    }
    if (type == 'submit') {
      this.btnDisableSave = true;
    }

    this.service.addData({ "cart_data": this.add_list, "user_data": this.user_data, "checkin_id": this.checkin_id }, "AppOrder/secondaryOrdersAdd").then(resp => {

      if (resp['statusCode'] == 200) {
        this.btnDisableDraft = false;
        this.btnDisableSave = false;
        var toastString = ''
        if (this.user_data.order_status == 'Draft') {
          this.service.successToast(resp['statusMsg'])
        }
        else {
          this.service.successToast(resp['statusMsg'])
        }
        this.navCtrl.popTo(SecondaryOrderMainPage)


      } else {
        this.service.errorToast(resp['statusMsg'])
      }
    }, error => {
      this.btndisable = false;
      this.btnDisableDraft = false;
      this.btnDisableSave = false;
      this.service.Error_msg(error);
      this.service.dismiss();
    });
  }

  resetChannel() {
    this.data.distributor_id = '';
    this.data.product_id = '';
    this.product_list = [];
    this.add_list = [];
    this.brandList = [];
    this.colorList = [];
  }

  resetForm() {
    this.data.product_id = '';
    this.product_list = [];
    this.add_list = [];
    this.brandList = [];
    this.colorList = [];
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

  remove_image(i: any) {
    this.image_data.splice(i, 1);
  }

  showLimit() {
    console.log('Image Data', this.image_data)
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: "You can upload only 6 bill images",
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

  captureImage(event) {
    console.log(event);
    let files = event.target.files;
    console.log(files)
    if (files) {
      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();
        console.log(this.image_data);

        reader.onload = (e: any) => {
          this.image_data.push(e.target.result);
          console.log(this.image_data);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  hasValidPrice() {
    return this.product_list.some(item => item.product_price != 0);
  }

}
