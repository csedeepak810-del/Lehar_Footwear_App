import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { StockDetailpagePage } from '../stock-detailpage/stock-detailpage';

/**
 * Generated class for the StockListpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-listpage',
  templateUrl: 'stock-listpage.html',
})
export class StockListpagePage {

  sendRequest:any=false;
  filter:any={}
  StocKListData:any=[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private serve: MyserviceProvider) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad StockListpagePage');
  // }
  ionViewDidEnter(){
    this.get_StockWarehouse_list()
  }
  get_StockWarehouse_list() {
    this.sendRequest = false
   
    this.serve.addData({'filter':this.filter}, 'AppStock/fetchWarehouse').then((result) => {
      if(result['statusCode'] == 200){
     
        console.log(result)
        this.StocKListData = result['result'];
  
        this.sendRequest=true
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



  Stock_detail(id){
    this.navCtrl.push(StockDetailpagePage,{'id':id,})

  }

  
  doRefresh(refresher) {
    this.get_StockWarehouse_list()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }






}
