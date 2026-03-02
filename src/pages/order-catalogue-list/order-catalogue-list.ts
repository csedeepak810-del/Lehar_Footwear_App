import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StockListPage } from '../stock-list/stock-list';
import { DashboardNewPage } from '../dashboard-new/dashboard-new';
import { ContractorMeetListPage } from '../Contractor-Meet/contractor-meet-list/contractor-meet-list';
import { LeaveListPage } from '../leave-list/leave-list';
import { DashboardPage } from '../dashboard/dashboard';
import { LmsLeadListPage } from '../sales-app/new-lead/lms-lead-list/lms-lead-list';
import { ExpenseListPage } from '../expense-list/expense-list';
import { AttendenceNewPage } from '../attendence-new/attendence-new';
import { CheckinNewPage } from '../checkin-new/checkin-new';
import { EndCheckinPage } from '../sales-app/end-checkin/end-checkin';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { CustomerDashboardPage } from '../customer-dashboard/customer-dashboard';
import { ProductSalePage } from '../product-sale/product-sale';
import { CustomerCartPage } from '../customer-cart/customer-cart';
import { OrderCatalogProductDetailPage } from '../order-catalog-product-detail/order-catalog-product-detail';
import { OrderWishlistPage } from '../order-wishlist/order-wishlist';

@IonicPage()
@Component({
  selector: 'page-order-catalogue-list',
  templateUrl: 'order-catalogue-list.html',
})
export class OrderCatalogueListPage {
  bannerURL: any = '';
  url: any = '';
  filter: any = {};
  userDetails: any = {};
  dashboardData: any = {};
  UserType: any = '';
  partyFlag: any = false;
  isWishlisted: any = true;
  // Thala Favourites Data (Static Celebrity Image + Scrollable Products)
  thalaFavourites = {
    celebrityImage: 'assets/imgs/dhoni.png', // MS Dhoni image
    celebrityName: 'LEHAR',
    title: 'FAVOURITES',
  };

  // Explore by Gender
  exploreByGender = [
    {
      id: 1,
      name: 'Men',
      image: 'https://media.istockphoto.com/id/539282467/photo/man-working-in-a-small-business-retailer-at-shoe-store.jpg?s=2048x2048&w=is&k=20&c=Cf6Ff8Re8uifnQKrF6mYRxxvvq7ThtYzMjF8sU1YNrE=',
      category: 'Male'
    },
    {
      id: 2,
      name: 'Kids',
      image: 'https://media.istockphoto.com/id/1166331276/photo/pulling-the-right-strings-to-make-a-bow.jpg?s=2048x2048&w=is&k=20&c=kOPv_7ouQcSZX3_ObfAffrBJHbAreVGSFuiT_qE30HA=',
      category: 'Kids'
    },
    {
      id: 3,
      name: 'Womens',
      image: 'https://media.istockphoto.com/id/1306461431/photo/happy-casual-woman-lying-on-the-floor-over-pastel-background-lady-cute-provence-concept-high.jpg?s=2048x2048&w=is&k=20&c=WmepJXIRpMODCu8ztOeAEmASURLBJ75suWkKIaiiaY4=',
      category: 'Female'
    },
    {
      id: 4,
      name: 'Unisex',
      image: 'https://media.istockphoto.com/id/637316964/photo/cheerful-asian-businessman-sitting-at-meeting.jpg?s=2048x2048&w=is&k=20&c=0sowqfnyM4I5HZGH5SIbmzLsARfQqOD7sKHLaaHQfK0=',
      category: 'Footwear'
    }
  ];

