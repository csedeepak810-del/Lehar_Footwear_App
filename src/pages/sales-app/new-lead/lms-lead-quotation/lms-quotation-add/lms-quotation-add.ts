import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Navbar, ToastController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { DbserviceProvider } from '../../../../../providers/dbservice/dbservice';
import { Storage } from '@ionic/storage';
import { MyserviceProvider } from '../../../../../providers/myservice/myservice';
import { LmsQuotationListPage } from '../lms-quotation-list/lms-quotation-list';
import { ConstantProvider } from '../../../../../providers/constant/constant';


@IonicPage()
@Component({
    selector: 'page-lms-quotation-add',
    templateUrl: 'lms-quotation-add.html',
})
export class LmsQuotationAddPage {
    @ViewChild('category') categorySelectable: IonicSelectableComponent;
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('selectComponent') dealerSelectable: IonicSelectableComponent;

    user_data: any = {};
    dealerListArray: any = [];
    categoryList: any = [];
    subCategoryList: any = [];
    itemNameList: any = [];
    forms: any = {};
    paymentStatusArray: any = [];
    product: any = {};
    dr_id: any = '';
    dr_name: any = '';
    master_packing: any;
    std_packing: any;
    totalQty: any = 0;
    check_qty_flag: boolean = false;
    type: any = '';
    cart_array: any = [];
    grand_amt: any = {};
    sub_total: any = 0;
    dis_amt: any = 0;
    gst_amount: any = 0;
    net_total: any = 0;
    spcl_dis_amt: any = 0
    grand_total: any = 0;
    special_discount: any = 0;
    show_price: any = false;
    order_lock: any = false;
    edit_terms: boolean = false;
    from: any = '';
    className: string = '';
    className2: string = '';
    className3: string = '';
    className4: string = '';
    loginType: any = '';
    quotationId: any = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dbService: DbserviceProvider,
        public storage: Storage,
        public alertCtrl: AlertController,
        public constant: ConstantProvider,
        public toastCtrl: ToastController,
        public serve: MyserviceProvider,
    ) {
        // console.log(this.navParams, 'name')


    }

    ionViewDidLoad() {
        this.dr_id = this.serve.userData.id;
        this.dr_name = this.serve.userData.name;
        this.loginType = this.serve.userData.user_type;
        this.from = this.navParams.data.from;

        console.log(this.dr_id, 'login_id')
        if (this.from == 'quotation_details') {
            this.user_data = this.navParams.data['quotation_details'];
            this.totalQty = this.user_data.total_quantity;
            this.sub_total = this.user_data.sub_total;
            this.dis_amt = this.user_data.dis_amt;
            this.net_total = this.user_data.net_total;
            this.grand_total = this.user_data.grand_total;
            this.cart_array = this.navParams.data['quotation_summary'];
            for (let i = 0; i < this.cart_array.length; i++) {
                this.cart_array[i].product_mrp = this.cart_array[i].price;
                this.cart_array[i].small_packing = this.cart_array[i].small_packing_size;

            }
        }

        // this.dealerList();
        this.categoryListFunction();
        this.paymentStatusArray = [
            { id: '1', value: 'Advance Payment', payment_type: 'Advance Payment' },
            { id: '2', value: 'After 10 days of dispatch', payment_type: 'After dispatch' },
            { id: '3', value: 'After 30 days of dispatch at the time of add order', payment_type: 'After 30 days of dispatch at the time of add order' }
        ];
        if (this.from != 'quotation_details') {
            // this.openDealer();
            this.termCondition();
            this.get_details();
        }
    }


    ionViewDidEnter() {
        this.navBar.backButtonClick = () => {
            this.backAction()
        };
    }

    openDealer() {
        this.dealerSelectable.open();
    }


    backAction() {
        if (this.cart_array.length > 0) {
            let alert = this.alertCtrl.create({
                title: 'Are You Sure?',
                subTitle: 'Your want to discard quotation item',
                cssClass: 'alert-modal',
                buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        this.dbService.presentToast('Your Data is Safe')
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.navCtrl.pop();
                        this.cart_array = [];
                    }
                }]
            });
            alert.present();
        }
        else {
            this.navCtrl.pop();
        }
    }

    categoryListFunction() {
        this.categoryList = [];
        this.serve.presentLoading();

        this.serve.addData({}, 'AppQuotation/getCategory3').then((r) => {
            if (r['statusCode'] == 200) {
                this.categoryList = r['result'];
                this.serve.dismissLoading();

            } else {
                this.serve.dismissLoading();
                this.serve.errorToast(r['statusMsg']);
            }

        }, err => {
            this.serve.dismissLoading();
            this.serve.errToasr();
        })
    }



    getSubCategoryListFunction(categoryarray) {
        this.subCategoryList = [];
        this.serve.presentLoading();
        this.serve.addData({ 'category': categoryarray.category }, 'AppQuotation/getSubCategory').then((res) => {
            this.subCategoryList = res['result'];
            setTimeout(() => {
                this.serve.dismissLoading();
            }, 1000);
        }, err => {
            this.serve.dismissLoading();
            this.serve.errToasr()
        });

    }

    getProductCode(subCategory) {
        this.itemNameList = [];
        this.serve.presentLoading();
        this.serve.addData({ 'categoryId': subCategory.id }, 'AppQuotation/product_code').then((test) => {
            if (test['statusCode'] == 200) {
                this.itemNameList = test['result'];
                this.serve.dismissLoading();
            } else {
                this.serve.errorToast(test['statusMsg']);
                this.serve.dismissLoading();
            }
        }, err => {
            this.serve.dismissLoading();
            this.serve.errToasr();
        })
    }

    get_product_data(catNo) {
        this.forms = {
            // 'cat_no': catNo.cat_no,
            'category': catNo.category,
            'product_id': catNo.id,
            'product_name': catNo.product_name,
            'sub_category': catNo.subcategory,
            'user_type': "3",
        }
        this.serve.presentLoading();
        this.serve.addData({ 'form': this.forms }, 'AppQuotation/get_product_data_for_quotaion').then((result) => {
            if (result['statusCode'] == 200) {
                this.serve.dismissLoading();
                this.show_price = true;
                this.product = result['prod_price'];
                this.master_packing = result['prod_price']['master_packing_size'];
                this.std_packing = result['prod_price']['small_packing_size'];
                this.product.sub_category = this.forms.sub_category;
                this.product.product_name = this.forms.product_name;
                this.product.qty = 0;
            } else {
                this.serve.dismissLoading();
                this.serve.errorToast(result['statusMsg']);
            }


        }, err => {
            this.serve.dismissLoading();
            this.serve.errToasr();
        });
    }

    mobileNumber(event: any) {
        if (!/[0-9]/.test(event.key)) {
            return false;
        }
        return true;
    }
    MobileNumber1(event: any) {

        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }
    calculate_amt(type) {
        if (type == 'cartoon_qty') {
            this.product.qty = (this.product.cartoon_packing * this.product.cartoon_qty);

        }
        this.product.discount_amount = 0;
        this.product.subTotal = 0;
        this.product.discountedAmount = 0;

        if (this.product.qty == null) {
            this.product.qty = 0;
        }
        this.product.subTotal = (this.product.price) * (this.product.qty);

        if (this.product.discount) {
            this.product.discount_amount = (this.product.price * this.product.discount) / 100;
        }
        this.product.discountedAmount = parseFloat(this.product.price) - parseFloat(this.product.discount_amount);


        this.product.subtotal_discount = this.product.discount_amount * this.product.qty;

        this.product.subtotal_discounted = this.product.discountedAmount * this.product.qty;

        this.product.subtotal_discounted = this.product.subtotal_discounted.toFixed(2)


    }
    calculate_amt1(type) {

        if (type == 'cartoon_qty') {
            this.product.qty = (this.product.master_packing_size * this.product.cartoon_qty)
        }
        this.product.discount_amount = 0;
        this.product.subTotal = 0;
        this.product.discountedAmount = 0;
        if (this.product.qty == null) {
            this.product.qty = 0;
        }


        this.product.subTotal = (this.product.product_mrp) * (this.product.qty);

        if (this.product.discount) {
            this.product.discount_amount = (this.product.product_mrp * this.product.discount) / 100;
        }

        this.product.discountedAmount = parseFloat(this.product.product_mrp) - parseFloat(this.product.discount_amount)
        this.product.subtotal_discount = this.product.discount_amount * this.product.qty;
        this.product.subtotal_discounted = this.product.discountedAmount * this.product.qty;
        this.product.subtotal_discounted = this.product.subtotal_discounted.toFixed(2);
    }

    addToCart(qty) {
        if (this.cart_array.length == 0) {
            this.cart_array.push(this.product);
        }
        else {
            var flag = true;
            this.cart_array.forEach(element => {
                if (this.product.category == element.category && this.product.sub_category == element.sub_category && (this.product.id == element.id)) {

                    element.subTotal = parseFloat(element.subTotal) + parseFloat(this.product.subTotal);
                    element.subtotal_discount = parseFloat(element.subtotal_discount) + parseFloat(this.product.subtotal_discount);
                    element.subtotal_discount = parseFloat(element.subtotal_discount) + parseFloat(this.product.subtotal_discount);
                    element.subtotal_discounted = parseFloat(element.subtotal_discounted) + parseFloat(this.product.subtotal_discounted);
                    element.qty = parseFloat(element.qty) + parseFloat(this.product.qty);
                    flag = false;
                }
            });

            if (flag) {
                this.cart_array.push(this.product);
            }
        }
        this.user_data.cat_no = '';
        this.show_price = false;


        this.cal_grand_total();
        this.totalQty = parseInt(this.totalQty) + parseInt(qty);



    }

    check_qty() {

        if (this.std_packing != '') {
            if (parseInt(this.product.qty) % parseInt(this.std_packing) == 0) {
                this.check_qty_flag = false
            }
            else {
                this.check_qty_flag = true
                if (this.product.qty != '') {
                    // this.dbService.presentToast(" Qty should be in multiple of "+ this.std_packing);

                    let alert = this.alertCtrl.create({
                        title: 'Error !',
                        subTitle: 'Qty should be in multiple of box packing - ' + this.std_packing,
                        cssClass: 'action-close',

                        buttons: [{
                            text: 'Okay',
                            role: 'Okay',
                            handler: () => {

                            }
                        },
                        ]
                    });
                    alert.present();
                    return

                }

            }

        }
        else {
            this.check_qty_flag = false
        }

        return this.check_qty_flag;

    }

    cal_grand_total() {

        this.sub_total = parseFloat(this.sub_total) + parseFloat(this.product.subTotal);
        this.dis_amt = parseFloat(this.dis_amt) + (parseFloat(this.product.subtotal_discount));
        this.net_total = parseFloat(this.net_total) + parseFloat(this.product.subtotal_discounted);

        this.spcl_dis_amt = (this.net_total * this.special_discount) / 100;

        if (this.type == 'Discount') {
            this.grand_total = Math.round(this.net_total - this.spcl_dis_amt);
        } else {
            this.grand_total = Math.round(this.net_total + this.spcl_dis_amt);
        }

    }

    deleteItemFromCartAlertMessage(index, delQty) {
        let alert = this.alertCtrl.create({
            title: 'Are You Sure?',
            subTitle: 'You want to remove this item ??',
            cssClass: 'action-close',

            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    this.dbService.presentToast('Action Cancelled')
                }
            },
            {
                text: 'Confirm',
                cssClass: 'close-action-sheet',
                handler: () => {
                    this.totalQty = this.totalQty - delQty;
                    this.deleteItemFromCart(index)
                }
            }]
        });
        alert.present();
    }

    deleteItemFromCart(index) {
        this.sub_total = parseFloat(this.sub_total) - parseFloat(this.cart_array[index].subTotal);

        this.dis_amt = parseFloat(this.dis_amt) - parseFloat(this.cart_array[index].subtotal_discount);

        this.net_total = parseFloat(this.net_total) - parseFloat(this.cart_array[index].subtotal_discounted);

        this.spcl_dis_amt = (this.net_total * this.special_discount) / 100;

        if (this.type == 'Discount') {
            this.grand_total = Math.round(this.net_total - this.spcl_dis_amt);
        } else {
            this.grand_total = Math.round(this.net_total + this.spcl_dis_amt);
        }

        this.cart_array.splice(index, 1);

        this.dbService.presentToast('Item removed !!')
    }

    openCategory2() {
        this.categorySelectable.open();
    }

    save_orderalert(type) {
        var str

        if (this.grand_total > 20000000) {
            let alert = this.alertCtrl.create({
                title: 'Max Quotation Order value reached',
                subTitle: 'Maximum Quotation Order value is 2 Cr. !',
                cssClass: 'action-close',

                buttons: [{
                    text: 'Okay',
                    role: 'Okay',
                    handler: () => {

                    }
                },
                ]
            });
            alert.present();
            return
        }
        if (type == 'Draft') {
            str = 'You want to save this order as draft ?'
        }
        else {
            str = 'You want to submit Quotation ?'
        }
        if (this.from != 'quotation_details') {
            let alert = this.alertCtrl.create({
                title: 'Are You Sure?',
                subTitle: str,
                cssClass: 'action-close',

                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: 'Confirm',
                    cssClass: 'close-action-sheet',
                    handler: () => {
                        this.order_lock = true;
                        this.save_order(type)
                    }
                }]
            });
            alert.present();
        }
        if (this.from == 'quotation_details') {
            let alert = this.alertCtrl.create({
                title: 'Are You Sure?',
                subTitle: str,
                cssClass: 'action-close',

                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: 'Confirm',
                    cssClass: 'close-action-sheet',
                    handler: () => {
                        this.order_lock = true;
                        this.save_quotation_from_details(type)
                    }
                }]
            });
            alert.present();
        }


    }

    save_quotation_from_details(type) {
        var orderData = {
            'sub_total': this.sub_total,
            'dis_amt': this.dis_amt,
            'grand_total': this.grand_total,
            'net_total': this.net_total,
            'totalQty': this.totalQty,

        };
        this.serve.presentLoading();

        this.serve.addData({ "cart_data": this.cart_array, "user_data": this.user_data, 'orderData': orderData, 'login_id': this.dr_id, 'login_name': this.dr_name }, 'AppQuotation/quotationEdit').then((res) => {

            if (res['statusCode'] == 200) {
                this.serve.dismissLoading();
                this.navCtrl.pop();
                this.serve.successToast(res['statusMsg'])
            } else {
                this.serve.dismissLoading();
                this.serve.errorToast(res['statusMsg'])
            }
        }, err => {
            this.order_lock = false;
            this.serve.dismissLoading();
            this.serve.errToasr();
        });

    }

    save_order(type) {
        this.serve.presentLoading();
        var orderData = {
            'sub_total': this.sub_total,
            'dis_amt': this.dis_amt,
            'grand_total': this.grand_total,
            'net_total': this.net_total,
            'totalQty': this.totalQty,

        };
        this.serve.addData({ "cart_data": this.cart_array, "user_data": this.user_data, 'orderData': orderData, 'login_id': this.dr_id, 'login_name': this.dr_name, 'quotationId': this.quotationId }, 'AppQuotation/quotationAdd').then((res) => {
            if (res['statusCode'] == 200) {
                this.serve.dismissLoading();
                var toastString = '';
                toastString = 'Quotation Added Successfully !';
                this.navCtrl.pop();
                this.serve.successToast(toastString);
                // this.dbService.presentToast(toastString);

            } else {
                this.serve.dismissLoading();
                this.serve.errorToast(res['statusMsg']);
            }

        }, err => {
            this.order_lock = false;
            this.serve.dismissLoading();
            this.serve.errToasr();
        });

    }

    termCondition() {
        this.serve.addData({}, 'AppQuotation/get_policy').then((resp) => {
            if (resp['statusCode'] == 200) {
                this.user_data.term_condition = resp['result'].term_condition;
            } else {

            }
        });
    }

    changeTermAndCondtion() {
        this.edit_terms = true
    }

    presentAlert(discount) {
        if (discount > 100) {
            let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Discount Cannot be Greater Than 100.',
                buttons: ['dismiss']
            });
            alert.present();
            return (
                this.product.discount = 0,
                this.calculate_amt1('qty')
            )
        }
    }

    errorShowEmail(data) {
        let regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        if (!regex.test(data)) {
            let alert = this.alertCtrl.create({
                title: 'Oops.. Wrong Email Format..',
                subTitle: 'Please Enter Email Again..',
                buttons: ['dismiss']
            });
            alert.present();
        }
    }

    focusError(data) {
        if (!data) {
            this.order_lock = true;

            this.className = 'cs-error'
        } else {
            this.order_lock = false;

            this.className = '';
        }
    }

    focusError2(data) {
        if (!data) {
            this.order_lock = true;

            this.className2 = 'cs-error'
        } else {
            this.order_lock = false;

            this.className2 = '';
        }
    }

    focusError3(data) {
        if (!data || data.length != 10) {
            this.order_lock = true;
            this.className3 = 'cs-error'
        } else {
            this.order_lock = false;
            this.className3 = '';
        }
    }

    focusError4(data) {
        if (!data) {
            this.className4 = 'cs-error'
        } else {
            this.className4 = '';
        }
    }

    get_details() {
        this.serve.addData({ "dr_id": this.dr_id, "type": this.loginType }, "AppQuotation/getdetails")
            .then((resp) => {
                if (resp['statusCode'] == 200) {
                    this.user_data.customer_billing_address = resp['result'].address_data;
                } else {

                }
            }, err => {

            });

    }






}
