'use strict';
const fs = require('fs');
const delay = require('delay');
const aperture = require('.');

async function main() {
  const recorder = aperture();
  console.log('Screens:', await aperture.screens());
  console.log('Audio devices:', await aperture.audioDevices());
  console.log('Preparing to record for 5 seconds');
  await recorder.startRecording({
    fps : 30,
    cropArea : {
	x : 30,
        y : 30,
        width : 500,
        height : 500
    },
    showCursor : true,
    highlightClicks : false,
    screenId : 0,
    audioDeviceId : undefined,
    videoCodec : undefined
  });
  console.log('Recording started');
  await delay(5000);
  const fp = await recorder.stopRecording();
  await delay(5000);
  fs.renameSync(fp, 'recording.mp4');
  console.log('Video saved in the current directory');
}

main().catch(console.error);

// Run: $ node example.js
