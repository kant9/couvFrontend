import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarDComponent } from './side-bar-d.component';

describe('SideBarDComponent', () => {
  let component: SideBarDComponent;
  let fixture: ComponentFixture<SideBarDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
