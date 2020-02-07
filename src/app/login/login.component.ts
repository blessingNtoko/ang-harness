import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private socket: SocketService
  ) { }

  ngOnInit() {
  }

}
