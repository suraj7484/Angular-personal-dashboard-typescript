import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
})
export class EditBookmarkComponent implements OnInit {

  bookmark: Bookmark

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.bookmark = data['data']
    })
  }

  onFormSubmit(form: NgForm) {
    const {name, url} = form.value
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url)
    })
    // this.router.navigateByUrl("/bookmarks");
    this.notificationService.show('Bookmark Updated!!!', 2000)
  }

  delete() {
    this.bookmarkService.deleteBookmark(this.bookmark.id)
    this.router.navigate(["../"], { relativeTo: this.route })
    this.notificationService.show('Bookmark Deleted!!!', 2000);
  }
}
