import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeptComponent } from './create-dept.component';

describe('CreateDeptComponent', () => {
  let component: CreateDeptComponent;
  let fixture: ComponentFixture<CreateDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
