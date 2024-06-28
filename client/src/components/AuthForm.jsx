import React from 'react'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {
      username, 
      password
    } 
  } = props
  
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          name="username" 
          onChange={handleChange} 
          placeholder="Username"/>
        <input 
          type="text" 
          value={password} 
          name="password" 
          onChange={handleChange} 
          placeholder="Password"/>
        <button>{ btnText }</button>
      </form>
      <p style={{color: "red"}}>{ errMsg }</p>
    </div>
  )
}