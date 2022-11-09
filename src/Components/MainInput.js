import React from 'react';
import { Input } from '@chakra-ui/react';
import { useSpeechContext } from '@speechly/react-client';

function MainInput() {
  const { segment } = useSpeechContext();

  // console.log(segment);

  return (
    <>
      <Input
        placeholder="Basic usage"
        textAlign="center"
        border="none"
        pt="1rem"
        isDisabled
        value={
          segment
            ? segment.words.map(word => word.value).join(' ')
            : 'Try saying something...'
        }
      />
    </>
  );
}

export default MainInput;
