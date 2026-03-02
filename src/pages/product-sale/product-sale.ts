import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ViewChild } from '@angular/core';
import { PrimaryOrderMainPage } from '../primary-order-main/primary-order-main';
import { OrderCatalogueListPage } from '../order-catalogue-list/order-catalogue-list';
import { ViewProfilePage } from '../view-profile/view-profile';

@IonicPage()
@Component({
  selector: 'page-product-sale',
  templateUrl: 'product-sale.html',
})
export class ProductSalePage {
  @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;
  cartItems: any[] = [];
  url: string;

  // Party Selection Variables
  data: any = {
    networkType: '',
    type_name: null,
    segment: {}
  };
  drList: any[] = [];
  userType: string = '';
  disableSelect: boolean = false;
  disableSelectFromCheckin: boolean = false;
  order_data: any = null;
  order_item: any = null;
  add_list: any[] = [];
  search: any;
  drtype: any;
  type: any;
  // NEW: Party Lock State
  isPartyLocked: boolean = false;
  isOrdering: boolean = false;
  gstPercent: number = 5;
  checkin_id: any;

  private colorBadgeMap = {
    black: { start: '#2c3e50', end: '#000000' },
    jetblack: { start: '#1c1c1c', end: '#000000' },
    matteblack: { start: '#2f2f2f', end: '#1a1a1a' },
    charcoal: { start: '#36454f', end: '#2c3e50' },
    ebony: { start: '#0c0c0c', end: '#1a1a1a' },

    white: { start: '#ffffff', end: '#ecf0f1' },
    offwhite: { start: '#f8f8f8', end: '#eaeaea' },
    ivory: { start: '#fffff0', end: '#f5f5dc' },
    cream: { start: '#fffdd0', end: '#f3e5ab' },
    snow: { start: '#ffffff', end: '#f0f8ff' },
    pearl: { start: '#f5f5f5', end: '#dcdcdc' },

    grey: { start: '#95a5a6', end: '#7f8c8d' },
    gray: { start: '#95a5a6', end: '#7f8c8d' },
    lightgray: { start: '#dcdcdc', end: '#b0b0b0' },
    darkgray: { start: '#555555', end: '#2f2f2f' },
    slategray: { start: '#708090', end: '#2f4f4f' },
    gunmetal: { start: '#2a3439', end: '#4b5d67' },
    ash: { start: '#b2beb5', end: '#8a8a8a' },
    smoke: { start: '#848884', end: '#5f5f5f' },

    red: { start: '#ff6b6b', end: '#ee5a24' },
    darkred: { start: '#8b0000', end: '#4b0000' },
    crimson: { start: '#dc143c', end: '#a3001d' },
    scarlet: { start: '#ff2400', end: '#c21807' },
    maroon: { start: '#800000', end: '#4b0000' },
    burgundy: { start: '#800020', end: '#4a0010' },
    wine: { start: '#722f37', end: '#4b1c1c' },
    coral: { start: '#ff7f50', end: '#ff4500' },
    salmon: { start: '#fa8072', end: '#e9967a' },

    pink: { start: '#f857a6', end: '#ff5858' },
    lightpink: { start: '#ffb6c1', end: '#ff69b4' },
    hotpink: { start: '#ff1493', end: '#c71585' },
    rose: { start: '#ff007f', end: '#c2185b' },

    blue: { start: '#4facfe', end: '#00f2fe' },
    lightblue: { start: '#87cefa', end: '#00bfff' },
    darkblue: { start: '#00008b', end: '#00004b' },
    navy: { start: '#2c3e50', end: '#34495e' },
    navyblue: { start: '#1f2f46', end: '#0a1a2f' },
    skyblue: { start: '#87ceeb', end: '#4682b4' },
    steelblue: { start: '#4682b4', end: '#2c5d8a' },
    royalblue: { start: '#4169e1', end: '#27408b' },
    midnightblue: { start: '#191970', end: '#000033' },
    denim: { start: '#1560bd', end: '#0f3c78' },

    green: { start: '#56ab2f', end: '#a8e063' },
    lightgreen: { start: '#90ee90', end: '#32cd32' },
    darkgreen: { start: '#006400', end: '#013220' },
    forestgreen: { start: '#228b22', end: '#145214' },
    olive: { start: '#6b8e23', end: '#556b2f' },
    armygreen: { start: '#4b5320', end: '#2e3b1f' },
    mint: { start: '#98ff98', end: '#2ecc71' },
    emerald: { start: '#50c878', end: '#2e8b57' },
    jade: { start: '#00a86b', end: '#00755e' },

    yellow: { start: '#f7b733', end: '#fc4a1a' },
    lightyellow: { start: '#fffacd', end: '#f0e68c' },
    mustard: { start: '#ffdb58', end: '#c9a400' },
    lemon: { start: '#fff700', end: '#ffd700' },
    gold: { start: '#f7971e', end: '#ffd200' },
    goldenrod: { start: '#daa520', end: '#b8860b' },

    orange: { start: '#ff9966', end: '#ff5e62' },
    darkorange: { start: '#ff8c00', end: '#ff4500' },
    peach: { start: '#ffdab9', end: '#ffb347' },
    apricot: { start: '#fbceb1', end: '#f4a460' },
    burntorange: { start: '#cc5500', end: '#8b2500' },

    purple: { start: '#a044ff', end: '#6a3093' },
    violet: { start: '#7f00ff', end: '#e100ff' },
    indigo: { start: '#4b0082', end: '#2e0854' },
    lavender: { start: '#e6e6fa', end: '#c7b8ea' },
    plum: { start: '#dda0dd', end: '#8e4585' },
    magenta: { start: '#ff00ff', end: '#c71585' },

    brown: { start: '#a0522d', end: '#8b4513' },
    tan: { start: '#d2b48c', end: '#c19a6b' },
    chocolate: { start: '#d2691e', end: '#8b4513' },
    coffee: { start: '#6f4e37', end: '#4b3621' },
    mocha: { start: '#967969', end: '#6f4e37' },
    camel: { start: '#c19a6b', end: '#a67b5b' },

    cyan: { start: '#17ead9', end: '#6078ea' },
    teal: { start: '#11998e', end: '#38ef7d' },
    aqua: { start: '#00ffff', end: '#00bcd4' },
    turquoise: { start: '#40e0d0', end: '#20b2aa' },

    silver: { start: '#bdc3c7', end: '#95a5a6' },
    platinum: { start: '#e5e4e2', end: '#cfd2d3' },
    bronze: { start: '#cd7f32', end: '#8c6239' },
    copper: { start: '#b87333', end: '#7c482b' },
    rosegold: { start: '#f7cac9', end: '#d4a5a5' },

    neonblue: { start: '#00f0ff', end: '#007cf0' },
    neongreen: { start: '#39ff14', end: '#0aff02' },
    neonpink: { start: '#ff10f0', end: '#ff007f' },

    transparent: { start: '#ffffff00', end: '#ffffff00' },
    multicolor: { start: '#ff6b6b', end: '#4facfe' },

    default: { start: '#ff6b6b', end: '#ee5a24' }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public service: MyserviceProvider,
    private popoverCtrl: PopoverController,
    public constant: ConstantProvider,
    public modalCtrl: ModalController,
  ) {
    this.checkin_id = this.navParams.get('checkin_id')
    this.url = this.constant.upload_url1 + 'product_image/';
    this.drtype = this.navParams['data'].type || '';
    this.userType = this.navParams.get('userType') || '';
    this.order_data = this.navParams.get('order_data') || null;
    this.order_item = this.navParams.get('order_item') || null;
  }

