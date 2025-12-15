import React from 'react'

export const InputField = ({label,name,type="text",value,onChange,error}) => {
  return (
    <>
    <div style={{ marginBottom: '1rem' }}>
        <label>{label}</label>
        <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '0.5rem', border: error ? '1px solid red' : '1px solid #ccc' }}
        />
        {error && <small style={{ color: 'red' }}>{error}</small>}
    </div>
    </>
  )
}
