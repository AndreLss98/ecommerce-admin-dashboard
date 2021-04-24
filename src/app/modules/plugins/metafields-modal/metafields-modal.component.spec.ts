import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetafieldsModalComponent } from './metafields-modal.component';

describe('MetafieldsModalComponent', () => {
  let component: MetafieldsModalComponent;
  let fixture: ComponentFixture<MetafieldsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetafieldsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetafieldsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
