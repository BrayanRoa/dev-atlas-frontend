import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicEmpty } from './topic-empty';

describe('TopicEmpty', () => {
  let component: TopicEmpty;
  let fixture: ComponentFixture<TopicEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicEmpty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicEmpty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
