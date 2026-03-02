import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { ProductSalePage } from '../product-sale/product-sale';
import { CustomerCartPage } from '../customer-cart/customer-cart';
import { OrderCatalogProductDetailPage } from '../order-catalog-product-detail/order-catalog-product-detail';

/**
 * Generated class for the OrderWishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-wishlist',
  templateUrl: 'order-wishlist.html',
})
export class OrderWishlistPage {

  @ViewChild('categoryTabs', { read: ElementRef }) categoryTabsRef: ElementRef;

  selectedCategory: string = 'All';
  searchQuery: string = '';

  url: string;
  type: any;
  totalCartQuantity: any;
  pageTitle: any;
  wishList: any[] = [];
  finalDisplayList: any[] = [];



  // Modal variables
  isModalOpen: boolean = false;
  selectedProduct: any = null;
  categoryData: any;
  soleType: any;

  constructor(
    public navCtrl: NavController,
    public constant: ConstantProvider,
    public navParams: NavParams,
    public service: MyserviceProvider
  ) {
    this.url = this.constant.upload_url1 + 'product_image/';
  }

  ionViewDidLoad() {
    this.getStockList();
    this.loadCartQuantity();
  }

  ionViewWillEnter() {
    this.loadCartQuantity();
  }

  loadCartQuantity() {
    try {
      const savedCart = sessionStorage.getItem('orderCart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        this.totalCartQuantity = cartItems.reduce((sum, item) => sum + item.carton_qty, 0);
      } else {
        this.totalCartQuantity = 0;
      }
    } catch (e) {
      console.error('Error loading cart quantity:', e);
      this.totalCartQuantity = 0;
    }
  }

  getStockList() {
    this.service.addData({ }, 'AppOrder/getWishList').then((r) => {
      if (r['statusCode'] === 200) {
        this.wishList = r['wishlist'] || [];
        this.finalDisplayList = [...this.wishList];
      } else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }

  goToPlaceOrder(product: any) {
    this.navCtrl.push(OrderCatalogProductDetailPage, { product: product });
  }

  goBack() {
    this.navCtrl.pop();
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value || '';
  }

  goToCart() {
    if (this.constant.UserLoggedInData.loggedInUserType == 'Employee') {
      this.navCtrl.push(ProductSalePage);
    } else {
      this.navCtrl.push(CustomerCartPage);
    }
  }

  handleImageError(event: any) {
    // Hide the broken image and show placeholder instead
    event.target.style.display = 'none';
    const placeholder = event.target.parentElement.querySelector('.no-image-placeholder');
    if (!placeholder) {
      const placeholderDiv = document.createElement('div');
      placeholderDiv.className = 'no-image-placeholder';
      placeholderDiv.innerHTML = `
      <ion-icon name="image-outline"></ion-icon>
      <div class="no-image-text">No Image Available</div>
    `;
      event.target.parentElement.appendChild(placeholderDiv);
    }
  }
}