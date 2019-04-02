import {Component, OnInit, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EventEmitter } from 'protractor';
// import { ChatService } from '../chat.service';

declare var $bean;

@Component({
  selector: 'app-view-channel',
  templateUrl: './view-channel.component.html',
  styleUrls: ['./view-channel.component.css']
})
export class ViewChannelComponent implements OnInit {

  listChannel = [];
  channelSelected: any;
  url = 'http://localhost/channels';
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getListChannel();
  }

  changeChannel(channel) {
    alert('Bạn vừa chuyển sang Channel ' + "'" + channel.title + "'");
    // this.chatService.setChannelId(channel.id);
  }

  getListChannel() {
    this.http.get(this.url).subscribe((data: any) => {
      if ($bean.isNotNil(data)) {
        this.listChannel = $bean.isNil(data) ? [] : data;
        if ($bean.isNotNil(this.listChannel)) {
          this.channelSelected = this.listChannel[0];
        }
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }

  viewDetail(channel) {
    this.channelSelected = channel;
    document.getElementById('channelId').style.display = 'block';
  }

  addChannel() {
    this.channelSelected = null;
    document.getElementById('channelId').style.display = 'block';
  }

  deleteChannel(channel) {
    let isDelete = confirm('Bạn muốn xóa channel ' + channel.title);
    if (isDelete) {
      let $this = this;
      let deleteUrl = this.url + '/' + channel.id;
      console.log(deleteUrl);
      this.http.delete(deleteUrl).subscribe(function (data) {
        if ($bean.isNotNil(data)) {
          alert('Delete channel ' + channel.title + ' successfully !');
          if ($bean.isNotEmpty($this.listChannel) && $bean.isNotNil(channel.id)) {
            for (let i = 0; i < $this.listChannel.length; i++) {
              if ($this.listChannel[i].id == channel.id) {
                $this.listChannel.splice(i, 1);
              }
            }
          }
        }
      })
    }
  }
}
