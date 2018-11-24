const rentalStateDefault=[]

export const rentalReducer=(state=rentalStateDefault,action)=>{
switch(action.type){
    case 'FETCH_RENTALS_SUCCESS':
    return [...state,...action.rentals]
    default:return state
}
}

const rentalDefaultState={}
export const selectedRentalReducer=(state=rentalDefaultState,action)=>{
  switch(action.type){
      case 'FETCH_RENTAL_BY_ID_SUCCESS':
      return {...state,...action.rental}
             default:return state
  }
  }

