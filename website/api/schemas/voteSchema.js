import { schema } from 'normalizr';

import talkSchema from 'website/api/schemas/talkSchema';
import userSchema from 'website/api/schemas/userSchema';

export default new schema.Entity('vote', {
  data: {
    talk: talkSchema,
    user: userSchema,
  },
});
