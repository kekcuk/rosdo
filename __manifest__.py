{
    'name': 'Hide Apps and Preferences for Non-Admins',
    'version': '18.0.1.0.0',
    'summary': 'Hide Apps and Preferences menu items for non-admin users',
    'description': '''
    This module hides the Apps and Preferences/Settings menu items from the user menu 
    for all users except administrators in Odoo 18 with Web Responsive module.
    ''',
    'author': 'Custom Module',
    'depends': ['web', 'web_responsive'],
    'data': [
        'views/hide_apps_preferences.xml',
        'views/hide_apps_preferences_extended.xml',
    ],
    'installable': True,
    'auto_install': False,
}