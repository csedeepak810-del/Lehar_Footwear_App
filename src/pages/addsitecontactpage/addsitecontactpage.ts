import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';

/**
 * Generated class for the AddsitecontactpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addsitecontactpage',
  templateUrl: 'addsitecontactpage.html',
})
export class AddsitecontactpagePage {
data:any={};
Productdescription:any=[];
categorylist:any=[];
total_qty: any = 0;
from_page: any = '';
leadtype:any;
Siteid:any
savingFlag: boolean = false;
product_list:any=[]
brandlist:any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams, public serve: MyserviceProvider,  public viewCtrl: ViewController) {
console.log(navParams)
    this.from_page = this.navParams.get("from");
    console.log(this.from_page)
    if(this.from_page=='site_contact'){
      this.leadtype = this.navParams.get("lead_type");
      this.Siteid = this.navParams.get("site_id");
      console.log(this.Siteid)

      console.log(this.leadtype)
      this.data.owner_designation=this.leadtype;
      console.log(this.data.owner_designation)
      this.getBrands();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsitecontactpagePage');
  }




  getBrands() {

    this.serve.addData({}, "AppEnquiry/brandList")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          console.log(resp)
          this.brandlist = resp['result'];
         
        } else {
          this.serve.errorToast(resp['statusMsg']);

        }
      },
        err => {
          this.serve.errorToast('Something Went Wrong!')
        })
  }

  blankValueproduct(){
    this.data.brand=''
     this.data.Cateogry=''
    this.data.product_id=''
   this.data.spec=''
    this.data.qty=''

  }


  DeleteItem(index: number): void {
    this.product_list.splice(index, 1); // Removes the item at the specified index
  }

  addToListProduct() {


    if (this.product_list.length > 0) {
      
        let existIndex
        existIndex = this.product_list.findIndex(row => row.product_id == this.data.product_id);
        console.log(existIndex)

        if (existIndex != -1) {
            this.product_list[existIndex]['qty'] += parseFloat(this.data.qty);
            this.blankValueproduct();
        }
        else {
          
      if(this.data.product_id){
        let index
        index = this.Productdescription.findIndex(row => row.id == this.data.product_id)
        if (index != -1) {
          this.data.productdisplay_name = this.Productdescription[index].display_name;  
         console.log(this.data.productdisplay_name)
        }
      }
         
            this.product_list.push({
              'brand': this.data.brand,
              'product_category': this.data.Cateogry,
              'product_id':this.data.product_id,
              'product_description':this.data.productdisplay_name,
              'spec':this.data.spec,
              'qty': parseFloat(this.data.qty), 
          })
            this.blankValueproduct();
        }
    }


    else {



      if(this.data.product_id){
        let index
        index = this.Productdescription.findIndex(row => row.id == this.data.product_id)
        if (index != -1) {
          this.data.productdisplay_name = this.Productdescription[index].display_name;  
         console.log(this.data.productdisplay_name)
        }
      }
        this.product_list.push({
            'brand': this.data.brand,
            'product_category': this.data.Cateogry,
            'product_id':this.data.product_id,
            'product_description':this.data.productdisplay_name,
            'spec':this.data.spec,
            'qty': parseFloat(this.data.qty), 
        })
        console.log(this.product_list)

        this.blankValueproduct();
    }

    this.total_qty = 0;
   

    for (let i = 0; i < this.product_list.length; i++) {
        this.total_qty += parseInt(this.product_list[i]['qty']);
     

    }
 


}


addNewContact() {
  this.savingFlag = true;
  this.serve.addData({ "data": { 'id': this.Siteid, 'contactDetails': [this.data],'productdata':this.product_list } }, 'AppEnquiry/addSiteContactPerson')
    .then(resp => {
      if (resp['statusCode'] == 200) {
        this.savingFlag = false;
        this.serve.successToast(resp['statusMsg']);
        this.viewCtrl.dismiss(true);
      } else {
        this.savingFlag = false;
        this.serve.errorToast(resp['statusMsg']);
      }
    }, error => {
      this.savingFlag = false;
      this.serve.Error_msg(error);
    })

}



  getCateogry() {
    console.log('helo')
    this.serve.addData({'brand_code':this.data.brand}, "AppEnquiry/productCategory")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          console.log(resp)
          this.categorylist = resp['result'];
          console.log(this.categorylist)   
        } else {
          this.serve.errorToast(resp['statusMsg']);

        }
      },
        err => {
          this.serve.errorToast('Something Went Wrong!')
        })
  }


  getProductDescription() {
    console.log('helo')
    this.serve.addData({'product_name':this.data.Cateogry}, "AppEnquiry/productDescription")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          console.log(resp)
          this.Productdescription = resp['result'];     
        } else {
          this.serve.errorToast(resp['statusMsg']);

        }
      },
        err => {
          this.serve.errorToast('Something Went Wrong!')
        })
  }

}
