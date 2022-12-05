export const getFeeBasedInEpoch = (epoch) => {
  if (epoch === undefined || epoch === null) {
    return null;
  }
  let fee = 0;
  if (epoch <= 1) {
    fee = 3;
  } else if (epoch > 1 && epoch <= 3) {
    fee = 2;
  } else if (epoch > 3 && epoch <= 19) {
    fee = 1;
  } else {
    fee = 0;
  }

  return fee;
};

export const getBigerTime = (days, hours, min, secs) => {
  if (days !== 0) {
    return days + " days";
  } else {
    if (hours !== 0) {
      return hours + " hours";
    } else {
      if (min !== 0) {
        return min + " minutes";
      } else {
        return secs + " seconds";
      }
    }
  }
};

export const transfromTime = (sec) => {
  let secs = sec;
  if (!sec) {
    secs = 0;
  }
  const min = Math.floor(secs / 60);
  const hours = Math.floor(secs / 60 / 60);
  const days = Math.floor(secs / 60 / 60 / 24);
  return {
    secs,
    min,
    hours,
    days,
  };
};
