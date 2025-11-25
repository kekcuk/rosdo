# Hide Apps and Preferences for Non-Admins

This module hides the Apps and Preferences/Settings menu items from the user menu for all users except administrators in Odoo 18 with Web Responsive module.

## Problem
All users can see the Apps menu and Preferences in the top-right user menu, which should only be visible to administrators.

## Solution
This module adds conditional rendering to these menu items so they are only visible to users with administrative privileges.

## Installation
1. Install the module as any other Odoo module
2. The changes take effect immediately after installation

## Technical Details
- Uses Odoo's template inheritance mechanism
- Checks user's administrative status before displaying menu items
- Compatible with Odoo 18 and Web Responsive module