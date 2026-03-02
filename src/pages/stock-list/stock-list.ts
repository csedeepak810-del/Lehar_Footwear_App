import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { ProductSalePage } from '../product-sale/product-sale';
import { CustomerCartPage } from '../customer-cart/customer-cart';
import { OrderCatalogProductDetailPage } from '../order-catalog-product-detail/order-catalog-product-detail';
import { log } from 'util';

@IonicPage()
@Component({
  selector: 'page-stock-list',
  templateUrl: 'stock-list.html',
})
export class StockListPage {

  @ViewChild('categoryTabs', { read: ElementRef }) categoryTabsRef: ElementRef;

  selectedCategory: string = 'All';
  searchQuery: string = '';

  url: string;
  type: any;
  totalCartQuantity: any;
  pageTitle: any;
  gender: any;

  categoryList: any = [];
  CategoryName: any;
  CategoryId: any;

  stockList: any[] = [];
  categoryProductList: any[] = [];
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
    this.getCategoryList();
    this.url = this.constant.upload_url1 + 'product_image/';
    this.type = this.navParams.get('type');
    this.gender = this.navParams.get('gender');
    this.categoryData = this.navParams.get('categoryData');
    this.soleType = this.navParams.get('soleType');
  }

  ionViewDidLoad() {
    console.log(this.gender, 'this.gender');

    if (this.gender) {
      this.getProductList();
    } else {
      this.getStockList(this.type);
    }
    this.loadCartQuantity();

  }

  ionViewWillEnter() {
    // Refresh cart quantity when entering the page
    this.loadCartQuantity();
  }

  // Load cart quantity from storage
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

  selectCategory(categoryId: string) {
    console.log(categoryId, 'categoryId');
    this.selectedCategory = categoryId;

    const selectCategoryIndex = this.categoryList.find(c => c.id === categoryId);
    console.log(selectCategoryIndex, 'selectCategoryIndex');

    if (selectCategoryIndex) {
      this.CategoryName = selectCategoryIndex.category;
    } else {
      this.CategoryName = this.categoryData.name || '';
    }

    this.getProductList();

    // Auto scroll to selected category
    this.scrollToActiveCategory(categoryId);

    console.log('Selected Category ID:', categoryId);
  }

  // Auto scroll to active category
  scrollToActiveCategory(categoryId: string) {
    setTimeout(() => {
      if (this.categoryTabsRef && this.categoryTabsRef.nativeElement) {
        const container = this.categoryTabsRef.nativeElement;
        const activeButton = container.querySelector(`[data-category-id="${categoryId}"]`);

        if (activeButton) {
          const containerWidth = container.offsetWidth;
          const buttonLeft = activeButton.offsetLeft;
          const buttonWidth = activeButton.offsetWidth;

          // Calculate scroll position to center the button
          const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

          // Smooth scroll to position
          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }

  getCategoryList() {
    this.service.addData({}, 'AppOrder/segmentList').then((resp) => {
      if (resp['statusCode'] == 200) {
        this.categoryList = resp['result'];
        if (this.categoryData && this.categoryData.id) {
          this.selectCategory(this.categoryData.id);
        }
      } else {
        this.service.errorToast(resp['statusMsg']);
      }
    });
  }

  getProductList() {
    this.service
      .addData(
        {
          cat_name: this.CategoryName ? this.CategoryName : this.gender,
          cat_id: this.selectedCategory,
          search: this.searchQuery
        },
        'AppOrder/getStockProductList'
      )
      .then((resp) => {
        if (resp['statusCode'] === 200) {
          this.categoryProductList = resp['stockProducts'] || [];
          this.finalDisplayList = [...this.categoryProductList];
          console.log(this.finalDisplayList, 'this.finalDisplayList');
        } else {
          this.service.errorToast(resp['statusMsg']);
        }
      });
  }

  getStockList(type: any) {
    this.service.addData({ 'type': type, 'sole_type': this.soleType, 'search': this.searchQuery }, 'AppOrder/getProductWithFilters').then((r) => {
      if (r['statusCode'] === 200) {
        this.stockList = r['stockProducts'] || [];
        this.finalDisplayList = [...this.stockList];
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
    this.getProductList();
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