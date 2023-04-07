import { LightningElement, wire } from 'lwc';

import getAccounts from '@salesforce/apex/AccountGalleryController.getAccounts';

import { publish, MessageContext } from 'lightning/messageService';
import accountGalleryMessageChannel from "@salesforce/messageChannel/accountGalleryMessageChannel__c";


export default class account_gallery extends LightningElement {

    accounts = [];
    accountsToDisplay = [];
    accountTypes = [];

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        getAccounts()
            .then(result => {
                if (result) {
                    this.accountTypes = result.accountTypes;
                    this.accountsToDisplay = result.accountList;
                    this.accounts = result.accountList;
                }
            })
    }

    handleTypeChanged(event) {
        if (event && event.detail) {
            this.accountsToDisplay = event.detail.value == 'All'
                ? this.accounts
                : this.accounts.filter(account => account.type == event.detail.value);

                this.publishMessage(null);
        }
    }

    handleClick(event) {
        if (event && event.currentTarget && event.currentTarget.dataset) {
            this.publishMessage(event.currentTarget.dataset.recordId);
        }
    }

    publishMessage(selectedId) {
        const payload = {
            record: this.accountsToDisplay.find(account => account.id == selectedId)
        };

        publish(this.messageContext, accountGalleryMessageChannel, payload);
    }

    handleAccountSelect(event) {
        let tiles = this.template.querySelectorAll('c-account_tile');

        tiles.forEach(tile => {
            let tileId = tile.getAttribute('data-id');
            let classValue = tileId == event.detail.value ? 'selectedBox' : '';
            tile.changeTileClass(classValue);
        });

    }

}