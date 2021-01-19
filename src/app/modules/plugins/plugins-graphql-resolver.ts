import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { GraphqlService } from 'src/app/shared/services/graphql.service';

@Injectable({
  providedIn: 'root'
})
export class PluginsGraphqlResolver implements Resolve<any> {

  constructor(private graphQLService: GraphqlService) { }

  resolve() {
    return this.graphQLService.getInfo(`{
      products {
        Title, Version, ProductID
      }
    }`);
  }
}
