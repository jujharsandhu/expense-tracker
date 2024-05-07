import * as _ from 'lodash'

export const validation = (original, newForm) => {
  return _.isEqual(original, newForm)
}
