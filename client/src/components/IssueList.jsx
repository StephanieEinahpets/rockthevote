import React from 'react'
import Issue from './Issue'

export default function IssueList(props){
  const { issues } = props

  const sortedIssues = issues.slice().sort((a, b) => {
    const likesA = a.likedUsers.length;
    const likesB = b.likedUsers.length;
    return likesB - likesA
  })

  return (
    <div className="issue-list">
      {sortedIssues.map((issue) => (
        <Issue {...issue} key={issue._id} />
      ))}
    </div>
  )
}