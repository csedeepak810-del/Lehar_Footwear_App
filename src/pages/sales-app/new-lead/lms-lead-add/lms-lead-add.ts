import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';

declare let cordova: any;
@IonicPage()
@Component({
  selector: 'page-lms-lead-add',
  templateUrl: 'lms-lead-add.html',
})
export class LmsLeadAddPage {

  today_date = new Date().toISOString().slice(0, 10);
  form: any = {};
  form1: any = {};
  isAddContact: any;
  area_list: any = [];
  image: any = '';
  image_data: any = [];
  checkExist: boolean = false
  user_data: any = {};
  state_list: any = [];
  networkType: any = []
  district_list: any = [];
  city_list: any = [];
  source_list: any = [];
  loader: boolean = false;
  editPage: boolean = false;
  constructor(public Device:Device, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public db: MyserviceProvider, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage) {
    this.getNetworkType();
    this.source();
    this.form.uid = this.db.userData.id;
    this.form.uname = this.db.userData.name;
    this.form.value = '0.00';
    this.form.country = 'India';
    this.form.category = 'Cold';
  }

  ionViewDidLoad() {
    this.get_states();
    console.log('ionViewDidLoad LmsLeadAddPage');
    if (this.navParams.get('data')) {
      this.editPage = true;
      this.form = this.navParams.get('data');
      console.log(this.form);
      this.form.mobile = this.form.mobile.toString();
      this.form.type_name = this.form.influencer_type;
      this.form.projectName = this.form.project_name || '';
      this.form.dr_type = this.form.influencer_type_id;
      this.form.dob = this.form.date_of_birth
      this.form.doa = this.form.date_of_anniversary;
      this.form.state = { 'state_name': this.form.state };
      this.form.district = { 'district_name': this.form.district };
      this.get_district();


    }
  }

  get_states() {
    this.db.addData({}, "AppInfluencerSignup/getStates")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.state_list = resp['all_state'];

        }
        else {
          this.db.errorToast(resp['statusMsg'])
        }

      },
        err => {
          this.db.errToasr()
        })
  }
  getNetworkType() {
    this.db.addData('', "AppEnquiry/leadNetworkModule").then((result => {
      if (result['statusCode'] == 200) {
        this.networkType = result['modules'];
      }
      else {
        this.db.errorToast(result['statusMsg'])
      }

    }))
  }
  get_district() {
    let stateName = '';
    if (this.form.state) {
      stateName = this.form.state.state_name;
    }

    this.db.addData({ "state_name": stateName }, "AppInfluencerSignup/getDistrict")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.district_list = resp['all_district'];
        }
        else {
          this.db.errorToast(resp['statusMsg'])
        }

      },
        err => {
          this.db.errToasr();
        })
  }

  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }



  selectLeadType(dr_type) {
    let Index = this.networkType.findIndex(row => row.type == dr_type);
    if (Index != -1) {
      this.form.type_name = this.networkType[Index].module_name;
      this.form.type = this.networkType[Index].type
    } else {
    }

  }

  check_num() {
    if (this.form.mobile && this.form.mobile.length == 10) {
      this.check_mobile_existence(this.form.mobile)
    }
  }
  getCityList() {
    this.form.city1 = [];
    this.db.addData({ 'district_name': this.form.district, 'state_name': this.form.state }, 'dealerData/getCity').then((result) => {
      this.city_list = result['city'];
    });
  }
  source() {
    this.db.addData({}, 'AppEnquiry/enquirySourceList').then((result) => {
      if (result['statusCode'] == 200) {
        this.source_list = result['lead_source_list']
      }
      else {
        this.db.errorToast(result['statusMsg'])
      }


    }, err => {

    })
  }
  check_mobile_existence(mobile) {
    this.db.addData({ 'mobile': mobile }, 'AppEnquiry/check_mobile_existenceLead').then((result) => {
      if (result['statusCode'] == 200) {
        this.checkExist = Boolean(result['checkExist']);
      }
      else {
        this.checkExist = Boolean(result['checkExist']);
        this.db.errorToast(result['statusMsg']);
      }

    }, err => {

    })
  }


  selectarea() {
    this.form1.state = this.form.state;
    this.form1.district = this.form.district;
    this.form1.city = this.form.city1;
    this.db.addData(this.form1, "dealerData/getArea")
      .then(resp => {
        this.area_list = resp['area'];
        this.form.area = '';

      },
        err => {

        })
  }

  submit() {


    if (this.checkExist == true) {
      this.db.errorToast('Mobile No. Already Exists !!');
      return
    }
    if (this.form.mobile.length != 10) {
      return
    }
    if (this.form.state) {
      this.form.state = this.form.state.state_name
    }

    if (this.form.district) {
      this.form.district = this.form.district.district_name
    }

    this.loader = true;
    let header = '';
    if (this.editPage == true) {
      header = 'AppEnquiry/editEnquiry'
    } else {
      header = 'AppEnquiry/addEnquiry'

    }

    this.db.addData({ "data": this.form, }, header)
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.db.successToast(resp['statusMsg']);
          this.navCtrl.pop();
        }
        else {
          this.loader = false;
          this.db.errorToast(resp['statusMsg'])
        }

      },
        err => {
          this.loader = false;

        });
  }

  selectAddressOnBehalfOfPincode() {
    {
      this.db.addData({ 'pincode': this.form.pincode }, 'Enquiry/selectAddressOnBehalfOfPincode').then((result) => {
        this.form.state = result['state_name']
        this.get_district()
        this.form.district = result['district_name']
        this.form.city = result['city']
        this.form.area = result['area']
        this.selectarea();
      }, err => {

      })
    }
  }


  takePhoto() {
    const options: CameraOptions =
    {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 400,
      cameraDirection: 1,
      correctOrientation: true,
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
      if (this.image) {
        this.fileChange(this.image);
      }
    },
      (err) => {
        if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
      });
  }


  fileChange(img) {
    this.image_data.push(img);
    this.image = '';
  }

  remove_image(i: any) {
    this.image_data.splice(i, 1);
  }
  update() {
    if (this.checkExist == true) {
      this.db.presentToast('Mobile No. Already Exists !!');
      return
    }
    if (this.form.mobile.length != 10) {
      return
    }

    this.db.addData({ "id": this.form.id, "data": this.form }, "Lead/update_lead")
      .then(resp => {


        if (resp == 'Success') {
          this.db.presentToast("Success!");
          this.navCtrl.pop();
        }
      },
        err => {

        });
  }

}