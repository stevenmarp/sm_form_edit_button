/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import { useState } from "@odoo/owl";

/**
 * Classic "read-only until Edit" workflow.
 *
 * The form view already knows how to render every field read-only: passing
 * readonly=true to the FormRenderer makes the compiler mark all fields as
 * readonly. We flip that flag with a small piece of state and expose an Edit
 * button (wired in the template extension) to unlock it. Saving or discarding
 * locks the form again. New records stay editable.
 */
patch(FormController.prototype, {
    setup() {
        super.setup(...arguments);
        this.smEdit = useState({ locked: true });
    },

    // Effective read-only state used by the (extended) template.
    get smFormReadonly() {
        if (this.props.readonly) {
            return true; // opened read-only on purpose (e.g. from a dialog)
        }
        if (this.model.root.isNew) {
            return false; // let users fill in brand-new records straight away
        }
        return this.smEdit.locked;
    },

    // Whether to show the Edit button.
    get smShowEditButton() {
        return (
            !this.props.readonly &&
            !this.model.root.isNew &&
            this.smEdit.locked &&
            this.canEdit
        );
    },

    smStartEdit() {
        this.smEdit.locked = false;
    },

    async saveButtonClicked() {
        const result = await super.saveButtonClicked(...arguments);
        // Only lock again once the save actually succeeded.
        this.smEdit.locked = true;
        return result;
    },

    async discard() {
        await super.discard(...arguments);
        this.smEdit.locked = true;
    },
});
