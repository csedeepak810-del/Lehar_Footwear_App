import { Component } from '@angular/core';
import { Events, IonicPage, Loading, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { SelectRegistrationTypePage } from '../select-registration-type/select-registration-type';
import { ProfilePage } from '../profile/profile';
import { SupportListPage } from '../support-list/support-list';
import { OrderCatalogueListPage } from '../order-catalogue-list/order-catalogue-list';
import { PrimaryOrderPage } from '../primary-order/primary-order';
import { SecondaryOrderPage } from '../secondary-order/secondary-order';
import { LedgerPage } from '../ledger/ledger';
import { InvoiceListPage } from '../invoice-list/invoice-list';
import { DistributorSaleTargetPage } from '../distributor-sale-target/distributor-sale-target';
import { AnnouncementNoticesListPage } from '../announcement-notices-list/announcement-notices-list';
import { PrimaryOrderDetailPage } from '../primary-order-detail/primary-order-detail';
import { InvoiceDetailPage } from '../invoice-detail/invoice-detail';
/**
 * Generated class for the CustomerDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-dashboard',
  templateUrl: 'customer-dashboard.html',
})
export class CustomerDashboardPage {
  loading: Loading;
  bannerURL: any;
  user_data: any;
  userDetails: any = {};
  login_status: any = '';
  appbanner: any = [];
  paymentDetail: any = {}
  skLoading: boolean = true;
  activeTab: string = 'orders';
  latestOrders: any[] = [];
  latestLedger: any[] = [];
  latestInvoice: any[] = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public constant: ConstantProvider, public service: DbserviceProvider, private storage: Storage,
    public serve: MyserviceProvider,) {

    this.bannerURL = constant.upload_url1 + 'banner/';
  }

  ionViewDidLoad() {
    this.getDashBoardData()
    console.log('ionViewDidLoad CustomerDashboardPage');
  }
  doRefresh(refresher) {

    this.getDashBoardData();
    this.bannerDetail();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  getNotification() {
    this.navCtrl.push(AnnouncementNoticesListPage);
  }

  getDashBoardData() {
    this.serve.presentLoading()
    this.serve.addData({ dr_id: this.constant.UserLoggedInData.id, type: this.constant.UserLoggedInData.type }, 'login/login_data').then((res) => {
      if (res['statusCode'] == 200) {
        this.skLoading = false;
        this.serve.dismissLoading()
        this.user_data = res['loginData']['login_data'];
        this.login_status = res['loginData']['login_status'];
        if (this.user_data.type == 1 || this.user_data.type == 7) {
          this.getPaymentDetail()
        }
        if (this.login_status.trim().toLowerCase() == 'inactive') {
          this.logout();
        }
        // this.serve.dismissLoading()
        this.bannerDetail();
      } else {
        this.serve.dismissLoading()
        this.serve.errorToast(res['statusMsg'])
      }
    }, err => {
      this.serve.Error_msg(err);
      this.serve.dismiss();
    })
  }

  GoToProfile() {
    this.navCtrl.push(ProfilePage);
  }
  goToSupport() {
    this.navCtrl.push(SupportListPage)
  }

  goToProducts() {
    this.navCtrl.push(OrderCatalogueListPage);
  }

  goToOrderlist() {
    if (this.user_data.type != 3) {
      this.navCtrl.push(PrimaryOrderPage);
    } else if (this.user_data.type == 3) {
      this.navCtrl.push(SecondaryOrderPage);

    }
  }
  goOnLedger(pageType) {
    console.log(pageType);
    this.navCtrl.push(LedgerPage, { 'page_type': pageType });
  }

  goOnInvoice() {
    this.navCtrl.push(InvoiceListPage);
  }

  goToTarget() {
    this.navCtrl.push(DistributorSaleTargetPage)
  }
  getPaymentDetail() {
    this.serve.addData({}, 'AppCustomerNetwork/getPaymentInfo').then((result) => {
      if (result['statusCode'] == 200) {
        this.paymentDetail = result['paymentInfo']['dr_upper_info'];
        console.log(this.paymentDetail,'paymentDetail');
        this.latestOrders  = this.paymentDetail.latest_order ? this.paymentDetail.latest_order : [];
        this.latestLedger  = this.paymentDetail.latest_ledger ? this.paymentDetail.latest_ledger : [];
        this.latestInvoice = this.paymentDetail.latest_invoice ? this.paymentDetail.latest_invoice : [];
      }
      else {
        this.serve.errorToast(result['statusMsg']);
      }

    });
  }

  getOrderStatusClass(status: string): string {
    if(status == 'Pending'){
       return 'pending';
    }
    else if(status == 'Approved'){
       return 'completed';
    }
    else if(status == 'Rejected'){
       return 'processing';
    }
    return '';
  }

  viewOrderDetails(orderId) {
    this.navCtrl.push(PrimaryOrderDetailPage, { id: orderId });
  }

    go_to(invoice_id, customer_code) {
  
      this.navCtrl.push(InvoiceDetailPage, { 'id': invoice_id, 'CustomerCode': customer_code })
    }
  bannerDetail() {

    this.serve.addData({}, 'AppInfluencer/bannerList').then((result) => {
      if (result['statusCode'] == 200) {
        this.appbanner = result['banner_list'];
      }
      else {
        this.serve.errorToast(result['statusMsg']);
      }

    });
  }


  logout() {
    this.storage.set('token', '');
    this.storage.set('role', '');
    this.storage.set('displayName', '');
    this.storage.set('role_id', '');
    this.storage.set('name', '');
    this.storage.set('type', '');
    this.storage.set('token_value', '');
    this.storage.set('userId', '');
    this.storage.set('token_info', '');
    this.constant.UserLoggedInData = {};
    this.constant.UserLoggedInData.userLoggedInChk = false;
    console.log(this.constant.UserLoggedInData);
    this.events.publish('data', '1', Date.now());
    this.serve.errorToast("You Are Currently In Active, Contact To Admin.");
    this.navCtrl.setRoot(SelectRegistrationTypePage);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }

  // Format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-IN', options);
  }

}
