import { Injectable } from '@angular/core';
import { IContact } from "src/modals/icontact";

import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Array<IContact> = [];
  database = firebase.database();
  i = 0;
  constructor() {}

  addContactOnFirebase(contact: IContact): Promise<IContact[]> {
    return new Promise((resolve, reject) => {
       this.database
        .ref(`contacts/${this.contacts.length}`)
        .set({
          nom: contact.nom,
          prenom: contact.prenom,
          phone: contact.phone,
          email: contact.email,
        })
        .then(() => {})
        .catch(() => {
          reject("Erreur");
        });
    });
  }

  //Modifier
  updateContactOnFirebase(contact: IContact, id: number) {
    let update = {};
    update["/contacts/" + id] = contact;

    this.database.ref().update(update);
  }

  //Supprimer
  deleteContact(id: number) {
    this.database.ref(`/contacts/${id}`).remove();
  }

  deleteListener() {
    this.database.ref("contacts").on("child_removed", (child_removed) => {
      let i: number = 0;
      let continuer: boolean = true;
      do {
        if (Number(this.contacts[i].id) === Number(child_removed.key)) {
          console.log("dele");
          this.contacts.splice(i, 1);
          continuer = false;
        }
        ++i;
      } while (continuer && i < this.contacts.length);
    });
  }

  updateListener() {
    this.database.ref("contacts").on("child_changed", (child_change) => {
      let i: number = 0;
      let continuer: boolean = true;
      do {
        if (Number(this.contacts[i].id) === Number(child_change.key)) {
          console.log("dele");
          this.contacts[i].nom = child_change.val().nom;
          this.contacts[i].prenom = child_change.val().prenom;
          this.contacts[i].phone = child_change.val().phone;
          this.contacts[i].email = child_change.val().email;
          continuer = false;
        }
        ++i;
      } while (continuer && i < this.contacts.length);
    });
  }




}
