import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss'],
})
export class AddMoneyComponent implements OnInit {
  moneyForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private modal: ModalController) { }

  ngOnInit() {
    this.moneyForm = this.formBuilder.group({
      money: new FormControl(0,Validators.min(0)),
      
    });
  }
  async onSubmit($event) {
    $event.preventDefault();

    if (!this.moneyForm.valid) { return; }
      this.modal.dismiss(this.moneyForm.getRawValue().money)
    }

}
