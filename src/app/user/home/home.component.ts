import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var PushStream;
declare var $bean;

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'chatClient';
  inputValue: string = '';
  userLogin: any = {};
  listChannel: any = [];
  selectedChannel: any = {};
  listMessageByChannel: any = [];
  baseUrl = 'http://localhost/';
  bean = $bean;
  id: string = '';
  text: string= '';
  channelId: string = '';
  data = [];
  settingOption = {
    host: '172.20.30.107',
    modes: "websocket",
    channelsByArgument: true,
    channelsArgument: 'channels'
  };
  listenChannel: any;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getInfoUser('7');
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
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }

  selectChannel(channel) {
    this.selectedChannel = channel;
    this.getMessagesByChannel();
    this.listenByChannel(this.selectedChannel.id);
  }

  listenByChannel(channelId) {
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
      let channelName = 'channel' + '_' + channelId;
      var pushstream = new PushStream(this.settingOption);
      pushstream.onmessage = this.messageReceived.bind(this);
      pushstream.addChannel(channelName);
      pushstream.connect();
  }
  messageReceived(text, id, channelId) {
    this.id = id;
    this.text = JSON.parse(text);
    this.channelId = channelId;
    this.showData(this.text);
  };

  showData(message){
    if($bean.isNotNil(message)){
      this.listMessageByChannel.push(message);
    }
  }

  getMessagesByChannel() {
    if($bean.isNotNil(this.selectedChannel)){
      let url = this.baseUrl + 'messengers/getByChannel';
      let formData = {
        channelId: this.selectedChannel.id
      }
      this.http.post(url, formData).subscribe((data: any) => {
        if($bean.isNotNil(data)){
          this.listMessageByChannel = data;
        }
      }, error => {
        console.log("Something went wrong ", error);
      });
    }
  }

  sendMessage(){
    let message = {
      userId: this.userLogin.id,
      username: this.userLogin.username,
      message: this.inputValue,
      channelId: this.selectedChannel.id
    }
    let channelName = 'channel' + '_' + this.selectedChannel.id;
    let url = this.baseUrl + 'pub?id=' + channelName;
    this.http.post(url, message).subscribe((data: any) => {
      if($bean.isNotNil(data)){
        console.log(data);
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }

}
