import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Likes } from '../_services/likes';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { MemberCard } from "../members/member-card/member-card";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  imports: [ButtonsModule, FormsModule, MemberCard, PaginationModule],
  templateUrl: './lists.html',
  styleUrl: './lists.css'
})
export class Lists implements OnInit, OnDestroy {

  likesService = inject(Likes);

  private cdr = inject(ChangeDetectorRef);
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadLikes();
  }
  
  getTitle() {
    switch (this.predicate) {
      case 'liked': return 'Members you like';
      case 'likedBy': return 'Members who like you';
      default: return 'Mutual'

    }
  }


  loadLikes() {
    this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize);
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }

  ngOnDestroy(): void {
    this.likesService.paginatedResult.set(null);
  }
  
  
}
