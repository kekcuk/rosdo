{
    'name': 'Web Responsive Admin Only',
    'version': '18.0.1.0.0',
    'category': 'Extra Tools',
    'summary': 'Hide web responsive features from non-admin users',
    'description': 'This module hides the theme switcher and search type switcher from non-admin users',
    'author': 'Your Name',
    'depends': ['web'],
    'data': [
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'web_responsive_admin_only/static/src/js/web_responsive_admin_only.js',
        ],
    },
    'installable': True,
    'auto_install': False,
}