import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss'],
  animations: [fadeAnimation]
})
export class MovieReviewComponent {
  public reviewSorting = new FormControl('populair');
  public reviewInput = new FormControl('')
  public reviewText = 'Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales.'
  public createReview = false;
  public showEntireReview = false;

  public createReviewFn(): void {
    this.createReview = true;
  }

  public closeCreateReview(): void {
    this.createReview = false;
  }
}
