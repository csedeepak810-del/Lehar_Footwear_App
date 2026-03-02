import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';

/**
 * Generated class for the PointDetailImgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-detail-img',
  templateUrl: 'point-detail-img.html',
})
export class PointDetailImgPage {

  about_data:any={};
  url:any;
  upload_url4:any=[];
  pointDetailImg:any=[]


  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:MyserviceProvider , public constant : ConstantProvider) {
    this.service.presentLoading();
    this.url = constant.upload_url1+'about/';
    this.getImage()
    this.service.dismissLoading(); 


  
  }
  
  
  ionViewDidLoad() {
    
  }


  getImage(){
    this.service.addData({}, 'AppInfluencerSignup/send_img').then((result) => {
      if (result['statusCode'] == 200) {
        this.pointDetailImg = result['images'];
      }
      else {
        this.service.errorToast(result['statusMsg']);
      }
    });
  }

}
