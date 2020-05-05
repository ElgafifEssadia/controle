import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/services/contact.service';
import { IContact } from "src/modals/icontact";
import { Router } from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: IContact;
  contacts: Array<IContact>;
  buttonText = "AJOUTER";
  id = 0;
  keys = [];

  registerForm: FormGroup;

  nom: AbstractControl;
  prenom: AbstractControl;
  phone: AbstractControl;
  email: AbstractControl;
 

  constructor(private contactService: ContactService, private formBuilder: FormBuilder,private router: Router) {
   this.registerForm = this.formBuilder.group({
      nom: [null, [Validators.minLength(20)]],
      prenom: [null, [Validators.required, Validators.minLength(20)]],
      phone: [null, [Validators.required, Validators.minLength(20)]],
      email: [null, [Validators.required, Validators.email]]

    });

    this.nom = this.registerForm.controls.nom;
    this.prenom = this.registerForm.controls.prenom;
    this.phone = this.registerForm.controls.phone;
    this.email = this.registerForm.controls.email;
    

   }

  ngOnInit() {
  }

  onSubmit(contact: IContact) {
    switch (this.buttonText) {
      case "AJOUTER":
        this.contactService.addContactOnFirebase(contact);
        break;

      case "MODIFIER":
        this.contactService.updateContactOnFirebase(this.contact, this.id);
        this.resetForm();
        break;
    }
  }

  onEdit(contact: IContact) {
    this.buttonText = "MODIFIER";
    this.contact = contact;
    this.id = contact.id;
  }

  onDelete(id: number) {
    this.contactService.deleteContact(id);
  }

  resetForm() {
    this.buttonText = "AJOUTER";
    this.contact = {
      nom: null,
      prenom: null,
      phone: null,
      email: null,
    };
  }

}
