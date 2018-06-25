import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProjPage } from '../pages/proj/proj';
import { TabsComponent } from '../pages/tabs/tabs.component';
import { LoginComponent } from '../pages/login/login.component';
import { LoginService } from '../pages/login/login.service';
import { PurchaseService } from '../pages/home/purchaseTrack/purchase.service';
import {CommonService} from '../assets/common/common.service'
import { AppService } from '../app/app.service'
import { RfqComponent } from '../pages/home/rfq/rfq.component';
import { RfqFormComponent } from '../pages/home/rfqform/rfqForm.compenent';
import { StockComponent } from '../pages/home/stock/stock.component';
import { StockFormComponent } from '../pages/home/stock/stockForm.compenent';
import { StockSearchComponent } from '../pages/home/stock/stockSearch.component';
import { PurchaseTrackComponent } from '../pages/home/purchaseTrack/purchaseTrack.component';
import { ReqComponent } from '../pages/home/req/req.component';
import { ReqFormComponent } from '../pages/home/req/reqForm.compenent';
import { MatComponent } from '../pages/home/mat/mat.component';
import { MatFormComponent } from '../pages/home/mat/matForm.component';
import { MatSearchComponent } from '../pages/home/mat/matSearch.component';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { PurchaseTrackFromComponent } from '../pages/home/purchaseTrack/purchaseTrackForm.component';
import { PurchaseSearchComponent } from '../pages/home/purchaseTrack/purchaseSearch.component';
import { projectComponent} from '../pages/project/project.component';
import { plantComponent} from '../pages/plant/plant.component';
import { SHomeComponent } from '../pages/shangqi/shome.component';
import { SMatComponent } from '../pages/shangqi/smat/smat.component';
import { SMatSearchComponent } from '../pages/shangqi/smat/smatSearch.component';
import { SMatFormComponent} from '../pages/shangqi/smat/smatForm.component'
import { SStockComponent } from '../pages/shangqi/sstock/sstock.component'
import { SStockFormComponent } from '../pages/shangqi/sstock/sstockForm.component'
import { SStockSearchComponent } from '../pages/shangqi/sstock/sstockSearch.component'
import { THomeComponent } from '../pages/tongyong/thome.component';
import { TMatComponent } from '../pages/tongyong/tmat/tmat.component'
import { TMatFormComponent} from '../pages/tongyong/tmat/tmatForm.component'
import { TMatSearchComponent } from '../pages/tongyong/tmat/tmatSearch.component'
import { TStockComponent } from '../pages/tongyong/tstock/tstock.component'
import { TStockFormComponent} from '../pages/tongyong/tstock/tstockForm.component'
import { TStockSearchComponent } from '../pages/tongyong/tstock/tstockSearch.component'
import { PurchaseTrackSqComponent } from '../pages/shangqi/purchaseTrack/purchaseTrackSq.component';
import { PurchaseSqTrackFromComponent } from '../pages/shangqi/purchaseTrack/purchaseSqTrackForm.component';
import { PurchaseSqSearchComponent } from '../pages/shangqi/purchaseTrack/purchaseSqSearch.component';
import { PurchaseServiceSq } from '../pages/shangqi/purchaseTrack/purchaseSq.service';
import { PurchaseTrackGmComponent } from '../pages/tongyong/purchaseTrack/purchaseTrackGm.component';
import { PurchaseGmSearchComponent } from '../pages/tongyong/purchaseTrack/purchaseGmSearch.component';
import { PurchaseGmTrackFormComponent } from '../pages/tongyong/purchaseTrack/purchaseGmTrackForm.component';
import { PurchaseServiceGm } from '../pages/tongyong/purchaseTrack/purchaseGm.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactComponent,
    HomeComponent,
    TabsComponent,
    LoginComponent,
    RfqComponent,
    RfqFormComponent,
    StockComponent,
    StockFormComponent,
    ReqComponent,
    ReqFormComponent,
    MatComponent,
    MatFormComponent,
    PurchaseTrackComponent,
    PurchaseTrackFromComponent,
    PurchaseSearchComponent,
    StockSearchComponent,
    MatSearchComponent,
    ProjPage,
    projectComponent,
    plantComponent,
    SHomeComponent,
    SMatComponent,
    SMatSearchComponent,
    SMatFormComponent,
    SStockComponent,
    SStockFormComponent,
    SStockSearchComponent,
    THomeComponent,
    TMatComponent,
    TMatFormComponent,
    TMatSearchComponent,
    TStockComponent,
    TStockFormComponent,
    TStockSearchComponent,
    PurchaseTrackSqComponent,
    PurchaseSqTrackFromComponent,
    PurchaseSqSearchComponent,
    PurchaseTrackGmComponent,
    PurchaseGmSearchComponent,
    PurchaseGmTrackFormComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      pageTransition: 'ios',
      backButtonText : ''
    }, {}),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactComponent,
    HomeComponent,
    TabsComponent,
    LoginComponent,
    RfqComponent,
    RfqFormComponent,
    StockComponent,
    StockFormComponent,
    ReqComponent,
    ReqFormComponent,
    MatComponent,
    MatFormComponent,
    PurchaseTrackComponent,
    PurchaseTrackFromComponent,
    PurchaseSearchComponent,
    StockSearchComponent,
    MatSearchComponent,
    ProjPage,
    projectComponent,
    plantComponent,
    SHomeComponent,
    SMatComponent,
    SMatSearchComponent,
    SMatFormComponent,
    SStockComponent,
    SStockFormComponent,
    SStockSearchComponent,
    THomeComponent,
    TMatComponent,
    TMatFormComponent,
    TMatSearchComponent,
    TStockComponent,
    TStockFormComponent,
    TStockSearchComponent,
    PurchaseTrackSqComponent,
    PurchaseSqTrackFromComponent,
    PurchaseSqSearchComponent,
    PurchaseTrackGmComponent,
    PurchaseGmSearchComponent,
    PurchaseGmTrackFormComponent
  ],
  providers: [LoginService,CommonService, AppService, PurchaseService, PurchaseServiceSq, PurchaseServiceGm,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, AppVersion, InAppBrowser, ThemeableBrowser, TransferObject, Transfer, File, FileOpener]
})
export class AppModule {}
