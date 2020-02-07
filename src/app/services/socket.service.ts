import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public hubData = new Observable<any>();
  public userToken = new Observable<string>();
  public userID = new Observable<string>();
  public commentsData = new Observable<any>();
  public postsData = new Observable<any>();

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
                this.processLogin(dataToProcess['login']);

              }

              if (dataToProcess['hubs']) {
                this.processHubs(dataToProcess['hubs']);

              }

              if (dataToProcess['comments']) {
                this.processComments(dataToProcess['comments']);
              }

              if (dataToProcess['posts']) {
                this.processPosts(dataToProcess['posts']);
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
      this.hubData = data;

    } catch (e) {
      console.log('[SocketService][processHubs] ->', data);
    }

  }

  public processLogin(data: any) {
    console.log('[SocketService][processLogin] ->', data);

    try {
      if (data['token'] && data['user_id']) {
        this.userToken = data['token'];
        this.userID = data['user_id'];

      }

    } catch (e) {
      console.log('[SocketService][processLogin] ->', data);
    }

  }

  public processComments(data: any) {
    console.log('[SocketService][processComments] ->', data);

    try {
      this.commentsData = data;

    } catch (e) {
      console.log('[SocketService][processComments] ->', data);
    }

  }

  public processPosts(data: any) {
    console.log('[SocketService][processPosts] ->', data);

    try {
      this.postsData = data;

    } catch (e) {
      console.log('[SocketService][processPosts] ->', data);
    }

  }
}
