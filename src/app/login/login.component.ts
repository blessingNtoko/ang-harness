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
  ) { }

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
        },
        uuid: ''
      },
    ).subscribe((data) => {
      console.log('[onSubmit][data] -> ', data);
      if (data['userToken'] && data['userID']) {
        if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
          console.log('[Validation Checks] -> yes they are');
        }
      }
    });

    setInterval(() => {

      this.socket.sendData('in_controller',
      {
        observable: 'hubs',
        request_data: {
          vachellia: {
            request_data: {
              hubs: {
                '--select': '*',
                posts: {
                  '--select': '*'
                }
              }
            },
            endpoint: '*',
            method: 'GET',
          }
        },
        uuid: this.socket.userToken
      },
    ).subscribe((data) => {
      console.log('[onInit - Hubs][data] -> ', data);
      // if (data['userToken'] && data['userID']) {
      //   if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
      //     console.log('[Validation Checks] -> yes they are');
      //   }
      // }
    });
    }, 200);

    setInterval(() => {

      this.socket.sendData('in_controller',
        {
          observable: 'posts',
          request_data: {
            vachellia: {
              request_data: {
                posts: {
                  '--select': '*',
                  comments: {
                    '--select': '*',
                  }
                }

              },
              endpoint: '*',
              method: 'GET',
            }
          },
          uuid: this.socket.userToken
        },
      ).subscribe((data) => {
        console.log('[onInit - Posts][data] -> ', data);
        // if (data['userToken'] && data['userID']) {
        //   if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
        //     console.log('[Validation Checks] -> yes they are');
        //   }
        // }
      });
    }, 400);

    setInterval(() => {
      this.socket.sendData('in_controller',
      {
        observable: 'posts',
        request_data: {
          vachellia: {
            request_data: {
              comments: {
                '--select': '*',

              }

            },
            endpoint: '*',
            method: 'GET',
          }
        },
        uuid: this.socket.userToken
      },
    ).subscribe((data) => {
      console.log('[onInit - Posts][data] -> ', data);
      // if (data['userToken'] && data['userID']) {
      //   if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
      //     console.log('[Validation Checks] -> yes they are');
      //   }
      // }
    });
    }, 600);



  }

}
