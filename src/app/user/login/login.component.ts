import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var $bean;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: boolean;
  bean = $bean;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  login() {
    var formData = {
      'username': this.username,
      'password': this.password
    };
    var url = 'http://localhost/user/login';
    this.http.post(url, formData).subscribe((data: any) => {
      if($bean.isNotNil(data)){
        $bean.getOwner = data;
        console.log($bean.getOwner);
        alert("Login thành công");
        document.getElementById('id01').style.display='none';
      }else{
        alert("Login thất bại");
      }
    }, error => {
      console.log("Something went wrong ", error);
    });
  }
}
