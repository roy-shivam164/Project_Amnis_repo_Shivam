import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryResultDialogComponent } from './query-result-dialog.component';

describe('QueryResultDialogComponent', () => {
  let component: QueryResultDialogComponent;
  let fixture: ComponentFixture<QueryResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryResultDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
