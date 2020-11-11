import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleFormComponent } from './bundle-form.component';

describe('BundleFormComponent', () => {
  let component: BundleFormComponent;
  let fixture: ComponentFixture<BundleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
