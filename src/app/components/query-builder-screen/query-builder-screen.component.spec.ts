import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBuilderScreenComponent } from './query-builder-screen.component';

describe('QueryBuilderScreenComponent', () => {
  let component: QueryBuilderScreenComponent;
  let fixture: ComponentFixture<QueryBuilderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryBuilderScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryBuilderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
