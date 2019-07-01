import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpUtilService } from '../services/http-util-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ui: firebaseui.auth.AuthUI;
  constructor(private router: Router, private afAuth: AngularFireAuth,
     private http_util: HttpUtilService, private  http: HttpClient) {
  }

  ngOnInit() {
    var unLogged: boolean = (localStorage['token'] == undefined);
    if(!unLogged){
      this.router.navigate(['/']);
      // this.router.navigate(['/newdashboard']);
    } else {
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, credential, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            var currentUser = firebase.auth().currentUser
            console.log(currentUser)
            localStorage['token'] = currentUser.refreshToken;
            localStorage['image'] = currentUser.photoURL;
            localStorage['name'] = currentUser.displayName;
            localStorage['uid'] = currentUser.uid;

            var data = {
              token: currentUser.refreshToken,
              image: currentUser.photoURL,
              name: currentUser.displayName,
              id: currentUser.uid,
              email: currentUser.email
            };

            this.http.post(this.http_util.url('login_or_register'), data, this.http_util.headers()).subscribe(data => {
              console.log(data);
            });

            this.router.navigate(['']);
            window.location.reload();
            return false;
            }.bind(this),
          uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          }
        },
        signInFlow: 'popup',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ]
      };  
  
      this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
      this.ui.start("#firebaseui-auth-container", uiConfig);
    }

  }
}
