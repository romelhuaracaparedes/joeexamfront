import { ModelResponse } from './model-response';
import { Category } from './category';
export class CategoryResponse extends ModelResponse {
    data!: Array<Category>;
}
