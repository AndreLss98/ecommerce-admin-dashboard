import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLoadComponent } from './custom-load.component';

describe('CustomLoadComponent', () => {
  let component: CustomLoadComponent;
  let fixture: ComponentFixture<CustomLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
