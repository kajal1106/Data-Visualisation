import React from 'react';
import './PageContent.scss';


const PageContent : React.FC = props => {
  return (
    <div className="PageContent">
      <div className="PageContentInner">
        { props.children }
      </div>
  </div>
  );
}

export default PageContent;