import { Component, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ConstantProvider } from '../../providers/constant/constant';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { LoyaltyPurchaseListPage } from '../loyalty-purchase-list/loyalty-purchase-list';
import { RegistrationPage } from '../login-section/registration/registration';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Device } from '@ionic-native/device';

declare let cordova:any;


/**
* Generated class for the LoyaltyAddPurchasePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-loyalty-add-purchase',
  templateUrl: 'loyalty-add-purchase.html',
})
export class LoyaltyAddPurchasePage {
  @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;
  data: any = {};
  cityList: any = [];
  influcencersList: any = [];
  ItemList:any=[];
  add_list: any = [];
  planDate: any;
  spinner: boolean = false
  userId:any;
  pageName:any;
  filter:any={};
  image: any = '';
  image_data: any = [];
  date_from:any;
  part:any=[];
  catList:any=[];
  type:any;
  against_type:any;
  mode:any='';
  uploadurl: any
  search: any;
  newType:any;


  
  already_exsist : boolean = false;
  saveFlag : boolean = false;
  today_date = new Date().toISOString().slice(0,10);
  max_date = new Date().getFullYear() + 1;
  constructor(public navCtrl: NavController,private camera:Camera, public navParams: NavParams, public serve: MyserviceProvider,public actionSheetController: ActionSheetController,public constant: ConstantProvider
    ,public alertCtrl: AlertController,public toastCtrl: ToastController,  public diagnostic: Diagnostic,
    private Device: Device,
    public openNativeSettings: OpenNativeSettings,) {
    this.uploadurl = constant.influencer_doc;
      this.userId=this.navParams.get('userId')
      this.data=this.navParams.get("data");
      this.type=this.navParams.get("type");
      this.data.type='';
      this.data.bill_no='';
      console.log(this.constant.UserLoggedInData)
      console.log(this.type)
      this.newType=this.type

      // this.getnetworklist('');
      this.categoryList();

   
      
     
      
    }
    
    ionViewDidLoad() {
    }
  
    
    
  
    
    categoryList() {
      this.serve.addData({},  'RetailerRequest/category_list').then((result) => {
        if(result['statusCode']==200){
          this.catList = result['category_list'];
          
        }else{
          this.serve.dismissLoading();
          this.serve.errorToast(result['statusMsg'])
        }
      }, err => {
        this.serve.dismissLoading();
        this.serve.errorToast('Something went wrong')
      });
    }
    
    productItems(cat_id,search) {
      this.data.item_name='';
      this.filter.search = search;
      this.serve.addData({'filter':{'category_id':cat_id ,'search':search}},  'RetailerRequest/product_list').then((result) => {
        if(result['statusCode']==200){
          this.ItemList = result['product_list'];

          for(let i = 0 ;i<this.ItemList.length;i++){
            if(this.ItemList[i].product_name!=""||this.ItemList[i].product_code!=""){
              this.ItemList[i].product_name=this.ItemList[i].product_name+'-'+'('+this.ItemList[i].product_code+')'
            }
          }
          
        }else{
          this.serve.dismissLoading();
          this.serve.errorToast(result['statusMsg'])
        }
      }, err => {
        this.serve.dismissLoading();
        this.serve.errorToast('Something went wrong')
      });
    }

    getnetworklist(type,search) {
      this.serve.addData({'against_influencer_type':type,'state':this.data.state,'search':search},'AppInfluencerSignup/getInfluencerList').then((result) => {
        
        if(result['statusCode']==200){
          this.influcencersList = result['dealer'];
          console.log(this.influcencersList)

          for(let i = 0 ;i<this.influcencersList.length;i++){
            if(this.influcencersList[i].company_name==null){
              this.influcencersList[i].company_name=''
          }
          if(this.influcencersList[i].name==null){
              this.influcencersList[i].name=''
          }
          if(this.influcencersList[i].mobile==null){
              this.influcencersList[i].mobile=''
          }
        
            if(this.influcencersList[i].name!=""||this.influcencersList[i].mobile!=""){
              this.influcencersList[i].company_name=this.influcencersList[i].company_name+','+'('+this.influcencersList[i].name+'  '+this.influcencersList[i].mobile+')'
            }
            if(this.influcencersList[i].name==""&&this.influcencersList[i].mobile==""){
              this.influcencersList[i].company_name=this.influcencersList[i].company_name
            }

           
          }
          // if(this.mode){
          //   this.data.dealer_id=this.influcencersList.filter(row=>row.id == this.data.dealer_id)
          //   this.data.dealer_id=this.data.dealer_id[0];
          // }

          
        }else{
          this.serve.dismissLoading();
          this.serve.errorToast(result['statusMsg'])
        }
      }, err => {
        this.serve.dismissLoading();
        this.serve.errorToast('Something went wrong')
      });
    }

  
    
    
    addToList() {
      this.data.product_name=this.data.item_name.product_name;
      this.data.product_id=this.data.item_name.id;
    

      if(this.add_list.length <=0){
        this.add_list.push(JSON.parse(JSON.stringify(this.data)))
        this.data.qty=''
        this.data.item_name='';
        this.data.cat_id='';
      }
      else{
        let isExistIndex:any;
        isExistIndex=this.add_list.findIndex(row=>row.product_id==this.data.product_id);
        if(isExistIndex == -1){
          this.add_list.push(JSON.parse(JSON.stringify(this.data)))
          this.data.qty='';
          this.data.item_name='';
          this.data.cat_id='';
        }
        else{
            this.add_list[isExistIndex].qty= parseInt(this.add_list[isExistIndex].qty)+parseInt(this.data.qty)
          this.data.qty='';
          this.data.item_name='';
          this.data.cat_id='';
          this.already_exsist = true
        }
      }
    }
    listdelete(index) {
      this.add_list.splice(index, 1);
      this.serve.errorToast("Deleted");
      if(this.add_list.length==0){
        this.image_data=[];
      }
    }
    
    captureMedia() {
      let actionsheet = this.actionSheetController.create({
        title: "Upload Image",
        cssClass: 'cs-actionsheet',
        
        buttons: [{
          cssClass: 'sheet-m',
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            
            
            this.takeDocPhoto();
          }
        },
        {
          cssClass: 'sheet-m1',
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            
            this.getImage();
          }
        },
        {
          cssClass: 'cs-cancel',
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
          this.data.img_id = this.data.id;



            
          }
        }
      ]
    });
    actionsheet.present();
  }
  // takePhoto() {
  //   const options: CameraOptions =
  //   {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 500,
  //     targetHeight: 400,
  //     cameraDirection: 1,
  //     correctOrientation: true
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.data.img_id = '';

  //     this.data.image = 'data:image/jpeg;base64,' + imageData;
  //     console.log(this.image);
  //     this.image_data.push({"image":this.data.image});
  //     console.log(this.image_data,'pushh')
  //     this.data.image= this.image_data;
  //     console.log(this.image)
  //     this.image='';
      
  //     // if (this.image) {
  //     //   console.log(this.image)
  //     //   this.fileChange(this.image);
  //     // }
  //   },
  //   (err) => {
  //   });
  // }

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
  
  selImages:any=[];
  takeDocPhoto()
{
  this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
      const options: CameraOptions = {
        quality: 75,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth : 1050,
        targetHeight : 1000 
      }
      
      console.log(options);
      if(this.Device.platform=='Android'){
        cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
      }
      this.camera.getPicture(options).then((imageData) => {        
        this.data.image = 'data:image/jpeg;base64,' + imageData;
        if(this.Device.platform=='Android'){
          cordova.plugins.foregroundService.stop();
          }

        this.selImages.push({"image":this.data.image});
        this.data.images = this.selImages;
        console.log(this.data, 'line number 309');
        
        this.data.image='';
      }, (err) => {
        if(this.Device.platform=='Android'){
          cordova.plugins.foregroundService.stop();
          }

      });
    }).catch((error: any) => {
      this.presentConfirm('Error Occured', error);
    });
      
      
     
  
  
}
  getImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions =
    {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      cameraDirection: 1,
      correctOrientation: true
    }
    
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.data.image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
        cordova.plugins.foregroundService.stop();
        }

      this.selImages.push({"image":this.data.image});
      this.data.images = this.selImages;
      
      this.data.image='';
      
      
      
    }, (err) => {
      if(this.Device.platform=='Android'){
        cordova.plugins.foregroundService.stop();
        }

      
    });
  }).catch((error: any) => {
    this.presentConfirm('Error Occured', error);
  });
  }


  old_img:any=[]
  // fileChange(img) {
  //   // this.image_data=[];
  //   console.log(this.image_data)

  //   this.image_data.push({'image':img});
  //   console.log(this.image_data)
    
  //   this.image = '';
  // }
  
  remove_image(i: any) {
    this.selImages.splice(i, 1);
  }
  
  numeric_Number(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  // updateDetail() {
  //   this.influencer_detail.edit_profile = 'edit_profile';
  //   console.log(this.influencer_detail)
  //   console.log(this.influencer_detail.state)

  //   this.navCtrl.push(RegistrationPage, { 'data': this.influencer_detail, "mode": 'edit_page' })
  // }


  showLimit() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: "You can upload only 6 bill images",
      cssClass: 'alert-modal',
      
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          
        }
      }
    ]
  });
  alert.present();
}

alertToast(msg){
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

submit(){
  
//   if(!this.selImages.length){
//     let alert = this.alertCtrl.create({
//       title: 'Alert',
//       subTitle: "Upload Bill Image Is Required!",
//       cssClass: 'alert-modal',
      
//       buttons: [{
//         text: 'Ok',
//         role: 'cancel',
//         handler: () => {
          
//         }
//       }
//     ]
//   });
//   alert.present();
//   return;
  
// }

let alert = this.alertCtrl.create({
  title: 'Save Purchase',
  message: 'Do you want to Save this Purchase?',
  cssClass: 'alert-modal',
  buttons: [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
      }
    },
    {
      text: 'Yes',
      handler: () => {
        
        // if(this.add_list < 1){
        //   this.alertToast('Please add one item at least!')
        //   return
        // }
        this.spinner = true;
        this.saveFlag = true;
        this.data.part = this.add_list;
       if(this.type==16){
         let calculatedPoint=this.data.part.map(row=>row.item_name.influencer_point * parseInt(row.qty))
        this.data.transfer_point = calculatedPoint.reduce((accumulator, currentValue) => accumulator + currentValue, 0)


       }
       else if (this.type==8){
        let calculatedPoint=this.data.part.map(row=>row.item_name.plumber_point * parseInt(row.qty))
        this.data.transfer_point = calculatedPoint.reduce((accumulator, currentValue) => accumulator + currentValue, 0)



       }
       else if(this.type==17){
        let calculatedPoint=this.data.part.map(row=>row.item_name.counter_boy_point * parseInt(row.qty))
        this.data.transfer_point = calculatedPoint.reduce((accumulator, currentValue) => accumulator + currentValue, 0)


       }
         this.data.qty = this.data.part.map(row=>row.qty)
         console.log(this.data.point)
        this.data.influencer_id = this.constant.UserLoggedInData.id;
       

        this.data.influencer_type = this.type;


        console.log(this.data.dealer_id)
        this.data.dealer_mobile = this.data.dealer_id.mobile;
        this.data.dealer_name = this.data.dealer_id.company_name;
        this.data.dealer_id = this.data.dealer_id.id;

      


        this.data.image = this.selImages?this.selImages:[];
        this.serve.addData({'data':this.data}, 'RetailerRequest/add_retailer_request').then((result) => {
          
          if(result['statusCode']==200){
            if(result['statusMsg'] == 'Success'){
              this.spinner = false
              this.serve.successToast(result['statusMsg']);
              this.navCtrl.popTo(LoyaltyPurchaseListPage);
            }
            
          }

          else if(result['statusCode']==500){

            this.serve.errorToast(result['msg'])
            this.spinner = false
            //  this.saveFlag = false;
            

            this.serve.dismissLoading();
          }
          
          
          else{
            this.spinner = false
           
            this.serve.dismissLoading();
            this.serve.errorToast(result['statusMsg'])
          }
        }, err => {
          this.spinner = false
          this.serve.dismissLoading();
          this.serve.errorToast('Something went wrong')
        });
        
        
      }
    }
    
  ]
});
alert.present();

}

Editpurchase(){
  
    if(!this.selImages.length){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: "Upload Bill Image Is Required!",
        cssClass: 'alert-modal',
        
        buttons: [{
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
    return;
    
  }
  
  let alert = this.alertCtrl.create({
    title: 'Save Purchase',
    message: 'Do you want to Update this Purchase?',
    cssClass: 'alert-modal',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Yes',
        handler: () => {
          
          // if(this.add_list < 1){
          //   this.alertToast('Please add one item at least!')
          //   return
          // }
          this.spinner = true;
          this.saveFlag = true;
          // this.data.part = this.add_list;
          this.data.purchase_id = this.data.id;
          this.data.influencer_id = this.constant.UserLoggedInData.id;
          this.data.influencer_type = this.type;
          this.data.against_influencer_id = this.data.against_influencer_id.id;
          this.data.against_influencer_type=this.data.against_influencer_type;
  
          this.data.image = this.selImages?this.selImages:[];
          this.serve.addData({'data':this.data}, 'RetailerRequest/update_retailer_request').then((result) => {
            
            if(result['statusCode']==200){
              if(result['statusMsg'] == 'Success'){
                this.spinner = false
                this.serve.successToast(result['statusMsg']);
                this.navCtrl.popTo(LoyaltyPurchaseListPage);
              }
              
            }else{
              this.spinner = false
              this.serve.dismissLoading();
              this.serve.errorToast(result['statusMsg'])
            }
          }, err => {
            this.spinner = false
            this.serve.dismissLoading();
            this.serve.errorToast('Something went wrong')
          });
          
          
        }
      }
      
    ]
  });
  alert.present();
  
  }
  onSearch(event) {
    if(event.text.length>3){
      this.getnetworklist(this.data.type,event.text)
    }
    else if(!event.text){
      this.getnetworklist(this.data.type,'')
    }

   
  }

  searchItemList(event) {
    console.log(event.text);
    if(event.text.length>1){
      this.productItems(this.data.cat_id,event.text)
    }
      else if(!event.text){
        this.productItems(this.data.cat_id,'')
      }
    
  
}




}
