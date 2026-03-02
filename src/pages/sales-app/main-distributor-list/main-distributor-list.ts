import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { TravelPopOverPage } from '../../travel-pop-over/travel-pop-over';
import { LeadsDetailPage } from '../../leads-detail/leads-detail';
import { AddRetailerPage } from '../../add-retailer/add-retailer';
import { AttendenceserviceProvider } from '../../../providers/attendenceservice/attendenceservice';
import moment from 'moment';
import { PrimaryOrderPage } from '../../primary-order/primary-order';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AddProjectPage } from '../../add-project/add-project';
import { AddDistributionPage } from '../add-distribution/add-distribution';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-main-distributor-list',
  templateUrl: 'main-distributor-list.html',
})
export class MainDistributorListPage {
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  expenseStatus: any = 'My';
  user_right: any = [];
  DrType: any
  distributor_list: any = [];
  load_data: any = "0";
  limit = 20;
  start = 0;
  flag: any = '';
  search: any = {};
  filterDistributor: any = {}
  teamCount: any;
  filter: any = {}
  target_Type: any = 'My';
  asmId: any = 0;
  distributor_details: any = [];
  distributor_checkin: any = [];
  distributor_order: any = [];
  currentDate: any;
  data: any;
  hideList: boolean = true
  teamDistributor_list: any = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public callNumber:CallNumber,
    public serve: MyserviceProvider,
    public popoverCtrl: PopoverController,
    public attendence_serv: AttendenceserviceProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,) {
    this.DrType = this.navParams.get('type')
    this.currentDate = moment().format("MMM YY");
  }
  ionViewWillEnter() {
   
    this.get_distributor_list();
    (this.target_Type != 'My') ? this.get_network_list() : null;
    this.storage.get('team_count').then((team_count) => {
      this.teamCount = team_count;
    });
  }
  doRefresh(refresher) {
    if (this.search)
      this.search = {}
    this.get_distributor_list()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  addProject() {
    this.navCtrl.push(AddProjectPage, {})
  }

  addretailer() {
    // this.navCtrl.push(AddDistributionPage, { 'type_id': this.DrType })
     this.navCtrl.push(AddRetailerPage, { 'type_id': this.DrType })
  }

  direct_list: any
  team_list: any
  open() {
    this.selectComponent.open();
  }

  get_network_list(filter: any = '') {
    this.limit = 20;
    this.start = 0;
    // this.serve.presentLoading()
    this.serve.addData({ 'user_id': filter }, 'AppCustomerNetwork/getAllAsm').then((result) => {
      if (result['statusCode'] == 200) {
        // this.serve.dismissLoading();
        this.teamDistributor_list = result['asm_id'];
      } else {
        this.serve.errorToast(result['statusMsg'])
        // this.serve.dismissLoading();
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });

  }


  get_distributor_list(id: any = '') {

    this.limit = 20;
    this.start = 0;
    this.serve.presentLoading()
    this.asmId = id;
    this.serve.addData({ 'Type': this.DrType, 'Mode': this.target_Type, 'Master_Search': this.search.name, 'User_id': id, 'limit': this.limit, 'start': this.start }, 'AppCustomerNetwork/distributorLists').then((result) => {
      if (result['statusCode'] == 200) {
        this.serve.dismissLoading();
        this.distributor_list = result['result'];
        this.direct_list = result['count'];
        this.team_list = result['count2'];
        this.start = this.distributor_list.length;
        if (this.distributor_list.length == 0) {
          this.load_data = "1";
        }
      } else {
        this.serve.errorToast(result['statusMsg'])
        this.serve.dismissLoading();
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });

  }

  goto() {
    this.navCtrl.push(PrimaryOrderPage, {})
  }
  loadData(infiniteScroll) {
    this.start = this.distributor_list.length
    this.serve.addData({ 'Type': this.DrType, 'Mode': this.target_Type, 'Master_Search': this.search.name, 'User_id': this.asmId, 'limit': this.limit, 'start': this.start }, 'AppCustomerNetwork/distributorLists').then(result => {
      if (result['result'] == '') {
        this.flag = 1;
      }
      else {
        setTimeout(() => {
          this.distributor_list = this.distributor_list.concat(result['result']);
          infiniteScroll.complete();
        }, 1000);
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });
  }



  distributor_detail(dr_id) {
    this.navCtrl.push(LeadsDetailPage, { 'dr_id': dr_id, 'type': 'Dr', 'dr_type': this.DrType })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TravelPopOverPage, { 'from': 'Distributor', 'dr_type': this.DrType });

    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(resultData => {
      if (resultData) {
        this.target_Type = resultData.TabStatus;
        this.get_distributor_list()
        this.get_network_list()
      }
    })

  }

  openDialer(dialnumber:any, e:any){
    e.stopPropagation();
    dialnumber = ''+dialnumber
    this.callNumber.callNumber(dialnumber, false) // Set to false to allow user to choose app
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
  }

  

}


