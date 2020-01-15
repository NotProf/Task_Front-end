import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResistrationComponent } from './resistration.component';

describe('ResistrationComponent', () => {
  let component: ResistrationComponent;
  let fixture: ComponentFixture<ResistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
