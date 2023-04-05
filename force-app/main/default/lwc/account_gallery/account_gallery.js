import { LightningElement } from 'lwc';

import getAccount from '@salesforce/apex/AccountGalleryController.getAccountByType';

export default class account_gallery extends LightningElement {

    accounts = [];
    accountsToDisplay = [];
    accountTypes = [];

    connectedCallback() {
        getAccount()
            .then(result => {
                console.log('OUTPUT : ', result);
                if (result) {
                    this.accountTypes = result.accountTypes;
                    this.accountsToDisplay = result.accountList;
                    this.accounts = result.accountList;
                }
            })
    }

    handleTypeChanged(event) {
        if (event && event.detail) {
            try {
                this.accountsToDisplay = event.detail.value == 'All'
                    ? this.accounts
                    : this.accounts.filter(account => account.Type == event.detail.value);
            } catch (error) {
                console.log('OUTPUT : error', error);
            }
        }
    }
}