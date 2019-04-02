import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChannelComponent } from './detail-channel.component';

describe('ViewChannelComponent', () => {
  let component: DetailChannelComponent;
  let fixture: ComponentFixture<DetailChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
