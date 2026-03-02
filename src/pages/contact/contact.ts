import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { HomePage } from '../home/home';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { CallNumber } from '@ionic-native/call-number';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contact: any = {};

  constructor(public navCtrl: NavController, public callNumber:CallNumber, public navParams: NavParams, private app: App, public service: DbserviceProvider, public serve: MyserviceProvider) {
    if (this.service.connection == 'offline') {
      this.service.showOfflineAlert()
      this.navCtrl.setRoot(HomePage)
    }
    this.contactDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
  go_to_map() {
    console.log('map');
    let destination = 28.7973288 + ',' + 77.0758851;


    let label = encodeURI('kridha Opp. Hariyali Petrol Pump, Faridpur Bareilly, 243201');

    window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
  }

  ionViewDidLeave() {
    let nav = this.app.getActiveNav();
    if (nav && nav.getActive()) {
      let activeView = nav.getActive().name;
      let previuosView = '';
      if (nav.getPrevious() && nav.getPrevious().name) {
        previuosView = nav.getPrevious().name;
      }
      console.log(previuosView);
      console.log(activeView);
      console.log('its leaving');
      if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {

        console.log(previuosView);
        this.navCtrl.popToRoot();
      }
    }
  }


  contactDetails() {
    this.serve.presentLoading();
    this.serve.addData({}, 'AppContactUs/contactDetail').then((result) => {
      if (result['statusCode'] == 200) {
        this.serve.dismissLoading();
        this.contact = result['contact_detail'];

      }
      else {
        this.serve.errorToast(result['statusMsg']);
        this.serve.dismissLoading();
      }
    }, err => {
      this.serve.dismissLoading();

    });
  }

  openDialer(dialnumber:any){
    // e.stopPropagation();
    dialnumber = ''+dialnumber
    this.callNumber.callNumber(dialnumber, false) // Set to false to allow user to choose app
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
  }
}
