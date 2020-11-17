import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/modules/login/login.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output('toggle')
  public toggle = new EventEmitter();

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {

  }

  onToggle() {
    this.toggle.emit();
  }
}