  ionViewDidLoad() {
    if (!this.checkin_id) {
      this.disableSelect = true;
      this.loadCartFromStorage();
      this.loadPartyFromStorage();
    }
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
    const checkinId = this.navParams.get('checkin_id');

    if (checkinId) {
      this.checkin_id = checkinId;
      // 🔥 IMPORTANT: persist it
      sessionStorage.setItem('checkin_id', checkinId);

      this.disableSelectFromCheckin = true;
      this.data.networkType = this.navParams.get('dr_type');

      this.data.id = this.navParams.get('id');
      this.data.company_name = this.navParams.get('dr_name');
      this.data.display_name = this.navParams.get('display_name');

      this.distributors(this.data, '');
      return;
    }

    // fallback
    this.restoreCheckinFromStorage();
    this.loadPartyFromStorage();
  }


  restoreCheckinFromStorage() {
    const storedCheckin = sessionStorage.getItem('checkin_id');

    if (storedCheckin) {
      this.checkin_id = storedCheckin;
      this.disableSelectFromCheckin = true;
    }
  }



  // Load cart from storage
  loadCartFromStorage() {
    try {
      const savedCart = sessionStorage.getItem('orderCart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        console.log('====================================');
        console.log(this.cartItems, 'cartItems');
        console.log('====================================');
        this.cartItems.forEach(item => {
          item.uiGradient = this.getColorGradient(item.color);
          if (!item.carton_qty && item.quantity && item.box_in_pieces) {
            item.carton_qty = Math.max(
              Math.round(item.quantity / item.box_in_pieces),
              1
            );
          }
        });
      } else {
        this.cartItems = [];
      }
    } catch (e) {
      console.error('Error loading cart:', e);
      this.cartItems = [];
    }
  }

