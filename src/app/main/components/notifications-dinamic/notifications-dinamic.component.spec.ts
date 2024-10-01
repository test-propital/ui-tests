import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDinamicComponent } from './notifications-dinamic.component';

describe('NotificationsDinamicComponent', () => {
  let component: NotificationsDinamicComponent;
  let fixture: ComponentFixture<NotificationsDinamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsDinamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
