import * as style from './../constance'
const initialState={
    menuName:"首页"
}
export default (state = initialState, action) => {
    switch (action.type) {
        case style.SWITCH_MENU:
            return {...state,menuName:action.menuName }
        default:
            return state
    }
}