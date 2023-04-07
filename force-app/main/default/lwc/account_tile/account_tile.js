import { LightningElement, api } from 'lwc';

import DEFAULT_PIC from '@salesforce/resourceUrl/defaultPic';

export default class Account_tile extends LightningElement {
    _account = null;
    _classValue = 'tile slds-grid slds-grid_vertical';
    defaultPic = DEFAULT_PIC;

    @api
    get account() {
        return this._account;
    };

    set account(value) {
        this._account = value;
    }

    @api
    changeTileClass(classValue) {
        this.getAccountTile().className = classValue;
    }

    get classValue() {
        return this._classValue;
    }

    handleFocus() {
        if (!this.getAccountTile().className.includes('pointedBox')) {
            this.getAccountTile().className += ' pointedBox';
        }
    }

    handleLeave() {
        this.getAccountTile().className = this.getAccountTile().className.replace(' pointedBox', '');
    }

    getAccountTile() {
        return this.template.querySelector('[data-id="accountTile"]');
    }

    handleAccountChoice() {
        this.dispatchEvent(
            new CustomEvent(
                'accountselect',
                {
                    detail: {
                        value: this._account.id
                    }
                }
            )
        );
    }
}