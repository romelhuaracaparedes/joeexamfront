import { ModelResponse } from './model-response';
import { Product } from './product';
export class ProductResponse extends ModelResponse{
    data!: Array<Product>;
}
