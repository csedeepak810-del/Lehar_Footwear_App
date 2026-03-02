import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { SecondaryTargetReportPage } from '../secondary-target-report/secondary-target-report';
import { max } from 'moment';
import moment from 'moment';

/**
 * Generated class for the AddSecondaryTargetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-secondary-target',
  templateUrl: 'add-secondary-target.html',
})
export class AddSecondaryTargetPage {
  target_list: any = []
  data: any = {};
  today_date = new Date();
  add_target_list: any = []
  currentDate: any = new Date();
  currentMonth: any = this.currentDate.getMonth() + 1;
  current_year: any = new Date().getFullYear()
  spinnerLoader: any = false;
  activeTab: any;
  disableSubmitButton: boolean = true;
  constructor(public serve: MyserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.activeTab = this.navParams.get('mode')

    // this.get_targetList()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSecondaryTargetPage');


  }

  get_targetList() {
    this.serve.presentLoading();
    this.serve.addData({ 'mode': this.activeTab, 'month': this.data.month, 'year': this.data.year }, 'AppTarget/assignRetailer')
      .then((result) => {
        if (result['statusCode'] == 200) {
          this.target_list = result['result']

          this.add_target_list = this.target_list.filter(row => {
            return row.target_id == 0;
          });


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

  addTarget() {
    this.serve.presentLoading();
    this.spinnerLoader = true;
    this.serve.addData({ data_list: this.add_target_list, 'data': this.data }, 'AppTarget/updateRetailerTarget')
      .then((result) => {
        if (result['statusCode'] == 200) {
          this.spinnerLoader = false;
          this.serve.successToast(result['statusMsg'])
          this.navCtrl.popTo(SecondaryTargetReportPage)

          console.log(this.add_target_list)

          this.serve.dismissLoading()
        } else {
          this.spinnerLoader = false;
          this.serve.dismissLoading()
          this.serve.errorToast(result['statusMsg'])
        }
      }, error => {
        this.spinnerLoader = false;
        this.serve.dismissLoading()
        this.serve.Error_msg(error);
      });
  }

  disable_month(year, month) {
    if (year == this.today_date.getFullYear()) {

      if (month < this.today_date.getMonth()) {
        return true;
      }
      else {
        return false;
      }
    }

    else {
      return false;
    }

  }
  targetCount: any = '';

  disableSubmitButtonRetrun() {
    this.targetCount = 0;
    for (let i = 0; i < this.add_target_list.length; i++) {
      if (this.add_target_list[i].target.length) {
        if (this.add_target_list[i].target > 0) {
          this.targetCount++;
        } else {
          this.targetCount--;
          this.disableSubmitButton = true
        }
      } else {
        console.log('decrease')
        this.targetCount--;
        this.disableSubmitButton = true
      }
      if (this.add_target_list.length == this.targetCount) {
        this.disableSubmitButton = false
      }
    }
  }

}
