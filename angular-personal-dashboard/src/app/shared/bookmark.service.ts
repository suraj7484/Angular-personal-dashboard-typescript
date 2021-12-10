import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage').subscribe(
      (event: any) => {
        if (event.key == 'bookmarks') {
          this.loadState();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find((b) => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);

    this.saveState()
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);

    Object.assign(bookmark, updatedFields);

    this.saveState()
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex((b) => b.id === id);

    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);

    this.saveState()
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const Storage = localStorage.getItem('bookmarks');
      const bookmarksInStorage = JSON.parse(Storage || '[]', (key, value) => {
        if(key == 'url') return new URL(value)
        return value
      });

      this.bookmarks.length = 0; // clear the todos array (while keeping the reference)
      this.bookmarks.push(...bookmarksInStorage);
    } catch (error) {
      console.log(
        'This have an error with retriving the data from localStorage:('
      );
      console.log(error);
    }
  }
}
