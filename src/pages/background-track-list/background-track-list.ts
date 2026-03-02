import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
import { Storage } from '@ionic/storage';
import { ExecutiveOrderDetailPage } from '../executive-order-detail/executive-order-detail';
import moment from 'moment';
import { ConstantProvider } from '../../providers/constant/constant';
import { ViewProfilePage } from '../view-profile/view-profile';
import { BackgroundTrackDetailPage } from '../background-track-detail/background-track-detail';

@IonicPage()
@Component({
  selector: 'page-background-track-list',
  templateUrl: 'background-track-list.html',
})
export class BackgroundTrackListPage {
  userId: any;
  data: any = {};
  usersDataCount: any = {};
  updatedData: any = {};
  filter: any = {};
  validateForm: FormGroup;
  type: any;
  user_list: any = [];
  assignUserList: any = [];
  brand: any = [];
  brandList: any = [];
  salesUserList: any = [];
  countryList: any = [];
  state_list: any = [];
  district_list: any = [];
  city_list: any = [];
  upload_url: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: MyserviceProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public db: EnquiryserviceProvider,
    public modalCtrl: ModalController,
    public storage: Storage,
    public toastCtrl: ToastController,
    public constant: ConstantProvider) {
    this.upload_url = this.constant.upload_url1 + 'profile/'
  }

  ionViewDidLoad() {
    this.getuserlist()
    this.get_user()
  }
  get_user() {
    this.storage.get('userId').then((id) => {
      this.userId = id;
      this.service.addData({ 'user_id': this.userId }, "AppAttendence/getAllAsm")
        .then(result => {
          if (result['statusCode'] == 200) {
            this.assignUserList = result['asm_id'];
          } else {
            this.service.errorToast(result['statusMsg'])
          }
        }, error => {
          this.service.Error_msg(error);
          this.service.dismiss();
        })
    })
  }
  getuserlist() {

    this.service.presentLoading()

    this.filter.user_id = this.data.id
    this.service.addData(this.filter, 'AppAttendence/getTeamAttendanceToday').then((result) => {
      if (result['statusCode'] == 200) {
        this.usersDataCount = result['header_count']
        this.user_list = result['attendance'];
        this.service.dismissLoading()
      } else {
        this.service.errorToast(result['statusMsg'])
        this.service.dismissLoading()

      }
    }, err => {
      this.service.Error_msg(err);
      this.service.dismiss();
    });


  }
  doRefresh(refresher) {
    if (this.filter)
      this.filter = {}
    this.getuserlist()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  GoToDetail(data) {
    let dateData
    if (!this.filter.date) {
      dateData = new Date().toISOString().substring(0,10);
    } else {
      dateData = this.filter.date
    }
    console.log(dateData, "this is dateData")

    // this.navCtrl.push(ExecutiveOrderDetailPage, { 'from':'teamMember','userDetail': data,'date':moment(dateData).format('yyyy-MM-DD')})
    this.navCtrl.push(BackgroundTrackDetailPage, { 'from': 'attendance', 'date': dateData, 'userID': data.user_data.id });
  }
  refresh() {
    this.filter = {}
    this.data = {}
    this.getuserlist()
  }
  imageModal(src) {
    this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
  }
}
