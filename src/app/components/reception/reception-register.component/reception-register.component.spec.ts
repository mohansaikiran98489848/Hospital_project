import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionRegisterComponent } from './reception-register.component';

describe('ReceptionRegisterComponent', () => {
  let component: ReceptionRegisterComponent;
  let fixture: ComponentFixture<ReceptionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
