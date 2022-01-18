import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const dateFormat = (d) => {
  const date = new Date(d);
  return `${date.getDate()}-${
    date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${
    date.getFullYear()} at ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

const PostContent = ({
  postId, postText, postImg, postEdit, postTime, changeTime,
}) => (
  <Link to={`/article/${postId}`} className="post-content">
    { postImg && (
      <p className="post-img">
        <img src={postImg} alt="post" />
      </p>
    )}

    <p className="post-text">{postText}</p>

    <div className="post-footer-time">
      {postEdit && (
        <p className="post-edit" title={dateFormat(changeTime)}>
          edited,
          {' '}
        </p>
      )}

      <p className="post-time">
        {dateFormat(postTime)}
      </p>
    </div>
  </Link>
);

PostContent.propTypes = {
  postId: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired,
  postImg: PropTypes.string,
  postEdit: PropTypes.bool,
  changeTime: PropTypes.string,
  postTime: PropTypes.string.isRequired,
};

PostContent.defaultProps = {
  postImg: null,
  postEdit: 0,
  changeTime: null,
};

export default PostContent;