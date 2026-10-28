import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTagComponent } from './create-edit-tag-component';

describe('CreateEditTagComponent', () => {
  let component: CreateEditTagComponent;
  let fixture: ComponentFixture<CreateEditTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
