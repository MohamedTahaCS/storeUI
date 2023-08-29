import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStoreModalComponent } from './update-store-modal.component';

describe('UpdateStoreModalComponent', () => {
  let component: UpdateStoreModalComponent;
  let fixture: ComponentFixture<UpdateStoreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStoreModalComponent]
    });
    fixture = TestBed.createComponent(UpdateStoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
