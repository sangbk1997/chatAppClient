import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var PushStream;
declare var $bean;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  enterKeyCode = 13;
  title = 'chatClient';
  inputValue: string = '';
  userLogin: any = {};
  listChannel: any = [];
  selectedChannel: any = {};
  listMessageByChannel: any = [];
  baseUrl = 'http://localhost/';
  bean = $bean;
  id: string = '';
  recievedMessage: any;
  channelId: string = '';
  data = [];
  settingOption = {
    host: '172.20.30.107',
    modes: "websocket",
    channelsByArgument: true,
    channelsArgument: 'channels'
  };
  listUser: any = [];
  pushStreamClient: any;
  extraMessage: any = [];
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if($bean.isNotNil($bean.getOwner)){
      this.userLogin = $bean.getOwner;
    }else{
      this.getListUser();
    }
    this.pushStreamClient = new PushStream(this.settingOption);
  }
  
  getListUser() {
    let url = this.baseUrl + 'users';
    this.http.get(url).subscribe(data => {
      if($bean.isNotNil(data)){
        this.listUser = data;
        this.userLogin = this.listUser[0];
        this.getInfoUser(this.userLogin.id);
      }else{
        console.log('Empty users');
      }
    })
  }

  getInfoUser(userId) {
    let url = this.baseUrl + 'users/' + userId;
    this.http.get(url).subscribe((data: any) => {
      if($bean.isNotNil(data)){
        this.userLogin = data;
        this.getListChannel();
        console.log(this.userLogin);
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }

  getListChannel() {
    let url = this.baseUrl + 'channels';
    this.http.get(url).subscribe((data: any) => {
      if($bean.isNotNil(data)){
        this.listChannel = data;
        this.selectedChannel = this.listChannel[0];
        this.accessChannel(this.selectedChannel.id);
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }

  selectChannel(channel) {
    this.selectedChannel = channel;
    this.accessChannel(this.selectedChannel.id);
  }

  accessChannel(channelId){
    this.getNumberMessageByChannel(channelId, 10, 0);
    this.listenChannel(channelId);
  }

  listenChannel(channelId) {
    let url = this.baseUrl + 'ws';
    let formData = {
      idChannel: channelId,
      idUser: this.userLogin.id
    }
    this.http.post(url, formData).subscribe(data => {
      if($bean.isNotNil(data)){
        this.subChannel(data['channelId']);
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }

  subChannel(channelId){
    // this.pushStreamClient.disconnect();
    this.pushStreamClient.removeAllChannels();
    let channelName = 'channel' + '_' + channelId;
    this.pushStreamClient.onmessage = this.messageReceived.bind(this);
    console.log(this.pushStreamClient.channels);
    this.pushStreamClient.addChannel(channelName);
    this.pushStreamClient.connect();
  }
  messageReceived(text, id, channelId) {
    this.recievedMessage = JSON.parse(text);
    this.getMessage(this.recievedMessage);
  };

  getMessage(message){
    if($bean.isNotNil(message)){
      this.listMessageByChannel.push(message);
    }
  }

  getMessagesByChannel(channelId) {
    if($bean.isNotNil(channelId)){
      let url = this.baseUrl + 'messengersByChannel/' + channelId;
      this.http.get(url).subscribe(data => {
        if($bean.isNotNil(data)){
          this.listMessageByChannel = data;
          this.moveToLastMessage();
        }
      }, error => {
        console.log("Something went wrong ", error);
      });
    }
  }

  getNumberMessageByChannel(channeId, number, offset){
    let formData = {
      channelId: channeId,
      number: number,
      offset: offset
    }
    let url = this.baseUrl + 'messengerByNumber';
    this.http.post(url, formData).subscribe(data => {
      if($bean.isNotNil(data)){
        this.listMessageByChannel = $bean.reverseList(data);
        this.moveToLastMessage();
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }

  sendMessage(messageTxt){
    if($bean.isNotNil(messageTxt)){
      let message = {
        ownerId: this.userLogin.id,
        username: this.userLogin.username,
        message: messageTxt,
        channelId: this.selectedChannel.id
      }
      let channelName = 'channel' + '_' + this.selectedChannel.id;
      let url = this.baseUrl + 'pub?id=' + channelName;
      this.http.post(url, message).subscribe((data: any) => {
        if($bean.isNotNil(data)){
          console.log(data);
          this.inputValue = '';
          this.moveToLastMessage();
        }
      }, error => {
        console.log("Something went wrong ", error);
      });
    }
  }

  moveToLastMessage() {
    let lastMessage = document.getElementById('last-message');
    if($bean.isNotNil(lastMessage)){
      lastMessage.scrollIntoView(false);
    }
  }

  loadExtraMessage(){
    let a = 0;
    let containerMessenger = document.getElementById('container-messenger');
    if(containerMessenger.scrollTop == 0){
      a++;
      console.log(a);
      let formData = {
        channelId: this.selectedChannel.id,
        number: 10,
        offset: this.listMessageByChannel.length
      }
      let url = this.baseUrl + 'messengerByNumber';
      this.http.post(url, formData).subscribe(data => {
        if($bean.isNotNil(data)){
          this.extraMessage = data;
          if($bean.isNotNil(this.extraMessage)){
            console.log(this.extraMessage);
            for(let i = 0; i < this.extraMessage.length; i++){
              this.listMessageByChannel.splice(0, 0, this.extraMessage[i]);
            }
          }
        }
      }, error => {
        console.log("Something went wrong ", error);
      });
    }
  }

  checkSendMessage(inputValue, event){
    if(event.keyCode == this.enterKeyCode){
      this.sendMessage(inputValue);
    }
  }

}
