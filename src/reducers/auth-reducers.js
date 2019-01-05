const INITIAL_STATE = {
    isAuth:false,
    errors:[],
    username:'',
    email:''
}

export const authReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOGIN_SUCCESS':
        return Object.assign({},state,{isAuth:true,token:action.token,errors:[],username:action.username,email:action.email});
        case 'LOGIN_FAILURE':
        return Object.assign({},state,{errors:action.errors})
        case 'LOGOUT':
        return Object.assign({},state,{isAuth:false,username:'',email:''});
        default:return state
    }
}