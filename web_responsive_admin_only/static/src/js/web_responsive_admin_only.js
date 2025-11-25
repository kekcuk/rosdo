/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { UserMenu } from "@web/webclient/components/user_menu/user_menu";

patch(UserMenu.prototype, "web_responsive_admin_only/UserMenu", {
    /**
     * Override the setup to hide theme switcher and search type switcher for non-admin users
     */
    setup() {
        this._super(...arguments);
        // Check if current user is admin (system group)
        this.isAdmin = this.env.services.user.hasGroup('base.group_system');
    },
    
    /**
     * Override template props to conditionally render elements
     */
    _getTemplateProps() {
        const props = this._super(...arguments);
        // Pass admin status to template
        props.isAdmin = this.isAdmin;
        return props;
    }
});

// Additionally, hide elements using CSS when page loads for non-admin users
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    const isAdmin = odoo.session_info.is_system || odoo.session_info.is_admin;
    
    if (!isAdmin) {
        // Function to hide elements safely
        function hideElements(selector) {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    element.style.display = 'none';
                    // Also hide parent elements if they become empty or contain only hidden elements
                    const parent = element.closest('.dropdown, .btn-group, .nav-item');
                    if (parent) {
                        const visibleChildren = Array.from(parent.children).filter(child => child.style.display !== 'none');
                        if (visibleChildren.length === 0) {
                            parent.style.display = 'none';
                        }
                    }
                });
            } catch (e) {
                console.debug('Selector not found:', selector);
            }
        }
        
        // Hide theme switcher (usually has fa-tint icon or related to theme switching)
        hideElements('i.fa-tint, [class*="theme_switch"], [title*="theme"], [title*="Theme"], .o_user_nav_theme, .o_user_nav_item_theme');
        
        // Hide search type switcher in searchview
        hideElements('.o_search_type_switch, .o_mobile_search_bar, [role="button"].o_search_type_switch');
        
        // Hide other potential responsive elements in user menu
        const userMenu = document.querySelector('.o_user_menu');
        if (userMenu) {
            // Look for dropdown items that might be theme-related
            const dropdownItems = userMenu.querySelectorAll('.dropdown-item, .dropdown-toggle');
            dropdownItems.forEach(item => {
                if (item.textContent.toLowerCase().includes('theme') || 
                    item.textContent.toLowerCase().includes('switch') ||
                    (item.querySelector('i') && item.querySelector('i').classList.contains('fa-tint'))) {
                    item.style.display = 'none';
                }
            });
        }
    }
});

// Also hide elements dynamically as they are created
if (!window.webResponsiveAdminOnlyObserver) {
    window.webResponsiveAdminOnlyObserver = new MutationObserver(function(mutations) {
        const isAdmin = odoo.session_info.is_system || odoo.session_info.is_admin;
        if (!isAdmin) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Check if added node is theme-related
                        if (node.classList && 
                            (node.classList.contains('o_user_nav_theme') || 
                             node.classList.contains('o_user_nav_item_theme') ||
                             (node.querySelector && node.querySelector('i.fa-tint')))) {
                            node.style.display = 'none';
                        }
                        
                        // Check child elements for theme-related items
                        const themeItems = node.querySelectorAll('i.fa-tint, .o_user_nav_theme, .o_user_nav_item_theme');
                        themeItems.forEach(item => {
                            item.style.display = 'none';
                        });
                    }
                });
            });
        }
    });
    
    // Start observing
    window.webResponsiveAdminOnlyObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}