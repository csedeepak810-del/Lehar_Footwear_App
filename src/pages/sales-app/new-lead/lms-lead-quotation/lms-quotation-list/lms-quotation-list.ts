import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Navbar } from 'ionic-angular';
import { MyserviceProvider } from '../../../../../providers/myservice/myservice';
import { LmsQuotationAddPage } from '../lms-quotation-add/lms-quotation-add';
import { LmsQuotationDetailPage } from '../lms-quotation-detail/lms-quotation-detail';
import { DbserviceProvider } from '../../../../../providers/dbservice/dbservice';
import { DashboardPage } from '../../../../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-lms-quotation-list',
  templateUrl: 'lms-quotation-list.html',
})
export class LmsQuotationListPage {
  @ViewChild(Navbar) navBar: Navbar;

  quotation_data: any = [];
  filter: any = {};
  quotationStatus: any = 'Pending';
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: MyserviceProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, public dbService: DbserviceProvider, public serve: MyserviceProvider) {
    console.log(navParams,'list data')
  }


  ionViewWillEnter() {
    this.getQuotationList();

  }

  ionViewDidLoad() {


  }


  addQuotations() {
    this.navCtrl.push(LmsQuotationAddPage,{'name':this.navParams.data.dr_name,'id':this.navParams.data.id});
  }

  gotoQuotationDetailPage(id, status) {

    this.navCtrl.push(LmsQuotationDetailPage, { 'quotation_id': id, 'status': status });
  }

  doRefresh(refresher) {
    this.filter = {};
    this.getQuotationList();
    refresher.complete();
  }

  delete_quotation(id) {
    let alert = this.alertCtrl.create({
      title: 'Are You Sure ?',
      subTitle: 'You want to delete this Quotation ?',
      cssClass: 'action-close',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

        }
      }, {
        text: 'Confirm',
        cssClass: 'close-action-sheet',
        handler: () => {
          this.serve.presentLoading();
          this.serve.addData({ 'quotation_id': id }, 'AppQuotation/delete_quotaion').then((resp) => {
            if (resp['statusCode'] == 200) {
              this.serve.successToast(resp['statusMsg']);
              this.serve.dismissLoading();
              this.getQuotationList();
            } else {
              this.serve.dismissLoading();
              this.serve.errorToast(resp['statusMsg']);
            }


          }, err => {
            this.serve.dismissLoading();

          })

        }
      }]
    });
    alert.present();
  }
  getQuotationList() {
    this.serve.presentLoading();
    this.serve.addData({ 'filter': this.filter, 'quotation_status': this.quotationStatus }, 'AppQuotation/getQuotationList').then((r) => {
      if (r['statusCode'] == 200) {
        this.serve.dismissLoading();
        this.quotation_data = r['result'];
      } else {
        this.serve.dismissLoading();
        this.serve.errorToast(r['statusMsg']);
      }

    }, err => {
      this.serve.dismissLoading();
      this.serve.errToasr();
    })
  }
}
