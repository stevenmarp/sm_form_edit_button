/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import { useEffect } from "@odoo/owl";

console.log("sm_form_edit_button: JS Loaded for Odoo 16");

patch(FormController.prototype, "sm_form_edit_button.FormControllerPatch", {
    setup() {
        super.setup(...arguments);
        
        // Track whether the user explicitly unlocked editing for the current record
        this.smUserEditing = false;

        // When a saved record is loaded, force it read-only unless the user unlocked it.
        // Re-runs whenever the record ID changes.
        useEffect(
            (resId) => {
                const root = this.model.root;
                if (resId && !this.smUserEditing && root.isInEdition) {
                    console.log("sm_form_edit_button: forcing record to readonly", resId);
                    root.switchMode("readonly");
                }
            },
            () => [this.model.root.resId]
        );
    },

    get smCanShowEdit() {
        const root = this.model.root;
        const res = (
            !this.props.readonly &&
            this.canEdit &&
            root &&
            !!root.resId &&
            !root.isInEdition
        );
        return res;
    },

    async smEnableEdit() {
        console.log("sm_form_edit_button: smEnableEdit clicked");
        this.smUserEditing = true;
        await this.model.root.switchMode("edit");
    },

    async discard() {
        console.log("sm_form_edit_button: discard clicked");
        this.smUserEditing = false;
        await super.discard(...arguments);
        if (this.model.root.resId) {
            await this.model.root.switchMode("readonly");
        }
    },

    async saveButtonClicked() {
        console.log("sm_form_edit_button: saveButtonClicked clicked");
        const saved = await super.saveButtonClicked(...arguments);
        if (saved) {
            this.smUserEditing = false;
            if (this.model.root.resId) {
                await this.model.root.switchMode("readonly");
            }
        }
        return saved;
    },
});
