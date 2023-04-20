import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosCouvComponent } from './infos-couv.component';

describe('InfosCouvComponent', () => {
  let component: InfosCouvComponent;
  let fixture: ComponentFixture<InfosCouvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosCouvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosCouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
