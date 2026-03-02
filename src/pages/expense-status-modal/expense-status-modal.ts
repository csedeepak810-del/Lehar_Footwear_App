import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { FollowupAddPage } from '../followup-add/followup-add';
/**
* Generated class for the ExpenseStatusModalPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-expense-status-modal',
  templateUrl: 'expense-status-modal.html',
})
export class ExpenseStatusModalPage {

  data: any = {}
  filter: any = {}
  activities : any = [];
  followup_detail: any = {}
  from_page: any = ''
  today_date = new Date().toISOString().slice(0, 10);
  max_date = new Date().getFullYear() + 1;
  savingFlag: boolean = false;
  stage_level: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public serve: MyserviceProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
    console.log(this.navParams.get("from"),"line 38");
    this.from_page = this.navParams.get("from");
    this.stage_level = this.navParams.get("stage_level");

    if (this.from_page == 'team') {
      this.data.type = this.navParams.get("type");
    }
    if (this.from_page == 'travel') {
      this.data.id = this.navParams.get("travelId");
    }
    if (this.from_page == 'expense') {
      this.data.id = this.navParams.get("expenseId");
      this.data.type = this.navParams.get("type");
    }
    if (this.from_page == 'eventPlan') {
      this.data.id = this.navParams.get("eventId");
      this.data.type = this.navParams.get("type");
    }
    if (this.from_page == 'leave') {
      this.data.id = this.navParams.get("leaveId");
    }
    if (this.from_page == 'travel') {
      this.data.id = this.navParams.get("travelId");
    }
    if (this.from_page == 'site_status') {
      this.data.dr_id = this.navParams.get("id");
      this.data.type = this.navParams.get("type");
      this.data.siteStatus = this.navParams.get("siteStatus");

    }
    if (this.from_page == 'site_followup') {
      console.log(this.navParams)
      this.data.type = this.navParams.get("type");
      this.data.dr_type = this.navParams.get("dr_type");
      this.data.id = this.navParams.get("id");
      this.data.dr_name = this.navParams.get("name")
      this.data.dr_type_name = 'site';
    }
    if (this.from_page == 'lead_detail') {
      this.data.dr_id = this.navParams.get("leadID");
    }
    if (this.from_page == 'team') {
      this.data.type = this.navParams.get("type");
    }
    if (this.from_page == 'followup') {
      this.data.id = this.navParams.get("follow_up_id");
      this.followup_detail = this.navParams.get("followup_detail");
      this.getActivities();
    }
    if (this.from_page == 'influencer_followup') {
      this.data.type = this.navParams.get("type");
      this.data.dr_type = this.navParams.get("dr_type");
      this.data.dr_id = this.navParams.get("id");

      this.data.type_name = 'enquiry';
    }
    if (this.from_page == 'enquiry_status') {
      this.data.dr_id = this.navParams.get("id");
      this.data.type = this.navParams.get("type");

    }
    if (this.from_page == 'OrderDateFilter') {
      this.data.date_from = this.navParams.get("filter").date_from;
      this.data.date_to = this.navParams.get("filter").date_to;
    }
    if (this.from_page == 'SecondaryOrderDateFilter') {
      this.data.date_from = this.navParams.get("filter").date_from;
      this.data.date_to = this.navParams.get("filter").date_to;
    }

  }


  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  update_status() {
    var func_name
    if (this.from_page == 'expense') {
      func_name = 'AppExpense/update_status'
    }

    if (this.from_page == 'travel') {
      func_name = 'TravelPlan/update_status'
    }
    if (this.from_page == 'leave') {
      func_name = 'AppLeave/statusChange'


    }
    if (this.from_page == 'enquiry_status') {
      func_name = 'AppEnquiry/enquiryStageChange'
    }
    if (this.from_page == 'eventPlan') {
      func_name = 'AppEvent/eventStageChange'
    }

       if (this.from_page == 'site_status') {
      func_name = 'AppEnquiry/siteStageChange'
    }

    this.serve.addData(this.data, func_name).then((result) => {
      if (result['statusCode'] == 200) {
        this.serve.successToast(result['statusMsg']);
        this.savingFlag = false;
        let data = { 'value': 'true' }
        this.viewCtrl.dismiss(true);
      }
      else {
        this.serve.errorToast(result['statusMsg']);
        this.savingFlag = false;
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });
  }
  team: any = []

  getActivities(){
    console.log('tetsing 5')
    this.serve.addData({},"AppFollowup/activityDropdown").then((result) => {
      if(result['statusCode'] == 200){
        this.activities = result['dropDown'];
        console.log(this.activities)
      }else{
        this.serve.errorToast(result['statusMsg']);
      }
    })
  }

  ondismiss() {
    {
      var data = this.filter
      this.viewCtrl.dismiss(
        data
      );
    }
  }

  addNewContact() {
    this.savingFlag = true;
    this.serve.addData({ "data": { 'id': this.navParams.get("site_id"), 'contactDetails': [this.data] } }, 'AppEnquiry/addSiteContactPerson')
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.savingFlag = false;
          this.serve.successToast(resp['statusMsg']);
          this.viewCtrl.dismiss(true);
        } else {
          this.savingFlag = false;
          this.serve.errorToast(resp['statusMsg']);
        }
      }, error => {
        this.savingFlag = false;
        this.serve.Error_msg(error);
      })

  }



  addFollowup() {
    this.savingFlag = true;
    this.serve.addData(this.data, 'followup_new/add_followup').then((result) => {
      if (result['statusCode'] == 200) {
        this.serve.successToast(result['statusMsg']);
        this.savingFlag = false;
        this.viewCtrl.dismiss();
      }
      else {
        this.serve.errorToast(result['statusMsg']);
        this.savingFlag = false;
      }
    }, err => {
    })
  }
  change_followup_status() {
    if(this.followup_detail.last_activity == 'Others' && this.followup_detail.followup_remark == undefined ){
      this.serve.errorToast('Please Add Remark Of Your Activity');
      return;
    }
    this.serve.addData({ 'Id': this.followup_detail.id, 'Status': this.followup_detail.status,'last_activity' : this.followup_detail.last_activity, 'followup_date': this.followup_detail.follow_up_date, 'followup_remark': this.followup_detail.followup_remark }, 'AppFollowup/followupUpdate').then((result) => {

      if (result['statusCode'] == 200) {
        this.serve.successToast(result['statusMsg'])
        this.viewCtrl.dismiss(true);
        // if(this.followup_detail.status == 'Complete'){
        //   let alert = this.alertCtrl.create({
        //     title: 'Add Follow Up?',
        //     subTitle: 'Do You Want To Create Other Follow Up',
        //     cssClass: 'alert-modal',

        //     buttons: [
        //       {
        //         text: 'NO',
        //         role: 'cancel',
        //         handler: () => {
        //         }
        //       },
        //       {
        //         text: 'YES',
        //         cssClass: 'close-action-sheet',
        //         handler: () => {
        //           if(this.navCtrl.getViews().length>=2){
        //             this.navCtrl.remove(1, 1, {animate:false})
        //             this.navCtrl.pop({animate:false})
        //           }
        //           this.navCtrl.push(FollowupAddPage,{'follow_up_data':this.followup_detail,'from':'followup_status'});
        //         }
        //       }

        //   ]
        //   });
        //   alert.present();
        // }

      } else {
        this.serve.errorToast(result['statusMsg'])
      }


    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismissLoading();
    });

  }


  filterOrder() {
    this.viewCtrl.dismiss(this.data);
  }

}
