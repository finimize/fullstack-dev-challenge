const compoundedInterest = (interestRate: number, timeInMonths: number) :number => {
    return Math.pow((interestRate + 1), timeInMonths);
};

const percentageToDecimal = (percentValue: number) :number => percentValue/100;

export const monthlyCompoundInterest = (monthlyDeposit: number, monthlyInterest: number, timeInMonths: number) :number =>  {
    const interestRate = percentageToDecimal(monthlyInterest);
    const interestOverMonths = compoundedInterest(interestRate, timeInMonths);
    const monthlyCompound = (monthlyDeposit *((interestOverMonths-1)/interestRate));
    return Math.round(monthlyCompound);
}

export const principleCompoundInterest = (initialDeposit: number,
                                          monthlyInterest: number,
                                          timeInMonths: number) : number => {
    const interestOverMonths = compoundedInterest(percentageToDecimal(monthlyInterest), timeInMonths);
    return Math.round(initialDeposit * interestOverMonths);
}

export const totalSavingsOverTime = (initialDeposit: number,
                                    monthlyDeposit: number,
                                    monthlyInterest: number,
                                    timeInMonths: number) :number => {
    const principle = principleCompoundInterest(initialDeposit, monthlyInterest, timeInMonths);
    const  monthly = monthlyCompoundInterest(monthlyDeposit, monthlyInterest, timeInMonths);
    return monthly+principle;
}

const toRange = (value: number) => {
    let array = [];
    for(let i =1;i<=value;i++){
        array.push(i);
    }
    return array;
}
export const toYearsFromNow = (years: number) :Array<string> => {
    let yearsArray = toRange(years);
    return yearsArray.map(number => {
        let d = new Date();
        let currentYear = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDate();
        let c = new Date(currentYear + number, month, day);
        return c.getFullYear().toString();
    })
}
export const yearlySavingsOverTime = (initialDeposit: number,
                                        monthlyDeposit: number,
                                         monthlyInterest: number,
                                         timeInYears: number) : Array<number> => {
        const arr = toRange(timeInYears);
        const principleCompound = principleCompoundInterest(initialDeposit,monthlyInterest,timeInYears*12);
        return arr.map(number => monthlyCompoundInterest(monthlyDeposit,monthlyInterest,number*12) + principleCompound);
}
