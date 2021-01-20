export const <%= underCase(name)%>_WINDOW_CONFIG = {
    id: '<%=dasherize(name)%>',
    title: '<%=capitalize(name)%>',
    customClasses: [''],
    width: 500
};

export const FORM = [
    {
        name: 'someFormItem',
        model: 'someFormItem',
        label: 'Form Item',
        type: 'text',
        renderAs: 'input',
        required: true,
    }
];

export const FORM_COLUMNS = [
    ["someFormItem"]
];
