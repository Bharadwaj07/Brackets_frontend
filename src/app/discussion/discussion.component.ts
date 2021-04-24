import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  isTyping: boolean = false;
  messageArray: any[] = [];
  classList: any[];
  sendForm: FormGroup;
  currentRoomDetails: any;
  constructor(private _classService: ClassService, private _discussion: DiscussionService, private fb: FormBuilder) {
    this._discussion.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      let messageContainer = document.querySelector('.messages-container');
      messageContainer.scrollTop = messageContainer.scrollHeight
    });
    this.isTyping = false;
    this._discussion.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    })
  }

  ngOnInit(): void {
    this.username = this.currentUser.name;
    if (this.currentUser.userType == 'STUDENT') {
      this._classService.getStudentsClass(this.currentUser._id).subscribe(data => {
        this.classList = data;
      });
    } else {
      this._classService.getAllClass(this.currentUser._id).subscribe(data => {
        this.classList = data;
      })
    }
    this.sendForm = this.fb.group({
      message: ['']
    });

  }
  joinRoom(roomData) {
    const data = {
      roomId: roomData._id,
      name: roomData.title,
      user: this.currentUser.name,
    };
    this.currentRoomDetails = data;
    this._discussion.joinRoom(data)
    this._discussion.getRoomMessages(data.roomId).subscribe(data => {
      this.messageArray = data.messages
      let messageContainer = document.querySelector('.messages-container');
      messageContainer.scrollTop = messageContainer.scrollHeight
      // console.log(this.messageArray)
    })
  }
  sendMessage() {
    const { roomId, name, user } = this.currentRoomDetails
    this._discussion.sendMessage({ roomId: roomId, user, name, message: this.sendForm.value.message });
    // this.messageArray.push({})
    this.sendForm.patchValue({ message: '' })
    this.ngOnInit()
    // this.webSocketService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().username, message: this.message});
    // this.message = '';
  }

  typing() {
    const { roomId, name, user } = this.currentRoomDetails;
    this._discussion.typing({ roomId, name, user });
    // this.webSocketService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().username});
  }

}
