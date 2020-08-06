import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchReading } from "./readingsSlice";
import { ReadingsState } from "../../app/store";
import logo from '../../assets/logo.svg';
import error from '../../assets/error.svg';

type ReadingProps = {
  citation : string;
  version : string;
}

export const Reading = ({ citation, version } : ReadingProps) => {
  const text = useSelector((state : { readings : ReadingsState}) =>
    state.readings.texts[citation]
  );

  const status = text?.status || 'idle',
        previousCitation = text?.citation,
        previousVersion = text?.version,
        dispatch = useDispatch(),
        bibleReading = text?.reading;

  useEffect(() => {
    // make it reload when citation or version change
    if((citation && version) && (status === 'idle' || (status === 'succeeded' && (version !== previousVersion || citation !== previousCitation)))) {
      dispatch(fetchReading({ citation, version }))
    }
  }, [status, dispatch, citation, version, previousCitation, previousVersion])

  return (
    <React.Fragment>
      {/* Loading */}
      {status === 'loading' && <figure className='loading'>
        <img src={logo} className='floating' alt='Loading...'/>
        <figcaption>Loading {citation} ({version})</figcaption>
      </figure>}
      {/* Errors */}
      {status === 'failed' && <figure className='error'>
        <img src={error} className='error' alt='Error'/>
        <figcaption>Error Loading {citation} ({version})</figcaption>
      </figure>}
      {/* Data */}
      {status === 'succeeded' && <p>
        {bibleReading && bibleReading?.value && bibleReading.value.map((verse : any, index) =>
          verse.type ?  // then it's a Heading — 
          [<br key={index}/>, <br key={index * 2}/>] :
          <span key={index}>{processEntities(verse.text)}</span>
        )}
      </p>}
    </React.Fragment>
  )
}

const processEntities = (str : string) : string => {
  try {
    const e = document.createElement('textarea');
    e.innerHTML = str;
    // handle case of empty input
    return e.childNodes.length === 0 ? str : (e.childNodes[0].nodeValue || str);
  } catch(e) {
    console.warn(`(processEntities) error while processing "${str}": `, e);
    return str;
  }
}