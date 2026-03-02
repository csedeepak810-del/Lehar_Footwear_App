import { Component , ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { ConstantProvider } from '../../../../providers/constant/constant';
import { SecondaryBillUploadListPage } from '../secondary-bill-upload-list/secondary-bill-upload-list';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner , BarcodeScannerOptions} from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-secondary-bill-upload-add',
  templateUrl: 'secondary-bill-upload-add.html',
})
export class SecondaryBillUploadAddPage {
  
  @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;
  
  selectImage:any=[];
  data: any = {};
  loginDrData: any = {};
  networkList: any = [];
  search: any;
  productList: any = [];
  form: any = {};
  Submit_button: boolean = false
  spinnerLoader: boolean = false
  add_list: any = [];
  qr_code: any = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: MyserviceProvider,public alertCtrl: AlertController,public constant: ConstantProvider,public actionSheetController: ActionSheetController, private camera: Camera,private barcodeScanner: BarcodeScanner) {
    this.getNetworkList('');
    setTimeout(() => {
      this.getProductList('');
    }, 800);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondaryBillUploadAddPage');
  }
  
  searchNetwork(event) {
    if (event.text == '') {
      this.getNetworkList('');
    }
    this.search = event.text;
    let wordSearch = this.search;
    setTimeout(() => {
      if (wordSearch == this.search) {
        if (this.search) {
          this.getNetworkList(this.search);
        }
      }
    }, 500);
  }
  
  
  getNetworkList(masterSearch) {
    
    // this.service.presentLoading();
    this.service.addData({'master_search': masterSearch.text}, 'AppOrder/assignDistributor').then((result) => {
      console.log(result);
      
      if (result['statusCode'] == 200) {
        this.service.dismissLoading();
        this.networkList = result['result'];
        console.log(this.networkList);
        
      } else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.dismissLoading();
    });
  }
  
  searchProduct(event) {
    if (event.text == '') {
      this.getProductList('');
    }
    this.search = event.text;
    let wordSearch = this.search;
    setTimeout(() => {
      if (wordSearch == this.search) {
        if (this.search) {
          this.getProductList(this.search);
        }
      }
    }, 500);
  }
  
  
  
  getProductList(masterSearch) {
    
    // this.service.presentLoading();
    this.service.addData({'master_search': masterSearch}, 'AppOrder/fetchProduct').then((result) => {
      console.log(result);
      
      if (result['statusCode'] == 200) {
        this.service.dismissLoading();
        this.productList = result['result'];
        console.log(this.productList);
        
        for (let index = 0; index < this.productList.length; index++) {
          this.productList[index].display_name = this.productList[index].product_name + " - " + this.productList[index].product_code
        }
        
      } else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.dismissLoading();
    });
  }
  
  getfieldsClear()
  {
    this.data.qty = '';
  }
  
  addToList() {
    console.log(this.data);
    console.log(this.add_list);
    this.data.qty = parseInt(this.data.qty);
    console.log(typeof this.data.qty);
    if (this.data.qty <= 0) {
      console.log('this.data.qty <= 0');
      
      this.service.errorToast('Qty should be greater than 0')
      return;
    }
    let newData
    newData = this.data;
    if (this.add_list.length == 0) {
      console.log('1');
      
      this.add_list.push({'product':newData.product, 'qty':newData.qty});
      
      console.log(newData, 'newData');
      console.log(this.add_list, 'newData');
    }
    else
    {
      let existIndex = this.add_list.findIndex(row => (row.product.id == this.data['product']['id']));
      console.log(existIndex);
      
      if (existIndex != -1) {
        // console.log('1');
        // this.service.errorToast('Already same product added to items')
        console.log( typeof newData.qty);
        
        this.add_list[existIndex].qty=parseInt(this.add_list[existIndex].qty)+parseInt(newData.qty);
      }
      else
      {
        console.log('1');
        this.add_list.push({'product':newData.product, 'qty':newData.qty});
      }
      
    }
    this.data.product = '';
    this.data.qty = '';
    this.data.scanType = '';
    console.log(this.add_list);
  }
  
  
  
  DeleteItem(i) {
    let alert = this.alertCtrl.create({
      title: 'Are You Sure?',
      subTitle: 'Your Want To Remove This Item ',
      cssClass: 'alert-modal',
      
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.data.product = '';
          this.data.qty = '';
          this.data.scanType = '';
          this.add_list.splice(i, 1);
          
        }
      }]
    });
    alert.present();
  }
  
  
  
  submitSecBillUpload() {
    console.log(this.data);
    console.log(this.add_list);
    this.data.image = this.selectImage;
    if (!this.add_list.length) {
      this.service.errorToast('Add atleast one item')      
    }
    // else if(!this.selectImage.length)
    // {
    //   this.service.errorToast('Bill image is required')
    // }
    else
    {
      let alert = this.alertCtrl.create({
        title: 'Save !',
        message: 'Do you want to Save this ?',
        cssClass: 'alert-modal',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Yes',
            handler: () => {
              this.Submit_button = true;
              this.spinnerLoader = true;
              this.data.ItemsDetail = this.add_list
              this.service.addData({ 'data': this.data }, 'AppOrder/secondaryOrdersBillUpload').then((result) => {
                if (result['statusCode'] == 200) {
                  this.spinnerLoader = true
                  this.Submit_button = true
                  this.service.successToast(result['statusMsg'])
                  this.navCtrl.popTo(SecondaryBillUploadListPage);
                } else {
                  this.spinnerLoader = false
                  this.Submit_button = false
                  this.service.errorToast(result['statusMsg'])
                }
              }, error => {
                this.Submit_button = false
                this.spinnerLoader = false
                this.service.Error_msg(error);
                this.service.dismiss();
              });
              
            }
          }
          
        ]
      });
      alert.present();
    }
    
  }
  
  
  
  onUploadChange(evt: any) {
    let actionsheet = this.actionSheetController.create({
      title:'Upload File',
      cssClass: 'cs-actionsheet',
      
      buttons:[{
        cssClass: 'sheet-m',
        text: 'Camera',
        icon:'camera',
        handler: () => {
          this.takePhoto();
        }
      },
      {
        cssClass: 'sheet-m1',
        text: 'Gallery',
        icon:'image',
        handler: () => {
          this.getImage();
        }
      },
      {
        cssClass: 'cs-cancel',
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.selectImage=[];
        }
      }]
    });
    actionsheet.present();
  }
  takePhoto()
  {
    const options: CameraOptions =
    {
      // quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 720,
      quality: 100,
      // targetHeight: 400,
      cameraDirection:1,
      correctOrientation : true,
    }
    
    this.camera.getPicture(options).then((imageData) => {
      var image = 'data:image/jpeg;base64,' + imageData;
      this.selectImage.push(image);
    }, (err) => {
    });
  }
  
  getImage()
  {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    this.camera.getPicture(options).then((imageData) => {
      var image = 'data:image/jpeg;base64,' + imageData;
      this.selectImage.push(image);
    }, (err) => {
    });
  }
  
  delete_img(index){
    this.selectImage.splice(index,1);
  }
  
  scan(scanType) {
    // -----------------------------------//                    
    console.log(scanType);
    
    this.service.presentLoading();
    const options: BarcodeScannerOptions = {
      prompt: ""
    };
    this.barcodeScanner.scan(options).then(resp => {
      this.qr_code = resp.text;
      if (resp.text != '') {
        this.service.addData({ 'coupon_code': this.qr_code }, 'AppCouponScan/fetchProduct').then((r: any) => {
          console.log(r);
          if (r['statusCode'] == 200) {
            console.log('In Function');
            this.service.dismissLoading();
            this.data.product = r['result'];
            this.data.scanType = scanType;
            console.log(this.data);
            return;
          }
          else {
            this.service.dismissLoading();
            this.service.errorToast('statusMsg')
          }
        });
      }
    });
    // -----------------------------------// 
  }
  
}
