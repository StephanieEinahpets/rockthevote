import React,  { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function CommentForm(props) {
    
    const initInputs = {commentText: ""}
    const [inputs, setInputs] = useState(initInputs)

    const { addComment } = useContext(UserContext)


    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
      }


      function handleSubmit(e){
        e.preventDefault()
        addComment(inputs, props.issueId )
        setInputs( initInputs )
      }

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
      }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text" 
                name="commentText" 
                value={inputs.commentText} 
                onChange={handleChange} 
                placeholder="Comment"
            />
            <button>Add Comment</button>
      </form>
    )
}
