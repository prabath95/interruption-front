import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { SessionService } from '../utils/session.service';

@Directive({
  selector: '[appHasPermissions]',
})
export class HasPermissionsDirective implements OnInit {
  @Input('appHasPermissions')
  permissions: string | null = null;

  constructor(
    private sessionService: SessionService,
    private elementRef: ElementRef
  ) {}

  /**
   * if user does not have permission to the element the remove the element from the DOM
   */
  ngOnInit(): void {
    if (
      !this.permissions ||
      this.sessionService.getTokenData().userRole != this.permissions
    ) {
      this.elementRef.nativeElement.remove();
    }
  }
}
