import { LightningElement, wire } from 'lwc';

import getAccount from '@salesforce/apex/AccountGalleryController.getAccountByType';

import { publish, subscribe, unsubscribe, MessageContext, releaseMessageContext } from 'lightning/messageService';
import accountGalleryMessageChannel from "@salesforce/messageChannel/accountGalleryMessageChannel__c";


export default class account_gallery extends LightningElement {

    accounts = [];
    accountsToDisplay = [];
    accountTypes = [];

    @wire(MessageContext)
    messageContext;

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
                    : this.accounts.filter(account => account.type == event.detail.value);
            } catch (error) {
                console.log('OUTPUT : error', error);
            }
        }
    }

    handleClick(event) {
        let selectedId = event.currentTarget.dataset.recordId;

        const payload = {
            record: this.accountsToDisplay.find(account => account.id == selectedId)
        };

        publish(this.messageContext, accountGalleryMessageChannel, payload);
    }

}