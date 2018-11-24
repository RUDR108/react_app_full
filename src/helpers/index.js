

export const rentalTypes = (isShared) =>{
    if(isShared){
        return 'shared'.toUpperCase()
    }else{
        return 'whole'.toUpperCase()
    }
}

export const toUpperCase=(string)=>{
if(string){
    return string.toUpperCase()
}
}