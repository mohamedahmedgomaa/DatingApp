import { Component, input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [ReactiveFormsModule, BsDatepickerModule, NgIf],
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css']
})
export class DatePicker implements ControlValueAccessor, OnInit {
  label = input<string>('Date');
  maxDate = input<Date>();
  bsConfig: Partial<BsDatepickerConfig> = {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // تأجيل الإعداد لتفادي خطأ الأنيميشن
    setTimeout(() => {
      this.bsConfig = {
        containerClass: 'theme-default',
        dateInputFormat: 'DD MMMM YYYY',
        isAnimated: true,
      };
    });
  }

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}