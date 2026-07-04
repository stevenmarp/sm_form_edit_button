/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import { useEffect } from "@odoo/owl";

patch(FormController.prototype, {
    setup() {
        super.setup(...arguments);
        // When a saved record is shown (and the user has not asked to edit it),
        // force it read-only. Re-runs whenever we navigate to another record.
        useEffect(
            (resId) => {
                const root = this.model.root;
                if (resId && !this.smUserEditing && root.isInEdition) {
                    root.switchMode("readonly");
                }
            },
            () => [this.model.root.resId]
        );
    },

    get smCanShowEdit() {
        const root = this.model.root;
        return this.canEdit && !!root.resId && !root.isInEdition;
    },

    smEnableEdit() {
        this.smUserEditing = true;
        this.model.root.switchMode("edit");
    },

    // leaving edit mode (save or discard) returns the form to read-only
    async discard() {
        this.smUserEditing = false;
        await super.discard(...arguments);
        if (this.model.root.resId) {
            this.model.root.switchMode("readonly");
        }
    },

    async saveButtonClicked() {
        const saved = await super.saveButtonClicked(...arguments);
        if (saved) {
            this.smUserEditing = false;
            this.model.root.switchMode("readonly");
        }
        return saved;
    },
});