  get isLocked(): boolean {
    return !!this.checkin_id || this.isPartyLocked;
  }


  // Save cart to storage
  saveCartToStorage() {
    try {
      sessionStorage.setItem('orderCart', JSON.stringify(this.cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  // NEW: Load party selection from storage
  loadPartyFromStorage() {
    const type = sessionStorage.getItem('selectedPartyType');
    const party = sessionStorage.getItem('selectedPartyData');
    const partyId = sessionStorage.getItem('selectedPartyId');
    console.log('====================================');
    console.log(type, 'type');
    console.log(party, 'party');
    console.log('====================================');
    if (type && party && partyId) {
      this.data.networkType = type;
      this.data.type_name = JSON.parse(party);
      this.isPartyLocked = true;
    }
  }

  // loadPartyFromStorage() {
  //   try {
  //     const savedPartyType = sessionStorage.getItem('selectedPartyType');
  //     const savedPartyData = sessionStorage.getItem('selectedPartyData');
  //     const savedCheckinId = sessionStorage.getItem('checkin_id');

  //     if (savedPartyType && savedPartyData && savedCheckinId) {
  //       this.data.networkType = savedPartyType;
  //       this.data.type_name = JSON.parse(savedPartyData);
  //       this.checkin_id = JSON.parse(savedCheckinId);
  //       this.isPartyLocked = true; 


  //       this.distributors(savedPartyType, '');

  //       console.log('Party loaded from storage:', this.data.type_name);
  //     } else if (savedPartyType && savedPartyData) {
  //       this.data.networkType = savedPartyType;
  //       this.data.type_name = JSON.parse(savedPartyData);
  //       this.isPartyLocked = true;
  //     }
  //   } catch (e) {
  //     console.error('Error loading party:', e);
  //   }
  // }

  // NEW: Save party selection to storage
  savePartyToStorage() {
    if (!this.data.networkType || !this.data.type_name) return;
    sessionStorage.setItem('selectedPartyType', this.data.networkType);
    sessionStorage.setItem('selectedPartyData', JSON.stringify(this.data.type_name));
    sessionStorage.setItem('selectedPartyId', JSON.stringify(this.data.type_name.id));
    sessionStorage.setItem('partyFlag', 'true');
    this.isPartyLocked = true;
  }

  // NEW: Clear party from storage
  clearPartyFromStorage() {
    try {
      sessionStorage.removeItem('selectedPartyType');
      sessionStorage.removeItem('selectedPartyData');
      sessionStorage.removeItem('selectedPartyId');
      sessionStorage.removeItem('partyFlag');
      sessionStorage.removeItem('checkin_id');
      this.isPartyLocked = false;
      this.data.networkType = '';
      this.data.type_name = null;
      console.log('Party cleared from storage');
    } catch (e) {
      console.error('Error clearing party:', e);
    }
  }

  clearParty() {
    try {
      sessionStorage.removeItem('selectedPartyType');
      sessionStorage.removeItem('selectedPartyData');
      sessionStorage.removeItem('selectedPartyId');
      sessionStorage.removeItem('partyFlag');
      sessionStorage.removeItem('checkin_id');
      this.isPartyLocked = false;
      this.data.partyFlag = false;
      this.data.networkType = '';
      this.data.type_name = null;
      this.disableSelectFromCheckin = false;
      console.log('Party cleared from storage');
    } catch (e) {
      console.error('Error clearing party:', e);
    }
  }

  // NEW: Change party (unlock and change)
  changeParty() {
    const confirm = this.alertCtrl.create({
      title: 'Change Party?',
      message: 'Are you sure you want to change the party? This will not affect your cart items.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Change',
          handler: () => {
            this.clearPartyFromStorage();
            this.service.successToast('You can now select a different party');
          }
        }
      ]
    });
    confirm.present();
  }

  // Get total items count
  get totalItems(): number {
    return this.cartItems.length;
  }

  // Get total quantity
  get totalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get grand total amount
  get grandTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total_amount, 0);
  }

  get gstAmount(): number {
    return (this.grandTotal * this.gstPercent) / 100;
  }

  get grandTotalWithGst(): number {
    return this.grandTotal + this.gstAmount;
  }

  onGstChange() {
    if (this.gstPercent < 0) this.gstPercent = 0;
    if (this.gstPercent > 100) this.gstPercent = 100;
  }

