import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { AddRetailerPage } from '../add-retailer/add-retailer';
import { RetailerDetailPage } from '../retailer-detail/retailer-detail';
import { TravelPopOverPage } from '../travel-pop-over/travel-pop-over';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { log } from 'util';
import { CollectionAddPage } from '../collection-add/collection-add';
import { ViewProfilePage } from '../view-profile/view-profile';
import { ConstantProvider } from '../../providers/constant/constant';


/**
 * Generated class for the CollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {
  
    @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
    collection_list:any = []
    search: any;
    flag: any;
    sortVisible=false;
    sortValue:any= "";
    Type: any = 'My';
    status:any = 'Pending';
    limit: any;
    start: any;
    sort: any = '';
    DrTypeName: any ;
    DrType: any ;
    data:any={};
    user_list: any = []
    filter:any={}
    order:any={}
    focusDealer:boolean=false;
      teamCount: any;
      Employee_Type: any={};
      date1 = new Date()
      currentMonth: any = this.date1.getMonth()
      currentYear: any = this.date1.getFullYear();
      yearData = [];
    availableMonths: any = []
  monthList: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthMapping = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];
    constructor(public navCtrl: NavController,
    
      public navParams: NavParams, public constant: ConstantProvider, public popoverCtrl: PopoverController,public modalCtrl: ModalController,public serve: MyserviceProvider, private alertCtrl: AlertController,
      public storage: Storage) {
      this.DrTypeName = this.navParams.get('moduleName')
      console.log(this.DrTypeName,"Module name in retailer")
      console.log(this.navParams)
         this.storage.get('team_count').then((team_count) => {
          this.teamCount = team_count;
        });
        const currentYear = new Date().getFullYear(); 
        this.yearData = Array.from({ length: 4 }, (_, i) => currentYear - i);
        console.log(this.yearData);
    }
    
    
    ionViewDidEnter(){
      // if(this.Type=='My'){
        this.collection_data(this.status)
        this.getYearsAll();
      // }else{
        this.get_user();
      // }
    }
    
    presentPopover(myEvent, from) {
      let popover = this.popoverCtrl.create(TravelPopOverPage, { 'from': from, 'dr_type': this.DrTypeName, Type:this.Type });
    
      popover.present({
        ev: myEvent
      });
    
      popover.onDidDismiss(resultData => {
        if (resultData) {
          this.Type = resultData.TabStatus;
          this.sort = resultData.sort
          console.log(resultData)
          // if(this.Type=='My'){
            this.collection_data(this.status)
            this.get_user();
    
          // }else{
          // }
        }
      })
    
    }
    error_msg: any = ''
    presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: this.error_msg,
        buttons: ['Dismiss']
      });
      alert.present();
    }
    data_status: boolean;
    count:any ={}
    collection_data(status) {
      if(this.Type=='My'){
      this.data={}
      }
      if(!this.search){
      this.serve.presentLoading();
      }
      if(this.order.year){
        this.filter.year=this.order.year
      }
      
      if(this.order.month){
        this.filter.month=this.order.month
      }
      this.limit = 20
      this.start = 0
      let customerApi = ''
      customerApi = 'AppOrder/collectionList'
      this.serve.addData({'Type':this.DrType,'sort':this.sortValue, 'User_id': this.data.id , 'filter':this.filter ,'Mode': this.Type, status:status, 'Master_Search': this.search, 'limit': this.limit, 'start': this.start },customerApi).then(resp => {
        if (resp['statusCode'] == 200) {
          this.collection_list = resp['result'];
          console.log(this.collection_list);
          
          this.count = resp['statusCount'];
          // this.start = this.collection_list.length
          this.serve.dismissLoading()
        } else {
          this.serve.errorToast(resp['statusMsg'])
          this.serve.dismissLoading()
        }
      }, error => {
        this.serve.Error_msg(error);
        this.serve.dismiss();
      })
    
    }

 
    loadData(infiniteScroll,status) {
      this.start = this.collection_list.length
      this.serve.addData({ 'Mode': this.Type, 'Master_Search': this.search,status:status, 'limit': this.limit, 'start': this.start }, "AppCustomerNetwork/focusDealerList").then(resp => {
        if (resp['result'] == '') {
          this.flag = 1;
          this.filter=''
        }
        else {
          setTimeout(() => {
            this.collection_list = this.collection_list.concat(resp['result']);
            infiniteScroll.complete();
          }, 1000);
        }
      }, error => {
        this.serve.Error_msg(error);
        this.serve.dismiss();
      });
    }
    
    doRefresh(refresher,status) {
      if(this.filter){
       this.filter.year='';
       this.filter.month='';
      } 
     if (this.search)
      this.filter = '';
      this.search='';
      this.order.year=''
      this.order.month=''
      this.collection_data(status)
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    
    }
    
    
    imageModal(src) {
      this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
    }
    
        get_user() {
          this.serve.addData({ 'user_id': this.data.user }, "AppAttendence/getAllAsm")
            .then(result => {
              if (result['statusCode'] == 200) {
                this.user_list = result['asm_id'];
              } else {
                this.serve.errorToast(result['statusMsg'])
              }
            }, error => {
              this.serve.Error_msg(error);
              this.serve.dismiss();
            })
        }
    
        refreshUserList(){
          this.data={};
          this.collection_data(this.status);
        }

        addCollection(){
          this.navCtrl.push(CollectionAddPage)
      }

      getYearsAll() {
        for (let j = 0; j <= this.currentMonth; j++) { this.availableMonths.push(this.monthList[j]); }
      }
    
      getMonthValue(monthName: string): string {
        console.log(monthName);
        const month = this.monthMapping.find(m => m.name === monthName);
        return month ? month.value : '';
      }
      
    }
    
    