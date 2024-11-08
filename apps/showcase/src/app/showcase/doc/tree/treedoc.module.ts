import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CheckboxDoc } from './checkboxdoc';
import { ContextMenuDoc } from './contextmenudoc';
import { ControlledDoc } from './controlleddoc';
import { DragDropDoc } from './dragdropdoc';
import { EventDoc } from './eventdoc';
import { FilterDoc } from './filterdoc';
import { ImportDoc } from './importdoc';
import { LazyDoc } from './lazydoc';
import { MultipleDoc } from './multipledoc';
import { SingleDoc } from './singledoc';
import { TemplateDoc } from './templatedoc';
import { VirtualScrollDoc } from './virtualscrolldoc';
import { LazyVirtualScrollDoc } from './virtualscrolllazydoc';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TreeModule, ButtonModule, FormsModule, ToastModule, ContextMenuModule, ToggleSwitchModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ControlledDoc, SingleDoc, MultipleDoc, CheckboxDoc, EventDoc, LazyDoc, VirtualScrollDoc, LazyVirtualScrollDoc, TemplateDoc, DragDropDoc, ContextMenuDoc, FilterDoc, AccessibilityDoc]
})
export class TreeDocModule {}