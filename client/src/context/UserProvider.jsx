import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [publicState, setPublicState] = useState([])
    const [ comments, setComments ] = useState([])

    function signup(credentials){
        axios.post("/auth/signup", credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
        .then(res => {
            console.log(credentials)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getUserIssues()
            getAllIssues()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }


    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }


    function getUserIssues(){
        userAxios.get("/api/issues/user")
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllIssues(){
        userAxios.get("/public")
        .then(res => {
            setPublicState(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function addIssue(newIssue){
        userAxios.post("/api/issues", newIssue)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllComments(){
        userAxios.get("/api/comments")
        .then(res => {
            console.log(res)
            setComments(prevState => (
                res.data
            ))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function addComment(newComment, issueId){
        userAxios.post(`/api/comments/${issueId}`, newComment)
        .then(res => {
            setComments(prevState => (
                [
                    ...prevState,
                    res.data
                ]
            ))
        })
        .catch(err => console.log(err.response.data.errMsg))
        return getAllComments()
    }


    //upvote
    function upVoteIssue(issueId) {
        userAxios.put(`/api/issues/upVote/${issueId}`)
            .then(res => {
                setPublicState(prevIssues => prevIssues.map(issue => issueId !== issue._id ? issue : res.data))
                setUserState(prevUserState => ({ ...prevUserState, issues: prevUserState.issues.map(issue => issueId !== issue._id ? issue : res.data) }))
            })
            .catch(err => console.log(err))
    }
    
    //downvote
    function downVoteIssue(issueId) {
        userAxios.put(`/api/issues/downVote/${issueId}`)
            .then(res => {
                setPublicState(prevIssues => prevIssues.map(issue => issueId !== issue._id ?  issue : res.data))
                setUserState(prevUserState => ({ ...prevUserState, issues: prevUserState.issues.map(issue => issueId !== issue._id ? issue : res.data) }))
            })
            .catch(err => console.log(err))
    }
    


    return(
        <UserContext.Provider
            value={{
                ...userState,
                publicState,
                signup,
                login,
                logout,
                addIssue,
                resetAuthErr,
                getAllIssues,
                comments,
                setComments,
                getAllComments,
                addComment,
                downVoteIssue,
                upVoteIssue
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
