import React from 'react';
import {Breadcrumbs, Link} from "@material-ui/core";

export default function SharedBreadcrumbs() {
  const here = window.location.href.split('/').slice(3);

  const parts = [{
    text: 'Home', 
    link: '/'
  }];

  for(let i = 0; i < here.length; i++ ) {
    const part = here[i];
    
    parts.push({
      text: part.charAt(0).toUpperCase() + part.slice(1),
      link: '/' + here.slice( 0, i + 1 ).join('/')
    });
  }
  
  return (
    <Breadcrumbs>
      {parts.map(bc => (
        <Link key={bc.text} color="inherit" href={bc.link}>
          {bc.text}
        </Link>
      ))}
    </Breadcrumbs>
  );
}