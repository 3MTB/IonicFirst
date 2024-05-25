import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCharacterPage } from './detail-character.page';

describe('DetailCharacterPage', () => {
  let component: DetailCharacterPage;
  let fixture: ComponentFixture<DetailCharacterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
