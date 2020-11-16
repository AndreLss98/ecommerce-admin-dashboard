import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login/login.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {

  }
}
