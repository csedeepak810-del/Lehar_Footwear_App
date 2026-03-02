import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { ViewProfilePage } from '../../../view-profile/view-profile';
import { ConstantProvider } from '../../../../providers/constant/constant';


@IonicPage()
@Component({
  selector: 'page-secondary-bill-upload-detail',
  templateUrl: 'secondary-bill-upload-detail.html',
})
export class SecondaryBillUploadDetailPage {

  BillID: any;
  secBillUploadData: any = {};
  secBillUploadItems: any = [];
  secBillUploadBillDocs: any = [];
  url: any;
  
  constructor(public constant: ConstantProvider,public navCtrl: NavController, public navParams: NavParams,public service: MyserviceProvider,public alertCtrl: AlertController, public  modalCtrl:ModalController) {
    this.url = constant.upload_url1 + 'secondary_orders_bill_doc/'
        
        if (this.navParams.get('id')) {
            this.BillID = this.navParams.get('id');
            console.log(this.BillID);
            
            this.getsecBillUploadDetail(this.BillID);
        }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondaryBillUploadDetailPage');
  }
  
  getsecBillUploadDetail(BillID) {
    console.log(BillID);
    this.service.presentLoading();
    this.service.addData({ "bill_id": BillID }, "AppOrder/secondaryOrdersBillDetails").then((result) => {
      console.log(result);
      
      if (result['statusCode'] == 200) {
        this.service.dismissLoading();
        this.secBillUploadData = result['result'];
        this.secBillUploadItems = result['result']['bill_items'];
        this.secBillUploadBillDocs = result['result']['bill_docs'];
        console.log(this.secBillUploadItems);
        console.log(this.secBillUploadData);
      } else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.dismissLoading();
    });
  }
  
  imageModal(src) {
    this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
  }
  
}
