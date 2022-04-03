import React from 'react';

type IconUpProps = {
  className?: string,
}

const IconUp: React.FC<IconUpProps> = props => {
  return <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15L12 8L19 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>  
}

export default IconUp;