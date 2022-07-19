import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseObjectComponent } from './warehouse-object.component';

describe('WarehouseObjectComponent', () => {
  let component: WarehouseObjectComponent;
  let fixture: ComponentFixture<WarehouseObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
