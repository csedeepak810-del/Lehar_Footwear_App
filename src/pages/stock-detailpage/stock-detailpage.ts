import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Navbar} from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ViewChild } from '@angular/core';
import { MyserviceProvider } from '../../providers/myservice/myservice';

/**
 * Generated class for the StockDetailpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-detailpage',
  templateUrl: 'stock-detailpage.html',
})
export class StockDetailpagePage {
  @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('itemselectable') itemselectable: IonicSelectableComponent;
    @ViewChild('subCategory') subcatSelectable: IonicSelectableComponent;
    @ViewChild('productCode') prod_codeSelectable: IonicSelectableComponent;
    @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
    @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;


  
  id: any;
  data: any = {}
  filter: any = {};
  sizeList:any=[];
  thicknessList:any=[]
  ProductItem:any=[];
  ProductItemDetail:any=[]
  sendRequest: any = false;
  Stock_detail: any = [];
  CateogryList:any=[];
  StocKListData:any=[]
  ProductList: any = [];
  brandList: any = []
  warehousename: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, private serve: MyserviceProvider) {
   

    if (this.navParams.get('id')) {
      console.log(navParams);

      this.id = this.navParams.get('id');


    }
    if (this.id) {
      this.get_StockWarehouse_list();
      this.GetProducts();
      // this.get_task_detail();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockDetailpagePage');
  }


  get_task_detail() {
    console.log(this.data.items.id)
    this.sendRequest = false
    this.serve.addData({ 'filter': this.filter, 'id': this.id ,'product_id':this.data.items.id }, 'AppStock/fetchProductData').then((result) => {

      if (result['statusCode'] == 200) {
        console.log(result)
        this.Stock_detail = result['result'];
        // this.warehousename = result['warehouse'];
        // this.sendRequest = true
        // console.log(this.warehousename)


      }
      else {
        this.serve.errorToast(result['statusMsg']);

      }

    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });
  }




  get_StockWarehouse_list() {
    this.sendRequest = false
   
    this.serve.addData({'id': this.id}, 'AppStock/fetchWarehouse').then((result) => {
      if(result['statusCode'] == 200){
     
        console.log(result)
        this.StocKListData = result['result'];
  
    
      }
      else{
        this.serve.errorToast(result['statusMsg']);
      
      }
    },
    error => {
      this.serve.Error_msg(error)
     this.serve.dismissLoading();
    });
  }

  SegmentItemDetails() {
       
    this.serve.addData({'category_id':this.data.Cateogry.id,'product_name':this.data.product.product_name,'brand_code':this.data.brand.brand_code,"thickness":this.data.thickness,'size':this.data.size}, "AppOrder/segmentItemsDetails")
        .then(resp => {
            if (resp['statusCode'] == 200) {
                console.log(resp)
                this.ProductItemDetail = resp['result'];
                console.log(this.ProductItemDetail)
                this.ProductItem = resp['result'][0];
            

            } else {
                this.serve.errorToast(resp['statusMsg'])

            }
        }, err => { })
}


  
  GetProducts() {
    this.serve.addData({}, "AppOrder/getProductName")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          console.log(resp)
          this.ProductList = resp['result'];
          console.log(this.ProductList)
        } else {
          this.serve.errorToast(resp['statusMsg'])

        }
      }, err => { })
  }

  getBrands() {
    console.log(this.data.product)
    console.log(this.data.product.product_name)
    this.serve.addData({ 'product_name': this.data.product.product_name }, "AppOrder/getBrand")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.brandList = resp['result'];
          console.log(resp)
        } else {
          this.serve.errorToast(resp['statusMsg'])

        }
      }, err => { })
  }

  GetCateogryList() {
    console.log(this.data.brand)
    console.log(this.data.brand.brand_code)
    this.serve.addData({'product_name':this.data.product.product_name,'brand_code':this.data.brand.brand_code}, "AppOrder/getCategory")
        .then(resp => {
            if (resp['statusCode'] == 200) {
         console.log(resp)
                this.CateogryList = resp['result'];
                console.log(this.CateogryList)

            } else {
                this.serve.errorToast(resp['statusMsg'])

            }
        }, err => { })
}



getThickness(Cateogry) {
  console.log(Cateogry)
  console.log(Cateogry.id)

  this.serve.addData({ 'category_id': Cateogry.id,'product_name':this.data.product.product_name,'brand_code':this.data.brand.brand_code }, "AppOrder/productThikness")
      .then(resp => {
          if (resp['statusCode'] == 200) {
              this.thicknessList = resp['result'];
          } else {
              this.serve.errorToast(resp['statusMsg'])

          }

      }, err => { })
  // this.data.qty = '';
  // this.data.size = '';
}
getSize(thickness) {
  console.log(this.data.Cateogry)
  console.log(this.data.Cateogry.id)
  this.serve.addData({ 'category_id':this.data.Cateogry.id,'product_name':this.data.product.product_name,'brand_code':this.data.brand.brand_code,"thickness": thickness }, "AppOrder/productSize")
      .then(resp => {
          if (resp['statusCode'] == 200) {
              console.log(resp)
              this.sizeList = resp['result'];
              console.log(this.sizeList)
          } else {
              this.serve.errorToast(resp['statusMsg'])

          }
      }, err => { })
  // this.data.qty = '';
}


}
