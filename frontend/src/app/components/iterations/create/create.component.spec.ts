import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIterationComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateIterationComponent;
  let fixture: ComponentFixture<CreateIterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
