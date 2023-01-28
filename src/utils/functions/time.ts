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

//function to subtract days from a date
export const subtractDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// function to format a date to keep the date part
export const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

export const getDateForEpoch = (epoch, currentEpoch) => {
  if (epoch === 0) {
    return "N/A";
  }
  const date = new Date();
  const diff = currentEpoch - epoch;
  const newDate = subtractDays(date, diff);

  return formatDate(newDate);
};
