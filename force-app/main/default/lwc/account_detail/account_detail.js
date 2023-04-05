import { LightningElement, api, wire } from 'lwc';

import { publish, subscribe, unsubscribe, MessageContext, releaseMessageContext } from 'lightning/messageService';
import accountGalleryMessageChannel from "@salesforce/messageChannel/accountGalleryMessageChannel__c";

export default class account_detail extends LightningElement {

    subscription = null;
    recordId;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            accountGalleryMessageChannel,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.recordId = message.record;
    }
}