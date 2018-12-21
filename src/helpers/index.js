import * as moment from 'moment'

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

export const getRangeOfDates = (startAt,endAt,dateFormat='Y/MM/DD')=>{
    const tempDates=[]
    const mEndAt = moment(endAt)
    let mStartAt = moment(startAt)

    while(mStartAt<mEndAt){
        tempDates.push(mStartAt.format(dateFormat))
        mStartAt = mStartAt.add(1,'day') 
    }

    tempDates.push(mEndAt.format(dateFormat))
    return tempDates
}