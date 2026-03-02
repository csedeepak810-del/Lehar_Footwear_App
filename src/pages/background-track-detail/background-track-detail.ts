import { Component ,ViewChild,ElementRef,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ActionSheetController,Platform, Events,ModalController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../../providers/constant/constant';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { FileOpener } from '@ionic-native/file-opener';
import COLORS from '../../Lib/color';
import BackgroundGeolocation, {
  Location,
  HttpEvent,
  HeartbeatEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  ConnectivityChangeEvent,
  DeviceInfo,
  TransistorAuthorizationToken
} from "cordova-background-geolocation-lt"

declare var google;
declare const L: any;


@IonicPage()
@Component({
  selector: 'page-background-track-detail',
  templateUrl: 'background-track-detail.html',
})
export class BackgroundTrackDetailPage {
  
  @ViewChild('map') mapElement: ElementRef;
  loading: any;
  TabType: any = 'Live';
  userData: any = {};
  userDetail: any = {};
  // deviceInfo: DeviceInfo;
  state: any;
  enabled: boolean;
  isMoving: boolean;
  distanceFilter: number;
  stopTimeout: number;
  autoSync: boolean;
  stopOnTerminate: boolean;
  startOnBoot: boolean;
  debug: boolean;
  provider: any;
  menuActive: boolean;
  motionActivity: string;
  odometer: string;
  map: any;
  locationMarkers: any;
  currentLocationMarker: any;
  lastLocation: any;
  stationaryRadiusCircle: any;
  pageFrom: any;
  pageFrom1:any;
  polyline: any;
  DateData: any;
  latest_location: any={};
  userID: any = '';
  Multiple_Location: any = [];
  checkin_data: any = [];
  mapOptions: any = {};
  polylinePath: any = [];
  myMap: any
  router: any
  distance: any;

  constructor(public navCtrl: NavController, private fileOpener: FileOpener,
    public events: Events, public constant: ConstantProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController,
    public navParams: NavParams, public service: MyserviceProvider, public toastCtrl: ToastController, public alertCtrl: AlertController,
    public storage: Storage, public actionSheetController: ActionSheetController, public camera: Camera, private transfer: FileTransfer, public db: DbserviceProvider,
    private zone: NgZone,
    private platform: Platform,
  ) {
    // this.getuserDetail()

    // this.pageFrom1 = this.navParams.get('from')
    this.pageFrom = this.navParams.get('from')
    if (this.pageFrom == 'attendance') {
      this.userID = this.navParams.get('userID')
      this.DateData = this.navParams.get('date')

    }
    else if(this.pageFrom == 'checkin'){
      this.userID = this.navParams.get('userID')
      this.DateData = this.navParams.get('date')
      this.TabType='Tracker'
    }
     else {
      this.userDetail = this.navParams.get('userDetail')
      this.DateData = this.navParams.get('date')
      this.userID = this.userDetail.user_data.id
    }
    this.state = {};
    this.isMoving = false;
    this.enabled = false;
    this.autoSync = true;
    this.distanceFilter = 10;
    this.stopTimeout = 1;
    this.stopOnTerminate = false;
    this.startOnBoot = true;
    this.debug = true;

    // UI members.
    this.motionActivity = 'Activity';
    this.menuActive = false;
  }
  // ionViewDidLoad() {

  //   console.log('ionViewDidLoad HomePage');
  //   this.getuserDetail()
  // }
  ionViewWillEnter() {
    console.log(this.TabType);
    if(this.TabType=='Live')
    this.getuserDetail()
    else
    this.getLatesRoute()
    if(this.pageFrom == 'checkin'){
    this.getuserDetail()
    }

   }

   refresh(Tab){
    if(Tab=='Live')
      this.getuserDetail()
      else
      this.getLatesRoute()
   }
  getuserDetail() {
    // this.locationMarkers={};
    if(this.TabType=='Live')
    this.service.presentLoading()

    this.service.addData({ 'user_id': this.userID, 'start_date': this.DateData }, 'AppLocation/getLatestGeoLocation').then((result) => {
      if (result['statusCode'] == 200) {

        this.latest_location = result['latest_location']
        this.userData = result['user_data']
        this.configureMap(this.TabType)
        this.service.dismissLoading()
      } else {
        this.service.errorToast(result['statusMsg'])
        this.service.dismissLoading()

      }
    }, err => {
      this.service.Error_msg(err);
      this.service.dismiss();
    });


  }



  getLatesRoute() {
    let header
    if (this.DateData) {
      header = { 'start_date': this.DateData, 'user_id': this.userID }
    }
    this.service.presentLoading()
    this.service.addData(header, "AppLocation/getLatestRoute")
      .then((result => {
        if (result['statusCode'] == 200) {
          this.locationMarkers = result['data'];
          this.distance = result['distance'];
          console.log( 'distarcne',  this.distance);
          this.checkin_data = result['checkin_summary'];
          console.log( this.checkin_data,'this.checkin_data');
          this.service.dismissLoading()
          if (this.locationMarkers.length) {

            // setTimeout(() => {

              this.configureMap(this.TabType);

            // }, 3000);

            setTimeout(() => {
            }, 3000)
          }
        } else {
          this.service.errorToast(result['statusMsg'])
          this.service.dismissLoading()
        }
      }))
  }




  configureMap(TabType) {
    console.log( this.locationMarkers);
    if (this.myMap) {
      this.myMap.off(); // Remove the existing map if it exists
      this.myMap.remove(); // Remove the existing map if it exists
    }
    if (TabType == 'Tracker' && this.locationMarkers) {
      this.myMap = L.map('map').setView([this.locationMarkers[0].lat, this.locationMarkers[0].lng], 16);
    


      var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
       googleStreets.addTo(this.myMap); 

     
      // const markerClusterGroup = L.markerClusterGroup();
      const polylinePoints = this.locationMarkers

      polylinePoints.forEach((point, index) => {

        const marker = L.marker([point.lat, point.lng]).addTo(this.myMap);

        if (point.type == 'Checkin') {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/checkin.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup(`<p><strong><span style="color: blue">Checkin</span></strong><br /><strong>Customer : </strong> ${point.dr_name}<br /><strong>Address : </strong> ${point.address}</p>`);
        }
        else if (point.type == 'Checkout') {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/checkout.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup(`<p><strong><span style="color: blue">Checkout</span></strong><br /><strong>Customer : </strong> ${point.dr_name}<br /><strong>Address : </strong> ${point.address}</p>`);
        }
        else if (point.type == 'Attendence Start') {

          marker.setIcon(L.icon({
            iconUrl: './assets/location/start_point.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup('Address : ' + point.address)
        }
        else if (point.type == 'Attendence Stop') {

          marker.setIcon(L.icon({
            iconUrl: './assets/location/end_point.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup('Address : ' + point.address)
        }
        else {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/bg_location.png',
            iconSize: [0, 0],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
        }

        // markerClusterGroup.addLayer(marker);
      });

      this.checkin_data.forEach((point, index) => {
        const marker = L.marker([point.lat, point.lng]).addTo(this.myMap);
        if (point.type == 'Checkin') {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/checkin.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup(`<p><strong><span style="color: blue;font-size:20px">Checkin</span></strong><strong>&nbsp;(${point.startTime})</strong>--<strong>&nbsp;(${point.stopTime})</strong> <br /><strong>Customer : </strong> <span style="font-size:20px">${point.dr_name}</span><br /><strong>Address : </strong> <span style="font-size:20px">${point.start_address}</span></p>`);
        }
        else if(point.type == 'Checkout') {
          console.log('check-out time');

          marker.setIcon(L.icon({
            iconUrl: './assets/location/checkout.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup(`<p><strong><span style="color: blue">Check-Out</span></strong><strong>&nbsp;(${point.startTime})</strong>--<strong>&nbsp;(${point.stopTime})</strong><br /><strong>Customer : </strong> ${point.dr_name}<br /><strong>Address : </strong> ${point.address}</p>`);

        }
        else if (point.type == 'Attendence Start') {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/start_point.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup('Address : ' + point.address)
        }
        else if (point.type == 'Attendence Stop') {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/end_point.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
          marker.bindPopup('Address : ' + point.address)
        }
        else if (point.type == 'Checkout') {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/bg_location.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
        }

        else {
          marker.setIcon(L.icon({
            iconUrl: './assets/location/bg_location.png',
            iconSize: [0, 0],
            iconAnchor: [16, 32],
            riseOnHover: true,
          }));
        }
      });
      // this.myMap.addLayer(markerClusterGroup);
      const animatedMarker = L.marker(polylinePoints[0], {
        icon: L.icon({
          iconUrl: './assets/location/person.png',
          iconSize: [40, 40],
          iconAnchor: [16, 32],
          riseOnHover: true,
        }),
      }).addTo(this.myMap);

      var baseLayers = {
        "Streets": googleStreets,
       
      
      };
      L.control.layers(baseLayers).addTo(this.myMap);
      const waypoints = polylinePoints.map(point => L.latLng(point.lat, point.lng));

      var polyline = L.polyline(waypoints, { linecap: 'round', color: '#00007b', stroke: true, weight: 4, lineJoin: 'round', fill: false }).addTo(this.myMap);
      this.myMap.fitBounds(polyline.getBounds());

      this.map = this.myMap;

    } else {
     this.myMap = L.map('map').setView([this.latest_location.lat, this.latest_location.lng], 16);
       var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
       googleStreets.addTo(this.myMap); 
      const marker = L.marker([this.latest_location.lat, this.latest_location.lng]).addTo(this.myMap);
      marker.setIcon(L.icon({
        iconUrl: './assets/location/person.png',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        riseOnHover: true,
      }));
      marker.bindPopup('Address :' + this.latest_location.gps);
    }
  }
  

}
    