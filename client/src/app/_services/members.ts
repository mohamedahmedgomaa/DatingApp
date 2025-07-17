import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';
import { userParams } from '../_models/userParams';
import { of } from 'rxjs';
import { Account } from './account';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class Members {
  private http = inject(HttpClient);
  private accountService = inject(Account);
  baseUrl = environment.apiUrl;
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  memberCache = new Map();
  user = this.accountService.currentUser();
  userPrams = signal<userParams>(new userParams(this.user));

  resetUserParams() {
    this.userPrams.set(new userParams(this.user));
  }

  getMembers() {
    const currentParams = this.userPrams(); // استخدم القيمة الفعلية للإشارة هنا
    const cacheKey = Object.values(currentParams).join('-');
    const cachedResponse = this.memberCache.get(cacheKey);

    if (cachedResponse) {
      setPaginatedResponse(cachedResponse, this.paginatedResult);
      return; // وقف هنا لو فيه كاش
    }

    let params = setPaginationHeaders(currentParams.pageNumber, currentParams.pageSize);
    params = params.append('minAge', currentParams.minAge);
    params = params.append('maxAge', currentParams.maxAge);
    params = params.append('gender', currentParams.gender);
    params = params.append('orderBy', currentParams.orderBy);

    return this.http.get<Member[]>(this.baseUrl + 'users', { observe: 'response', params }).subscribe({
      next: response => {
        setPaginatedResponse(response, this.paginatedResult);
        this.memberCache.set(cacheKey, response);
      }
    });
  }

  getMember(username: string) {
    const member: Member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((m: Member) => m.username === username);

    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => m.username === member.username ? member : m))
      // })
    );
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if (m.photos.includes(photo)) {
      //       m.photoUrl = photo.url
      //     }
      //     return m;
      //   }))
      // })
    );
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if (m.photos.includes(photo)) {
      //       m.photos = m.photos.filter(x => x.id !== photo.id)
      //     }
      //     return m;
      //   }))
      // })
    );
  }
}
