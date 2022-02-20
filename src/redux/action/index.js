import * as style from "./../constance"
export const switchMenu=(menuName)=>{
    return {
        type: style.SWITCH_MENU,
        menuName
    }
}