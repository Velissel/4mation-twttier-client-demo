import React, { useEffect } from 'react';
import qs from 'query-string';

export default (props) => {
  useEffect(() => {
    console.log(props, qs.parse(props.location.search));
  }, []);
  return null;
}