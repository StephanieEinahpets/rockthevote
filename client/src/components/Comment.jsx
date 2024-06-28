import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'

export default function Comment(props){


const { commentText, user, _id, issue, datePosted } = props
  

  return (
    <div className='comment'>
      <h5>{user.username}:</h5>
      <h3>{commentText}</h3>
    </div>
  )
}