  // Explore by Gender
  exploreByCategories = [
    {
      id: 18,
      name: 'Walking Shoe',
      image: 'https://images.unsplash.com/photo-1567184946428-4bb779dafece?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzJTIwY2F0LXdhbGtpbmclMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
      icon: 'walk'
    },
    {
      id: 2,
      name: 'Slippers',
      image: 'https://images.unsplash.com/photo-1574203128190-9e750ce771dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzJTIwY2F0LXNsaXBwZXJzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D',
      icon: 'business'
    },
    {
      id: 5,
      name: 'Kids',
      image: 'https://plus.unsplash.com/premium_photo-1670509096112-995f9414ca01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvZXMlMjBjYXQta2lkcyUyMGltYWdlfGVufDB8fDB8fHww',
      icon: 'happy'
    },
    {
      id: 6,
      name: 'Sports Sandal',
      image: 'https://media.istockphoto.com/id/90858458/photo/the-cat-and-shoe.webp?a=1&b=1&s=612x612&w=0&k=20&c=8PO19L5I5pry21e-LwWt3ND4tCFXUktenCkyu3zY7g8=',
      icon: 'football'
    },
    {
      id: 20,
      name: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1561991524-9eaa9f7d910b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXMlMjBjYXQlMjBzbmVoYXJrZXJzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D',
      icon: 'trending-up'
    },
    {
      id: 11,
      name: 'Kids Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-f52d724204b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
      icon: 'flower'
    },
    {
      id: 25,
      name: 'FootWear Shoes',
      image: 'https://images.unsplash.com/photo-1641997463679-8c09097d9a10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHNob2UlMjBmb290d2VhcnxlbnwwfHwwfHx8MA%3D%3D',
      icon: 'star'
    },
    {
      id: 21,
      name: 'Life Style Shoes',
      image: 'https://images.unsplash.com/photo-1549290127-7f758fdadff7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZSUyMExJRkVTVFlMTEV8ZW58MHx8MHx8fDA%3D',
      icon: 'basketball'
    }
  ];

  // Explore by Collections
  exploreByCollections = [
    {
      id: 1,
      name: 'Full Black Shoe',
      image: 'https://images.unsplash.com/photo-1693143770459-7d7b9384264e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2UlMjBpbWFnZSUyMGRjb2xsZWN0aW9uLWJsYWNrfGVufDB8fDB8fHww',
      theme: 'dark'
    },
    {
      id: 2,
      name: 'False Lacing',
      image: 'https://images.unsplash.com/photo-1699779328050-3f46eee46bf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2UlMjBpbWFnZSUyMGNvbGxlY3Rpb24tbGFjaW5nfGVufDB8fDB8fHww',
      theme: 'light'
    },
    {
      id: 3,
      name: 'Navy Blue',
      image: 'https://images.unsplash.com/photo-1574565083763-40de4ea4cd9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2UlMjBpbWFnZSUyMGNvbGxlY3Rpb24tbmF2eXxlbnwwfHwwfHx8MA%3D%3D',
      theme: 'blue'
    },
    {
      id: 4,
      name: 'White Shading',
      image: 'https://images.unsplash.com/photo-1629937757554-84e1271f0507?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZSUyMGltYWdlJTIwY29sbGVjdGlvbi13aGl0ZXxlbnwwfHwwfHx8MA%3D%3D',
      theme: 'white'
    }
  ];



