import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { SiteProjectListPage } from '../site-project-list/site-project-list';
import { ConstantProvider } from '../../../providers/constant/constant';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CameraModalPage } from '../../camera-modal/camera-modal';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
declare let cordova: any;

/**
 * Generated class for the AddSitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-site',
  templateUrl: 'add-site-project.html',
})
export class AddSiteProjectPage {
  form: any = {}
  district_list: any = []
  area_list: any = []
  city_list: any = []
  isValidNumber: any = {};
  assignedContact: any = {}
  assignedContactsList: any = []
  customerData: any = []
  state_list: any = []
  networList: any = []
  today_date = new Date().toISOString().slice(0, 10);
  savingFlag: boolean = false;
  locationFlag: boolean = false;
  checkin_disabled: boolean = false;
  showInfluencerDetail: boolean = true;
  siteId: any = ''
  TodayDate = new Date().toISOString();
  maxDate = new Date(new Date().getFullYear() + 5, 11, 31).toISOString();

  // Storage key for temporary form data
  private TEMP_FORM_STORAGE_KEY = 'temp_lead_form_data';

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public locationAccuracy: LocationAccuracy,
    public openNativeSettings: OpenNativeSettings,
    public geolocation: Geolocation,
    public camera: Camera,
    public constant: ConstantProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public serve: MyserviceProvider,
    public storage: Storage
  ) {
    this.form.image_data = []
    console.log('formdata is', this.form)
  }

  ionViewDidEnter() {
    // Load saved form data first
    this.loadFormDataFromStorage();

    this.getNetworkList()
    if (this.navParams.get('checkin_id')) {
      this.form.checkin_id = this.navParams.get('checkin_id')
      this.checkin_disabled = true
      this.form.lead_source = 'Reference'
      this.form.referral_by_type_id = this.navParams.get('dr_type')
      this.form.referral_by_type = this.navParams.get('dr_type_name')
      this.form.referral_by_type = this.navParams.get('dr_type_name')
      this.getNetworkList()
      this.getCustomerData(this.form.referral_by_type_id)
      this.form.referral_by = { 'id': this.navParams.get('dr_id'), 'display_name': this.navParams.get('dr_name') }
      console.log(this.form.referral_by, this.form.referral_by_type_id, "this is from checkin data")
    }
  }

  ionViewDidLoad() {
    this.get_states();
    this.get_district();
    if (this.navParams.data.from == "EditSitePage") {
      this.siteId = this.navParams.data.id
      this.showInfluencerDetail = false
      this.site_detail()
    }
  }

  // Save form data to storage
  saveFormDataToStorage() {
    const formDataToSave = {
      ...this.form,
      timestamp: new Date().getTime(),
      assignedContactsList: this.assignedContactsList,
      image_data: this.image_data
    };

    this.storage.set(this.TEMP_FORM_STORAGE_KEY, formDataToSave).then(() => {
      console.log('Form data saved to storage');
    }).catch(error => {
      console.error('Error saving form data:', error);
    });
  }

  // Load form data from storage
  loadFormDataFromStorage() {
    this.storage.get(this.TEMP_FORM_STORAGE_KEY).then((savedData) => {
      if (savedData) {
        // Check if data is not too old (optional - e.g., 24 hours)
        const currentTime = new Date().getTime();
        const dataAge = currentTime - (savedData.timestamp || 0);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (dataAge < maxAge) {
          // Check if the saved data is essentially empty
          const isEmpty = this.isFormDataEmpty(savedData);

          if (isEmpty) {
            console.log('Saved data is empty, skipping restoration');
            // this.clearStoredFormData();
            return;
          }

          // Restore form data
          this.form = { ...savedData };
          this.assignedContactsList = savedData.assignedContactsList || [];
          this.image_data = savedData.image_data || [];

          // Remove timestamp as it's not part of actual form
          delete this.form.timestamp;

          console.log('Form data loaded from storage:', this.form);

          this.presentRestoredDataAlert();
        } else {
          // Data is too old, clear it
          this.clearStoredFormData();
        }
      }
    }).catch(error => {
      console.error('Error loading form data:', error);
    });
  }

  // Helper method to check if form data is empty
  isFormDataEmpty(savedData) {
    // Check if image_data is empty
    const hasNoImages = !savedData.image_data || savedData.image_data.length === 0;

    // Check if assignedContactsList is empty
    const hasNoContacts = !savedData.assignedContactsList || savedData.assignedContactsList.length === 0;

    // Check if all other form fields are empty (excluding metadata fields)
    const metadataFields = ['image_data', 'assignedContactsList', 'timestamp'];
    const hasNoFormData = Object.keys(savedData).every(key => {
      if (metadataFields.includes(key)) {
        return true; // Skip metadata fields
      }

      const value = savedData[key];
      // Check if value is empty/null/undefined/empty string/empty array
      return !value ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0);
    });

    // Return true if all arrays are empty AND all form fields are empty
    return hasNoImages && hasNoContacts && hasNoFormData;
  }

  // Clear stored form data
  clearStoredFormData() {
    this.storage.remove(this.TEMP_FORM_STORAGE_KEY).then(() => {
      console.log('Stored form data cleared');
      this.refreshPage()
    }).catch(error => {
      console.error('Error clearing stored form data:', error);
    });
  }

  refreshPage(formRef?: NgForm) {
    this.form = {
      image_data: [],
      lead_type: '',
      lead_source: '',
      lead_size: '',
      estimate_delivery_date: '',
      priority: '',
      name: '',
      mobile_number: '',
      designation: '',
      address: '',
      pincode: '',
      state: '',
      district: '',
      city: '',
      // any additional fields
    };

    // Also reset the Angular form if possible
    if (formRef) {
      formRef.resetForm(this.form);
    }

    this.assignedContactsList = [];
    this.image_data = [];
    this.assignedContact = {};
    this.isValidNumber = {};
    this.savingFlag = false;
    this.locationFlag = false;

    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
      this.autoSaveTimeout = null;
    }

    this.get_states();
    this.getNetworkList();

    this.serve.presentToast('Form cleared and page refreshed');
  }
  //  refreshPage() {
  //   // Reset all form data
  //   this.form = { image_data: [] };
  //   this.assignedContactsList = [];
  //   this.image_data = [];
  //   this.assignedContact = {};
  //   this.isValidNumber = {};
  //   this.savingFlag = false;
  //   this.locationFlag = false;

  //   // Clear any auto-save timeouts
  //   if (this.autoSaveTimeout) {
  //     clearTimeout(this.autoSaveTimeout);
  //     this.autoSaveTimeout = null;
  //   }

  //   // Reload essential data
  //   this.get_states();
  //   this.getNetworkList();

  //   // Show success message
  //   this.serve.presentToast('Form cleared and page refreshed');
  //   this.navCtrl.setRoot(this.navCtrl.getActive().component);


  // }

  // Show alert when data is restored
  presentRestoredDataAlert() {
    let alert = this.alertCtrl.create({
      title: 'Data Restored',
      message: 'Your previously entered data has been restored. You can continue filling the form.',
      cssClass: 'alert-modal',
      buttons: [
        {
          text: 'Continue',
          handler: () => {
            // User wants to continue with restored data
          }
        },
        {
          text: 'Start Fresh',
          handler: () => {
            // User wants to start fresh, clear the form
            this.startFreshForm();
          }
        }
      ]
    });
    alert.present();
  }

  // Start with fresh form (clear all data)
  startFreshForm() {
    this.form = { image_data: [] };
    this.assignedContactsList = [];
    this.image_data = [];
    this.clearStoredFormData();
  }

  // Auto-save form data whenever important fields change
  onFormFieldChange() {
    // Debounce the save operation to avoid too frequent saves
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
    }
    this.autoSaveTimeout = setTimeout(() => {
      this.saveFormDataToStorage();
    }, 1000); // Save after 1 second of inactivity
  }
  autoSaveTimeout: any;

  updateStatusBasedOnDate() {
    const selectedDate = new Date(this.form.estimate_delivery_date);
    const currentDate = new Date();

    const differenceInDays = Math.floor(
      (selectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays <= 20) {
      this.form.priority = 'Hot';
    } else if (differenceInDays <= 40) {
      this.form.priority = 'Warm';
    } else {
      this.form.priority = 'Cold';
    }

    // Auto-save when priority changes
    this.onFormFieldChange();
  }

  currentLocationData: any = {}

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

  site_detail() {
    this.serve.addData({ 'id': this.siteId, search: '' }, 'AppEnquiry/getSiteDetail').then((result) => {
      if (result['statusCode'] == 200) {
        if (result['data']['assigned_to_influencer_id'] == 0) {
          this.showInfluencerDetail = true;
        }
        this.form = result['data'];
        this.form.referral_by = { "id": this.form.referral_by, 'display_name': this.form.referral_by_name }
        this.form.influencer_id = { "id": this.form.influencer_id, 'display_name': this.form.registered_by_name }
        if (this.form.referral_by_type_id) {
          this.getCustomerData(this.form.referral_by_type_id);
        }

        for (let index = 0; index < this.form.images.length; index++) {
          this.image_data.push(this.form.images[index]['image'])
        }
        console.log(this.image_data, "image Data")
        console.log(this.form.images, "image Data 2")
      } else {
        this.serve.errorToast(result['statusMsg']);
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });
  }

  getNetworkList() {
    this.serve.addData({}, 'AppEnquiry/networkList').then((result) => {
      if (result['statusCode'] == 200) {
        this.networList = result['result'];
      } else {
        this.serve.errorToast(result['statusMsg']);
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });
  }

  getCustomerData(id) {
    let Index = this.networList.findIndex(row => row.type == id)
    if (Index != -1) {
      this.form.referral_by_type = this.networList[Index]['module_name']
    }
    this.serve.addData({ 'type': id }, 'AppEnquiry/drList').then((result) => {
      if (result['statusCode'] == 200) {
        this.customerData = result['distributor'];
      } else {
        this.serve.errorToast(result['statusMsg']);
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });

    // Auto-save when customer data changes
    this.onFormFieldChange();
  }

  getRegisterdData(id) {
    let Index = this.networList.findIndex(row => row.type == id)
    if (Index != -1) {
      this.form.registered_by_type = this.networList[Index]['module_name']
    }
    this.serve.addData({ 'type': id }, 'AppEnquiry/drList').then((result) => {
      if (result['statusCode'] == 200) {
        this.customerData = result['distributor'];
      } else {
        this.serve.errorToast(result['statusMsg']);
      }
    }, error => {
      this.serve.Error_msg(error);
      this.serve.dismiss();
    });
  }

  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  checkMobileNumber(fieldName: string, event: string) {
    if (event && event.length == 10) {
      let pattern = /[A-z]| |\W|[!@#\$%\^\&*\)\(+=._-]+/;
      let hasSpace = event.search(pattern);
      if (hasSpace != -1) {
        this.isValidNumber[fieldName] = false;
      } else {
        this.isValidNumber[fieldName] = true;
      }
    } else {
      this.isValidNumber[fieldName] = false;
    }

    // Auto-save when mobile number is validated
    this.onFormFieldChange();
  }

  get_states() {
    this.serve.presentLoading()
    this.serve.addData({}, "AppCustomerNetwork/getWorkingStates")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.serve.dismissLoading()
          this.state_list = resp['state_list'];
        } else {
          this.serve.dismissLoading()
          this.serve.errorToast(resp['statusMsg']);
        }
      }, error => {
        this.serve.Error_msg(error);
        this.serve.dismiss();
      })
  }

  getCityList() {
    this.form.city1 = [];
    this.serve.addData({ 'district_name': this.form.district, 'state_name': this.form.state }, 'AppCustomerNetwork/getCity').then((result) => {
      if (result['statusCode'] == 200) {
        this.city_list = result['city'];
      } else {
        this.serve.errorToast(result['statusMsg']);
      }
    }, err => {
      this.serve.errorToast('Something Went Wrong!')
    });

    // Auto-save when city list changes
    this.onFormFieldChange();
  }

  form1: any = {};

  get_district() {
    this.serve.addData({ "state_name": this.form.state }, "AppCustomerNetwork/getDistrict")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.district_list = resp['district_list'];
        } else {
          this.serve.errorToast(resp['statusMsg']);
        }
      }, err => {
        this.serve.errorToast('Something Went Wrong!')
      })
  }

  selectarea() {
    this.form1.state = this.form.state;
    this.form1.district = this.form.district;
    this.form1.city = this.form.city;
    this.serve.addData(this.form1, "AppCustomerNetwork/getArea")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.area_list = resp['area'];
          this.form.area = '';
        } else {
          this.serve.errorToast(resp['statusMsg']);
        }
      }, err => {
        this.serve.errorToast('Something Went Wrong!')
      })

    // Auto-save when area changes
    this.onFormFieldChange();
  }

  blankInfluencerValue() {
    this.form.influencer_city = ''
    this.form.influencer_district = ''
    this.form.influencer_state = ''
    this.form.influencer_pincode = ''
    this.form.influencer_address = ''
    this.form.influencer_mobile = ''
    this.form.influencer_name = ''
    this.form.registered_by_type_id = ''
    this.form.influencer_id = ''

    // Auto-save when influencer values are blanked
    this.onFormFieldChange();
  }

  getSateteDistrcit() {
    this.form1.pincode = this.form.pincode;
    this.serve.addData(this.form1, "AppEnquiry/getPostalInfo")
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.form.state = resp['result'].state_name;
          this.form.district = resp['result'].district_name;
          this.form.city = resp['result'].city;

          if (this.form.influencer_detail) {
            this.form.influencer_state = resp['result'].state_name;
            this.form.influencer_district = resp['result'].district_name;
            this.form.influencer_city = resp['result'].district_name;
          }

          // Auto-save when location data changes
          this.onFormFieldChange();
        } else {
          this.serve.errorToast(resp['statusMsg']);
        }
      }, err => {
        this.serve.errorToast('Something Went Wrong!')
      });
  }

  videoId: any;
  flag_upload = true;
  flag_play = true;
  image: any = "";
  image_data: any = [];

  fileChange(img) {
    this.image_data.push(img);
    this.image = "";
    this.form.image_data = this.image_data

    // Auto-save when images change
    this.onFormFieldChange();
  }

  remove_image(i: any) {
    this.image_data.splice(i, 1);

    // Auto-save when image is removed
    this.onFormFieldChange();
  }

  cameraModal() {
    this.image = [];
    let modal = this.modalCtrl.create(CameraModalPage, { 'type': 'camera' });

    modal.onDidDismiss(data => {
      if (data != undefined && data != null) {
        this.image = data;
        if (this.image) {
          this.image_data.push(this.image)
          this.image = "";
          this.form.image_data = this.image_data

          // Auto-save when new image is added
          this.onFormFieldChange();
        }
      }
    });

    modal.present();
  }

  takePhoto() {
    this.image = [];
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 400
    }

    cordova.plugins.foregroundService.start('Camera', 'is running');
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      cordova.plugins.foregroundService.stop();

      if (this.image) {
        this.image_data.push(this.image)
        this.image = "";
        this.form.image_data = this.image_data

        // Auto-save when photo is taken
        this.onFormFieldChange();
      }
    }, (err) => {
      this.serve.presentToast('Image Failed to upload');
    });
  }

  saveSite() {
    this.savingFlag = true;

    if (this.form.referral_by) {
      this.form.referral_by_name = this.form.referral_by.display_name
      this.form.referral_by = this.form.referral_by.id
    }

    if (this.form.influencer_detail == 'Registered') {
      this.form.influencer_name = this.form.influencer_id.display_name
      this.form.influencer_id = this.form.influencer_id.id
    }

    this.serve.addData({ "data": this.form }, 'AppEnquiry/addSite')
      .then(resp => {
        if (resp['statusCode'] == 200) {
          this.savingFlag = false;
          this.serve.successToast(resp['statusMsg']);

          // Clear stored data after successful save
          this.clearStoredFormData();

          this.navCtrl.popTo(SiteProjectListPage);
        } else {
          this.savingFlag = false;
          this.serve.errorToast(resp['statusMsg']);
        }
      }, error => {
        this.savingFlag = false;
        this.serve.Error_msg(error);
        this.serve.dismiss();
      })
  }

  updateContactList() {
    console.log(this.assignedContact)
    this.assignedContactsList.push(this.assignedContact);
    this.assignedContact = { contactType: '', contactName: '', contactMobile: '' }
    console.log(this.assignedContact)

    // Auto-save when contact is added
    this.onFormFieldChange();
  }

  removeContact(i) {
    this.assignedContactsList.splice(i, 1);

    // Auto-save when contact is removed
    this.onFormFieldChange();
  }

  // Call this method when leaving the page to save current state
  ionViewWillLeave() {
    this.saveFormDataToStorage();
  }

  // Manually save data (can be called from template)
  manualSave() {
    this.saveFormDataToStorage();
    this.serve.presentToast('Form data saved temporarily');
  }

  // Check if there's any stored data
  hasStoredData(): Promise<boolean> {
    return this.storage.get(this.TEMP_FORM_STORAGE_KEY).then(data => {
      return !!data;
    });
  }
}