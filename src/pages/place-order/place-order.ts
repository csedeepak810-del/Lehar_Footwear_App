import { Component, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { StockListPage } from '../stock-list/stock-list';
import { CustomerCartPage } from '../customer-cart/customer-cart';
import { ViewProfilePage } from '../view-profile/view-profile';
import { PrimaryOrderDetailPage } from '../primary-order-detail/primary-order-detail';

@IonicPage()
@Component({
  selector: 'page-place-order',
  templateUrl: 'place-order.html',
})
export class PlaceOrderPage {

  product: any;
  productDetail: any = {};
  colorVariants: any[] = [];
  url: string;
  cartItems: any[] = [];

  // Flag to track if popup has been shown
  private hasShownRepeatOrderPopup = false;

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
  data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public service: MyserviceProvider,
    public constant: ConstantProvider,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public modalCtrl: ModalController,
  ) {
    this.url = this.constant.upload_url1 + 'product_image/';
    const product = this.navParams.get('productDetail');
    const product_banner = this.navParams.get('productStockBanner');
    if (product) {
      this.data.id = product.id;
    }
    console.log(product_banner, 'product_banner');
    if (product_banner) {
      this.data.id = product_banner.product_id;
    }
    this.product = product || product_banner || {};

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceOrderPage');
    this.loadCartFromStorage();
    this.getMainStockList();
  }

  ionViewWillEnter() {
    this.loadCartFromStorage();
  }

  loadCartFromStorage() {
    try {
      const savedCart = sessionStorage.getItem('orderCart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Error loading cart:', e);
      this.cartItems = [];
    }
  }

  saveCartToStorage() {
    try {
      sessionStorage.setItem('orderCart', JSON.stringify(this.cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  get totalCartQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.carton_qty, 0);
  }

  getMainStockList() {
    const partyDrId = sessionStorage.getItem('selectedPartyId');
    this.service.addData({ 'product_id': this.data.id, 'dr_id': partyDrId }, 'AppOrder/stockList').then((r) => {
      if (r['statusCode'] === 200) {
        this.colorVariants = r['sizes'] || [];

        this.colorVariants.forEach((variant, index) => {
          variant.master_product_size.forEach(size => {
            size.quantity = 0;
            size.stock = parseInt(size.stock) || 0;
            size.alternate_uom_quantitywise = parseInt(size.alternate_uom_quantitywise);
          });
        });

        this.colorVariants.forEach(variant => {
          variant.uiGradient = this.getColorGradient(variant.color);
          variant.isLightBg = this.isLightColor(variant.uiGradient.start);
        });

        console.log('Color Variants:', this.colorVariants);
      } else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }

  isStockAvailable(sizeItem: any): boolean {
    const availableStock = parseInt(sizeItem.stock) || 0;
    return availableStock > 0;
  }

  get totalQuantity(): number {
    let total = 0;
    this.colorVariants.forEach(variant => {
      variant.master_product_size.forEach(size => {
        total += (size.quantity || 0);
      });
    });
    return total;
  }

  get totalPairs(): number {
    // Total actual pairs (frontend qty * carton qty)
    let total = 0;
    this.colorVariants.forEach(variant => {
      variant.master_product_size.forEach(size => {
        const frontendQty = size.quantity || 0;
        const cartonQty = parseInt(size.alternate_uom_quantitywise);
        total += (frontendQty * cartonQty);
      });
    });
    return total;
  }

  get totalAmount(): number {
    let total = 0;
    this.colorVariants.forEach(variant => {
      variant.master_product_size.forEach(size => {
        const itemPrice = parseFloat(variant.mrp) || parseFloat(this.product.price) || 0;
        const frontendQty = size.quantity || 0;
        // Backend calculation: multiply frontend qty with carton qty
        const cartonQty = parseInt(size.alternate_uom_quantitywise);
        const actualQty = frontendQty * cartonQty;
        total += (itemPrice * actualQty);
      });
    });
    return total;
  }

  increaseQuantity(sizeItem: any, variant: any) {


    if (!sizeItem.alternate_uom_quantitywise || sizeItem.alternate_uom_quantitywise <= 0) {
      this.service.errorToast('Box quantity is not configured for this item. Please contact admin.');
      return;
    }

    if (!sizeItem.quantity) {
      sizeItem.quantity = 0;
    }

    // Frontend per sirf +1 dikhega
    sizeItem.quantity++;

    // Check if popup should be shown (only once and only on first quantity change)
    this.checkAndShowRepeatOrderPopup(variant);
  }

  decreaseQuantity(sizeItem: any) {
    if (!sizeItem.quantity) {
      sizeItem.quantity = 0;
    }

    if (sizeItem.quantity > 0) {
      sizeItem.quantity--;
    }
  }

  onQuantityChange(sizeItem: any, event: any, variant: any) {


    const inputValue = event.target.value;
    let quantity = parseInt(inputValue) || 0;

    if (!sizeItem.alternate_uom_quantitywise || sizeItem.alternate_uom_quantitywise <= 0) {
      this.service.errorToast('Box quantity is not configured for this item. Please contact admin.');
      quantity = 0;
      sizeItem.quantity = 0
      return;
    }

    if (quantity < 0) {
      quantity = 0;
    }

    const oldQty = sizeItem.quantity || 0;
    sizeItem.quantity = quantity;

    if (oldQty === 0 && quantity > 0) {
      this.checkAndShowRepeatOrderPopup(variant);
    }
  }

  checkAndShowRepeatOrderPopup(variant: any) {
    if (this.hasShownRepeatOrderPopup) {
      return;
    }
    this.getRepeatProductShowing(variant);
  }

  getRepeatProductShowing(variant: any) {
    const partyDrId = sessionStorage.getItem('selectedPartyId');
    this.service.addData({
      'dr_id': partyDrId,
      'variant_id': variant.id
    }, 'AppOrder/popUPPreviousOrders').then((r) => {
      if (r['statusCode'] === 200) {
        this.showRepeatOrderAlert(r['statusMsg'] || 'You have ordered this item before!', r['order_id']);
        this.hasShownRepeatOrderPopup = true;
      }
      console.log('Repeat order check:', r);
    }).catch(err => {
      console.error('Error checking repeat orders:', err);
    });
  }

  showRepeatOrderAlert(message: string, order_id) {
    console.log(order_id, 'variant');
    const alert = this.alertCtrl.create({
      title: '🔔 Previous Order Found',
      message: `<div class="repeat-order-message">${message}</div>`,
      cssClass: 'repeat-order-alert',
      buttons: [
        {
          text: '📋 View My Orders',
          cssClass: 'view-orders-btn',
          handler: () => {
            this.navCtrl.push(PrimaryOrderDetailPage, { 'order_id': order_id });
          }
        },
        {
          text: '✅ Continue Shopping',
          cssClass: 'continue-btn',
          handler: () => {

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  addToCart() {
    if (this.totalQuantity === 0) {
      this.service.errorToast('Please select at least one size');
      return;
    }

    let addedCount = 0;

    this.colorVariants.forEach(variant => {
      const selectedSizes = variant.master_product_size.filter(s => s.quantity > 0);

      selectedSizes.forEach(sizeItem => {
        const existingIndex = this.cartItems.findIndex(
          item => item.product_id === this.product.id &&
            item.size_id === sizeItem.id &&
            item.color === variant.color
        );

        const itemPrice = parseFloat(variant.mrp) || parseFloat(this.product.price) || 0;

        // Calculate actual quantity (frontend qty * carton qty)
        const frontendQty = sizeItem.quantity || 0;
        const boxQty = parseInt(sizeItem.alternate_uom_quantitywise)
        const cartonQty = parseInt(sizeItem.alternate_uom_quantitywise);
        const actualQty = frontendQty * cartonQty;

        if (existingIndex > -1) {
          this.cartItems[existingIndex].quantity += actualQty;
          this.cartItems[existingIndex].total_amount =
            this.cartItems[existingIndex].quantity * this.cartItems[existingIndex].price;
        } else {
          this.cartItems.push({
            product_id: this.product.id,
            product_name: this.product.product_name,
            product_code: this.product.badge,
            product_image: variant.image,
            size_id: sizeItem.id,
            size: sizeItem.size,
            size_code: sizeItem.size_code,
            color: variant.color,
            price: itemPrice,
            carton_qty: frontendQty,          // ✅ NEW
            box_in_pieces: boxQty,
            quantity: actualQty, // Backend mein actual qty save hogi
            stock: sizeItem.stock,
            total_amount: itemPrice * actualQty
          });
        }
        addedCount++;
      });
    });

    this.saveCartToStorage();
    this.service.successToast(`${addedCount} item(s) added to cart`);
    this.resetQuantities();
  }

  resetQuantities() {
    this.colorVariants.forEach(variant => {
      variant.master_product_size.forEach(s => s.quantity = 0);
    });
  }

  buyMore() {
    if (this.totalQuantity > 0) {
      this.addToCart();
    }
    setTimeout(() => {
      this.navCtrl.pop();
    }, 500);
  }

  viewCart() {
    if (this.totalQuantity > 0) {
      this.addToCart();
    }

    if (this.cartItems.length === 0) {
      this.service.errorToast('Cart is empty');
      return;
    }

    if (this.constant.UserLoggedInData.loggedInUserType == 'Employee') {
      this.navCtrl.push('ProductSalePage');
    } else {
      this.navCtrl.push(CustomerCartPage);
    }
  }

  goBack(totalCartQuantity: number) {
    if (this.totalQuantity > 0) {
      const confirm = this.alertCtrl.create({
        title: 'Unsaved Items',
        message: 'Add items to cart before going back?',
        buttons: [
          {
            text: 'Discard',
            role: 'cancel',
            handler: () => {
              this.navCtrl.push(StockListPage, { totalCartQuantity: totalCartQuantity });
            }
          },
          {
            text: 'Add to Cart',
            handler: () => {
              this.addToCart();
              setTimeout(() => {
                this.navCtrl.push(StockListPage, { totalCartQuantity: totalCartQuantity });
              }, 500);
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.navCtrl.push(StockListPage, { totalCartQuantity: totalCartQuantity });
    }
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


  isLightColor(hex: string): boolean {
    if (!hex) return false;

    hex = hex.replace('#', '');

    // short hex support (#fff)
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 200; // >200 = light color
  }

}