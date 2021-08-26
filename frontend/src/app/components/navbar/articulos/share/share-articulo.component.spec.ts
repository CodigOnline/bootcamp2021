import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareArticuloComponent } from './share-articulo.component';

describe('ShareComponent', () => {
  let component: ShareArticuloComponent;
  let fixture: ComponentFixture<ShareArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
