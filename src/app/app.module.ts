import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HubsComponent } from './hubs/hubs.component';
import { CommentsComponent } from './comments/comments.component';
import { PostsComponent } from './posts/posts.component';

const config: SocketIoConfig = { url: 'http://futureenvision.ddns.net:369', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HubsComponent,
    CommentsComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
