import React from 'react'
import { WebView } from 'react-native-webview'

function Profile({ navigation }){

  const githubUser = navigation.getParam('user_github')

  return <WebView  style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUser}` }}/>
}

export default Profile
