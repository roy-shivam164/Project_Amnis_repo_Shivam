import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHistoryComponent } from './query-history.component';

describe('QueryHistoryComponent', () => {
  let component: QueryHistoryComponent;
  let fixture: ComponentFixture<QueryHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
