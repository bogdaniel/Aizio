(function(root) {

    var elements = {};

    function s(id) {
        if (!elements[id]) {
            elements[id] = document.getElementById(id);
        }
        return elements[id];
    }

    function bindUIActions() {
        menuElements();
        s('dropdownToggle').onclick = function(e) {
            goDropDown();
            
            e.stopPropagation();
        };
        s('menu').onclick = function(e) {
            goResponsive();

            e.stopPropagation();
        };
        //hideMenu();
    }

    function menuElements() {
        var menuElements = s('menu');
        menuElements.insertAdjacentHTML('afterBegin','<button type="menu-button" id="responsiveToggle" class="menu-button" aria-hidden="true"><i aria-hidden="true" class="icon-reorder"> </i>Menu</button>');
    }

    function hideMenu() {
        document.onclick = function(e) {
            var mobileButton = s('responsiveToggle');
            var buttonStyle = mobileButton.currentStyle
                ? mobileButton.currentStyle.display
                : getComputedStyle(mobileButton, null).display;
            if (buttonStyle === 'block'
             && e.target !== mobileButton
             && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
                changeClass(mobileButton, 'navtoogle active-responsive', 'navtoogle');
            }
        }
    }
    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    function changeClass(r, className1 , className2) {
        var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
        if (regex.test(r.className)) {
            r.className = r.className.replace(regex, ' '+ className2 + ' ');
        } else {
            r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+ className1 +' ');
        }
        return r.className;
    }

    function goResponsive() {
        //  Toggle the class on click to show / hide the menu
        changeClass(s('inactive-responsive'), 'active-responsive', 'inactive-responsive');
    }

    function goDropDown() {
        changeClass(s('inactive-dropdown'), 'inactive-dropdown', 'active-dropdown');
    }

    root.NavigationWidget = {
        init: function() {
            bindUIActions();
        }
    };

})(this);
NavigationWidget.init();