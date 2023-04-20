import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarGComponent } from './side-bar-g.component';

describe('SideBarGComponent', () => {
  let component: SideBarGComponent;
  let fixture: ComponentFixture<SideBarGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
