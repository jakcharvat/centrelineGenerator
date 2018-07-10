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


/*------------Toggle menu to close and back------------*/

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


/*------------Defining menu actions------------*/

function returnToStart() {
    document.querySelector('#allOut').classList.add('hideBottom');
    document.querySelector('#selectSide').classList.remove('hideTop');
    document.querySelector('#selectSide').classList.add('hideBottom');
    document.querySelector('#allIn').classList.remove('hideTop');
    document.querySelector('.menu').classList.remove('open');
    document.querySelector('.item2').classList.remove('hide');
    document.querySelector('#divider1').classList.remove('hide');
    document.querySelector('#divider2').classList.remove('hide');
    document.querySelector('.item1').classList.add('hide');
    document.querySelector('.item2').classList.add('hide');
    document.querySelector('#divider1').classList.add('hide');
    document.querySelector('#divider2').classList.add('hide');
}

function returnToSide() {
    document.querySelector('#allOut').classList.add('hideBottom');
    document.querySelector('#selectSide').classList.remove('hideTop');
    document.querySelector('.menu').classList.remove('open');
    document.querySelector('.item2').classList.add('hide');
    document.querySelector('#divider1').classList.remove('hide');
    document.querySelector('#divider2').classList.add('hide');
}

/*---------------------------------------------*/

/*------------Scrollbars------------*/

function scroll() {
    
    var scrolled = document.querySelector('#content-out');
    var a = scrolled.scrollTop;
    var b = scrolled.scrollHeight - scrolled.clientHeight;
    var c = a / b;

    console.log(c);
}

/*----------------------------------*/

/*------------Select Button Enable / Disable------------*/

var buttonOne = false;
var buttonTwo = false;

function enableButtonOne() {
    buttonOne = true;
    checkButtons();
}

function disableButtonOne() {
    if (document.querySelector('#rwyEndOne').value == "") {
        buttonOne = false;
    }
    checkButtons();
}

function enableButtonTwo() {
    buttonTwo = true;
    checkButtons();
}

function disableButtonTwo() {
    if (document.querySelector('#rwyEndTwo').value == "") {
        buttonTwo = false;
    }
    checkButtons();
}

function checkButtons() {
    if (buttonOne == true && buttonTwo == true) {
        document.querySelector('.continueButton').removeAttribute('disabled');
    }

    else {
        document.querySelector('.continueButton').setAttribute('disabled', true);
    }
}

/*------------------------------------------------------*/