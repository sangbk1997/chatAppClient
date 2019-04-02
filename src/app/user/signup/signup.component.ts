import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var $bean;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string;
  password: string;
  message: boolean;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  signup() {
    var formData = {
      'username': this.username,
      'password': this.password
    };
    var url = 'http://localhost/user/signup';
    this.http.post(url, formData).subscribe((data: any) => {
      console.log(data);
      if($bean.isNotNil(data)){
        alert('Đăng ký thành công !');
        document.getElementById('id02').style.display='none';
      }else{
        alert('Đăng ký thất bại !');
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }
}
