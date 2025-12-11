import React from 'react'

export const isEmail = (value) =>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const passwordIssues=(value)=>{
    const issues=[]
    if(value.length<8) issues.push("atleast 8 characters")
    if (!/[A-Z]/.test(value)) issues.push("one uppercase")
    if (!/[a-z]/.test(value)) issues.push("one lowercase")
    if (!/[!@#$%^&*]/.test(value)) issues.push("One special character")

    return issues
}