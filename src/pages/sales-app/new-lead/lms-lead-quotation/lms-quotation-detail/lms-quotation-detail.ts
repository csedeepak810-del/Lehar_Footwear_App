import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, ActionSheetController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MyserviceProvider } from '../../../../../providers/myservice/myservice';
import { DbserviceProvider } from '../../../../../providers/dbservice/dbservice';
import { ConstantProvider } from '../../../../../providers/constant/constant';
import { LmsQuotationListPage } from '../lms-quotation-list/lms-quotation-list';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
// declare var DocumentViewer: any;
// declare var DocumentViewer: any;
import { FileOpener } from '@ionic-native/file-opener';
import { LmsQuotationAddPage } from '../lms-quotation-add/lms-quotation-add';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
declare var DocumentViewer: any;

@IonicPage()
@Component({
  selector: 'page-lms-quotation-detail',
  templateUrl: 'lms-quotation-detail.html',
})
export class LmsQuotationDetailPage {
  form: any = {};
  add_list: any = [];
  quotationSummary: any = [];
  quotationDetails: any = [];
  quotation_id: any = '';
  app_user_id: any = '';
  app_user_name: any = '';
  active: any = {};
  check_qty_flag: boolean = true;
  order_data: any = {};
  loading: any;
  spcl_dis_amt: any = 0;
  type: any = '';
  pdfUrl: any;
  file: any;
  special_discount: any = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DbserviceProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public serve: MyserviceProvider, public constant: ConstantProvider, public iab:InAppBrowser, public Device:Device,
    private transfer: FileTransfer,
    private modalCtrl: ModalController,) {
    this.pdfUrl = this.constant.upload_url1 + 'quotation/';

    // this.quotationDetail();

  }

  ionViewWillEnter() {
    this.quotationDetail();

  }

  ionViewDidLoad() {
    this.app_user_id = this.serve.userData.id;
    this.app_user_name = this.serve.userData.name;
    this.quotation_id = this.navParams['data'].quotation_id;
    // this.quotationDetail();


  }

  quotationDetail() {
    this.serve.presentLoading();
    this.serve.addData({ 'quotation_id': this.quotation_id }, 'AppQuotation/getQuotationDetail').then((resp) => {

      if (resp['statusCode'] == 200) {
        this.serve.dismissLoading();
        this.form = resp['QuotationDetail']['details'];
        this.quotationSummary = resp['QuotationDetail']['QuotationSummary'];
        this.form.netBreakup = (parseInt(this.form.grand_total) / 1.18);
        this.form.gstBreakup = (parseInt(this.form.grand_total)) - (parseInt(this.form.netBreakup));
        this.form.gstBreakup.toFixed();
        this.quotationSummary.map((items) => {
          items.edit_true = true
          items.edit_true1 = true
        })
      } else {
        this.serve.dismissLoading();
        this.serve.errorToast(resp['statusMsg'])
      }

    }, err => {
      this.serve.errToasr();
      this.serve.dismissLoading();
    })
  }

  openPdfQuotation() {
    let toast = this.toastCtrl.create({
      message: 'Comming Soon.. Please Wait..',
      duration: 3000
    });
    toast.present();
  }

  edit_qty(index) {
    this.active[index] = Object.assign({ 'qty': '1' });
    this.quotationSummary[index].edit_true = false;
  }
  edit_discount(index) {
    this.active[index] = Object.assign({ 'discount': '1' });
    this.quotationSummary[index].edit_true1 = false;
  }

  calculateAmount(qty, index, del, type, data: any) {
    var itemData = this.quotationSummary[index]
    let tmpQty = itemData['qty'];

    this.form.special_discount_amount = 0

    this.quotationSummary[index].subTotal = this.quotationSummary[index].price * this.quotationSummary[index].qty;
    this.quotationSummary[index].discount_amount = this.quotationSummary[index].price * this.quotationSummary[index].discount / 100;
    this.quotationSummary[index].discounted_amount = this.quotationSummary[index].price - this.quotationSummary[index].discount_amount;
    this.quotationSummary[index].amount = parseFloat(this.quotationSummary[index].discounted_amount) * this.quotationSummary[index].qty;
    this.quotationSummary[index].subTotal = parseFloat(this.quotationSummary[index].subTotal);
    this.quotationSummary[index].discount_amount = parseFloat(this.quotationSummary[index].discount_amount);
    this.quotationSummary[index].discounted_amount = parseFloat(this.quotationSummary[index].discounted_amount);
    this.quotationSummary[index].amount = parseFloat(this.quotationSummary[index].amount);

    this.order_data.sub_total = 0;
    this.order_data.discount = 0;
    this.order_data.gst = 0;
    this.order_data.order_total = 0;
    this.form.total_quantity = 0;
    for (var i = 0; i < this.quotationSummary.length; i++) {
      this.order_data.sub_total += parseFloat(this.quotationSummary[i]['subTotal']);
      this.order_data.order_total += parseFloat(this.quotationSummary[i]['subtotal_discounted']);
      this.order_data.discount += parseFloat(this.quotationSummary[i].subTotal) - parseFloat(this.quotationSummary[i].subtotal_discounted);
      this.order_data.subtotal_discounted = this.quotationSummary[i].subtotal_discounted
      this.quotationSummary.qty += parseFloat(this.quotationSummary[i]['qty']);
      if (this.quotationSummary[i].qty == null || this.quotationSummary[i].qty == '0') {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'You Cannot Make Qty Zero or Blank..',
          buttons: ['dismiss']
        });
        alert.present();
        return setTimeout(() => {
          this.quotationDetail()
        }, 1000);;
      }

      this.form.total_quantity = parseFloat(this.form.total_quantity) + parseFloat(this.quotationSummary[i].qty);
      this.form.sub_total = this.order_data.subTotal;
      this.form.order_total = this.order_data.order_total;
      this.form.order_discount = this.order_data.discount;
      this.form.order_gst = this.order_data.gst;
    }

    if (this.form.DiscType == 'Discount') {
      this.order_data.order_grand_total = this.order_data.order_total - this.order_data.special_discount_amount
    }
    else {
      this.order_data.order_grand_total = this.order_data.order_total + this.order_data.special_discount_amount

    }

    this.form.sub_total = this.order_data.sub_total;
    this.form.dis_amt = this.order_data.discount;
    this.form.net_total = parseFloat(this.form.net_total) + parseFloat(this.order_data.subtotal_discounted);
    this.spcl_dis_amt = parseFloat(this.form.net_total) * parseFloat(this.special_discount) / 100
    if (this.type == 'Discount') {
      this.form.grand_total = Math.round(this.form.net_total - this.spcl_dis_amt);
    } else {
      this.form.grand_total = Math.round(this.form.net_total + this.spcl_dis_amt);
    }
    this.check_qty(index);
  }

  calculateAmountq(qty, index, type) {

    if (type == 'cartoon_qty') {
      this.quotationSummary[index].qty = parseFloat(this.quotationSummary[index].cartoon_packing) * parseFloat(this.quotationSummary[index].cartoon_qty);
    }
    this.quotationSummary[index].discount_amount = 0;
    this.quotationSummary[index].subTotal = 0;
    this.quotationSummary[index].discountedAmount = 0;

    if (this.quotationSummary[index].qty == null) {
      this.quotationSummary[index].qty = 0;
    }
    this.quotationSummary[index].subTotal = parseFloat(this.quotationSummary[index].price) * parseFloat(this.quotationSummary[index].qty);

    if (this.quotationSummary[index].discount) {
      this.quotationSummary[index].discount_amount = (parseFloat(this.quotationSummary[index].price) * parseFloat(this.quotationSummary[index].discount)) / 100;
    }
    this.quotationSummary[index].discountedAmount = parseFloat(this.quotationSummary[index].price) - parseFloat(this.quotationSummary[index].discount_amount)
    this.quotationSummary[index].subtotal_discount = parseFloat(this.quotationSummary[index].discount_amount) * parseFloat(this.quotationSummary[index].qty);
    this.quotationSummary[index].subtotal_discounted = parseFloat(this.quotationSummary[index].discountedAmount) * parseFloat(this.quotationSummary[index].qty);
    this.quotationSummary[index].subtotal_discounted = this.quotationSummary[index].subtotal_discounted.toFixed(2);
    this.form.total_quantity = 0;
    this.form.grand_total = 0;
    this.form.net_total = 0;
    this.form.sub_total = 0;
    this.order_data.discount = 0;
    // this.form.dis_amt=0;
    for (let i = 0; i < this.quotationSummary.length; i++) {
      if (this.quotationSummary[i].qty == null || this.quotationSummary[i].qty == '0') {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'You Cannot Make Qty Zero or Blank..',
          buttons: ['dismiss']
        });
        alert.present();
        this.active[index] = Object.assign({ 'qty': '2' });
        setTimeout(() => {
          this.quotationDetail();
        }, 2000);;
      }

      if (this.quotationSummary[i].discount == null) {
        this.quotationSummary[i].discount = 0;

      }
      if (this.quotationSummary[i].discount > 100) {

      }
      this.form.sub_total = parseFloat(this.form.sub_total) + parseFloat(this.quotationSummary[i].subTotal);
      this.order_data.discount += parseFloat(this.quotationSummary[i].subTotal) - parseFloat(this.quotationSummary[i].subtotal_discounted);
      this.form.net_total = parseFloat(this.form.net_total) + parseFloat(this.quotationSummary[i].subtotal_discounted);

      this.spcl_dis_amt = (this.form.net_total * this.special_discount) / 100;
      if (this.type == 'Discount') {
        this.form.grand_total = Math.round(this.form.net_total - this.spcl_dis_amt);
      } else {
        this.form.grand_total = Math.round(this.form.net_total + this.spcl_dis_amt);
      }
      this.form.total_quantity = parseFloat(this.form.total_quantity) + parseFloat(this.quotationSummary[i].qty);
      this.form.dis_amt = this.order_data.discount;
    }
    this.check_qty(index);
    this.check_discount(index);
  }

  check_discount(index) {
    if (this.quotationSummary[index].discount > 100) {
      this.active[index] = Object.assign({ 'discount': '2' });

      let alert1 = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Discount Cannot Be Greater Than 100..',
        buttons: ['dismiss'],
      });
      alert1.present();
      setTimeout(() => {
        this.quotationDetail();
        this.serve.dismissLoading();

      }, 3000);
    }
  }
  check_qty(index) {
    if (this.form.total_quantity < 1 || this.form.sub_total < 1 || this.form.grand_total < 1 || this.form.net_total < 1) {
      this.active[index] = Object.assign({ 'qty': '2' });


      let alert1 = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Values cannot be zero or negative',
        buttons: ['dismiss'],
      });
      alert1.present();
      setTimeout(() => {
        this.quotationDetail();
        this.serve.dismissLoading();

      }, 2000);
    }
  }

  lodingPersent() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    this.loading.present();
  }

  update_Quotation(index, qty, id, discount, del) {
    var orderData = {
      'sub_total': this.form.sub_total,
      'dis_amt': this.form.dis_amt,
      'grand_total': this.form.grand_total,
      'net_total': this.form.net_total,
      'totalQty': this.form.total_quantity,

    };
    this.serve.presentLoading();
    this.serve.addData({ 'qty': qty, 'discount': discount, 'quotation_item_id': id, 'quotation_id': this.quotation_id, 'orderData': orderData, 'cart_data': this.quotationSummary[index], 'user_data': this.form, 'login_name': this.app_user_name, 'login_id': this.app_user_id }, 'AppQuotation/EditQuantity').then((resp) => {
      if (resp['statusCode'] == 200) {
        this.serve.successToast(resp['statusMsg']);
        this.serve.dismissLoading();
        this.quotationDetail();
      } else {
        this.serve.dismissLoading();
        this.serve.errorToast(resp['statusMsg'])
      }

    }, err => {
      this.serve.errToasr();
      this.serve.dismissLoading();
    });
    this.active = {};
    this.quotationSummary[index].edit_true = true;
    this.quotationSummary[index].edit_true1 = true;
  }

  more_item() {
    this.navCtrl.push(LmsQuotationAddPage, { 'quotation_summary': this.quotationSummary, 'quotation_details': this.form, 'from': 'quotation_details' });
  }


  sendEmail() {
    this.serve.presentLoading();
    this.serve.addData({ 'quotation_id': this.quotation_id, 'dr_id': this.form.dealer.id, 'user_id': this.app_user_id }, 'AppQuotation/sendPdf_in_mail').then((resp) => {

      if (resp['statusCode'] == 200) {
        this.serve.dismissLoading();
        this.serve.successToast(resp['statusMsg']);
      } else {
        this.serve.errorToast(resp['statusMsg']);
        this.serve.dismissLoading();

      }




    }, err => {
      this.serve.errToasr();
      this.serve.dismissLoading();
    })

  }

  downloadQuotation() {
    this.serve.presentLoading();
    this.serve.addData({ 'quotation_id': this.quotation_id, 'dr_id': this.form.dealer.id, 'user_id': this.app_user_id }, "AppQuotation/quotation_pdf").then((result) => {

      if (result['statusCode'] == 200) {
        this.serve.dismissLoading();
        var pdfName = this.quotation_id + '.pdf';
        var url = this.pdfUrl + 'Quo_id_' + this.quotation_id + '.pdf';

        if (this.Device.platform == 'Android') {
          const fileTransfer: FileTransferObject = this.transfer.create();
          DocumentViewer.previewFileFromUrlOrPath(
            function () {
            }, function (error) {
              if (error == 53) {
              } else if (error == 2) {
              }
            },
            url, 'PDF', 'application/pdf');
          fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + pdfName).then((entry) => {
          });
        } else {
          this.iab.create(url, '_blank')
        }


      } else {
        this.serve.dismissLoading();
        this.serve.errorToast(result['statusMsg']);

      }

    }, err => {
      this.serve.errToasr();
      this.serve.dismissLoading();
    });

  }


  // openEmailModal(data) {
  //   // { cssClass: "my-modal"}
  //   let workTypeModal = this.modalCtrl.create(EmailModalPage, { 'quotation_id': this.quotation_id, 'dr_id': this.form.dealer.id, 'user_id': this.app_user_id, 'email_id': data });

  //   workTypeModal.onDidDismiss(data => {
  //     this.serve.dismissLoading();

  //     this.quotationDetail();


  //   });

  //   workTypeModal.present();
  // }


}
