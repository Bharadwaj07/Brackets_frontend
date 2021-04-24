import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  username:string;
  isTyping:boolean = false;
  messageArray: Array<any> = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  classList:any[];
  message = new FormControl('hiii');
  currentRoomDetails:any;
  constructor(private _classService:ClassService,private _discussion:DiscussionService) {
    this._discussion.newMessageReceived().subscribe(data =>{
      console.log(data);
      this.messageArray.push(data);
      this.isTyping = false;
    });
    this._discussion.receivedTyping().subscribe(bool =>{
      console.log(bool)
      this.isTyping = bool.isTyping;
    })
  }

  ngOnInit(): void {
    this.username = this.currentUser.name;
    this._classService.getStudentsClass(this.currentUser._id).subscribe(data =>{
      console.log(data);
      this.classList = data;
    });
  }
  joinRoom(roomData){
    const data = {
      roomId:roomData._id,
      name:roomData.title,
      user:this.currentUser.name,
    };
    this.currentRoomDetails = data;
    this._discussion.joinRoom(data)
  }
  sendMessage() {
    const {roomId,name,user} = this.currentRoomDetails
    this._discussion.sendMessage({roomId:roomId,user,name,message:this.message.value});
    // this.webSocketService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().username, message: this.message});
    // this.message = '';
  }

  typing() {
    const {roomId,name,user} = this.currentRoomDetails;
    this._discussion.typing({roomId,name,user});
    // this.webSocketService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().username});
  }

}
