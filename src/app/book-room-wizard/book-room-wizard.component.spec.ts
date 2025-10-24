import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRoomWizardComponent } from './book-room-wizard.component';

describe('BookRoomWizardComponent', () => {
  let component: BookRoomWizardComponent;
  let fixture: ComponentFixture<BookRoomWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRoomWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRoomWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
