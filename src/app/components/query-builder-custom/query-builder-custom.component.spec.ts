import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBuilderCustomComponent } from './query-builder-custom.component';

describe('QueryBuilderCustomComponent', () => {
  let component: QueryBuilderCustomComponent;
  let fixture: ComponentFixture<QueryBuilderCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryBuilderCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryBuilderCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
