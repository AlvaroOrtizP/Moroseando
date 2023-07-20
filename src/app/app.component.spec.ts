import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display "Moroseando" message on the page', () => {
    const moroseandoMessage = fixture.debugElement.query(By.css('h2.text-center')).nativeElement;
    expect(moroseandoMessage.textContent.trim()).toBe('Moroseando');
  });

  // Aquí puedes agregar más pruebas para el componente "app"
});
