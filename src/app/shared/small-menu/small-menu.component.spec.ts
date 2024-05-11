import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMenuComponent } from './small-menu.component';

describe('SmallMenuComponent', () => {
  let component: SmallMenuComponent;
  let fixture: ComponentFixture<SmallMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
