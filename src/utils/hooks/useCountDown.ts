//@ts-nocheck
import moment from "moment";
import { useEffect, useState } from "react";
const initialCountdownTimer = {
  days: "0",
  hours: "0",
  mins: "0",
  secs: "0",
};

const finalDate = moment.utc("04 31 2022 07:00 pm", "MM-DD-YYYY hh:mm A");

const useCountDown = (
  unixEndDate: number,
  strigUtcDate: string = null,
  onlyOnce: boolean = false
) => {
  const [initialCountdownSettings, setInitialCountdownSettings] = useState({
    dateValue: "",
    timeValue: "",
    ampmValue: "am",
    unixEndDate: Number(finalDate.format("X")),
  });

  useEffect(() => {
    if (unixEndDate) {
      setInitialCountdownSettings((state) => {
        return { ...state, unixEndDate: unixEndDate };
      });
    } else {
      if (strigUtcDate) {
        setInitialCountdownSettings((state) => {
          return {
            ...state,
            unixEndDate: Number(
              moment.utc(strigUtcDate, "MM-DD-YYYY hh:mm A").format("X")
            ),
          };
        });
      }
    }
  }, [unixEndDate, strigUtcDate]);

  const [countdownTimer, setCountdownTimer] = useState({
    ...initialCountdownTimer,
  });

  useEffect(() => {
    if (!onlyOnce) {
      let timer = null;

      if (initialCountdownSettings.unixEndDate) {
        timer = setInterval(
          () => playTimer(initialCountdownSettings.unixEndDate, timer),
          1000
        );
      }

      return () => {
        clearInterval(timer);
        timer = null;
      };
    } else {
      if (initialCountdownSettings.unixEndDate) {
        playTimer(initialCountdownSettings.unixEndDate, null);
      }
    }
  }, [initialCountdownSettings.unixEndDate, onlyOnce]);

  const playTimer = (currentUnixEndDate, timer) => {
    const distance = currentUnixEndDate - moment().format("X");

    if (distance > 0) {
      setCountdownTimer((prevCountdownTimer) => {
        return {
          ...prevCountdownTimer,
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt((distance % (60 * 60 * 24)) / (60 * 60), 10),
          mins: parseInt((distance % (60 * 60)) / 60, 10),
          secs: parseInt(distance % 60, 10),
        };
      });
    } else {
      clearInterval(timer);
    }
  };

  //   const { days, hours, mins, secs } = countdownTimer;

  return [countdownTimer];
};

export default useCountDown;
