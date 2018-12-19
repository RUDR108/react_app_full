export const required = value => (value ?undefined: 'The Input is required')

 const minLength = min => value =>
    value && value.length<min ? `Must be ${min} character or more`:undefined;
    export const minLength4 = minLength(3)

