import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCategorieComponent } from './selected-categorie.component';

describe('SelectedCategorieComponent', () => {
  let component: SelectedCategorieComponent;
  let fixture: ComponentFixture<SelectedCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
