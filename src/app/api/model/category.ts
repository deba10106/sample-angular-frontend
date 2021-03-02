
import { Facet } from 'src/app/api/models';

export class Category {
  id?: string;
  name?: string;
  count?: number;
  parents?: Array<string>;
  facets?:Array<Facet>;
  value?: string;

  imgpath?: string;


  constructor() {}

}
