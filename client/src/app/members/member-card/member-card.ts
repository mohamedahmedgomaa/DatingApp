import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { Likes } from '../../_services/likes';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css'
})
export class MemberCard {
  private likeService = inject(Likes);

  member = input.required<Member>();

  hasLiked = computed(() => this.likeService.likeIds().includes(this.member().id));

  toggleLike() {
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if(this.hasLiked()) {
          this.likeService.likeIds.update(ids => ids.filter(x => x !== this.member().id))
        } else {
          this.likeService.likeIds.update(ids => [...ids, this.member().id])
        }
      }
    });
  }
}
