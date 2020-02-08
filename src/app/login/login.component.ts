import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
    ]))
  });

  constructor(
    private socket: SocketService
  ) {}

  ngOnInit() {

  }

  public onSubmit() {
    this.socket.sendData('in_controller',
      {
        observable: 'login',
        request_data: {
        login: {
          request_data: {
            users: {
              '--select': '*',
              email: this.loginForm.value['username'],
              password: this.loginForm.value['password']
            }
          },
          endpoint: '*',
          method: 'GET'
        }
      }
    },
    ).subscribe((data) => {
      console.log('[onSubmit][data] -> ', data);
      if (data['userToken'] && data['userID']) {
        if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
          console.log('[Validation Checks] -> yes they are');
        }
      }
    });
  }

}
