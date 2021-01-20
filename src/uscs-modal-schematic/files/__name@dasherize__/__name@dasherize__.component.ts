import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, ViewRef} from '@angular/core';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ModalService} from '@spa-common/@components/modal/modal.service';
<% if (hasForm) { %>import {FormSubject} from '@spa-common/@formelements/utils/FormSubject';
import {FormService} from '@spa-common/@formelements/form.service';<% } %>
import {<% if (hasForm) { %>FORM, FORM_COLUMNS, <% } %><%= underCase(name) %>_WINDOW_CONFIG} from './config/<%=dasherize(name)%>.config';


@Component({
    selector: 'app-<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class <%= classify(name) %>Component implements OnInit, OnDestroy {
    private unsubscribe = new Subject<any>();
    private instance;
    private loading: boolean;

    public modalConfig = <%= underCase(name) %>_WINDOW_CONFIG;
    <% if (hasForm) { %> public form: FormSubject; <% } %>

    constructor(
        private cdr: ChangeDetectorRef,
        private modalSvc: ModalService,
        <% if (hasForm) { %>private $form: FormService,<% } %>
    ) {
    }

    ngOnInit() {
        <% if (hasForm) { %>this.createForm();<% } %>
        this.subscribeOnModalState();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public submit() {
    }

    public cancel() {
    }
    <% if (hasForm) { %>
    private createForm() {
        const formId = this.$form.create(this.modalConfig.id).id;
        this.form = this.$form.select(formId);
        this.form.generate(FORM, FORM_COLUMNS);
    }
    <% } %>
    private applyChanges() {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }

    private setLoadingState(state) {
        this.loading = state;
        this.applyChanges();
    }

    private subscribeOnModalState() {
        this.modalSvc.toggle$
            .pipe(
                filter(modal => modal.modalId === this.modalConfig.id),
                takeUntil(this.unsubscribe)
            )
            .subscribe(modal => {
                    if (modal.isOpen) {
                        this.instance = modal.data;
                    }
                }
            );
    }
}

