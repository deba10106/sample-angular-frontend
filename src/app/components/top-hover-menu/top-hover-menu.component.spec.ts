import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHoverMenuComponent } from './top-hover-menu.component';

describe('TopHoverMenuComponent', () => {
  let component: TopHoverMenuComponent;
  let fixture: ComponentFixture<TopHoverMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopHoverMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHoverMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
