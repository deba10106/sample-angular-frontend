import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishMeatComponent } from './fish-meat.component';

describe('FishMeatComponent', () => {
  let component: FishMeatComponent;
  let fixture: ComponentFixture<FishMeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishMeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishMeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
