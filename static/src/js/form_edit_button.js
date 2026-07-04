/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import { useState } from "@odoo/owl";

console.log("sm_form_edit_button: JS File Loaded");

patch(FormController.prototype, {
    setup() {
        console.log("sm_form_edit_button: setup called");
        // Set before super.setup(): modelParams (read during super) needs it.
        this.smEdit = useState({ locked: true });
        super.setup(...arguments);
    },

    get modelParams() {
        console.log("sm_form_edit_button: get modelParams called, locked:", this.smEdit?.locked);
        const params = super.modelParams;
        if (this.props.resId && this.smEdit.locked && !this.props.readonly) {
            params.config.mode = "readonly";
        }
        return params;
    },

    get smShowEditButton() {
        const root = this.model?.root;
        const res = (
            !this.props.readonly &&
            this.canEdit &&
            root &&
            !!root.resId &&
            !root.isInEdition
        );
        console.log("sm_form_edit_button: smShowEditButton evaluated:", {
            readonly: this.props.readonly,
            canEdit: this.canEdit,
            resId: root?.resId,
            isInEdition: root?.isInEdition,
            result: res
        });
        return res;
    },

    smStartEdit() {
        console.log("sm_form_edit_button: smStartEdit called");
        this.smEdit.locked = false;
        this.model.root.switchMode("edit");
    },

    async saveButtonClicked() {
        console.log("sm_form_edit_button: saveButtonClicked called");
        const result = await super.saveButtonClicked(...arguments);
        this.smEdit.locked = true;
        this.model.root.switchMode("readonly");
        return result;
    },

    async discard() {
        console.log("sm_form_edit_button: discard called");
        await super.discard(...arguments);
        this.smEdit.locked = true;
        this.model.root.switchMode("readonly");
    },
});

