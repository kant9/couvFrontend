import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosSerreComponent } from './infos-serre.component';

describe('InfosSerreComponent', () => {
  let component: InfosSerreComponent;
  let fixture: ComponentFixture<InfosSerreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosSerreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosSerreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
