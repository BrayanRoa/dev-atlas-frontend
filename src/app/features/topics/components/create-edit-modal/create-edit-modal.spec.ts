import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditModal } from './create-edit-modal';

describe('CreateEditModal', () => {
  let component: CreateEditModal;
  let fixture: ComponentFixture<CreateEditModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
