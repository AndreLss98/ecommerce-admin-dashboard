import { FormGroup } from '@angular/forms';

export function checkPasswords(form: FormGroup) {
    form.get('senha').value === form.get('confirmaSenha').value? null : form.get('confirmaSenha').setErrors({ notSame: true });
}