import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { Diagnostic } from '@ionic-native/diagnostic';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-camera-modal',
  templateUrl: 'camera-modal.html',
})
export class CameraModalPage {

  cameraFacing: string = 'rear';
  flashMode: 'off' | 'on' | 'auto' = 'off';
  selectImage: string[] = [];
  footer: number = 0;
  unregisterBackButton: any; // Holds back button listener reference
  type: any;

  constructor(
    private cameraPreview: CameraPreview,
    private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private platform: Platform,
    public diagnostic: Diagnostic
  ) {
    this.type = this.navParams.get("type");
  }

  ionViewDidLoad() {
  
    if(this.type=='camera')
    {
      this.startCamera()
    }else{
      this.openGallery()
    }
  }

  dismiss() {
    this.cameraPreview.stopCamera().then(() => {
      this.viewCtrl.dismiss();
     
    }).catch(err => console.warn('Error stopping camera:', err));
  } 

  startCamera() {
    const options: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height * 0.72,
      camera: this.cameraFacing,
      tapPhoto: false,
      previewDrag: false,
      toBack: false,
      alpha: 1,

      disableExifHeaderStripping: false
    };

    this.cameraPreview.stopCamera()
      .then(() => this.cameraPreview.startCamera(options))
      .catch(() => this.cameraPreview.startCamera(options))
      .then(() => {
        
        // Set initial flash mode
        this.updateFlashMode();
      })
      .catch(err => console.error('Error starting camera:', err));
  }

  toggleCamera() {
    this.cameraFacing = this.cameraFacing === 'rear' ? 'front' : 'rear';
    this.cameraPreview.switchCamera();
  }

  toggleFlashMode() {
    // Cycle through flash modes: off -> on -> auto
    switch(this.flashMode) {
      case 'off':
        this.flashMode = 'on';
        break;
      case 'on':
        this.flashMode = 'auto';
        break;
      case 'auto':
      default:
        this.flashMode = 'off';
        break;
    }
    
    // Update the camera's flash mode
    this.updateFlashMode();
  }

  updateFlashMode() {
    // Use Ionic Native's CameraPreview flash mode
    switch(this.flashMode) {
      case 'on':
        this.cameraPreview.setFlashMode('on');
        break;
      case 'auto':
        this.cameraPreview.setFlashMode('auto');
        break;
      case 'off':
      default:
        this.cameraPreview.setFlashMode('off');
        break;
    }
  }

  capturePhoto() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 720,
      quality: 85
    };

    this.cameraPreview.takePicture(pictureOpts).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
       
        this.selectImage.push(base64Image);

        this.cameraPreview.stopCamera().then(() => {
          this.sendData();
        
        }).catch(err => console.warn('Error stopping camera:', err));
      },
      (err) => console.error('Error taking picture', err)
    );
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.selectImage.push(base64Image);
        this.sendData();
       
      },
      (err) => console.error('Error opening gallery', err)
    );
  }

  sendData() {
    this.viewCtrl.dismiss(this.selectImage[0]);
  }
}