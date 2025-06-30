import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloginformComponent } from './adminloginform.component';

describe('AdminloginformComponent', () => {
  let component: AdminloginformComponent;
  let fixture: ComponentFixture<AdminloginformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminloginformComponent]
    });
    fixture = TestBed.createComponent(AdminloginformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
