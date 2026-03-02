import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { PlaceOrderPage } from '../place-order/place-order';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { ViewProfilePage } from '../view-profile/view-profile';
import { log } from 'util';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-order-catalog-product-detail',
  templateUrl: 'order-catalog-product-detail.html',
})
export class OrderCatalogProductDetailPage {
  @ViewChild('productSlides') productSlides: Slides;

  productName: string = 'BOSTON-01';
  productPrice: number = 679;
  data : any = {};
  availableColors : any[] = []
  
  bannerImage: string = 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&q=80';

  selectedColorIndex: number = 0;
  currentSlideIndex: number = 0;
  isWishlisted: boolean = false;
  url: string;
  product_code: any;
  productDetailName : any ={};
  productDetailBanner : any ={};
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
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public service: MyserviceProvider,
    public constant: ConstantProvider,
    public modalCtrl: ModalController,
    public actionsheet: ActionSheetController,
    public socialSharing: SocialSharing,
  ) {
    this.url = this.constant.upload_url1 + 'product_image/';
    const product = this.navParams.get('product');
    const product_banner = this.navParams.get('product_banner');
    this.productDetailName = product
    if (product) {
      this.productDetailName = product
      this.productName = product.product_name || this.productName;
      this.product_code = product.product_code || this.product_code;
      this.productPrice = product.mrp || this.productPrice;
      this.data.id = product.id;
      if (product.colors && product.colors.length > 0) {
        this.availableColors = product.colors;
      }
      if (product.selectedColorIndex !== undefined) {
        this.selectedColorIndex = product.selectedColorIndex;
      }
    }
    if(product_banner){
      this.productDetailBanner = product_banner;
      this.data.id = product_banner.product_id;
      this.productPrice = product_banner.mrp || this.productPrice;
    }
  }


  ionViewDidLoad() {
    this.getProductDetail(this.data.id);
    setTimeout(() => {
      if (this.productSlides) {
        this.productSlides.slideTo(this.selectedColorIndex, 0);
      }
    }, 100);
  }

  ionViewDidEnter() {
    if (this.productSlides) {
      this.productSlides.ionSlideDidChange.subscribe(() => {
        this.onSlideChange();
      });
    }
  }

  getProductDetail(id: any) {
    this.service.addData({ id }, 'AppOrder/getProductdetail').then((r) => {
      if (r['statusCode'] === 200) {
        this.isWishlisted = !!r['item_detail'][0].is_wishlist;
        this.availableColors = (r['item_detail'] || []).filter(
          (item, index, self) =>
            index === self.findIndex(c => c.color_name === item.color_name)
        );
        this.availableColors.forEach(color => {
          color.uiGradient = this.getColorGradient(color.color_name);
          color.isLightBg = this.isLightColor(color.uiGradient.start);
        }); 
      } else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }

  onSlideChange() {
    if (this.productSlides) {
      const index = this.productSlides.getActiveIndex();
      if (
        index !== undefined &&
        index >= 0 &&
        index < this.availableColors.length
      ) {
        this.currentSlideIndex = index;
        this.selectedColorIndex = index;
        console.log('Slide changed to index:', index);
      }
    }
  }


  selectColor(index: number) {
    this.selectedColorIndex = index;
    this.currentSlideIndex = index;
    if (this.productSlides) {
      this.productSlides.slideTo(index, 300);
    }
    // this.presentToast(`${this.availableColors[index].name} selected`, 1500);
  }

  toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
    this.service.addData({ 'product_id': this.data.id , 'flag': this.isWishlisted==true?1:0}, 'AppOrder/addWishList').then((r) => {
      if (r['statusCode'] === 200) {
        if(r['flag']==1){
          this.service.successToast((r['statusMsg']));
        } else {
          this.service.errorToast(r['statusMsg']);
        }
      } else {
        this.service.errorToast(r['statusMsg']);
      }
    });
   
  }

  imageModal(src) {
    this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
  }

  placeOrder(){
    if(this.productDetailName)
      this.navCtrl.push(PlaceOrderPage , {'productDetail' : this.productDetailName})
    else if(this.productDetailBanner)
      this.navCtrl.push(PlaceOrderPage , {'productStockBanner' : this.productDetailBanner})
  }

  // placeOrderBanner(){
  // }

  goBack() {
    this.navCtrl.pop();
  }

  presentToast(message: string, duration: number = 2000) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom',
      cssClass: 'custom-toast'
    });
    toast.present();
  }

  selectedproduct :any ={}
  shareProduct() {
    const selectedColor = this.availableColors[this.selectedColorIndex];
    this.selectedproduct  = selectedColor
    let shareDatas
    let imagePath
    imagePath = this.url+this.selectedproduct.image;
    shareDatas = (`Product Name : + ${this.productName} - ${this.selectedproduct.color}` + "\n" + "Product Code : " + this.product_code + "\n" + "Brand : " + 'Lehar Product' + "\n" +
      "Mrp : " + this.selectedproduct.mrp + "\n" + "Online Mrp : "  + this.selectedproduct.online_mrp )

    let shareActionSheet = this.actionsheet.create({
      title: 'Share',
      cssClass: 'cs-actionsheet',
      buttons: [
        {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.socialSharing.shareViaWhatsApp(shareDatas, imagePath, null).then((e) => {
            }).catch((r) => {
            })
          }
        },
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            this.socialSharing.share(shareDatas, null, imagePath, null).then((e) => {
              console.log(e + "succes");

            }).catch((r) => {
              console.log(r);

            })
          }
        },
        {
          cssClass: 'cs-cancel',
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    })
    shareActionSheet.present();
  }

  downloadImage(imageUrl: string, event: any) {
    event.stopPropagation();
    this.socialSharing.share('Product Image', null, imageUrl, null)
      .then(() => {
        this.presentToast('📥 Image downloaded successfully!', 2000);
      })
      .catch((error) => {
        console.log('Download error:', error);
        this.presentToast('Unable to download image', 2000);
      });
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