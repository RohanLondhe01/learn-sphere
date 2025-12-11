const existingEmails=new Set(["student@example.com","test@school.edu"])

import React from 'react'

export const checkDuplicateEmail = (email) => {
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(existingEmails.has(email.toLowerCase()))
    },500)
  }

  )
}

export const registerUser=({name, email})=>{
    return new Promise((resolve)=>{
        setTimeout(() => {
            existingEmails.add(email.toLowerCase())
            resolve({ok:true,name,email})
        }, 600);
    })
}
