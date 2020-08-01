import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonlistComponent } from './comparisonlist.component';

describe('ComparisonlistComponent', () => {
  let component: ComparisonlistComponent;
  let fixture: ComponentFixture<ComparisonlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
