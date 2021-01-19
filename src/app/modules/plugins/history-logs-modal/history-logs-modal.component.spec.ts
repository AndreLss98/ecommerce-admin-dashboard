import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLogsModalComponent } from './history-logs-modal.component';

describe('HistoryLogsModalComponent', () => {
  let component: HistoryLogsModalComponent;
  let fixture: ComponentFixture<HistoryLogsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryLogsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLogsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
