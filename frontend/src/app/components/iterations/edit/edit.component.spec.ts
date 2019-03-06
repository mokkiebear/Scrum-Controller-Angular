import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIterationComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditIterationComponent;
  let fixture: ComponentFixture<EditIterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