  // Fetch distributors/dealers list
  distributors(data, masterSearch: string = '') {
    this.add_list = [];
    this.data.segment = {};
    if (this.navParams.get('checkin_id')) {
      this.service.addData({
        'dr_type': data.networkType,
        'checkin_dr_id': this.navParams.get('id'),
        'master_search': masterSearch
      }, 'AppOrder/followupCustomer').then((result) => {
        let TemData = result['result'];
        let Index = TemData.findIndex(row => row.id == this.data.id);
        console.log(Index, 'Index');


        if (Index != -1) {
          this.drList.push({
            id: TemData[Index].id,
            company_name: TemData[Index].company_name,
            display_name: TemData[Index].display_name
          });
          this.data.type_name = TemData[Index];
          this.onPartySelectedChekinId(this.data.type_name);
        }
      });
    } else {
      this.service.addData({
        'dr_type': data,
        'master_search': masterSearch
      }, 'AppOrder/followupCustomer').then((result) => {
        if (result['statusCode'] == 200) {
          this.drList = result['result'];
        } else {
          this.service.errorToast(result['statusMsg']);
        }
      });
    }
  }

  // MODIFIED: Party type changed - save to storage
  onPartyTypeChange() {
    if (this.data.networkType) {
      this.distributors(this.data.networkType, '');
      // Don't lock yet, wait for party 
    }
  }

  // MODIFIED: Party selected - save to storage
  onPartySelected(event: any) {
    if (event && event.value) {
      this.data.type_name = event.value;
      this.savePartyToStorage(); // Save and lock the party
      this.service.successToast('Party selected and locked');
    }
  }

  onPartySelectedChekinId(party) {
    console.log('testjsdfs ftest yes calng ie scesufskj');

    if (party) {
      this.data.type_name = party;
      this.savePartyToStorage(); // Save and lock the party
      this.service.successToast('Party selected and locked');
    }
  }

  updateQuantity(item, change) {
    const newCarton = (item.carton_qty || 0) + change;
    if (newCarton <= 0) {
      this.deleteItem(item);
      return;
    }
    item.carton_qty = newCarton;
    this.recalculateItem(item);
    this.saveCartToStorage();
  }


  // Handle direct quantity input
  onQuantityInput(item, event) {
    let carton = parseInt(event.target.value) || 0;

    if (carton <= 0) {
      this.deleteItem(item);
      return;
    }

    item.carton_qty = carton;

    this.recalculateItem(item);
    event.target.value = carton;

    this.saveCartToStorage();
  }

  get totalCartonQty(): number {
    return this.cartItems.reduce((s, i) => s + (i.carton_qty || 0), 0);
  }



