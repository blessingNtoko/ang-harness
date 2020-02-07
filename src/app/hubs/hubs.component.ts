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
    this.socket.hubData.subscribe((data) => {
      console.log('hubData ->', data);
    });
  }

}
