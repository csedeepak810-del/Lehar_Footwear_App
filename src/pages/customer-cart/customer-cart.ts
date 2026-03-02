import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ViewChild } from '@angular/core';
import { PrimaryOrderPage } from '../primary-order/primary-order';


/**
 * Generated class for the CustomerCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-cart',
  templateUrl: 'customer-cart.html',
})
export class CustomerCartPage {
  @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;
  cartItems: any[] = [];
  url: string;
  data: any = {
    networkType: '',
    type_name: null,
    segment: {}
  };
  drList: any[] = [];
  disableSelect: boolean = false;
  disableSelectFromCheckin: boolean = false;
  order_data: any = null;
  order_item: any = null;
  add_list: any[] = [];
  search: any;
  disableDistributor: boolean = false;
  disableDirectDealer: boolean = false;
  userType: string = '';
  userData: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,  public alertCtrl: AlertController,
      public service: MyserviceProvider,
      public constant: ConstantProvider) {
         this.url = this.constant.upload_url1 + 'product_image/';
    this.userType = this.navParams.get('userType') || '';
    this.order_data = this.navParams.get('order_data') || null;
    this.order_item = this.navParams.get('order_item') || null;
    console.log(this.constant.UserLoggedInData,'loggedindata')
    this.userData= this.constant.UserLoggedInData;
    console.log(this.userData,'this.userData');

    this.data.networkType = this.constant.UserLoggedInData.type || '';
    console.log(this.data.networkType, 'this.data.networkType');
    this.distributors(this.data.networkType,'');
  }


    ionViewDidLoad() {
        this.userData= this.constant.UserLoggedInData;
    this.data.networkType = this.constant.UserLoggedInData.type || '';
      console.log('ionViewDidLoad CustomerCartPage');
      this.loadCartFromStorage();
    }
  
    ionViewWillEnter() {
    this.userData= this.constant.UserLoggedInData;
    this.data.networkType = this.constant.UserLoggedInData.type || '';
      // Refresh cart every time page is entered
      this.loadCartFromStorage();
    }
  
    // Load cart from storage
    loadCartFromStorage() {
      try {
        const savedCart = sessionStorage.getItem('orderCart');
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
        } else {
          this.cartItems = [];
        }
      } catch (e) {
        console.error('Error loading cart:', e);
        this.cartItems = [];
      }
    }
  
    // Save cart to storage
    saveCartToStorage() {
      try {
        sessionStorage.setItem('orderCart', JSON.stringify(this.cartItems));
      } catch (e) {
        console.error('Error saving cart:', e);
      }
    }
  
    // Get total items count
    get totalItems(): number {
      return this.cartItems.length;
    }
  
    // Get total quantity
    get totalQuantity(): number {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }
  
    // Get grand total amount
    get grandTotal(): number {
      return this.cartItems.reduce((sum, item) => sum + item.total_amount, 0);
    }
  
    // Fetch distributors/dealers list
    distributors(networkType: string, masterSearch: string = '') {
      this.add_list = [];
      this.data.segment = {};
      
      if (this.navParams.get('checkin_id') || this.navParams.get('Dist_login')) {
        this.service.addData({
          'dr_type': networkType,
          'checkin_dr_id': this.navParams.get('id'),
          'master_search': masterSearch
        }, 'AppOrder/followupCustomer').then((result) => {
          let TemData = result['result'];
          let Index = TemData.findIndex(row => row.id == this.data.id);
  
          if (Index != -1) {
            this.drList.push({
              id: TemData[Index].id,
              company_name: TemData[Index].company_name,
              display_name: TemData[Index].display_name
            });
            this.data.type_name = TemData[Index];
          }
        });
      } else {
        this.service.addData({
          'dr_type': networkType,
          'master_search': masterSearch
        }, 'AppOrder/followupCustomer').then((result) => {
          if (result['statusCode'] == 200) {
            this.drList = result['result'];
          } else {
            this.service.errorToast(result['statusMsg']);
          }
        });
      }
    }
  
    // Update quantity of item
    updateQuantity(item: any, change: number) {
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        this.deleteItem(item);
        return;
      }
  
      const availableStock = parseInt(item.stock) || 0;
      if (newQuantity > availableStock) {
        this.service.errorToast(`Maximum stock available is ${availableStock}`);
        return;
      }
  
      item.quantity = newQuantity;
      item.total_amount = item.quantity * item.price;
      this.saveCartToStorage();
    }
  
    // Handle direct quantity input
    onQuantityInput(item: any, event: any) {
      let quantity = parseInt(event.target.value) || 0;
      const availableStock = parseInt(item.stock) || 0;
  
      if (quantity <= 0) {
        this.deleteItem(item);
        return;
      }
  
      if (quantity > availableStock) {
        this.service.errorToast(`Maximum stock available is ${availableStock}`);
        quantity = availableStock;
      }
  
      item.quantity = quantity;
      item.total_amount = item.quantity * item.price;
      event.target.value = quantity;
      this.saveCartToStorage();
    }
  
    // Delete individual item
    deleteItem(item: any) {
      const confirm = this.alertCtrl.create({
        title: 'Delete Item',
        message: `Remove ${item.product_name} (Size: ${item.size}) from cart?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              const index = this.cartItems.indexOf(item);
              if (index > -1) {
                this.cartItems.splice(index, 1);
                this.saveCartToStorage();
                this.service.successToast('Item removed from cart');
              }
            }
          }
        ]
      });
      confirm.present();
    }
  
    // Clear all items
    clearCart() {
      if (this.cartItems.length === 0) {
        this.service.errorToast('Cart is already empty');
        return;
      }
  
      const confirm = this.alertCtrl.create({
        title: 'Clear Cart',
        message: 'Are you sure you want to remove all items from cart?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Clear All',
            handler: () => {
              this.cartItems = [];
              this.saveCartToStorage();
              this.service.successToast('Cart cleared successfully');
            }
          }
        ]
      });
      confirm.present();
    }
  
    closeDealer() {
      this.distributorSelectable._searchText = '';
    }
  
  
    searchParty(data, event) {
      if (event.text == '') {
          this.distributors(data, '');
      }
      this.search = event.text;
      let wordSearch = this.search;
      setTimeout(() => {
          if (wordSearch == this.search) {
              if (this.search) {
                  this.distributors(data, this.search);
              }
          }
      }, 500);
    }
  
  
    // Add more items - go back to product list
    addMoreItems() {
      this.navCtrl.pop();
    }
  
    // Place Order
    placeOrder() {
      if (this.cartItems.length === 0) {
        this.service.errorToast('Cart is empty. Please add items first.');
        return;
      }
  
      // if (!this.data.networkType || !this.data.type_name) {
      //   this.service.errorToast('Please select party type and party before placing order');
      //   return;
      // }
  
      // Prepare order data
      const cleanedItems = this.cartItems.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        size_id: item.size_id,
        size: item.size,
        size_code: item.size_code,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        total_amount: item.total_amount
      }));
  
      const orderData = {
        items: cleanedItems,
        party_type: this.data.networkType,
        party_id: this.userData.id,
        party_name: this.userData.name || this.userData.displayName,
        total_items: cleanedItems.length,
        total_quantity: this.totalQuantity,
        grand_total: this.grandTotal,
        order_date: new Date().toISOString()
      };
  
  
      const partyName = this.userData.name || this.userData.displayName;
      const partyTypeName = this.data.networkType === '1' ? 'Distributor' : 'Direct Dealer';
  
      const confirm = this.alertCtrl.create({
        title: 'Confirm Order',
        message: `
          <div style="text-align: left; padding: 10px;">
            <div style="background: #e8f5e9; padding: 10px; border-radius: 6px; margin-bottom: 12px;">
              <p style="margin: 4px 0;"><strong>Party Type:</strong> ${partyTypeName}</p>
              <p style="margin: 4px 0;"><strong>Party:</strong> ${partyName}</p>
            </div>
            <p style="margin: 8px 0;"><strong>Total Items:</strong> ${this.totalItems}</p>
            <p style="margin: 8px 0;"><strong>Total Quantity:</strong> ${this.totalQuantity}</p>
            <p style="margin: 8px 0; font-size: 18px; color: #27ae60;"><strong>Grand Total: ₹${this.grandTotal.toFixed(2)}</strong></p>
            <br>
            <p style="margin-top: 12px;">Do you want to place this order?</p>
          </div>
        `,
  
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Place Order',
            handler: () => {
              this.processOrder(orderData);
            }
          }
        ]
      });
      confirm.present();
    }
  
    processOrder(orderData: any) {
      this.service.addData(orderData, 'AppOrder/primaryOrdersAdd').then((result) => {
        if (result['statusCode'] === 200) {
          this.service.successToast(result['statusMsg']);
          this.cartItems = [];
          this.saveCartToStorage();
          // this.showSuccessAlert();
          this.navCtrl.push(PrimaryOrderPage);
        } else {
          this.service.errorToast(result['statusMsg'] || 'Failed to place order');
        }
      }).catch((error) => {
        this.service.errorToast('Error placing order. Please try again.');
        console.error('Order error:', error);
      });
    }
  
    showSuccessAlert() {
      const alert = this.alertCtrl.create({
        title: 'Order Placed! 🎉',
        message: `
          <div style="text-align: center; padding: 10px;">
            <p style="font-size: 16px; color: #27ae60; margin-bottom: 10px;">
              Your order has been placed successfully!
            </p>
            <p style="font-size: 14px; color: #7f8c8d;">
              Order Total: <strong>₹${this.grandTotal.toFixed(2)}</strong>
            </p>
          </div>
        `,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Clear cart after successful order
              this.cartItems = [];
              this.saveCartToStorage();
              
              // Navigate back to home/product list
              this.navCtrl.popToRoot();
            }
          }
        ],
        enableBackdropDismiss: false
      });
      alert.present();
    }

}
