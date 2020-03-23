
import { handleActions } from 'redux-actions';
const peopleType={
  name:'请选择',
  personTypeId:0
};
const choosecompay={
  name:'请选择',
  companyId:0
};
const choosesecure={
  name:'请选择',
  specialProfessionType:0
}
export const Specialtype = handleActions({
    'ADD'(state, action) {
      return action.payload.text
    },
  }, peopleType) 
export const shownav=handleActions({
  'SHOW_NAV'(state,action){
    return state=true;
  },
  "HIDE_NAV"(state,action){
    return state=false;
  }
},false);
export const companyinformation=handleActions({
  'CHOOSE_COMPANY'(state,action){
    return action.payload.text;
  }
},choosecompay)
export const getsucureinformation=handleActions({
  'SECURE_TYPE'(state,action){
    return action.payload.text;
  }
},choosesecure)
