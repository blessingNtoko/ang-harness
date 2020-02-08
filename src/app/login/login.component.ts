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

  public postsForm = new FormGroup({
    username: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
    ]))
  });

  public commentsForm = new FormGroup({
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

  public onPost() {
    this.socket.sendData('in_controller',
      {
        observable: 'posts',
        request_data: {
          vachellia: {
            request_data: {
              hubs: {
                _id: '',
                posts: {
                  '--select': '*',
                  type: 'text',
                  content: 'This place is off the chain!!!',
                  likes: []
                }
              }
            },
            endpoint: 'auth',
            method: 'POST'
          }
        },
        uuid: this.socket.userToken
      }
    )
  }

  public onComment() {
    this.socket.sendData('in_controller',
      {
        observable: 'comments',
        request_data: {
          vachellia: {
            request_data: {
              posts: {
                _id: '',
                comments: {
                  '--select': '*',
                  type: 'Nice one bruh',
                  likes: [],
                  user_id: this.socket['userID']
                }
              }
            },
            endpoint: 'auth',
            method: 'POST'
          }
        },
        uuid: this.socket['userToken']
      }
    )
  }

  public onProfile() {
    this.socket.sendData('in_controller',
      {
        observable: 'profile',
        request_data: {
          vachellia: {
            request_data: {
              profile: {
                user_id: this.socket['userID'],
                image: '*',
                bio: 'I am feeling...crispy'
              }
            },
            endpoint: 'auth',
            method: 'POST'
          }
        },
        uuid: this.socket['userToken']
      }
    )
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
        uuid: this.socket['userToken']
      },
    ).subscribe((data) => {
      console.log('[onInit - Hubs][data] -> ', data);
      // if (data['userToken'] && data['userID']) {
      //   if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
      //     console.log('[Validation Checks] -> yes they are');
      //   }
      // }
    });

    this.socket.sendData('in_controller',
      {
        observable: 'profile',
        request_data: {
          vachellia: {
            request_data: {
              profile: {
                user_id: this.socket['userID'],
                image: '*',
                bio: '*'
              }
            },
            endpoint: '*',
            method: 'GET',
          }
        },
        uuid: this.socket['userToken']
      },
    ).subscribe((data) => {
      console.log('[onInit - Profile][data] -> ', data);
      // if (data['userToken'] && data['userID']) {
      //   if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
      //     console.log('[Validation Checks] -> yes they are');
      //   }
      // }
    });


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

    this.socket.sendData('in_controller',
      {
        observable: 'comments',
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



  }

}
