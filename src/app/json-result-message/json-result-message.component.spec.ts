import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonResultMessageComponent } from './json-result-message.component';

describe('JsonResultMessageComponent', () => {
  let component: JsonResultMessageComponent;
  let fixture: ComponentFixture<JsonResultMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonResultMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonResultMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
