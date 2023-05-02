import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooleMapsComponent } from './goole-maps.component';

describe('GooleMapsComponent', () => {
  let component: GooleMapsComponent;
  let fixture: ComponentFixture<GooleMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooleMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GooleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
