# Security rules to restrict access to web_responsive features for non-admin users

from odoo import models, api


class WebResponsiveController(models.AbstractModel):
    """
    This class helps control access to web_responsive features
    """
    _name = 'web.responsive.controller'
    _description = 'Web Responsive Controller'

    @api.model
    def check_access(self):
        """
        Check if current user has access to web_responsive features
        """
        return self.env.user.has_group('base.group_system')