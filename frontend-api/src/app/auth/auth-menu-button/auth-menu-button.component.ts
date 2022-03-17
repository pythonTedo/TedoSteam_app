import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthMenuUserComponent } from './auth-menu-user/auth-menu-user.component';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { AuthRegisterComponent } from '../auth-register/auth-register.component';
import { AddMoneyComponent } from '../add-money/add-money.component';

@Component({
  selector: 'app-auth-menu-button',
  templateUrl: './auth-menu-button.component.html',
  styleUrls: ['./auth-menu-button.component.scss'],
})
export class AuthMenuButtonComponent implements OnInit {

  useritems = '/useritems'

  constructor(
    private router:Router,
    private auth: AuthService,
    public modalController: ModalController,
    ) {}

    gotToUserItems(){
      this.router.navigate(['useritems']);
    }

  async presentmodal(ev: any) {
    const modal = await this.modalController.create({
      component: AuthMenuUserComponent,
    });
    return await modal.present();
  }



  async presentLogin(ev: any) {
    const modal = await this.modalController.create({
      component: AuthLoginComponent,
    });
    return await modal.present();
  }

  async presentRegister(ev: any) {
    const modal = await this.modalController.create({
      component: AuthRegisterComponent,
    });
    return await modal.present();
  }

  async addMoney(){
    const modal = await this.modalController.create({
      component: AddMoneyComponent,
      cssClass: 'money-modal-css'
    });
    modal.present()
    const { data } = await modal.onWillDismiss();
    if(data){
      this.auth.addMoney(data)
    }
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {}

}
