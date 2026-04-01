export function getSecondsFromMinutes(time: string): number {
  const regex = /^(0[0-9]|[1-5][0-9]):([0-5][0-9])$/;

  if (!regex.test(time)) {
    throw new TypeError(`The 'time' argument must be in format: mm:ss`);
  }

  const totalTime = time.split(':');

  const minutes = Number(totalTime[0]);
  const seconds = Number(totalTime[1]);

  return minutes * 60 + seconds;
}