  // Delete individual item
  deleteItem(item: any) {
    const confirm = this.alertCtrl.create({
      title: 'Delete Item',
      message: `Remove ${item.product_name} (Size: ${item.size}) from cart?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            const index = this.cartItems.indexOf(item);
            if (index > -1) {
              this.cartItems.splice(index, 1);
              this.saveCartToStorage();
              this.service.successToast('Item removed from cart');
            }
          }
        }
      ]
    });
    confirm.present();
  }

  // Clear all items
  clearCart() {
    if (this.cartItems.length === 0) {
      this.service.errorToast('Cart is already empty');
      return;
    }

    const confirm = this.alertCtrl.create({
      title: 'Clear Cart',
      message: 'Are you sure you want to remove all items from cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear All',
          handler: () => {
            this.cartItems = [];
            this.saveCartToStorage();
            this.service.successToast('Cart cleared successfully');
          }
        }
      ]
    });
    confirm.present();
  }

  closeDealer() {
    this.distributorSelectable._searchText = '';
  }

  searchParty(data, event) {
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

  // Add more items - go back to product list
  addMoreItems() {
    this.navCtrl.push(OrderCatalogueListPage, { 'partyFlag': this.data.partyFlag });
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      this.service.errorToast('Cart is empty. Please add items first.');
      return;
    }

    if (!this.data.networkType || !this.data.type_name) {
      this.service.errorToast('Please select party type and party before placing order');
      return;
    }

    // 🔥 CLEAN & CORRECT ITEMS
    const cleanedItems = this.cartItems.map(item => ({
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      size_id: item.size_id,
      size: item.size,
      size_code: item.size_code,
      color: item.color,
      price: item.price,
      // ✅ BACKEND FRIENDLY
      quantity: item.quantity,              // ACTUAL PIECES
      total_amount: item.total_amount,

      // 🔍 OPTIONAL (SAFE TO SEND)
      carton_qty: item.carton_qty,
      box_in_pieces: item.box_in_pieces
    }));

    const totalPieces = this.cartItems.reduce(
      (sum, item) => sum + item.quantity, 0
    );

    const totalCartons = this.cartItems.reduce(
      (sum, item) => sum + (item.carton_qty || 0), 0
    );

    const orderData = {
      items: cleanedItems,

      party_type: this.data.networkType,
      party_id: this.data.type_name.id,
      party_name: this.data.type_name.display_name || this.data.type_name.company_name,

      total_items: cleanedItems.length,
      total_quantity: totalPieces,     // ✅ TOTAL PIECES
      total_cartons: totalCartons,     // OPTIONAL
      grand_total: this.grandTotal,
      gst_percent: this.gstPercent,
      gst_amount: this.gstAmount,
      grand_total_with_gst: this.grandTotalWithGst,

      order_date: new Date().toISOString()
    };

    const partyName =
      this.data.type_name.display_name || this.data.type_name.company_name;

    const partyTypeName =
      this.data.networkType === '1'
        ? 'Distributor'
        : this.data.networkType === '7'
          ? 'Direct Dealer'
          : 'Retailer';

    // 🔥 CONFIRM POPUP (CLEAR INFO)
    const confirm = this.alertCtrl.create({
      title: 'Confirm Order',
      message: `
      <div style="text-align:left;padding:10px;">
        <div style="background:#e8f5e9;padding:10px;border-radius:6px;margin-bottom:12px;">
          <p><strong>Party Type:</strong> ${partyTypeName}</p>
          <p><strong>Party:</strong> ${partyName}</p>
        </div>

        <p><strong>Total Items:</strong> ${cleanedItems.length}</p>
        <p><strong>Total Cartons:</strong> ${totalCartons}</p>
        <p><strong>Total Pieces:</strong> ${totalPieces}</p>

        <p style="font-size:18px;color:#27ae60;">
          <strong>Grand Total: ₹${this.grandTotalWithGst.toFixed(2)}</strong>
          <br/><span style="font-size:12px;color:#7f8c8d;">(incl. ${this.gstPercent}% GST: ₹${this.gstAmount.toFixed(2)})</span>
        </p>

        <p style="margin-top:12px;">
          Do you want to place this order?
        </p>
      </div>
    `,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Place Order',
          handler: () => {
            this.processOrder(orderData);
          }
        }
      ]
    });

    confirm.present();
  }

  processOrder(orderData: any) {
    this.isOrdering = true;
    this.service.addData(orderData, 'AppOrder/primaryOrdersAdd').then((result) => {
      if (result['statusCode'] === 200) {
        this.isOrdering = false;
        this.service.successToast(result['statusMsg']);

        // Clear cart and party after successful order
        this.cartItems = [];
        this.saveCartToStorage();
        this.clearPartyFromStorage();

        this.navCtrl.push(PrimaryOrderMainPage);
      } else {
        this.isOrdering = false;
        this.service.errorToast(result['statusMsg'] || 'Failed to place order');
      }
    }).catch((error) => {
      this.isOrdering = false;
      this.service.errorToast('Error placing order. Please try again.');
      console.error('Order error:', error);
    });
  }

  showSuccessAlert() {
    const alert = this.alertCtrl.create({
      title: 'Order Placed! 🎉',
      message: `
        <div style="text-align: center; padding: 10px;">
          <p style="font-size: 16px; color: #27ae60; margin-bottom: 10px;">
            Your order has been placed successfully!
          </p>
          <p style="font-size: 14px; color: #7f8c8d;">
            Order Total: <strong>₹${this.grandTotal.toFixed(2)}</strong>
          </p>
        </div>
      `,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Clear cart and party after successful order
            this.cartItems = [];
            this.saveCartToStorage();
            this.clearPartyFromStorage(); // NEW: Clear party

            // Navigate back to home/product list
            this.navCtrl.popToRoot();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  showPartyName() {
    const fullName =
      this.data.type_name.display_name ||
      this.data.type_name.company_name;

    let alert = this.alertCtrl.create({
      title: 'Party Name',
      subTitle: fullName,
      buttons: ['OK']
    });

    alert.present();
  }

  getColorGradient(color: string) {
    const colorName = (color || '').toLowerCase();

    for (const key in this.colorBadgeMap) {
      if (colorName.includes(key)) {
        return this.colorBadgeMap[key];
      }
    }
    return this.colorBadgeMap['default'];
  }


  imageModal(src) {
    this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
  }


  recalculateItem(item) {
    item.quantity = item.carton_qty * item.box_in_pieces;
    item.total_amount = item.quantity * item.price;
  }
}