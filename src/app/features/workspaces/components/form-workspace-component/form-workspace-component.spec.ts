import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkspaceComponent } from './form-workspace-component';

describe('FormWorkspaceComponent', () => {
  let component: FormWorkspaceComponent;
  let fixture: ComponentFixture<FormWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWorkspaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
