import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { ExpenseListPage } from '../expense-list/expense-list';
import { LmsLeadListPage } from '../sales-app/new-lead/lms-lead-list/lms-lead-list';
import { ContractorMeetListPage } from '../Contractor-Meet/contractor-meet-list/contractor-meet-list';
import { FollowupListPage } from '../followup-list/followup-list'
import { AnnouncementListPage } from '../announcement/announcement-list/announcement-list';

import { LeaveListPage } from '../leave-list/leave-list';
import { TravelListNewPage } from '../travel-list-new/travel-list-new';
import { RetailerListPage } from '../retailer-list/retailer-list';
import { FollowupAddPage } from '../followup-add/followup-add';
import { ExpenseAddPage } from '../expense-add/expense-add';
import { PrimaryOrderMainPage } from '../primary-order-main/primary-order-main';
import { SecondaryOrderMainPage } from '../secondary-order-main/secondary-order-main';
import { AttendenceNewPage } from '../attendence-new/attendence-new'
import { TargetPage } from '../target/target';

import { DashboardNewPage } from '../dashboard-new/dashboard-new';
import { ProfilePage } from '../profile/profile';
import { SurveyListPage } from '../survey/survey-list/survey-list';
import { PopGiftListPage } from '../sales-app/pop-gift/pop-gift-list/pop-gift-list';
import { TaskListPage } from '../task-list/task-list';

import { ScanningPage } from '../scanning/scanning';
import { ProductsPage } from '../products/products';
import { LoyaltyCataloguePage } from '../loyalty-catalogue/loyalty-catalogue';

import { AnnouncementNoticesListPage } from '../announcement-notices-list/announcement-notices-list';
import { HolidayListPage } from '../holiday-list/holiday-list';
import { LoyaltyFaqPage } from '../loyalty-faq/loyalty-faq';

import { SecondaryTargetReportPage } from '../secondary-target-report/secondary-target-report';
import { ContactPage } from '../contact/contact';
import { MainDistributorListPage } from '../sales-app/main-distributor-list/main-distributor-list';
import { DashboardPage } from '../dashboard/dashboard';
import { LmsQuotationListPage } from '../sales-app/new-lead/lms-lead-quotation/lms-quotation-list/lms-quotation-list';
import { BackgroundTrackListPage } from '../background-track-list/background-track-list';


@IonicPage()
@Component({
    selector: 'page-sfa-shortcut',
    templateUrl: 'sfa-shortcut.html',
})
export class SfaShortcutPage {
    user_data: any = {}
    skLoading: boolean = true
    last_attendence_data: any = {};
    today_count: any = {};
    team_count: any

    today_checkin: any = [];
    announcementCount: any;
    enquiry_count: number;
    networkType: any = [];


    constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider) {
        this.last_attendence()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SfaShortcutPage');
    }


    last_attendence() {
        this.skLoading = true
        this.service.addData({}, 'login/login_data').then((result) => {
            if (result['statusCode'] == 200) {
                this.skLoading = false
                this.getNetworkType()
                this.last_attendence_data = result['loginData']['attendence_data'];
                this.today_count = result['loginData']['today_count'];
                this.team_count = result['loginData']['team_count'];
                this.storage.set('team_count', this.team_count);
                this.announcementCount = result['loginData']['chk_announcement'];
                this.enquiry_count = result['loginData']['unread_enquiry_count'];


                this.user_data = result['loginData']['user_data'];



                this.service.userData = this.user_data;






            } else {
                this.skLoading = false
                this.service.errorToast(result['statusMsg'])
            }
        }, error => {
            this.skLoading = false;
            this.service.Error_msg(error);
        })
    }
    getNetworkType() {
        this.service.addData('', "AppCustomerNetwork/distributionNetworkModule").then(result => {
            this.networkType = result['modules'];
        }, err => {
            this.service.Error_msg(err);
            this.service.dismiss();
        })
    }

    manualProduct() {
        this.navCtrl.push(ScanningPage, { 'page_type': 'manual' })
    }

    goToLead() {
        this.navCtrl.push(LmsLeadListPage);

    }
    goTopop() {
        this.navCtrl.push(PopGiftListPage)
    }
    goToAttendence() {
        this.navCtrl.push(AttendenceNewPage);
    }
    goToTask() {
        this.navCtrl.push(TaskListPage);
    }

    goToFollowupAdd() {
        this.navCtrl.push(FollowupAddPage);
    }
    goToFollowup() {
        this.navCtrl.push(FollowupListPage);
    }


    goToLeave(type) {
        this.navCtrl.push(LeaveListPage, { 'from': type });
    }
    goToExpense(type) {
        this.navCtrl.push(ExpenseListPage, { 'view_type': type });
    }
    goToTravel(type) {
        this.navCtrl.push(TravelListNewPage, { 'view_type': type });
    }
    GoToProfile() {
        this.navCtrl.push(ProfilePage,);
    }
    goToDashboard() {
        this.navCtrl.push(DashboardNewPage, { 'user_data': this.user_data });
    }
    goToenquiry() {
        this.navCtrl.push(LmsLeadListPage)
    }
    goToExpenseAdd() {
        this.navCtrl.push(ExpenseAddPage, { from: 'expense', view_type: 'Team' });
    }

    goToevent() {
        this.navCtrl.push(ContractorMeetListPage);
    }

    goToSurvey() {
        this.navCtrl.push(SurveyListPage);
    }

    goToMainDistributorListPage(type) {
        if (type == 3) {
            this.navCtrl.push(RetailerListPage, { 'type': type })
        }
        else {
            this.navCtrl.push(MainDistributorListPage, { 'type': type })
        }

    }
    goToPrimaryOrders(type) {
        this.navCtrl.push(PrimaryOrderMainPage, { 'type': type });
    }
    goToSecondaryOrders(type) {
        this.navCtrl.push(SecondaryOrderMainPage, { 'type': type });
    }
    goOnProductPage() {
        this.navCtrl.push(ProductsPage, { 'mode': 'home' });
    }
    viewSecTarget() {
        this.navCtrl.push(SecondaryTargetReportPage)
    }

    viewAchievement() {
        this.navCtrl.push(TargetPage, { 'user_data': this.user_data })
    }
    goOnDigitalcatPage() {
        this.navCtrl.push(LoyaltyCataloguePage)
    }
    goOnfaqPage() {
        this.navCtrl.push(LoyaltyFaqPage)
    }

    announcementModal() {
        this.navCtrl.push(AnnouncementNoticesListPage);
    }
    gotoHolidayList() {
        this.navCtrl.push(HolidayListPage);
    }

    goToTeamMember() {
        this.navCtrl.push(BackgroundTrackListPage, { 'page_type': 'manual' })
    }

    goOnContactPage() {
        this.navCtrl.push(ContactPage);
    }
    announcementList() {
        this.navCtrl.push(AnnouncementListPage)
    }

    closePage() {
        this.navCtrl.push(DashboardPage)
    }

    goToQuotationList() {
        this.navCtrl.push(LmsQuotationListPage);
    }

}
