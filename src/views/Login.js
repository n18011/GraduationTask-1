import React, { useEffect } from 'react'
import * as firebaseui from 'firebaseui'
import firebase from '../Firebase'
import 'firebaseui/dist/firebaseui.css'

export default () => {
  useEffect(() => {
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }

    // FirebaseUIの各種設定
    var uiConfig = {
      callbacks: {
        signInSuccess: function (currentUser, credential, redirectUrl) {
          // サインイン成功時のコールバック関数
          // 戻り値で自動的にリダイレクトするかどうかを指定
          return true
        },
        uiShown: function () {
          // FirebaseUIウィジェット描画完了時のコールバック関数
          // 読込中で表示しているローダー要素を消す
          document.getElementById('loader').style.display = 'none'
        }
      },
      // リダイレクトではなく、ポップアップでサインインフローを表示
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        // サポートするプロバイダ(メールアドレス)を指定
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.(サービス利用規約ページの)
      tosUrl: '/about'
    }

    // FirebaseUI描画開始
    ui.start('#firebaseui-auth-container', uiConfig)
  }, [])

  return (
    <div id='firebaseui-auth-container'>

      <div id='loader'>Loading...</div>
    </div>
  )
}
