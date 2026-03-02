import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { MobileLoginPage } from '../login-section/mobile-login/mobile-login';
import { LoginPage } from '../login/login';
// import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
// import { SignupPage } from '../signup/signup';
// import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { RegistrationPage } from '../login-section/registration/registration';
import { CatalogueHomePage } from '../catalogue-home/catalogue-home';
import { LoyaltyLanguagePage } from '../loyalty-language/loyalty-language';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ContactPage } from '../contact/contact';


/**
* Generated class for the SelectRegistrationTypePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-select-registration-type',
  templateUrl: 'select-registration-type.html',
})
export class SelectRegistrationTypePage {

  data: any = {};
  tokenName: any = '';
  loginType: any = '';
  token: any = '';
  contact: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public service: MyserviceProvider) {


  }

  ionViewDidLoad() {
    // this.contactDetails();

  }

  goToRegisterPage() {
    if (this.data.registerType == 'Employee') {
      this.navCtrl.push(LoginPage, { 'registerType': this.data.registerType });
    }
    else if (this.data.registerType == 'DrLogin'){
      this.navCtrl.push(LoginPage, { 'registerType': this.data.registerType });

    }
    else {
      this.navCtrl.push(LoyaltyLanguagePage, { 'registerType': this.data.registerType });
    }
 
  }

  goToHome() {
    // go to the MyPage component
    this.navCtrl.push(CatalogueHomePage);
  }

  contactDetails() {
    this.service.presentLoading();
    this.service.addData({}, 'AppContactUs/contactDetail').then((result) => {
      if (result['statusCode'] == 200) {
        this.contact = result['contact_detail'];
        this.service.dismissLoading();
      }
      else {
        this.service.errorToast(result['statusMsg']);
        this.service.dismissLoading();
      }
    });
  }

  goOnContactPage() {
    this.navCtrl.push(ContactPage);
  }

}
// catalogue-home