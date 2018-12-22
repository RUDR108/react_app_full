import React from 'react';

export const BwmCheckBox = ({
    input,
    label,
    type,
    symbol,
    className,
  meta: { touched, error, warning }
  }) => (
     <div className="form-group">
     <div className='input-group'>
      <label>{label}</label>
        <input {...input} type={type}  className={className} />
    </div>
        {touched &&
          ((error && <div className="alert alert-danger">{error}</div>))}
        </div>
  )