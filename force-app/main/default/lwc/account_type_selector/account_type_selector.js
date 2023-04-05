import { LightningElement, api } from 'lwc';

export default class account_type_selector extends LightningElement {
    value = null;
    _options = [];

    @api
    get options() {
        return this._options;
    };

    set options(value) {
        this._options = value;
        this.value = (value && value[0]) ? value[0].value : null;
    }

    handleChange(event) {
        this.value = event.detail.value;

        this.dispatchEvent(
            new CustomEvent(
                'typechanged',
                {
                    detail: {
                        value: this.value
                    }
                }
            )
        );
    }

}