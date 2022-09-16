import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const addVideoTimeToStorageThrottle = throttle(function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
}, 1000);

player.on('timeupdate', addVideoTimeToStorageThrottle);

const savedTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));
try {
  player.setCurrentTime(savedTime.seconds);
} catch {}
