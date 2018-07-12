/*------------MDC Setup------------*/

import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';
import {MDCSelect} from '@material/select';
import {MDCTopAppBar} from '@material/top-app-bar/index';

const rwyOne = new MDCTextField(document.querySelector('.rwyOne'));
const rwyTwo = new MDCTextField(document.querySelector('.rwyTwo'));
const continueButtonRipple = new MDCRipple(document.querySelector('.continueButton'));
const generateButtonRipple = new MDCRipple(document.querySelector('.generateButton'));
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;
const backButtonRipple = new MDCRipple(document.querySelector('.back-button'));
backButtonRipple.unbounded = true;
const item1Ripple = new MDCRipple(document.querySelector('.item1'));
const item2Ripple = new MDCRipple(document.querySelector('.item2'));
const item3Ripple = new MDCRipple(document.querySelector('.item3'));
// const returnSelectRipple = new MDCRipple(document.querySelector('.returnSelectButton'));
const select = new MDCSelect(document.querySelector('.mdc-select'));
select.listen('change', () => {
  document.querySelector('.generateButton').removeAttribute('disabled');
});
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

/*---------------------------------*/