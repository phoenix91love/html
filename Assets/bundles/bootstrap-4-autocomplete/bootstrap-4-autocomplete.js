(function ($) {
    var defaults = {
        treshold: 4,
        maximumItems: 5,
        highlightTyped: true,
        highlightClass: 'text-primary',
        byThreeChar: true
    };
    function createItem(lookup, item, opts) {
        var label;
        if (opts.highlightTyped) {
            var idx = item.label.toLowerCase().indexOf(lookup.toLowerCase());
            label = item.label.substring(0, idx)
                + '<span class="' + expandClassArray(opts.highlightClass) + '">' + item.label.substring(idx, idx + lookup.length) + '</span>'
                + item.label.substring(idx + lookup.length, item.label.length);
        }
        else {
            label = item.label;
        }
        return '<button type="button" class="dropdown-item" data-value="' + item.value + '">' + label + '</button>';
    }
    function expandClassArray(classes) {
        if (typeof classes == "string") {
            return classes;
        }
        if (classes.length == 0) {
            return '';
        }
        var ret = '';
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var clas = classes_1[_i];
            ret += clas + ' ';
        }
        return ret.substring(0, ret.length - 1);
    }
    function createItems(field, opts) {
        var lookup = field.val();
        if (lookup.length < opts.treshold) {
            field.dropdown('hide');
            return 0;
        }
        var items = field.next();
        items.html('');

        var allKeys = Object.keys(opts.source);
        var allData = [];
        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            var object = opts.source[key];
            var item = {
                label: opts.label ? object[opts.label] : key,
                value: opts.value ? object[opts.value] : object
            };
            allData.push(item);
        }

        //cac items co x ky tu dau
        var itemsThreeChar = [];
        var itemsNotThreeChar = [];
        if (opts.byThreeChar) {
            itemsThreeChar = allData.filter(x => x.label.substring(0, lookup.toLowerCase().length).toLowerCase() == lookup.toLowerCase());
            itemsNotThreeChar = allData.filter(x => x.label.substring(0, lookup.toLowerCase().length).toLowerCase() != lookup.toLowerCase());
        } else {
            itemsThreeChar = allData;
        }

        var count = 0;

        for (var i = 0; i < itemsThreeChar.length; i++) {
            
            var item = itemsThreeChar[i];
            if (item.label.toLowerCase().indexOf(lookup.toLowerCase()) >= 0) {
                items.append(createItem(lookup, item, opts));
                if (opts.maximumItems > 0 && ++count >= opts.maximumItems) {
                    break;
                }
            }
        }

        for (var i = 0; i < itemsNotThreeChar.length; i++) {
            var item = itemsNotThreeChar[i];
            if (item.label.toLowerCase().indexOf(lookup.toLowerCase()) >= 0) {
                items.append(createItem(lookup, item, opts));
                if (opts.maximumItems > 0 && ++count >= opts.maximumItems) {
                    break;
                }
            }
        }
        // option action
        field.next().find('.dropdown-item').click(function () {
            field.val($(this).text());
            if (opts.onSelectItem) {
                opts.onSelectItem({
                    value: $(this).data('value'),
                    label: $(this).text()
                }, field[0]);
            }
        });
        return items.children().length;
    }
    $.fn.autocomplete = function (options) {
        // merge options with default
        var opts = {};
        $.extend(opts, defaults, options);
        var _field = $(this);
        // clear previously set autocomplete
        _field.parent().removeClass('dropdown');
        _field.removeAttr('data-toggle');
        _field.removeClass('dropdown-toggle');
        _field.parent().find('.dropdown-menu').remove();
        _field.dropdown('dispose');
        // attach dropdown
        _field.parent().addClass('dropdown');
        _field.attr('data-toggle', 'dropdown');
        _field.addClass('dropdown-toggle');
        var dropdown = $('<div class="dropdown-menu" ></div>');
        // attach dropdown class
        if (opts.dropdownClass)
            dropdown.addClass(opts.dropdownClass);
        _field.after(dropdown);
        _field.dropdown(opts.dropdownOptions);
        this.off('click.autocomplete').click('click.autocomplete', function (e) {
            if (createItems(_field, opts) == 0) {
                // prevent show empty
                e.stopPropagation();
                _field.dropdown('hide');
            }
            ;
        });
        // show options
        this.off('keyup.autocomplete').keyup('keyup.autocomplete', function () {
            if (createItems(_field, opts) > 0) {
                _field.dropdown('show');
            }
            else {
                // sets up positioning
                _field.click();
            }
        });
        return this;
    };
}(jQuery));
