import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBibleVersion, selectBibleVersion } from './bibleVersionSlice';

const BIBLE_VERSIONS = ['NRSV', 'CEB', 'ESV', 'KJV'] as const;
type Version = typeof BIBLE_VERSIONS[number];

export const BibleVersionPicker = () => {
  const dispatch = useDispatch(),
        bibleVersion = useSelector(selectBibleVersion);

  return (
    <label htmlFor="bibleVersion">
      Bible Version
      <select
        id="bibleVersion"
        name="bibleVersion"
        value={bibleVersion}
        onChange={e => dispatch(setBibleVersion(e.target.value))}
      >
        {BIBLE_VERSIONS.map(version =>
          <option key={version} value={version}>{version}</option>
        )}
      </select>
    </label>
  )
}