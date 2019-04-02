import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ViewMessageComponent} from "./message/view-message/view-message.component";
import {SignupComponent} from "./user/signup/signup.component";
import {LoginComponent} from "./user/login/login.component";
import {ViewChannelComponent} from "./channel/view-channel/view-channel.component";
import {DetailChannelComponent} from "./channel/detail-channel/detail-channel.component";
import {AppRoutingModule} from "./app.routing";
@NgModule({
  declarations: [
    AppComponent,
    ViewMessageComponent,
    SignupComponent,
    LoginComponent,
    ViewChannelComponent,
    DetailChannelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
