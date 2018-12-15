import React from 'react';

/**
 * Comment form component
 *
 */
const CommentForm = () => (
  <div className="row">
    <div className="input-field col s12">
      <textarea id="comment" className="materialize-textarea" disabled />
      <label htmlFor="comment">Add comment</label>
    </div>
  </div>
);

export default CommentForm;
