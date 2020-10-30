import { HttpHeaders } from '@angular/common/http';

export const HTTP_OPTIONS = {
    headers: new HttpHeaders({'Content-Type': 'application/graphql'})
}

export const TIMEOUT_SIZE = 1000;