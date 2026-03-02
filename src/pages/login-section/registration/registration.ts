import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Loading, ModalController, Nav, Events } from 'ionic-angular';
import { DbserviceProvider } from '../../../providers/dbservice/dbservice';
import moment from 'moment';
import { ConstantProvider } from '../../../providers/constant/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoyaltyHomePage } from '../../loyalty/loyalty-home/loyalty-home';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';
import { LoginserviceProvider } from '../../../providers/loginservice/loginservice';
import { Device } from '@ionic-native/device';
import { TranslateService } from '@ngx-translate/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  @ViewChild(Nav) nav: Nav;
  data: any = {};
  form: any = {};
  salesData: any = {};
  state_list: any = [];
  district_list: any = [];
  city_list: any = [];
  profile_data: any = '';
  loading: Loading;
  today_date: any;
  flag: boolean = true;
  bankImageFlag: boolean = false;
  documentImageFlag: boolean = false;
  documentBackImageFlag: boolean = false;
  panImageFlag: boolean = false;
  Influencer: any = []
  uploadurl: any
  cam: any = "Camera";
  gal: any = "Gallery";
  cancl: any = "Cancel";
  ok: any = "Ok";
  upl_file: any = "";
  token_info: any = "";
  save_succ: any = "";
  appVersion: any
  doc: any = [];
  all_State_district: any ;
  lang: any = 'en';
  checked:any=[];
  checks:any=[];
  assignData:any;
  dealerList:any=[]




  savingFlag: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: DbserviceProvider,
    public myservice: MyserviceProvider,
    public constant: ConstantProvider,
    public alertCtrl: AlertController,
    private Device: Device,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public events: Events,
    public diagnostic: Diagnostic,
    public openNativeSettings: OpenNativeSettings,
    public serv: LoginserviceProvider,
    public translate: TranslateService
  ) {
    console.log(this.navParams);
    this.appVersion = navParams.get('app_version');
    this.data['device_unique_id'] = this.Device.uuid;
    this.data['app_version'] = this.appVersion;
    this.data['device_info'] = this.Device.model + ',' + this.Device.platform + ',' + this.Device.version + ',' + this.Device.manufacturer;
    this.uploadurl = constant.influencer_doc;
    this.lang = this.navParams.get("lang");
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    // this.data.type='1';
    this.data.country = 'india';
    this.get_user_lang();
    this.getInfluencer();
    // this.getUser();
    this.data.document_image = '';
    this.data.pan_img = '';
    this.data.bank_img = '';
    this.data.document_image_back = '';
    this.getstatelist();
    this.getsaleslist('');
    if (this.navParams.data.data.registerType == 'Other') {
      this.data.mobile_no = this.navParams.data.data.phone;
    }
    else {
      if (navParams.data.data) {
        console.log(this.navParams)
        this.data = navParams.data.data;
      
  
        this.data.panBase64 = false;
        this.data.bankImgBase64 = false;
        this.data.docFrontBase64 = false;
        this.data.docBackBase64 = false;
        this.data.exist_id = this.data.id;
        this.data.profile_edit_id = this.data.id;
        this.data.doc_back_edit_id = this.data.id;
        this.data.doc_pan_id = this.data.id;
        this.data.bank_img_id = this.data.id;
        this.data.doc_edit_id = this.data.id;
        if (this.data.bank_img == "" || this.data.bank_img == null || this.data.bank_img == undefined) {
          this.bankImageFlag = false
        } else {
          this.bankImageFlag = true
        }
        if (this.data.document_image == "" || this.data.document_image == null || this.data.document_image == undefined) {
          this.documentImageFlag = false
        } else {
          this.documentImageFlag = true
        }
        if (this.data.document_image_back == "" || this.data.document_image_back == null || this.data.document_image_back == undefined) {
          this.documentBackImageFlag = false
        } else {
          this.documentBackImageFlag = true
        }
        if (this.data.pan_img == "" || this.data.pan_img == null || this.data.pan_img == undefined) {
          this.panImageFlag = false
        } else {
          this.panImageFlag = true
        }

        if (this.data.dob == '0000-00-00') {
          this.data.dob = '';
        }
        if (this.data.doa == '0000-00-00') {
          this.data.doa = '';
        }
        if (this.data.state) {
          this.getDistrictList(this.data.state);
          this.getnetworklist(this.data.state,'')
          this.data.dealer_id=[]
          for (let i = 0; i < this.data.dealer_assign_detail.length; i++) 
          {
           this.data.dealer_id.push({'id':String(this.data.dealer_assign_detail[i].dealer_id),'company_name':this.data.dealer_assign_detail[i].company_name})
            
          }
          
          console.log(this.data.dealer_id)

        }
        this.getInfluencer();
        setTimeout(() => {
          this.getRights(this.data.type);
        }, 500);
      }
    }
    this.today_date = new Date().toISOString().slice(0, 10);

  }

  ionViewDidLoad() {
  }

  namecheck(event: any) {
    const pattern = /[A-Z\+\-\a-z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }

  MobileNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  getInfluencer() {
    this.myservice.addData({ 'app_language': this.lang }, 'AppInfluencerSignup/influencerListSignUp').then(result => {
      if (result['statusCode'] == 200) {
        this.Influencer = result['result'];
      }
      else {
        this.myservice.errorToast(result['statusMsg'])
      }
    });
  }
  selectedData:any;
  getnetworklist(state,search) {
    console.log(this.data.dealer_id)
    this.myservice.addData({'state':state,'search':search},  'login/dealerList').then((result) => {
      
      if(result['statusCode']==200){
        this.dealerList = result['result'];

        for(let i = 0 ;i<this.dealerList.length;i++){
          if(this.dealerList[i].company_name==null){
            this.dealerList[i].company_name=''
        }
        if(this.dealerList[i].name==null){
            this.dealerList[i].name=''
        }
        if(this.dealerList[i].mobile==null){
            this.dealerList[i].mobile=''
        }
      
          if(this.dealerList[i].name!=""||this.dealerList[i].mobile!=""){
            this.dealerList[i].company_name=this.dealerList[i].company_name+','+'('+this.dealerList[i].name+'  '+this.dealerList[i].mobile+')'
          }
          if(this.dealerList[i].name==""&&this.dealerList[i].mobile==""){
            this.dealerList[i].company_name=this.dealerList[i].company_name
          }

        
        }
      
      
      }else{
        this.myservice.dismissLoading();
        this.myservice.errorToast(result['statusMsg'])
      }
    }, err => {
      this.myservice.dismissLoading();
      this.myservice.errorToast('Something went wrong')
    });
  }

 
 
  id_array(event){
    console.log(event);
    this.checked=event.value
    for(let i=0;i<=this.checked.length;i++){
      this.checks.push(this.checked[i].id);
    }

  }


  influcencersList: any = [];


  getsaleslist(search) {
    // console.log(district);

    // this.against_type=type.influencer_type;
    this.myservice.addData({'search':search }, 'AppInfluencerSignup/salesuser_List').then((result) => {

      if (result['statusCode'] == 200) {
        this.influcencersList = result['salesuser'];

        for (let i = 0; i < this.influcencersList.length; i++) {
          if (this.influcencersList[i].company_name == null) {
            this.influcencersList[i].company_name = ''
          }
          if (this.influcencersList[i].name == null) {
            this.influcencersList[i].name = ''
          }
          if (this.influcencersList[i].mobile == null) {
            this.influcencersList[i].mobile = ''
          }

          if (this.influcencersList[i].name != "" || this.influcencersList[i].contact_01 != "") {
            this.influcencersList[i].Sale_name = '(' + this.influcencersList[i].name + '  ' + this.influcencersList[i].contact_01 + ')'
          }
          if (this.influcencersList[i].name == "" && this.influcencersList[i].mobile_no == "") {
            this.influcencersList[i].company_name = this.influcencersList[i].company_name
          }

          this.influcencersList[i].id = this.influcencersList[i].id



        }
        if (this.data.exist_id) {
          this.data.sales_id = this.influcencersList.filter(row => row.id == this.data.sales_id)
          this.data.sales_id = this.data.sales_id[0];
          console.log(this.data.sales_id);
          
        }


      } else {
        this.myservice.dismissLoading();
        this.myservice.errorToast(result['statusMsg'])
      }
    }, err => {
      this.myservice.dismissLoading();
      this.myservice.errorToast('Something went wrong')
    });
  }

  allUser: any = [];
  getUser() {

    this.myservice.addData({}, 'AppInfluencerSignup/signUpUserList').then(result => {
      if (result['statusCode'] == 200) {
        this.allUser = result['all_sales_user'];

        for (let i = 0; i < this.allUser.length; i++) {
          this.allUser[i].display_name = this.allUser[i].name + ' ' + '(' + this.allUser[i].mobile_no + ')'
        }
      }
      else {
        this.myservice.errorToast(result['statusMsg'])
      }
    });
  }


  checkRight: any
  getRights(type) {
    let index = this.Influencer.findIndex(row => row.type == type)
    if (index != -1) {
      this.data.scanning_rights = this.Influencer[index].scanning_rights;
      this.data.point_transfer_right = this.Influencer[index].point_transfer_right;
      this.data.influencer_type = this.Influencer[index].module_name;
    }
  }

  getstatelist() {
    this.myservice.addData({}, 'AppInfluencerSignup/getStates').then(result => {
      if (result['statusCode'] == 200) {
        this.state_list = result['all_state'];
      }
      else {
        this.myservice.errorToast(result['statusMsg'])
      }
    });
  }

  getDistrictList(state_name) {
    this.myservice.addData({ 'state_name': state_name }, 'AppInfluencerSignup/getDistrict').then(result => {
      if (result['statusCode'] == 200) {
        this.district_list = result['all_district'];
        
      }
      else {
        this.myservice.errorToast(result['statusMsg']);
      }
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  presentConfirm(title, msg) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: title,
      message: msg,
      cssClass: 'alert-modal',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Settings',
          handler: () => {
            this.openSettings()
          }
        }

      ]
    });
    alert.present();
  }

  openSettings() {
    this.openNativeSettings.open("application_details")
  }
  onUploadChange(evt: any) {
    let actionsheet = this.actionSheetController.create({
      title: this.upl_file,
      cssClass: 'cs-actionsheet',
      buttons: [{
        cssClass: 'sheet-m',
        text: this.cam,
        icon: 'camera',
        handler: () => {
          this.takeDocPhoto();
        }
      },
      {
        cssClass: 'sheet-m1',
        text: this.gal,
        icon: 'image',
        handler: () => {
          this.getDocImage();
        }
      },
      {
        cssClass: 'cs-cancel',
        text: this.cancl,
        role: 'cancel',
        handler: () => {
          this.data.doc_edit_id = this.data.id;
        }
      }
      ]
    });
    actionsheet.present();
  }
  takeDocPhoto() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1050,
      targetHeight: 1000
    }
    

    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.doc_edit_id = '',
        this.data.docFrontBase64 = true
      this.documentImageFlag = true
      this.data.document_image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }
  getDocImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.doc_edit_id = '';
      this.documentImageFlag = true
      this.data.docFrontBase64 = true
      this.data.document_image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }


  onUploadBackChange(evt: any) {
    let actionsheet = this.actionSheetController.create({
      title: this.upl_file,
      cssClass: 'cs-actionsheet',
      buttons: [{
        cssClass: 'sheet-m',
        text: this.cam,
        icon: 'camera',
        handler: () => {
          this.backDocPhoto();
        }
      },
      {
        cssClass: 'sheet-m1',
        text: this.gal,
        icon: 'image',
        handler: () => {
          this.backDocImage();
        }
      },
      {
        cssClass: 'cs-cancel',
        text: this.cancl,
        role: 'cancel',
        handler: () => {
          this.data.doc_back_edit_id = this.data.id;
        }
      }
      ]
    });
    actionsheet.present();
  }
  backDocPhoto() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1050,
      targetHeight: 1000
    }

    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.doc_back_edit_id = ''
      this.documentBackImageFlag = true
      this.data.docBackBase64 = true
      this.data.document_image_back = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }
  backDocImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.doc_back_edit_id = '';
      this.documentBackImageFlag = true
      this.data.docBackBase64 = true
      this.data.document_image_back = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }


  onUploadPan(evt: any) {
    let actionsheet = this.actionSheetController.create({
      title: this.upl_file,
      cssClass: 'cs-actionsheet',
      buttons: [{
        cssClass: 'sheet-m',
        text: this.cam,
        icon: 'camera',
        handler: () => {
          this.panPhoto();
        }
      },
      {
        cssClass: 'sheet-m1',
        text: this.gal,
        icon: 'image',
        handler: () => {
          this.panImage();
        }
      },
      {
        cssClass: 'cs-cancel',
        text: this.cancl,
        role: 'cancel',
        handler: () => {
          this.data.doc_pan_id = this.data.id;
        }
      }
      ]
    });
    actionsheet.present();
  }


  panPhoto() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1050,
      targetHeight: 1000
    }

    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.doc_pan_id = ''
      this.panImageFlag = true
      this.data.panBase64 = true
      this.data.pan_img = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }
  panImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.doc_pan_id = '';
      this.panImageFlag = true
      this.data.panBase64 = true
      this.data.pan_img = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }
  onUploadBankImg(evt: any) {
    let actionsheet = this.actionSheetController.create({
      title: this.upl_file,
      cssClass: 'cs-actionsheet',
      buttons: [{
        cssClass: 'sheet-m',
        text: this.cam,
        icon: 'camera',
        handler: () => {
          this.bankPhoto();
        }
      },
      {
        cssClass: 'sheet-m1',
        text: this.gal,
        icon: 'image',
        handler: () => {
          this.bankImage();
        }
      },
      {
        cssClass: 'cs-cancel',
        text: this.cancl,
        role: 'cancel',
        handler: () => {
          this.data.bank_img_id = this.data.id;

        }
      }
      ]
    });
    actionsheet.present();
  }


  bankPhoto() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1050,
      targetHeight: 1000
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.bank_img_id = '';
      this.bankImageFlag = true
      this.data.bankImgBase64 = true
      this.data.bank_img = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }
  bankImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.flag = false;
      this.data.bank_img_id = '';
      this.bankImageFlag = true
      this.data.bankImgBase64 = true
      this.data.bank_img = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }

  caps_add2(ifsc)
  {
    this.data.ifsc_code = ifsc.toUpperCase();
  }

  submit() {

    // this.data.influencer_type='Plumber';
    if(!this.data.document_image){
      this.data.docFrontBase64 = false;
    } 
    if(!this.data.document_image_back){
      this.data.docBackBase64 = false;
    }
    if(!this.data.bank_img){
      this.data.bankImgBase64 = false;
    } 
    if(!this.data.pan_img){
      this.data.panBase64 = false;
    }

    if (this.data.dob) {
      this.data.dob = moment(this.data.dob).format('YYYY-MM-DD');
    }
    if (this.data.doa) {
      this.data.doa = moment(this.data.doa).format('YYYY-MM-DD');
    }

    this.savingFlag = true;
    this.myservice.addData({ 'data': this.data }, 'AppInfluencerSignup/addInfluencer').then(result => {
      this.form.phone = this.data.mobile_no;
      this.form.registerType = "Other";

      this.form.device_info = this.data.device_info;
      this.form.device_unique_id = this.data.device_unique_id;
      this.form.app_version = this.data.app_version;
      if (result['statusCode'] == 200) {
        this.serv.login_submit(this.form).then((result: any) => {
          if (result.loggedInUserType == 'Other') {
            this.myservice.successToast(result['statusMsg']);
            this.savingFlag = false;
            this.constant.setData();
            this.navCtrl.setRoot(LoyaltyHomePage, { "lang": this.lang });
          }
        })

      }
      else {
        this.myservice.errorToast(result['statusMsg'])
        this.savingFlag = false;
      }
    });

  }


  tokenInfo: any = {};
  get_user_lang() {
    this.storage.get("token")
      .then(resp => {
        this.tokenInfo = this.getDecodedAccessToken(resp);

        this.myservice.addData({ "login_id": this.constant.UserLoggedInData.id, }, 'Login/userLanguage').then(result => {
          if (result['statusCode'] == 200) {
            this.lang = result['result']['app_language'];
            if (this.lang == "") {
              this.lang = "en";
            }
            this.translate.use(this.lang);
          }
          else {
            this.myservice.errorToast(result['statusMsg']);
            this.myservice.dismissLoading();
          }
        })
      })
  }


  getaddress(pincode)
  {
      if(this.data.pincode.length=='6')
      {
          this.myservice.addData({'pincode':pincode},'AppInfluencerSignup/PinCodeWiseState').then( (result) =>
          {
            console.log(result);
            
            if (result['statusCode'] == 200) {
              this.all_State_district = result['all_State_district'];
              
              if(this.all_State_district!= null)
              {
                this.data.state = this.all_State_district.state_name;
                this.getDistrictList(this.data.state)
                this.getnetworklist(this.data.state,'')
                 this.data.district = this.all_State_district.district_name;
                this.data.city = this.all_State_district.city_name;
                console.log(this.data);
              }   
              
            }
            else {
              this.myservice.errorToast(result['statusMsg'])
            }
              
          });
      }
      
  }

  onSearch(event) {
    if(event.text.length>3){
      this.getnetworklist(this.data.state,event.text)
    }
    else if(!event.text){
      this.getnetworklist(this.data.state,'')
    }

   
  }

  se_data(){
    console.log(this.data.dealer_id)

  }
}
