import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterKanbanComponent } from './iter-kanban.component';

describe('IterKanbanComponent', () => {
  let component: IterKanbanComponent;
  let fixture: ComponentFixture<IterKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
