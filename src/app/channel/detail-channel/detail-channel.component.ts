import {Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
declare var PushStream;
declare var $bean;
@Component({
  selector: 'app-view-detail-channel',
  templateUrl: './detail-channel.component.html',
  styleUrls: ['./detail-channel.component.css']
})
export class DetailChannelComponent implements OnInit, OnChanges {

  bean = $bean;
  host = 'http://localhost/channels';
  isUpdate: boolean = true;
  @Input() channel;
  @Output() saveChannelInfo = new EventEmitter();
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if($bean.isNil(this.channel) || this.channel == null){
      this.channel = {};
      this.isUpdate = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if($bean.isNil(this.channel) || this.channel == null){
      this.channel = {};
      this.isUpdate = false;
    }
  }

  saveChannel(){
    let $this = this;
    if($bean.isNotNil(this.channel.id)){
      this.http.put(this.host + '/' + this.channel.id, this.channel).subscribe(function (data) {
        alert('Cập nhật thành công');
        $this.saveChannelInfo.emit({data: data});
      })
    }else{
      this.http.post(this.host, this.channel).subscribe(function (data) {
        alert('Thêm mới thành công channel');
        $this.saveChannelInfo.emit({data: data});
      })
    }
    document.getElementById('channelId').style.display='none';
  }
}
