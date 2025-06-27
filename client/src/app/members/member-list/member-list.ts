import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { Member } from '../../_models/member';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit {
  memberService = inject(Members);
  
  ngOnInit(): void {
    if(this.memberService.members().length === 0) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers();
  }
}
