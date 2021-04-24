import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() message: any;
  time: string;
  fadeTime: boolean;
  constructor() { }
  currUserStyle = {
    "flex-direction": "row-reverse",
    "background-color":"rgb(223, 199, 235)",
  }
  otherStyle = {
    "flex-direction": "row",
    "background-color":"rgb(199, 230, 235)"
  }
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
ngOnInit() {
  setTimeout(() => { this.updateFromNow(); this.fadeTime = true }, 2000);
  setInterval(() => { this.updateFromNow() }, 60000);
}
updateFromNow(): void {
  this.time = moment(this.message.created).fromNow();
}
  getUserStyle(){
    return this.message.user == this.currentUser.name ? this.currUserStyle :this.otherStyle
  }
}
