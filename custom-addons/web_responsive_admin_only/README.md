# Web Responsive - Admin Only

This module restricts access to the web responsive features (theme switcher and search type switcher) to administrator users only.

## Functionality

- Hides the theme switcher (water drop icon) from non-admin users
- Hides the search type switcher from non-admin users
- Only users with the 'Settings' permission (base.group_system) can access these features
- Inherits from the base `web.UserMenu` template instead of the specific `web_responsive.UserMenu` to ensure compatibility

## Installation

1. Install the module in your Odoo instance
2. Make sure 'web_responsive' module is installed and working
3. The restrictions will be applied automatically

## Configuration

No additional configuration is required. The module works out of the box.

## Technical Details

The module now inherits from `web.UserMenu` (the standard Odoo user menu template) rather than `web_responsive.UserMenu` (which may not exist in some installations). This approach ensures the module works across different Odoo configurations while still achieving the desired functionality.