import { LightningElement, api, wire } from 'lwc';

import { subscribe, MessageContext } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';

import accountGalleryMessageChannel from "@salesforce/messageChannel/accountGalleryMessageChannel__c";
export default class account_detail extends NavigationMixin(LightningElement) {

    subscription = null;
    record = null;
    fieldsToDisplay = [];

    isShownMore = false;
    showLabel = 'Show more';

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
        this.record = message.record;

        this.fieldsToDisplay = [
            {
                label: 'Account Type',
                value: this.record.type ? this.record.type : 'No information',
            },
            {
                label: 'Industry',
                value: this.record.industry ? this.record.industry : 'No information',
            },
            {
                label: 'Budget',
                isNumber: this.record.budget == undefined ? false : true,
                value: this.record.budget ? this.record.budget : 'No information',
            },
            {
                label: 'Description',
                needToShowLess: this.record.description ? this.record.description.length > 50 : false,
                value: this.record.description ? this.record.description : 'No information',
            }
        ];
    }

    handleClick(event) {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.recordId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        }).then(url => {
            window.open(url, 'view');
        });

    }

    handleClickLessMore() {
        let description = this.template.querySelector('.content');

        this.isShownMore = !this.isShownMore;

        this.showLabel = this.isShownMore ? 'Show less' : 'Show more';
        description.className = this.isShownMore ? 'content showContent' : 'content hideContent';
    }
}