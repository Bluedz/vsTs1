import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';
import { ProjPage } from '../proj/proj';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { projectComponent} from '../project/project.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsComponent {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = projectComponent;
  tab2Root: any = AboutPage;
  proj: any = ProjPage;
  //tab3Root: any = ContactComponent;

  constructor(private nav: NavController, private events: Events) { 

  }

  

}