  // Banner Promotions with Dynamic Discount Support
  // Enhanced Clearance Sale Banner - SINGLE ATTRACTIVE BANNER
  clearanceSale = {
    enabled: true, // Control from web panel
    discount: 70, // Dynamic discount from web panel
    title: 'MEGA CLEARANCE',
    subtitle: 'FINAL STOCK',
    tagline: 'Everything Must Go!',
    endDate: '2026-02-15', // Sale end date
    features: [
      { icon: 'flash', text: 'Limited Stock' },
      { icon: 'timer', text: 'Ends Soon' },
      { icon: 'pricetag', text: 'Best Deals' }
    ],
    buttonText: 'Shop Now',
    bgImage: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop', // Background shoe image
    colors: {
      primary: '#FF4757',
      secondary: '#FF6348',
      accent: '#FFD700'
    }
  };

  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 16,
    freeMode: true,
    pagination: false,
    breakpoints: {
      640: {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 24
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 28
      }
    }
  };

  soleTypes = [
    {
      name: 'HAWAI',
      image: 'https://images.unsplash.com/photo-1625318880107-49baad6765fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNvbGUlMjBIQVdBSSUyMHNob2VzfGVufDB8fDB8fHww',
      icon: 'sunny',
      badgeColor: 'linear-gradient(135deg, #FF9A56 0%, #FF6B35 100%)',
      type: 'hawai'
    },
    {
      name: 'EVA',
      image: 'https://images.unsplash.com/photo-1664798901489-b256769c5800?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvbGUlMjBFVkElMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
      icon: 'flash',
      badgeColor: 'linear-gradient(135deg, #FFD93D 0%, #FF9F1C 100%)',
      type: 'eva'
    },
    {
      name: 'PU',
      image: 'https://media.istockphoto.com/id/1768102948/photo/a-pair-of-womens-black-casual-loafers.jpg?s=612x612&w=0&k=20&c=dAgIUbmHkXDhhrKR25G_xJFFhgJ_YjIqQKoXFUSvTCI=',
      icon: 'star',
      badgeColor: 'linear-gradient(135deg, #FFE66D 0%, #FFCA3A 100%)',
      type: 'pu'
    },
    {
      name: 'PHYLON',
      image: 'https://media.istockphoto.com/id/178869206/photo/exercising-shoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=yG6TAiTmxQCpzAEhhCQG-kb9UR1PooeK7QQPLiaGsj8=',
      icon: 'bolt',
      badgeColor: 'linear-gradient(135deg, #FFA940 0%, #FF7F11 100%)',
      type: 'phylon'
    },
    {
      name: 'RUBBER',
      image: 'https://images.unsplash.com/photo-1584590069631-1c180f90a54c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sZSUyMFJVQkJFUiUyMHNob2VzfGVufDB8fDB8fHww',
      icon: 'water',
      badgeColor: 'linear-gradient(135deg, #6B9EFF 0%, #4A5FFF 100%)',
      type: 'rubber'
    },
    {
      name: 'TPR',
      image: 'https://plus.unsplash.com/premium_photo-1762780827682-51aa29e4f946?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
      icon: 'leaf',
      badgeColor: 'linear-gradient(135deg, #6BCF7F 0%, #2DD881 100%)',
      type: 'tpr'
    },
    {
      name: 'TPU',
      image: 'https://images.unsplash.com/photo-1616696038562-574c18066055?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNvbGUlMjBUUFUlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
      icon: 'analytics',
      badgeColor: 'linear-gradient(135deg, #8B7FFF 0%, #6B5FFF 100%)',
      type: 'tpu'
    },
    {
      name: 'PVC',
      image: 'https://media.istockphoto.com/id/1354779095/photo/pair-of-black-waterproof-rubber-boots.webp?a=1&b=1&s=612x612&w=0&k=20&c=bSYgq4z6FVN8F9zaYGd7UY6AxuNNjgY22tNtfb-Dzp4=',
      icon: 'flame',
      badgeColor: 'linear-gradient(135deg, #FF6B9D 0%, #FF4081 100%)',
      type: 'pvc'
    },
    {
      name: 'VIBRAM',
      image: 'https://media.istockphoto.com/id/826421124/photo/blue-sport-sandals-on-a-wooden-base-with-vibram-sole.webp?a=1&b=1&s=612x612&w=0&k=20&c=QBZg_h1ePhZDLbssMKz1fx-AYntg9eaP2L-9BtFhCxI=',
      icon: 'fitness',
      badgeColor: 'linear-gradient(135deg, #4A5568 0%, #1A202C 100%)',
      type: 'vibram'
    },
    {
      name: 'LEATHER',
      image: 'https://media.istockphoto.com/id/1256443876/photo/men-fashion-brown-shoe-leather-over-gray-background.webp?a=1&s=612x612&w=0&k=20&c=VWc3LGH6wNAoBO3TaP3c2jqy8qGy4LpWZoOHXZlhrKM=',
      icon: 'briefcase',
      badgeColor: 'linear-gradient(135deg, #B8860B 0%, #8B4513 100%)',
      type: 'leather'
    },
    {
      name: 'AIR SOLE',
      image: 'https://images.unsplash.com/photo-1673231550589-a665697278fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8',
      icon: 'cloud',
      badgeColor: 'linear-gradient(135deg, #4DD0E1 0%, #0288D1 100%)',
      type: 'air-sole'
    },
    {
      name: 'MD SOLE',
      image: 'https://images.unsplash.com/photo-1587269086218-a8c538f1c6bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8',
      icon: 'ribbon',
      badgeColor: 'linear-gradient(135deg, #9CCC65 0%, #66BB6A 100%)',
      type: 'md-sole'
    },
    {
      name: 'CREPE',
      image: 'https://images.unsplash.com/photo-1559719722-c9d0253d164a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUzfHx8ZW58MHx8fHx8',
      icon: 'rose',
      badgeColor: 'linear-gradient(135deg, #F48FB1 0%, #EC407A 100%)',
      type: 'crepe'
    },
    {
      name: 'CORK',
      image: 'https://plus.unsplash.com/premium_photo-1728686815323-2db717fbc930?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8',
      icon: 'nutrition',
      badgeColor: 'linear-gradient(135deg, #D4A373 0%, #B8860B 100%)',
      type: 'cork'
    },
    {
      name: 'WOODEN',
      image: 'data:image/jpeg;base64,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',
      icon: 'hammer',
      badgeColor: 'linear-gradient(135deg, #D2691E 0%, #A0522D 100%)',
      type: 'wooden'
    }
  ];



  constructor(public navCtrl: NavController, public navParams: NavParams, public constant: ConstantProvider, public service: MyserviceProvider) {
    this.bannerURL = this.constant.upload_url1 + 'banner/';
    this.url = this.constant.upload_url1 + 'product_image/';

  }


  ionViewWillEnter() {
    this.partyFlag = sessionStorage.getItem('partyFlag') === 'true';
    this.getDashBoardData();
    this.bannerDetail();
    this.getNewArrvalsList();
    this.getStockInwordTodayList();
    this.getHandpickedForYouList();
    this.getThalaFavouritesList();
    //  this.getSaleShoesDisList();
    this.getSpecialCollectionList();
  }

  doRefresh(refresher) {
    this.getDashBoardData();
    this.bannerDetail();
    this.getNewArrvalsList();
    this.getStockInwordTodayList();
    this.getHandpickedForYouList();
    this.getThalaFavouritesList();
    // this.getSaleShoesDisList();
    this.getSpecialCollectionList();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


  searchTimer: any;

  onSearchInput() {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.getSearch();
    }, 500);
  }

  getSearch() {
    this.getNewArrvalsList();
    this.getStockInwordTodayList();
    this.getHandpickedForYouList();
    this.getThalaFavouritesList();
    this.getSpecialCollectionList();
  }

  getBadgeClass(badge: string): string {
    if (!badge) return '';

    const badgeMap: any = {
      'NEW': 'new',
      'JUST LAUNCHED': 'new',

      'HOT': 'hot',
      'HOT SELLING': 'hot',

      'SALE': 'sale',

      'TRENDING': 'trending',
      'BEST SELLER': 'best-seller',
      'TOP PICK': 'top-pick',
      'EDITOR’S CHOICE': 'editor-choice',
      'FEATURED': 'featured',
      'RECOMMENDED': 'recommended',
      'HANDPICKED FOR YOU': 'handpicked'
    };

    return badgeMap[badge.toUpperCase()] || 'default-badge';
  }

  viewAllHandpicked() {
    console.log('View all handpicked');
  }

  viewAllThalaFavourites() {
    console.log('View all Thala favourites');
  }

  viewAllPrevious() {
    console.log('View all previously purchased');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCatalogueListPage');
    this.pending_checkin();
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.service.addData({ dr_id: this.constant.UserLoggedInData.id, type: this.constant.UserLoggedInData.type }, 'login/login_data').then((res) => {
      if (res['statusCode'] == 200) {
        this.dashboardData = res['loginData']['user_data'];
        this.UserType = res['UserType'];
        console.log(this.dashboardData, 'dashboardData');
        this.userDetails = res['loginData'];
        this.service.dismissLoading()
      } else {
        this.service.dismissLoading()
        this.service.errorToast(res['statusMsg'])
      }
    }, err => {
      this.service.Error_msg(err);
      this.service.dismiss();
    })
  }

  goToProductDetails(product?: any) {
    const partySelected = sessionStorage.getItem('partyFlag') === 'true';
    if (!partySelected) {
      this.navCtrl.push(ProductSalePage);
      return;
    }
    this.navCtrl.push(OrderCatalogProductDetailPage, { 'product': product });
  }

  goToProductDetailsBanner(product?: any) {
    const partySelected = sessionStorage.getItem('partyFlag') === 'true';
    if (!partySelected) {
      this.navCtrl.push(ProductSalePage);
      return;
    }
    this.navCtrl.push(OrderCatalogProductDetailPage, { 'product_banner': product });
  }

  goToGenderCategory(gender: string) {
    // console.log('Gender selected:', gender);
    this.navCtrl.push(StockListPage, { gender: gender });
  }

  goToCategory(category: any) {
    console.log('Category selected:', category);
    this.navCtrl.push(StockListPage, { categoryData: category });
  }

  goToCollection(collection: any) {
    console.log('Collection selected:', collection);
  }

  viewAllCollections() {
    console.log('View all special collections');
  }

  goToSoleType(sole: any) {
    const partySelected = sessionStorage.getItem('partyFlag') === 'true';
    if (!partySelected) {
      this.navCtrl.push(ProductSalePage);
      return;
    }
    this.navCtrl.push(StockListPage, { soleType: sole.type });
  }

  goToPromotion(promo: any) {
    console.log('Promotion clicked:', promo);
  }

  goToDashboard() {
    this.navCtrl.push(DashboardNewPage);
  }

  goToevent() {
    this.navCtrl.push(ContractorMeetListPage);
  }

  goToCart() {
    if (this.constant.UserLoggedInData.loggedInUserType == 'Employee') {
      this.navCtrl.push(ProductSalePage);
    } else {
      this.navCtrl.push(CustomerCartPage);
    }
  }

  goToLeave(type) {
    this.navCtrl.push(LeaveListPage, { 'from': type });
  }

  openMoreMenu() {
    if (this.UserType == 'sales_user') {
      this.navCtrl.push(DashboardPage);
    }
    else {
      this.navCtrl.push(CustomerDashboardPage);

    }
  }

  goToLead() {
    this.navCtrl.push(LmsLeadListPage);
  }

  goToExpense(type) {
    this.navCtrl.push(ExpenseListPage, { 'view_type': type });
  }

  goToAttendence() {
    this.navCtrl.push(AttendenceNewPage);
  }

  goToCheckin() {
    if (this.checkin_data.length == 0) {
      this.navCtrl.push(CheckinNewPage);
    } else {
      this.navCtrl.push(EndCheckinPage, { 'data': this.checkin_data })
    }
  }

  checkin_data: any = [];
  pending_checkin() {
    this.service.addData({}, 'AppCheckin/pendingCheckin').then((result) => {
      if (result['statusCode'] == 200) {
        this.checkin_data = result['checkin_data'];
      } else {
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.Error_msg(err);
      this.service.dismiss();
    })
  }

  appbanner: any = [];
  bannerDetail() {
    this.service.addData({ 'Product catalog': 'Product catalog' }, 'AppOrder/bannerList').then((r) => {
      if (r['statusCode'] == 200) {
        this.appbanner = r['banner_list'];

      }
      else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }


  InwordTodayList: any = [];
  getStockInwordTodayList() {
    this.service.addData({ search: this.filter.search, start: '0', pagelimit: '10' }, 'AppOrder/stock_inword_today').then((r) => {
      if (r['statusCode'] == 200) {
        this.InwordTodayList = r['stockProducts'];
      }
      else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }

  newArrivals: any = [];
  getNewArrvalsList() {
    this.service.presentLoading();
    this.service.addData({ search: this.filter.search, start: '0', pagelimit: '10' }, 'AppOrder/new_arrivals').then((r) => {
      if (r['statusCode'] == 200) {
        this.newArrivals = r['stockProducts'];
        this.service.dismiss();
      }
      else {
        this.service.errorToast(r['statusMsg']);
        this.service.dismiss();
      }
    });
  }


  HandpickedForYouList: any = [];
  getHandpickedForYouList() {
    this.service.addData({ search: this.filter.search, start: '0', pagelimit: '10' }, 'AppOrder/handpicked_for_you').then((r) => {
      if (r['statusCode'] == 200) {
        this.HandpickedForYouList = r['stockProducts'];
      }
      else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }


  ThalaFavouritesList: any = [];
  getThalaFavouritesList() {
    this.service.addData({ search: this.filter.search, start: '0', pagelimit: '10' }, 'AppOrder/thala_favourites').then((r) => {
      if (r['statusCode'] == 200) {
        this.ThalaFavouritesList = r['stockProducts'];
      }
      else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }


  SpecialCollectionList: any = [];
  getSpecialCollectionList() {
    this.service.addData({ search: this.filter.search, start: '0', pagelimit: '10' }, 'AppOrder/special_collection').then((r) => {
      if (r['statusCode'] == 200) {
        this.SpecialCollectionList = r['stockProducts'];
      }
      else {
        this.service.errorToast(r['statusMsg']);
      }
    });
  }





  getDaysRemaining(): number {
    const endDate = new Date(this.clearanceSale.endDate);
    const today = new Date();
    const diffTime = Math.abs(endDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }


  viewProduct(type: any) {
    const partySelected = sessionStorage.getItem('partyFlag') === 'true';
    console.log(partySelected, 'partySelected');

    if (!partySelected) {
      this.navCtrl.push(ProductSalePage);
      return;
    }
    this.navCtrl.push(StockListPage, { type: type });
  }

  Wishlist() {
    this.navCtrl.push(OrderWishlistPage);
  }

}