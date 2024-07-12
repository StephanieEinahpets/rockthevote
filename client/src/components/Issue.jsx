import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'
import Comment from './Comment'
import CommentForm from './CommentForm'

export default function Issue(props){ 
  const { title, description, imgUrl, user, datePosted, likedUsers, dislikedUsers, _id } = props
  
  // Access comments from the context
  const { comments, getAllComments, token, upVoteIssue, downVoteIssue, deleteIssue, user: currentUser} = useContext(UserContext)

  const auth = token ? true : false
  
  // filter comments for the current issue
  const filteredComments = comments.filter(comment => comment.issue === _id)

  // Check if the current user posted this issue
  const isUserIssue = currentUser._id === user

  return (
    <div className='issue'>
      <img src={imgUrl} alt={imgUrl} width={200}/>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <h5>{likedUsers.length} Likes & {dislikedUsers.length} Dislikes</h5>
  
      <h5>{filteredComments.map( comment => <Comment {...comment } key={ comment._id } />)}</h5>
      {auth && <button onClick={() => upVoteIssue(_id)}>👍</button>}
      {auth && <button onClick={() => downVoteIssue(_id)}>👎</button>}
      {auth && <CommentForm issueId = {_id}/>}
      {isUserIssue && <button className="deleteButton" onClick={() => deleteIssue(_id)}>Delete My Issue</button>}
    </div>
  )
}