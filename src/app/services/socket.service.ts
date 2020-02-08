import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public hubData = new Observable<any>();
  public userToken = new Observable<string>();

  public observablesArray = [];
  public apiDefinition = [
    {
      name: 'login',
    }
  ];

  public userID: string;
  public commentsData: any;
  public postsData: any;

  constructor(
    private socket: Socket
  ) {
    this.buildObservables();
    this.getData();
  }

  public buildObservables() {
    this.apiDefinition.forEach(api => {
      const tempData = {
        name: api['name'],
        observable: new Observable((observer) => {
          tempData['observer'] = observer;
        })
      };
      this.observablesArray.push(tempData);
      const tmp = tempData['observable'].subscribe();
    });
    console.log('[buildObservables][observablesArray] -> ', this.observablesArray);
  }

  public findObservable(name) {
    let foundApi = '';
    this.observablesArray.forEach(api => {
      if (name === api['name']) {
        foundApi = api;
      }
    });
    return foundApi['observable'];
  }

  public nextInObservable(name, data) {
    let foundApi = '';
    this.observablesArray.forEach(api => {
      if (name === api['name']) {
        foundApi = api;
      }
    });
    console.log('[nextInObservable][foundApi] -> ', foundApi);
    foundApi['observer'].next(data);
  }


  public sendData(channel: string, data: any) {
    try {
      console.log('[Socket Service][sendData] -> ', data);

      const getObj = {
        request_data: data['request_data'],
        endpoint: '*',
        method: 'GET',
        uuid: ''
      };

      this.socket.emit(channel, getObj);
      console.log('emitted', getObj);
    } catch (e) {
      console.error('Error in socket sendData ->', e);
    }
    console.log('[findObservable][name] -> ', this.findObservable(data['observable']));

    return this.findObservable(data['observable']);
  }

  public getData() {
    try {
      return this.socket.fromEvent('out_controller').subscribe((data) => {
        console.log('data ->', data);
        if (data['vachellia_command_centers']) {
          console.log('[Socket Service][getData] -> yes');
          if (data['vachellia_command_centers']['login']) {
            this.processLogin('login', data['vachellia_command_centers']['login']);
          } else {
            if (data['vachellia_command_centers']['vachellia']) {

            }
          }
          // if (dataToProcess['status'] && dataToProcess['status'] === 'completed') {
          //   const dataToProcess = [0];

          //   if (dataToProcess['login']) {
          //     this.processLogin('login', dataToProcess['login']);
          //   }

          //   if (dataToProcess['hubs']) {
          //     this.processHubs(dataToProcess['hubs']);

          //   }

          //   if (dataToProcess['comments']) {
          //     this.processComments(dataToProcess['comments']);
          //   }

          //   if (dataToProcess['posts']) {
          //     this.processPosts(dataToProcess['posts']);
          //   }
          // }
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

  public processLogin(request, data: any) {
    console.log('[SocketService][processLogin] ->', data);

    try {
      if (data[0]['token'] && data[0]['user_id']) {
        this.userToken = data[0]['token'];
        this.userID = data[0]['user_id'];
        // console.log(this.userID + ' & ' + this.userToken);
        this.nextInObservable(request,
          {
            userID: this.userID,
            userToken: this.userToken
          }
        );
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
