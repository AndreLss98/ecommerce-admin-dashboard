import { FormGroup } from '@angular/forms';

export function checkPasswords(form: FormGroup) {
    return form.get('senha').value === form.get('confirmaSenha').value? null : { notSame: true };
}