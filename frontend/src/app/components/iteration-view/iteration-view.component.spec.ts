import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationViewComponent } from './iteration-view.component';

describe('IterationViewComponent', () => {
  let component: IterationViewComponent;
  let fixture: ComponentFixture<IterationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
