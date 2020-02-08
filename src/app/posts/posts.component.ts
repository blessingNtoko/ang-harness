import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.socket.sendData('in_controller',
    {
      observable: 'login',
      request_data: {
        vachellia: {
        request_data: {
          posts: {
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
    console.log('[onInit][data] -> ', data);
    // if (data['userToken'] && data['userID']) {
    //   if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
    //     console.log('[Validation Checks] -> yes they are');
    //   }
    // }
  });
  }

}
