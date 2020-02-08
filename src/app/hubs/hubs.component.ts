import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.scss']
})
export class HubsComponent implements OnInit {

  constructor(
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.socket.sendData('in_controller',
    {
      observable: 'hubs',
      request_data: {
        vachellia: {
        request_data: {
          hubs: {
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
    console.log('[onInit - Hubs][data] -> ', data);
    // if (data['userToken'] && data['userID']) {
    //   if (data['userToken'] === this.socket['userToken'] && data['userID'] === this.socket['userID']) {
    //     console.log('[Validation Checks] -> yes they are');
    //   }
    // }
  });
  }

}
