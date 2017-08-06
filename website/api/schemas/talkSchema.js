import { schema } from 'normalizr';

import commentSchema from 'website/api/schemas/commentSchema';

export default new schema.Entity('talk', {
  data: {
    comments: [commentSchema],
  },
});
