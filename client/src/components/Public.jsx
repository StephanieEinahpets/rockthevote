import React, {useContext, useEffect} from 'react'
import IssueList from './IssueList'
import { UserContext } from '../context/UserProvider'


export default function Public(){

  const {publicState, getAllIssues, token} = useContext(UserContext)
  console.log(publicState)

  const auth = token ? true : false
    
  useEffect(() => {
    getAllIssues()
  }, [])

  return (
    <div className="public">
      {!auth && <h3>Log in to post issues, comment, and weigh in!</h3>}
      <IssueList issues={publicState}/>
    </div>
  )
}

