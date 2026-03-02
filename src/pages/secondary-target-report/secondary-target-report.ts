import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddSecondaryTargetPage } from '../add-secondary-target/add-secondary-target';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-secondary-target-report',
  templateUrl: 'secondary-target-report.html',
})
export class SecondaryTargetReportPage {
  today_date = new Date().toISOString().slice(0, 10);
  today = new Date().toISOString().slice(0, 10);
  followupList: any = [];
  filter:any={}
  selected_date = new Date().toISOString().slice(0, 10); 
  target_list:any=[]
  currentDate:any=new Date();
  selectedMonth:any = this.currentDate.getMonth()
  selectedYear:any = this.currentDate.getFullYear()
  currentMonth:any = this.currentDate.getMonth()+1
  currentYear:any = this.currentDate.getFullYear()
  buttonFlag:any=0;
  start:any=0
  limit:any=20
  flag: any;
  totalPlan:any;
  totalVisit:any;
  activeTab:any = 'Plan'; 
  constructor(public serve: MyserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewWillEnter(){
    this.get_targetList(this.selected_date, this.activeTab);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondaryTargetReportPage');
  }


  doRefresh(refresher) {
    this.start = 0;
  this.get_targetList(this.selected_date, this.activeTab) 
  setTimeout(() => {
      refresher.complete();
  }, 1000);
}


ChangeDate(type) {
  if (type == 'previous') {
    this.selected_date = moment(this.selected_date).subtract(1, 'months').format('YYYY-MM-DD');
    this.filter.date = this.selected_date;
  } else {

    this.selected_date = moment(this.selected_date).add(1, 'months').format('YYYY-MM-DD');
    this.filter.date = this.selected_date;
  }
  
 
  this.get_targetList('', this.activeTab);

}

  get_targetList(date, mode) {
    if(date==''){
      date = this.selected_date
    }
    this.selectedMonth = moment(date).format('MM');
    this.selectedYear = moment(date).format('YYYY');
    this.serve.presentLoading();    
    this.serve.addData({'mode':mode, 'month':this.selectedMonth, 'year':this.selectedYear, 'pagelimit':this.limit, 'start':this.start}, 'AppTarget/assignRetailer')
      .then((result) => {
        if (result['statusCode'] == 200) {
          this.target_list = result['result']
          this.totalPlan = result['totalPlan']
          this.totalVisit = result['totalVisit']
          this.buttonFlag = result['buttonFlag']
          this.serve.dismissLoading()
        } else {
          this.serve.dismissLoading()
          this.serve.errorToast(result['statusMsg'])
        }
      }, error => {
        this.serve.dismissLoading()
        this.serve.Error_msg(error);
      });
  }

  loadData(infiniteScroll) {
    this.start = this.target_list.length
    
    this.serve.addData({'mode':this.activeTab, 'month':this.selectedMonth, 'year':this.selectedYear, 'pagelimit':this.limit, 'start':this.start}, "AppTarget/assignRetailer").then(resp => {
      if (resp['result'] == '') {
        this.flag = 1;
      }
      else {
        setTimeout(() => {
          this.target_list = this.target_list.concat(resp['result']);
          infiniteScroll.complete();
        }, 1000);
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });
  }

  addTarget(){
    this.navCtrl.push(AddSecondaryTargetPage, {'mode':this.activeTab});
  }

}
