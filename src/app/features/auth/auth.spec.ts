import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPages } from './auth';

describe('Auth', () => {
  let component: AuthPages;
  let fixture: ComponentFixture<AuthPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
