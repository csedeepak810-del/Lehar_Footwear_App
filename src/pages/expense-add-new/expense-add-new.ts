import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import * as moment from 'moment/moment';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ExpenseListPage } from '../expense-list/expense-list';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { NgForm } from '@angular/forms';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Device } from '@ionic-native/device';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
import { log } from 'util';

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-expense-add-new',
  templateUrl: 'expense-add-new.html',
})
export class ExpenseAddNewPage {
  item: any = [];
  expense: any = {};
  formData = new FormData();
  travelForm: any = {};
  travelInfo: any = [];
  hotelForm: any = {};
  hotelInfo: any = [];
  isShowErrorBox:any=false;
  expenseAddError:any=false;
  errorMsg:any = ''
  foodForm: any = {};
  foodInfo: any = [];
  localConvForm: any = {};
  isDisabled: boolean = false
  localConvForm1: any = {};
  localConvForm1Data: any = {};
  Submit_button: boolean = false
  spinnerLoader: boolean = false
  localConvInfo: any = [];
  miscExpForm: any = {};
  miscExpInfo: any = [];
  allowanceData: any = {};
  allowancecar: any = [];
  allowancebike: any = [];
  show_amount_input: any = true
  roleId: any = ''
  expand_local: any = false;
  expand_travel: any = false;
  expand_food: any = false;
  expand_hotel: any = false;
  expand_misc: any = false;
  today_date = new Date().toISOString().slice(0, 10);
  form: any;
  hotelamount: any = [];
  allowancehotelamount: any = [];
  foodamount: any = [];
  allowancefoodamount: any = [];
  localamount: any = [];
  localamount1: any = [];
  allowanceta: any = [];
  user_data: any;
  km: any = [];
  yesterday_date:any=''
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public attendence_serv: AttendenceserviceProvider,
    public imagePicker: ImagePicker,
    public serve: MyserviceProvider,
    public events: Events,
    public storage: Storage,
    public openNativeSettings: OpenNativeSettings,
    public diagnostic: Diagnostic,
    private camera: Camera,
    public toastCtrl: ToastController,
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    public Device: Device,
    public constant: ConstantProvider) {
    // this.expense.expType = 'Outstation Travel';
    let today = new Date();
     today.setDate(today.getDate()); // Subtract 1 day
    this.yesterday_date = today.toISOString().slice(0, 10);
    // console.log(yesterday_date,'yesterday_date');
    this.expense.totalAmt = 0;
    this.storage.get('role_id').then((roleId) => {
      if (typeof (roleId) !== 'undefined' && roleId) {
        this.roleId = roleId;
      }
    });

    this.storage.get('displayName').then((displayName) => {
      if (typeof (displayName) !== 'undefined' && displayName) {
        this.expense.userName = displayName;
      }
    });

    // setTimeout(() => {
    //   this.getallowanceData();
    // }, 500);
    if (this.navParams.get('data')) {
      this.expense = this.navParams.get('data');
      this.travelForm.expense_type = this.expense.expenseType
      
      if(this.expense.localConv.length){
        this.item = this.expense.localConv;
        this.expense.localConv = []
      }

      if(this.expense.outstation.length){
        this.item = this.expense.outstation;
        this.expense.outstation = []
      }

      if(this.expense.other.length){
        this.item = this.expense.other;
        this.expense.other = []
      }

      for (let index = 0; index < this.item.length; index++) {
        this.item[index].total_amt = this.item[index].amount;
        this.item[index].expense_type = this.item[index].travel_type;
        
      }

      this.image_data = this.expense.expBills;
      
      this.isDisabled = true;
      // this.expense.expType = this.expense.expenseType;

      if (this.expense.expType == 'Outstation Travel') {
        this.image_data = []




      }
    }


  }

  Calculateamount(amount){
    console.log(amount)
    if(this.travelForm.expense_type=='Local'){
      if(this.travelForm.travel_sub_type=='Four Wheeler'){
        this.travelForm.total_amt = parseFloat(this.allowanceData.localfourwheeler)*parseFloat(this.travelForm.distance);
      }
      else if(this.travelForm.travel_sub_type=='Two Wheeler'){
        this.travelForm.total_amt = parseFloat(this.allowanceData.localtwowheeler)*parseFloat(this.travelForm.distance) ;

      }


 
    }
    if(this.travelForm.expense_type=='Outstation'){

     if(this.travelForm.travel_sub_type_outs=='Four Wheeler'){
        this.travelForm.total_amt = parseFloat(this.allowanceData.outstationfourwheeler)*parseFloat(this.travelForm.distance);
      }
      else if(this.travelForm.travel_sub_type_outs=='Two Wheeler'){
        this.travelForm.total_amt = parseFloat(this.allowanceData.outstationtwowheeler)*parseFloat(this.travelForm.distance) ;
  
      }

    }
 
 
  
  }

  getallowanceData() {
    // this.expense.expType = 'Outstation Travel';
    this.serve.presentLoading();
    this.serve.addData({'claimDate':this.expense.claimDate, 'roleId': this.roleId }, 'AppExpense/travelMode').then((result) => {
      if (result['statusCode'] == 200) {
        this.serve.dismissLoading();
        this.allowanceData = result['expense'];

        //condition add in case of checkin is less than six
        if(this.allowanceData.checkinCount>=7){
          this.isShowErrorBox = false;
        }else{
            this.isShowErrorBox = true;
            if (this.expense.claimDate) {
              let date = new Date(this.expense.claimDate);
              this.expense.claimDate = moment(date).format('MMM DD, YYYY');  // If using Moment.js
            }
            this.errorMsg = 'You Are Not Eligible For DA Allowance Because Your Checkin Count Is Less Than Seven';
        }

         //condition add in case of total km after start attendence is less than 60km
        // if(this.allowanceData.kmPerDate>=60){
        //   this.isShowErrorBoxinKm = false;
        // }else{
        //     this.isShowErrorBoxinKm = true;
        //     if (this.expense.claimDate) {
        //       let date = new Date(this.expense.claimDate);
        //       this.expense.claimDate = moment(date).format('MMM DD, YYYY');  // If using Moment.js
        //     }
        // }

        //condition add in case of user not start attendence
        if(this.allowanceData.attendanceFlag==0){
          this.expenseAddError = true;
        }else{
            this.expenseAddError = false;
        }


        console.log(this.allowanceData,'this.allowanceData');
        
        this.localConvForm.modeOfTravel = 'Public Vehicle'
      } else {
        this.serve.dismissLoading();
        this.serve.errorToast(result['statusMsg'])
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismissLoading();
    })
  }


  blankValue() {
    this.travelForm.travel_sub_type_outs = ''
    this.travelForm.travel_sub_type = ''
    this.travelForm.distance = ''
    this.travelForm.total_amt = ''
    this.travelForm.remark = '';
    this.travelForm.bill_of_private_vehicle_out = ''
    this.travelForm.bill_privatevehile = ''
  }

  blankClassValue() {

    this.travelForm.distance = '';
    this.travelForm.travelAmount = '';
  }

  blankValueLocalConveyance() {
    this.localConvForm1.travelClass = '';
    this.localConvForm1.date = '';
    this.localConvForm1.distance = '';
    this.localConvForm1.amount = '';

    this.localConvForm.travelClass = '';
    this.localConvForm.date = '';
    this.localConvForm.distance = '';
    this.localConvForm.amount = '';
  }
  blankClassValueLocalConveyance() {
    this.localConvForm1.distance = '';
    this.localConvForm1.amount = '';
    // this.localConvForm.distance = '';
    this.localConvForm.amount = '';
  }

  calculateTravelAmount3() {
    if (this.localConvForm1.travelClass == 'Car') {
      this.show_amount_input = true
      this.allowancecar = parseInt(this.allowanceData.car);
      this.localamount = parseInt(this.localConvForm1.amount);
      this.localConvForm1.caramount = this.allowanceData.car
      this.localConvForm1.bikeamount = this.allowanceData.bike
      this.localConvForm1.amount = parseInt(this.localConvForm1.distance) * parseFloat(this.allowanceData.car);
    } else if (this.localConvForm1.travelClass == 'Bike') {
      this.show_amount_input = true
      this.allowancebike = parseInt(this.allowanceData.bike);
      this.localConvForm1.amount = parseInt(this.localConvForm1.distance) * parseFloat(this.allowanceData.bike);
      this.localamount1 = parseInt(this.localConvForm1.amount);
    }
    else if (this.localConvForm.travelClass == 'Car') {
      this.show_amount_input = true
      this.allowancecar = parseInt(this.allowanceData.car);
      this.localConvForm.amount = parseInt(this.localConvForm.distance) * parseFloat(this.allowanceData.car);
    } else if (this.localConvForm.travelClass == 'Bike') {
      this.show_amount_input = true
      this.allowancebike = parseInt(this.allowanceData.bike);
      this.localConvForm.amount = parseInt(this.localConvForm.distance) * parseFloat(this.allowanceData.bike);
    } else if (this.travelForm.travelMode == 'Car' && this.travelForm.arrivalDistance) {
      this.show_amount_input = true
      this.allowancecar = parseInt(this.allowanceData.car);
      this.localConvForm1.caramount = this.allowanceData.car
      this.travelForm.arrivalAmount = parseInt(this.travelForm.arrivalDistance) * parseFloat(this.allowanceData.car);
    } else if (this.travelForm.travelMode == 'Car' && this.travelForm.depatureDistance) {
      this.show_amount_input = true
      this.allowancecar = parseInt(this.allowanceData.car);
      this.localConvForm1.caramount = this.allowanceData.car
      this.travelForm.depatureAmount = parseInt(this.travelForm.depatureDistance) * parseFloat(this.allowanceData.car);
    }
    else {
      this.show_amount_input = false
      this.allowanceta = parseInt(this.allowanceData.ta);
      this.local = parseInt(this.localConvForm1.amount);
    }
  }
  CheckAllowance() {
    console.log("hyy");
    if (this.travelForm.travelClass == 'Logding' && this.travelForm.travelAmount > this.allowanceData.LoadgingAllowance) {
      this.serve.errorToast(this.travelForm.travelClass + " amoutnt can't be greater than " + this.allowanceData.LoadgingAllowance);
      this.travelForm.travelAmount = ''
      return;

    }
    if (this.travelForm.travelClass == 'Boarding' && this.travelForm.travelAmount > this.allowanceData.BoardingAllowance) {
      this.serve.errorToast(this.travelForm.travelClass + " amoutnt can't be greater than " + this.allowanceData.BoardingAllowance);
      this.travelForm.travelAmount = ''
      return;
    }
  }

  calculateTravelAmount2() {
    if (this.travelForm.travelClass == 'Car') {
      this.show_amount_input = true
      this.allowancecar = parseInt(this.allowanceData.car);
      this.localamount = parseInt(this.travelForm.amount);
      this.travelForm.caramount = this.allowanceData.car
      this.travelForm.bikeamount = this.allowanceData.bike
      this.travelForm.travelAmount = parseInt(this.travelForm.distance) * parseFloat(this.allowanceData.car);
    } else if (this.travelForm.travelClass == 'Bike') {
      this.show_amount_input = true
      this.allowancebike = parseInt(this.allowanceData.bike);
      this.travelForm.travelAmount = parseInt(this.travelForm.distance) * parseFloat(this.allowanceData.bike);
      this.localamount1 = parseInt(this.travelForm.travelAmount);
    }
    else {
      this.show_amount_input = false
      this.allowanceta = parseInt(this.allowanceData.ta);
      this.local = parseInt(this.travelForm.travelAmount);
    }
  }


  allowanceLocalDaAmt:any='';
  AllLocalfoodamt:any='';
  addToList() {
    if(!this.travelForm.total_amt || !this.travelForm.remark){
      this.serve.errorToast('Please Fill All Required Fields!')
      return;
    }

    this.isDisabled = true
    this.AllLocalfoodamt = parseInt(this.travelForm.total_amt);
    this.allowanceLocalDaAmt = parseInt(this.allowanceData.localDa);

    //In case of Local expense showing this error
    if (this.AllLocalfoodamt > this.allowanceLocalDaAmt && this.travelForm.expense_type == 'Local' && this.travelForm.travel_sub_type=='DA') {
      this.serve.errorToast("Entered amount can't greater than" + ' ' + 'Rs.' + this.allowanceLocalDaAmt)
      return;
    }

    //In case of OutStation expense showing this error
    // if (this.AllLocalfoodamt > this.allowanceLocalDaAmt && this.travelForm.expense_type == 'Local' && this.travelForm.travel_sub_type_outs=='DA') {
    //   this.serve.errorToast("Entered amount can't greater than" + ' ' + 'Rs.' + this.allowanceLocalDaAmt)
    //   return;
    // }
    //  Filter image_data based on the current travel class
    const currentImageData = this.image_data.filter(image => image.expense_type === this.travelForm.expense_type);
    console.log(currentImageData)
    if (this.item.length > 0) {

      console.log(this.travelForm.travel_sub_type)
      console.log(this.travelForm.travel_sub_type_outs)
      // let existIndex = this.item.findIndex(row =>{console.log( row.travel_sub_type == this.travelForm.travel_sub_type,row.travel_sub_type_outs == this.travelForm.travel_sub_type_outs) ;return row.travel_sub_type == this.travelForm.travel_sub_type ||row.travel_sub_type_outs == this.travelForm.travel_sub_type_outs});
      let existIndex = this.item.findIndex(row => (row.travel_sub_type == this.travelForm.travel_sub_type && this.travelForm.travel_sub_type!='' && this.travelForm.travel_sub_type!= undefined) ||(row.travel_sub_type_out == this.travelForm.travel_sub_type_outs && this.travelForm.travel_sub_type_outs!='' && this.travelForm.travel_sub_type_outs!= undefined));
      console.log(existIndex)
 
      if (existIndex != -1) {
        this.serve.errorToast("Travel Sub Type is already added");
        return;
      }

      else {
        this.item.push({
          'expense_type': this.travelForm.expense_type,
          'travel_sub_type': this.travelForm.travel_sub_type,
          'travel_sub_type_out': this.travelForm.travel_sub_type_outs,
          'total_amt': this.travelForm.total_amt,
          'bill_privatevehile': this.travelForm.bill_privatevehile,
          'distance': this.travelForm.distance,
          'totaltrainmetro_amt': this.travelForm.totaltrainmetro_amt,
          'total_food_amt': this.travelForm.total_food_amt,
          'total_amt_hotelbill': this.travelForm.total_amt_hotelbill,
          'bill_of_private_vehicle_out': this.travelForm.bill_of_private_vehicle_out,
          'remark': this.travelForm.remark,
          'imageData': currentImageData
        })
        console.log(this.item)
        this.blankValue();
      }
    }

    else {

      this.item.push({
        'expense_type': this.travelForm.expense_type,
        'travel_sub_type': this.travelForm.travel_sub_type,
        'travel_sub_type_out': this.travelForm.travel_sub_type_outs,
        'total_amt': this.travelForm.total_amt,
        'bill_privatevehile': this.travelForm.bill_privatevehile,
        'distance': this.travelForm.distance,
        'totaltrainmetro_amt': this.travelForm.totaltrainmetro_amt,
        'total_food_amt': this.travelForm.total_food_amt,
        'total_amt_hotelbill': this.travelForm.total_amt_hotelbill,
        'bill_of_private_vehicle_out': this.travelForm.bill_of_private_vehicle_out,
        'remark': this.travelForm.remark,
        'imageData': currentImageData
      })
      console.log(this.item)
      this.blankValue();

    }



    this.expense.totalAmt = 0;
    for (let i = 0; i < this.item.length; i++) {
      this.expense.totalAmt += parseFloat(this.item[i]['total_amt']);
      console.log(this.expense.totalAmt)
    }




  }






  //   addToList() {
  //     if (!this.travelForm.travelClass) {
  //         this.serve.errorToast('Select Expense type first');
  //         return;
  //     }
  //     if ((this.travelForm.travelClass == 'Bike' || this.travelForm.travelClass == 'Car') && !this.travelForm.distance) {
  //         this.serve.errorToast('Enter distance(kM)');
  //         return;
  //     }
  //     if (!this.travelForm.travelAmount) {
  //         this.serve.errorToast('Enter amount');
  //         return;
  //     }
  //     if (parseFloat(this.travelForm.travelAmount) <= 0) {
  //         this.serve.errorToast('Enter amount cannot be 0');
  //         return;
  //     }

  //     // Check if the selected travel class requires document upload
  //     const isDocumentRequired = ['Flight', 'Train', 'Bus', 'Taxi','Auto','Loadging','Boarding','Tolltax','Miscellaneous'].includes(this.travelForm.travelClass);

  //     // Filter image_data based on the current travel class
  //     const currentImageData = this.image_data.filter(image => image.travelClass === this.travelForm.travelClass);

  //     if (isDocumentRequired && currentImageData.length === 0) {
  //         this.serve.errorToast('Upload document for ' + this.travelForm.travelClass + ' mode of traveling');
  //         return;
  //     }

  //     if (this.item.length > 0) {
  //         let existIndex = this.item.findIndex(row => row.modeOfTravel == this.travelForm.travelClass);
  //         if (existIndex != -1) {
  //             this.serve.errorToast(this.travelForm.travelClass + " mode of traveling is already added");
  //             return;
  //         } else {
  //             this.item.push({
  //                 'modeOfTravel': this.travelForm.travelClass,
  //                 'remark': this.travelForm.remark,
  //                 'amount': parseFloat(this.travelForm.travelAmount),
  //                 'distance': this.travelForm.distance ? this.travelForm.distance : '0',
  //                 'imageData': currentImageData
  //             });
  //             console.log(this.item, 'item array value');
  //             this.blankValue();
  //         }
  //     } else {
  //         this.item.push({
  //             'modeOfTravel': this.travelForm.travelClass,
  //             'remark': this.travelForm.remark,
  //             'amount': parseFloat(this.travelForm.travelAmount),
  //             'distance': this.travelForm.distance ? this.travelForm.distance : '0',
  //             'imageData': currentImageData
  //         });
  //         this.blankValue();
  //     }
  //     this.expense.totalAmt = 0;
  //     for (let i = 0; i < this.item.length; i++) {
  //         this.expense.totalAmt += parseInt(this.item[i]['amount']);
  //     }
  // }



  listdelete(i) {
    this.expense.totalAmt = 0;
    this.item.splice(i, 1);
    for (let i = 0; i < this.item.length; i++) {
      this.expense.totalAmt += parseFloat(this.item[i]['total_amt']);
    }

    if(this.travelForm.expense_type != 'Local' && this.travelForm.expense_type != 'Outstation'){
      this.isDisabled = false; 
    }
  }





  local: any = [];



  videoId: any;
  flag_upload = true;
  flag_play = true;
  image: any = '';
  image_data: any = [];

  fileChange(img) {
    this.image_data.push(img);
    this.image = '';
  }

  // remove_image(i: any) {
  //   this.image_data.splice(i, 1);
  // }
  remove_image(index: number, expensetype: string,id) {
    if(id){
      this.serve.addData({ 'imageId': id }, "AppExpense/expenseImageDelete").then((result => {
        if (result['statusCode'] == '200') {
          this.image_data.splice(index, 1);

        } else {
        }
      }
      ))
    }else{
    // Assuming this.image_data is an array of objects with 'image' and 'travelClass' properties
    this.image_data.splice(index, 1);

    // Update any other logic related to the removal of images

    // Optional: If needed, you can update the 'item' array to remove the image associated with the removed travelClass
    const itemIndex = this.item.findIndex(item => item.modeOfTravel === expensetype);
    if (itemIndex !== -1) {
      this.item[itemIndex].imageData = this.item[itemIndex].imageData.filter(img => img.expense_type !== expensetype);
    }
  }
  }

  showLimit() {
    console.log('Image Data', this.image_data)
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: "You can upload only 5 bill images",
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
  submitExpense() {

    if (this.item < 0) {
      this.serve.presentToast('Add at least one mode of travle');
      return;
    }
    // if (this.expense.expType == 'Local Conveyance') {
    //   this.spinnerLoader = true
    //   this.Submit_button = true
    this.expense.billImage = this.image_data;
    this.expense.ExpenseType = this.travelForm.expense_type;
    this.expense.expenseType = this.travelForm.expense_type;
    //   this.expense.localConv1 = this.localConvForm1;
    //   this.expense.date_from = this.localConvForm1.date;
    //   this.expense.date_to = this.localConvForm1.date_to;
    //   this.expense.localConvAmt1 = this.localConvForm1.amount;
    //   this.expense.localConvfoodAmt1 = this.localConvForm1.food_expense_amount || '0';
    //   this.expense.miscellaneousDetail = this.localConvForm1.miscellaneous_detail;
    //   this.expense.miscellaneousAmount = this.localConvForm1.miscellaneous_amount || '0';
    //   this.expense.totalAmt = Number(this.localConvForm1.amount) + Number(this.expense.localConvfoodAmt1) + Number(this.expense.miscellaneousAmount);
    // } else if (this.expense.expType == 'Outstation Travel') {
    //   this.spinnerLoader = true
    //   this.Submit_button = true
    //   this.expense.billImage = this.image_data;
    //   this.expense.travel = this.travelInfo;
    //   this.expense.hotel = this.hotelInfo;
    //   this.expense.food = this.foodInfo;
    //   this.expense.localConv = this.localConvInfo;
    //   this.expense.miscExp = this.miscExpInfo;
    // }


    this.spinnerLoader = true
    this.Submit_button = true;
    this.expense.modeItem = this.item

    let header;
    if(this.expense.id){
      header = "AppExpense/editExpense"
    }else{
      header = "AppExpense/submitExpense"
    }
    this.serve.addData({ 'expenseData': this.expense, 'expenseId':this.expense.id }, header).then((result) => {
      if (result['statusCode'] == 200) {
        this.spinnerLoader = false
        this.Submit_button = false
        this.serve.successToast(result['statusMsg'])
        this.navCtrl.popTo(ExpenseListPage);
      } else {
        this.spinnerLoader = false
        this.Submit_button = false
        this.serve.errorToast(result['statusMsg']);
      }
    }, error => {
      this.Submit_button = false;
      this.spinnerLoader = false;
      this.navCtrl.popTo(ExpenseListPage);
      this.serve.Error_msg(error);
      // this.serve.dismiss();
    });
  }



  captureMediaMultiple(event) {
    console.log(event);
    let files = event.target.files;
    console.log(files)
    if (files) {
      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();
        console.log(this.image_data);

        reader.onload = (e: any) => {
          this.image_data.push(e.target.result);
          console.log(this.image_data);
        }
        reader.readAsDataURL(file);
      }
    }


  }

  caputureUsingImagePicker() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 6,
      quality: 70,
      outputType: 1,
      width: 600,
      height: 600
    }
    this.imagePicker.requestReadPermission().then((result) => {
      if (result == false) {
        this.imagePicker.requestReadPermission();
      } else {
        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {
            this.image = 'data:image/jpeg;base64,' + results[i];
            if (this.image) {
              this.fileChange(this.image);
            }
          }
        }, (err) => {
          console.log(err);
          this.serve.errorToast(err);
        });
      }
    })

  }

  // captureMedia() {
  //   let actionsheet = this.actionSheetController.create({
  //     title: "Upload Image",
  //     cssClass: 'cs-actionsheet',

  //     buttons: [
  //       {
  //         cssClass: 'sheet-m1',
  //         text: 'Gallery',
  //         icon: 'image',
  //         handler: () => {
  //           this.getImage();
  //         }
  //       },
  //       {
  //         cssClass: 'cs-cancel',
  //         text: 'Cancel',
  //         role: 'cancel',
  //         icon: 'cancel',
  //         handler: () => {

  //         }
  //       }
  //     ]
  //   });
  //   actionsheet.present();
  // }
  captureMedia() {
    let actionsheet = this.actionSheetController.create({
      title: "Upload Image",
      cssClass: 'cs-actionsheet',
      buttons: [{
        cssClass: 'sheet-m',
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.takePhoto();
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

        }
      }
      ]
    });
    actionsheet.present();
  }
  // takePhoto() {
  //   console.log('in take photo', this.image_data)
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 500,
  //     targetHeight: 400

  //   }
  //   // this.service.dismiss();
  //   cordova.plugins.foregroundService.start('Camera', 'is running');
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.image = 'data:image/jpeg;base64,' + imageData;
  //     cordova.plugins.foregroundService.stop();

  //     if (this.image) {
  //       this.fileChange(this.image);
  //     }
  //   }, (err) => {
  //   });
  // }
  takePhoto() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    console.log('in take photo', this.image_data);
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 400
    };
    if(this.Device.platform=='Android'){
    cordova.plugins.foregroundService.start('Camera', 'is running');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }

      if (this.image) {
        // Assuming this.image_data is an array of objects with a 'travelClass' property
        this.fileChange({ image: this.image, ExpenseType: this.travelForm.expense_type });
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

  // getImage() {
  //   const options: CameraOptions =
  //   {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum: false,
  //     cameraDirection: 1,
  //     correctOrientation: true,
  //   }
  //   cordova.plugins.foregroundService.start('Camera', 'is running');
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.image = 'data:image/jpeg;base64,' + imageData;
  //     cordova.plugins.foregroundService.stop();
  //     if (this.image) {
  //       this.fileChange(this.image);
  //     }
  //   }, (err) => {
  //   });




  // }
  getImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      cameraDirection: 1,
      correctOrientation: true,
    };
    if(this.Device.platform=='Android'){
    cordova.plugins.foregroundService.start('Camera', 'is running');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
      if (this.image) {
        // Assuming this.image_data is an array of objects with a 'travelClass' property
        this.fileChange({ image: this.image, ExpenseType: this.travelForm.expense_type });
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


  submitNewExpense() {
    let alert = this.alertCtrl.create({
      title: 'Save Expense',
      message: 'Do you want to Save this Expense?',
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
            if (!this.expense.claimDate) {
              // && this.expense.expType == 'Outstation Travel'
              this.serve.errorToast('Claim Date Is Required');
              return;
            }

            if (this.miscExpForm.amount == undefined || this.miscExpForm.amount == '') {
              this.miscExpForm.amount = 0;
            }

            this.expense.totalAmt += parseInt(this.miscExpForm.amount);
            this.submitExpense()
          }
        }

      ]
    });
    alert.present();
  }

  getYesterday() {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 2);
    return newDate.toISOString().slice(0, 10);

    // let newDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    // return newDate;

    // shortcut
    //  var yesterday = new Date(Date.now() - 864e5); // 864e5 == 86400000 == 24*60*60*1000
    //  console.log(yesterday);
    // return yesterday.toISOString().slice(0, 10)
  }
  getLastMonthDate() {
    let lastMonthDate = moment().subtract(28, 'months').format('YYYY-MM-DD');
    return lastMonthDate;
  }
}
