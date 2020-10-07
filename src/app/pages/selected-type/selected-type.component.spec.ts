import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTypeComponent } from './selected-type.component';

describe('SelectedTypeComponent', () => {
  let component: SelectedTypeComponent;
  let fixture: ComponentFixture<SelectedTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
