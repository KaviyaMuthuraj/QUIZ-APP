import Model,{attr} from '@ember-data/model';

export default class UserDetailsModel extends Model {
  @attr('string') userName;
  @attr('string') category;
  @attr('number') score;
}
