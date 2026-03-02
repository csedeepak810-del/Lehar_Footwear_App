import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { App, IonicPage, Loading, LoadingController, ModalController, NavController, NavParams, ActionSheet, ActionSheetController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ViewProfilePage } from '../view-profile/view-profile';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../../providers/constant/constant';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";


/**
* Generated class for the ProductSubDetail2Page page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-product-sub-detail2',
  templateUrl: 'product-sub-detail2.html',
})
export class ProductSubDetail2Page {
  prod_id: any = '';
  api: any;
  prod_detail: any = {};
  loading: Loading;
  prod_image: any = [];
  active_image: any = ''
  user_data: any = {};
  userType: any
  company_name: any = 'TMT Plus.'
  image_url: any = ''
  share_image: any;
  lang:any='en'

  constructor(
    public socialSharing: SocialSharing,
    public modalCtrl: ModalController,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service1: MyserviceProvider,
    public constant: ConstantProvider,
    public actionsheet: ActionSheetController,
    public loadingCtrl: LoadingController,
    public  translate:TranslateService,
    private app: App) {
    this.image_url = this.constant.upload_url1 + 'product_image/'
  }

  ionViewDidLoad() {
    this.prod_id = this.navParams.get('id');
    this.lang = this.navParams.get("lang");
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.getProductDetail(this.prod_id);
  }



  getProductDetail(id) {
    this.service1.presentLoading();
    this.service1.addData({ 'id': id }, 'AppCustomerNetwork/segmentItemsDetail').then(r => {
      if (r['statusCode'] == 200) {
        this.prod_detail = r['data'];
        this.service1.dismissLoading()
      } else {
        this.service1.errorToast(r['statusMsg'])
        this.service1.dismissLoading()
      }

    }, (error: any) => {
      this.service1.Error_msg(error);
      this.service1.dismiss();
    });
  }


  viewDetail(image) {
    this.modalCtrl.create(ViewProfilePage, { "Image": image, 'mode': "product_img" }).present();
  }



  shareProducts() {
    let shareDatas
    let imagePath
    imagePath = this.image_url + this.prod_detail.image;
    shareDatas = ("Category Name : " + this.prod_detail.category + "\n" + "Product Name : " + this.prod_detail.product_name + "\n" + "Product Code : " + this.prod_detail.product_code + "\n"  + "Mrp : " + this.prod_detail.mrp)

    let shareActionSheet = this.actionsheet.create({
      title: 'Share',
      cssClass: 'cs-actionsheet',
      buttons: [
        {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.socialSharing.shareViaWhatsApp(shareDatas, imagePath, null).then((e) => {
            }).catch((r) => {
            })
          }
        },
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            this.socialSharing.share(shareDatas, null, imagePath, null).then((e) => {
              console.log(e + "succes");

            }).catch((r) => {
              console.log(r);

            })
          }
        },
        {
          cssClass: 'cs-cancel',
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    })
    shareActionSheet.present();
  }


  tokenInfo:any={};
  get_user_lang()
  {
    this.storage.get("token")
    .then(resp=>{
      this.tokenInfo = this.getDecodedAccessToken(resp );
      
      this.service1.addData({"login_id":this.constant.UserLoggedInData.id}, 'Login/userLanguage').then(result => {
        if (result['statusCode'] == 200) {
          this.lang = result['result']['app_language'];
          if(this.lang == "")
          {
            this.lang = "en";
          }
          this.translate.use(this.lang);
        }
        else {
          this.service1.errorToast(result['statusMsg']);
          this.service1.dismissLoading();
        }
      })
    })
  }

 
  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }




}
