import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPages } from './layout-pages';

describe('LayoutPages', () => {
  let component: LayoutPages;
  let fixture: ComponentFixture<LayoutPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
