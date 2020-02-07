import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public hubData: any;
  public loginData: any;
  public commentsData: any;
  public postsData: any;

  constructor(
    private socket: Socket
  ) { }

  public sendData(channel: string, data: any) {
    try {
      console.log('[Socket Service][sendData] -> ', data);
      this.socket.emit(channel, data);
    } catch (e) {
      console.error('Error in socket sendData ->', e);
    }
  }

  public getData(channel: string) {
    try {
    return this.socket.fromEvent(channel).subscribe((data) => {
      if (data['vachellia_command_centers']) {
        console.log('[Socket Service][getData] -> yes');
        if (data['vachellia_command_centers']['vachellia']) {
          const dataToProcess = data['vachellia_command_centers']['vachellia'][0];
          if (dataToProcess['status'] && dataToProcess['status'] === 'completed') {

            if (dataToProcess['login']) {
              this.loginData = dataToProcess['login'];
              this.processLogin(this.loginData);

            }

            if (dataToProcess['hubs']) {
              this.hubData = dataToProcess['hubs'];
              this.processHubs(this.hubData);

            }

            if (dataToProcess['comments']) {
              this.commentsData = dataToProcess['comments'];

            }

            if (dataToProcess['posts']) {
              this.postsData = dataToProcess['posts'];

            }
          }
        }
      }
    });
  } catch (e) {
    console.error('Error in socket getData ->', e);

  }
}

public processHubs(data: any) {
  console.log('[SocketService][processHubs] ->', data);
  try {

  } catch (e) {
    console.log('[SocketService][processHubs] ->', data);

  }
}

public processLogin(data: any) {
  console.log('[SocketService][processLogin] ->', data);
  try {

  } catch (e) {
    console.log('[SocketService][processLogin] ->', data);

  }
}

public processComments(data: any) {
  console.log('[SocketService][processComments] ->', data);
  try {

  } catch (e) {
    console.log('[SocketService][processComments] ->', data);

  }

}

public processPosts(data: any) {
  console.log('[SocketService][processPosts] ->', data);
  try {

  } catch (e) {
    console.log('[SocketService][processPosts] ->', data);

  }
}
}
