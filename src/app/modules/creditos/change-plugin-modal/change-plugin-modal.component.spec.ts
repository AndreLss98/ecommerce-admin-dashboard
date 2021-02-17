import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePluginModalComponent } from './change-plugin-modal.component';

describe('ChangePluginModalComponent', () => {
  let component: ChangePluginModalComponent;
  let fixture: ComponentFixture<ChangePluginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePluginModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePluginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
