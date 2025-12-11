import React from 'react'

export const InputField = ({label,name,type="text",value,onChange,error}) => {
  return (
    <>
    <div>
        <label>{label}</label>
        <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        />
        {error && <small>{error}</small>}
    </div>
    </>
  )
}
