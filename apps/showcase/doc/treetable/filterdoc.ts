import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'filter-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                The <i>filterMode</i> specifies the filtering strategy, in <i>lenient</i> mode when the query matches a node, children of the node are not searched further as all descendants of the node are included. On the other hand, in
                <i>strict</i> mode when the query matches a node, filtering continues on all descendants. A general filled called <i>filterGlobal</i> is also provided to search all columns that support filtering.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-center mb-6">
                <p-selectbutton [options]="filterModes" [(ngModel)]="filterMode" optionLabel="label" optionValue="value" />
            </div>
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable #tt [value]="files" [columns]="cols" [filterMode]="filterMode" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #caption>
                        <div class="flex justify-end items-center">
                            <p-iconfield>
                                <p-inputicon class="pi pi-search" />
                                <input type="text" pInputText placeholder="Global Search" (input)="tt.filterGlobal($event.target.value, 'contains')" />
                            </p-iconfield>
                        </div>
                    </ng-template>
                    <ng-template #header let-columns>
                        <tr>
                            <th *ngFor="let col of cols">
                                {{ col.header }}
                            </th>
                        </tr>
                        <tr>
                            <th *ngFor="let col of cols">
                                <input pInputText [placeholder]="'Filter by ' + col.field" type="text" (input)="tt.filter($event.target.value, col.field, col.filterMatchMode)" />
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData">
                        <tr [ttRow]="rowNode">
                            <td *ngFor="let col of cols; let i = index">
                                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #emptymessage>
                        <tr>
                            <td [attr.colspan]="cols?.length">No data found.</td>
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-filter-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterDoc {
    filterMode = 'lenient';

    filterModes = [
        { label: 'Lenient', value: 'lenient' },
        { label: 'Strict', value: 'strict' }
    ];

    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    code: Code = {
        basic: `<p-selectbutton [options]="filterModes" [(ngModel)]="filterMode" optionLabel="label" optionValue="value" />

<p-treetable #tt [value]="files" [columns]="cols" [filterMode]="filterMode" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption>
        <div class="flex justify-end items-center">
            <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input type="text" pInputText placeholder="Global Search" (input)="tt.filterGlobal($event.target.value, 'contains')" />
            </p-iconfield>
        </div>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of cols">
                {{ col.header }}
            </th>
        </tr>
        <tr>
            <th *ngFor="let col of cols">
                <input pInputText [placeholder]="'Filter by ' + col.field" type="text" (input)="tt.filter($event.target.value, col.field, col.filterMatchMode)" />
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of cols; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td [attr.colspan]="cols?.length">No data found.</td>
        </tr>
    </ng-template>
</p-treetable>`,

        html: `<div class="card">
    <div class="flex justify-center mb-6">
        <p-selectbutton [options]="filterModes" [(ngModel)]="filterMode" optionLabel="label" optionValue="value" />
    </div>
     <p-treetable #tt [value]="files" [columns]="cols" [filterMode]="filterMode" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #caption>
            <div class="flex justify-end items-center">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input type="text" pInputText placeholder="Global Search" (input)="tt.filterGlobal($event.target.value, 'contains')" />
                </p-iconfield>
            </div>
        </ng-template>
        <ng-template #header let-columns>
            <tr>
                <th *ngFor="let col of cols">
                    {{ col.header }}
                </th>
            </tr>
            <tr>
                <th *ngFor="let col of cols">
                    <input pInputText [placeholder]="'Filter by ' + col.field" type="text" (input)="tt.filter($event.target.value, col.field, col.filterMatchMode)" />
                </th>
            </tr>
        </ng-template>
        <ng-template #body let-rowNode let-rowData="rowData">
            <tr [ttRow]="rowNode">
                <td *ngFor="let col of cols; let i = index">
                    <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
        <ng-template #emptymessage>
            <tr>
                <td [attr.colspan]="cols?.length">No data found.</td>
            </tr>
        </ng-template>
    </p-treetable>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-filter-demo',
    templateUrl: './tree-table-filter-demo.html',
    standalone: true,
    imports: [TreeTableModule, SelectButton, FormsModule, InputTextModule, CommonModule, IconFieldModule, InputIconModule],
    providers: [NodeService]
})
export class TreeTableFilterDemo implements OnInit{
    filterMode = 'lenient';

    filterModes = [
        { label: 'Lenient', value: 'lenient' },
        { label: 'Strict', value: 'strict' }
    ];

    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}`,

        service: ['NodeService']
    };
}
