import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtopicsMenu } from './subtopics-menu';

describe('SubtopicsMenu', () => {
  let component: SubtopicsMenu;
  let fixture: ComponentFixture<SubtopicsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtopicsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtopicsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
