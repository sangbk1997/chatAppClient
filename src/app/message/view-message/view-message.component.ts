import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { ChatService } from '../chat.service';
declare var PushStream;
declare var $bean;
@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit, OnChanges {

  id: string = '';
  text: string= '';
  channelId: string = '';
  data = [];
  isFirstInit: boolean = true;
  settingOption = {
    host: '172.20.30.107',
    modes: "websocket",
    channelsByArgument: true,
    channelsArgument: 'channels'
  };
  baseUrl = 'http://localhost/ws?id=';
  listenChannel: object;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if($bean.isNil(this.listenChannel)){
      this.listenChannel = {};
      this.listenChannel['channelId'] = 'ch0';
    }
    let url = this.baseUrl + this.listenChannel['channelId'];
    this.subChannel(url);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['listenChannel'] && !this.isFirstInit){
      this.ngOnInit();
    }
    this.isFirstInit = false;
  }

  subChannel(url){
    this.http.get(url).subscribe((data: any) => {
      var pushstream = new PushStream(this.settingOption);
      pushstream.onmessage = this.messageReceived.bind(this);
      pushstream.addChannel(data.channel);
      pushstream.connect();
    })
  }
  messageReceived(text, id, channelId) {
    this.id = id;
    this.text = JSON.parse(text);
    this.channelId = channelId;
    this.showData(this.text);
  };

  showData(message){
    if($bean.isNotNil(message)){
      this.data.push(message['channelId'] + ' : ' + message['username'] + ' send ' + ' : ' + message['message']);
    }
  }
}
