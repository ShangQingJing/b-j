import {createAction} from 'redux-actions';
export const add=createAction('ADD')
export const grn=createAction('GRN');
export const shownav=createAction('SHOW_NAV');
export const hiddenav=createAction('HIDE_NAV');
export const choosecompany=createAction('CHOOSE_COMPANY');
export const getsecure=createAction('SECURE_TYPE')