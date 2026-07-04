# -*- coding: utf-8 -*-
{
    "name": "Form Edit Button",
    "version": "18.0.1.0.0",
    "category": "Tools",
    "summary": "Open records read-only and add a classic Edit button, so nobody changes "
               "a record by accident",
    "description": """
Form Edit Button
================

Odoo opens every form directly in edit mode, which makes accidental changes
easy. This module brings back the classic behaviour:

* Saved records open read-only
* A clear Edit button unlocks the form when you really want to change it
* Save and Discard work exactly as before
* New records still open ready to fill in
* Works on every form view, no configuration
    """,
    "author": "Steven Marp",
    "website": "https://apps.odoo.com/apps/modules/browse?author=Steven Marp",
    "license": "OPL-1",
    "depends": ["web"],
    "assets": {
        "web.assets_backend": [
            "sm_form_edit_button/static/src/form_edit_button/*",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
    "price": 15.00,
    "currency": "USD",
}
