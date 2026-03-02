import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SecondaryBillUploadAddPage } from '../secondary-bill-upload-add/secondary-bill-upload-add';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { SecondaryBillUploadDetailPage } from '../secondary-bill-upload-detail/secondary-bill-upload-detail';


@IonicPage()
@Component({
  selector: 'page-secondary-bill-upload-list',
  templateUrl: 'secondary-bill-upload-list.html',
})
export class SecondaryBillUploadListPage {
  secBillList: any = [];
  secBillCounts: any = [];
  ActiveTab: any = 'Pending'
  filter: any = {}

  constructor(public navCtrl: NavController,public service: MyserviceProvider) {
    console.log('ionViewDidLoad SecondaryBillUploadListPage');

  }
  
  goToSecBillUploadAdd() {
    this.navCtrl.push(SecondaryBillUploadAddPage);
  }

  goOnSecondaryBillUploadDetail(id)
  {
    this.navCtrl.push(SecondaryBillUploadDetailPage , {id : id});
  }

  ionViewWillEnter() 
  {
    this.getsecBillList(this.ActiveTab);
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondaryBillUploadListPage');
  }

  doRefresh(refresher) 
  {
    console.log('Begin async operation', refresher);
    this.getsecBillList(this.ActiveTab); 
    refresher.complete();
  }
  
  getsecBillList(ActiveTab) {
    console.log(ActiveTab);
    console.log(this.filter.master_search);
    
    this.service.presentLoading();
    
    this.service.addData({ActiveTab : ActiveTab , master_search : this.filter.master_search}, 'AppOrder/secondaryOrdersBillListing').then((result) => {
      console.log(result);
      
      if (result['statusCode'] == 200) {
        this.service.dismissLoading();
        this.secBillList = result['result'];
        this.secBillCounts = result['tab_count'];
        console.log(this.secBillList);
        
      } else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.dismissLoading();
    });
  }
  
}
