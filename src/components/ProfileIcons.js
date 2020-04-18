import React from "react";
import { Link } from "react-router-dom";

const ProfileIcons = (props) => {

  let authorId = props.authorId;
  let articleId = props.articleId;
  let userId = props.userId;

  const renderEditDelete = () => {

    if( authorId === userId ) {
      return(
        <i className="large ellipsis vertical icon"><div className="menu-content">
          <div className="editDelete-button">
            <Link className="editD" to={`/articles/edit/${articleId}`}>
              Edit
            </Link>
            <Link className="deleteD" to={`/articles/delete/${articleId}`}>
              Delete
            </Link>
          </div>
        </div></i>          
      );
    }
  }

  return(
    <div className="authorD-comm">
      <Link to="#"><i className="large facebook f icon"></i></Link>
      <Link to="#"><i className="large twitter icon"></i></Link>
      <Link to="#"><i className="large linkedin icon"></i></Link>
      <i className="large bookmark outline icon"></i>
      {renderEditDelete()}
    </div>
  );

}


export default ProfileIcons;