/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieReviewComponent } from './edit-movie-review.component';

describe('EditMovieReviewComponent', () => {
  let component: EditMovieReviewComponent;
  let fixture: ComponentFixture<EditMovieReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMovieReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
