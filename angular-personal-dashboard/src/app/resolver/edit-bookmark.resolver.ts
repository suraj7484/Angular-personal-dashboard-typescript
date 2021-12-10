import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Injectable({
  providedIn: 'root',
})
export class BookmarkResolver implements Resolve<any> {
  bookmark = Bookmark;

  constructor(private bookmarkService: BookmarkService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.bookmarkService.getBookmark(String(route.paramMap.get('id')));
  }
}
