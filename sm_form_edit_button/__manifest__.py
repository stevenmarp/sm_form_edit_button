# -*- coding: utf-8 -*-
{
    "name": "Read-only Form with Edit Button",
    "version": "17.0.1.0.0",
    "category": "Web",
    "summary": "Open records read-only and require an Edit click before changing anything",
    "description": """
Read-only Form with Edit Button
===============================

Bring back the classic form workflow: records open locked (read-only) and users
must click an Edit button before they can change anything. Prevents accidental
edits from a single misclick.

* Existing records open in read-only mode
* An Edit button appears in the form control panel
* Click Edit to unlock the form for changes
* Saving or discarding locks the form again
* New records stay editable so you can fill them in right away
* No per-model setup, works on every form view
    """,
    "author": "Steven Marp",
    "website": "https://apps.odoo.com/apps/modules/browse?author=Steven Marp",
    "license": "OPL-1",
    "depends": ["web"],
    "assets": {
        "web.assets_backend": [
            "sm_form_edit_button/static/src/js/form_edit_button.js",
            "sm_form_edit_button/static/src/xml/form_edit_button.xml",
        ],
    },
    "images": ["static/description/banner.gif"],
    "installable": True,
    "application": False,
    "auto_install": False,
    "price": 5.90,
    "currency": "USD",
}
