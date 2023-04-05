import { LightningElement, api, wire } from 'lwc';


export default class Account_tile extends LightningElement {

    @api account;



    handleFocus(event) {
        console.log('OUTPUT : focus');
        this.account.classValue += ' box';
    }

    handleLeave(event) {
        this.account.classValue = 'tile slds-grid slds-grid_vertical';
    }
}