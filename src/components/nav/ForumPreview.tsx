import React from "react"
import NavBar from "./NavBar"

    //Creates a base for front page forum posts.git 
export default class ForumBox extends React.Component {
    render(){
        return<>
            <NavBar />
            <h1 style={forumPreviewStyle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
            </> 
        }
}

    //Creates a stylesheet for the forum forumPre
const forumPreviewStyle = {
    color: "red"
}