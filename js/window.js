/*------------All functions regarding UI and window scaling------------*/

window.onload = function () {
    document.getElementById('allIn').classList.remove('hideBottom');
    calcWidth();
}

window.onresize = calcWidth;

function calcWidth() {
    var widthSetting = document.getElementsByTagName('html')[0];
    var height = window.innerHeight;
    var twoHeight = height * 2 + 250;
    var width = window.innerWidth;
    widthSetting.style.cssText = "--dist-from-side--25: " + calcWidth25(width) + "px;" + "--dist-from-side--35: " + calcWidth35(width) + "px;" + "--dist-from-side--36: " + calcWidth36(width) + "px;" + "--screen-height: -" + height + "px;" + "--two-screen-height: " + twoHeight + "px;";
    if (width >= 768) {
        document.querySelector('.output-p').classList.remove('alignLeft');
    }
    else {
        document.querySelector('.output-p').classList.add('alignLeft');
    }
}

function calcWidth25(width) {
    if (width < 1520) {
        if (width < 768) {
            if (!document.querySelector('#allOut').classList.contains('hideBottom')) {
                console.log('shown');
                document.querySelector('#thatAll').classList.add('overflowAuto');
            }
            return 0;
        }
        else {
            if (!document.querySelector('#allOut').classList.contains('hideBottom')) {
                document.querySelector('#thatAll').classList.remove('overflowAuto');
            }
            var distFromSide = (width - 768) / 2;
            return distFromSide;
        }
    }
    else {
        if (!document.querySelector('#allOut').classList.contains('hideBottom')) {
            document.querySelector('#thatAll').classList.remove('overflowAuto');
        }
        var distFromSide = width * 0.25;
        return distFromSide;
    }
}

function calcWidth35(width) {
    if (width < 1520) {
        if (width < 456) {
            if (document.querySelector('#allOut').classList.contains('hideBottom')) {
                document.querySelector('#thatAll').classList.add('overflowAuto');
            }
            return 0;
        }
        else {
            if (document.querySelector('#allOut').classList.contains('hideBottom')) {
                document.querySelector('#thatAll').classList.remove('overflowAuto');
            }
            var distFromSide = (width - 456) / 2;
            return distFromSide;
        }
    }
    else {
        if (document.querySelector('#allOut').classList.contains('hideBottom')) {
            document.querySelector('#thatAll').classList.remove('overflowAuto');
        }
        var distFromSide = width * 0.35;
        return distFromSide;
    }
}

function calcWidth36(width) {
    if (width < 1520) {
        if (width < 430) {
            if (document.querySelector('#allOut').classList.contains('hideBottom')) {
                document.querySelector('#thatAll').classList.add('overflowAuto');
            }
            return 0;
        }
        else {
            if (document.querySelector('#allOut').classList.contains('hideBottom')) {
                document.querySelector('#thatAll').classList.remove('overflowAuto');
            }
            var distFromSide = (width - 430) / 2;
            return distFromSide;
        }
    }
    else {
        if (document.querySelector('#allOut').classList.contains('hideBottom')) {
            document.querySelector('#thatAll').classList.remove('overflowAuto');
        }
        var distFromSide = width * 0.36;
        return distFromSide;
    }
}

/*---------------------------------------------------------------------*/


/*------------Toggle hamburger menu to cross and back------------*/

function toggleMenu() {
    var menu = document.querySelector('.menu');
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    }
    else {
        menu.classList.add('open');
    }
}

/*---------------------------------------------------------------*/