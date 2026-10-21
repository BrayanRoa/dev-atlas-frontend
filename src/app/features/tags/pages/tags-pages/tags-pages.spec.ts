import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPages } from './tags-pages';

describe('TagsPages', () => {
  let component: TagsPages;
  let fixture: ComponentFixture<TagsPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
