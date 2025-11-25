from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


def _check_ogrn_checksum(ogrn):
    """Проверка контрольной суммы ОГРН (13 цифр)"""
    if not ogrn or len(ogrn) != 13 or not ogrn.isdigit():
        return False
    try:
        main_part = int(ogrn[:12])
        checksum = main_part % 11
        if checksum >= 10:
            checksum = checksum % 10
        return str(checksum) == ogrn[12]
    except (ValueError, ZeroDivisionError):
        return False


def _check_ogrnip_checksum(ogrnip):
    """Проверка контрольной суммы ОГРНИП (15 цифр)"""
    if not ogrnip or len(ogrnip) != 15 or not ogrnip.isdigit():
        return False
    try:
        main_part = int(ogrnip[:14])
        checksum = main_part % 13
        if checksum >= 10:
            checksum = checksum % 10
        return str(checksum) == ogrnip[14]
    except (ValueError, ZeroDivisionError):
        return False


class ResPartner(models.Model):
    _inherit = 'res.partner'

    ogrn = fields.Char(string='ОГРН', size=13, copy=False)
    ogrnip = fields.Char(string='ОГРНИП', size=15, copy=False)

    @api.constrains('ogrn')
    def _check_ogrn(self):
        for partner in self:
            if partner.ogrn and not _check_ogrn_checksum(partner.ogrn):
                raise ValidationError(_('Неверный ОГРН: контрольная сумма не совпадает.'))

    @api.constrains('ogrnip')
    def _check_ogrnip(self):
        for partner in self:
            if partner.ogrnip and not _check_ogrnip_checksum(partner.ogrnip):
                raise ValidationError(_('Неверный ОГРНИП: контрольная сумма не совпадает.'))