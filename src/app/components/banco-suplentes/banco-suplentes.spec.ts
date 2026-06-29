import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoSuplentes } from './banco-suplentes';

describe('BancoSuplentes', () => {
  let component: BancoSuplentes;
  let fixture: ComponentFixture<BancoSuplentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoSuplentes],
    }).compileComponents();

    fixture = TestBed.createComponent(BancoSuplentes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
