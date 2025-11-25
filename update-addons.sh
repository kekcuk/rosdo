#!/bin/bash
set -e

ADDONS_SRC="/home/denis/odoo18/oca-addons"
ADDONS_TARGET="/home/denis/odoo18/all-addons"

echo "Очистка старых ссылок в $ADDONS_TARGET..."
rm -f "$ADDONS_TARGET"/*

echo "Создание символических ссылок на все модули из $ADDONS_SRC..."

for repo in "$ADDONS_SRC"/*; do
  if [ -d "$repo" ]; then
    for module in "$repo"/*; do
      if [ -d "$module" ] && ( [ -f "$module/__manifest__.py" ] || [ -f "$module/__openerp__.py" ] ); then
        mod_name=$(basename "$module")
        echo "  -> $mod_name"
        ln -sf "$module" "$ADDONS_TARGET/"
      fi
    done
  fi
done

echo "Готово. Всего модулей: $(ls -1 "$ADDONS_TARGET" | wc -l)"
