import { useEffect, useState } from 'react'
import { usePoinsContract } from './useContract'

function isToday(data) {
    const date = data.toString();
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const d1 = new Date(`${year}/${month}/${day}`).getTime();
    const dd = new Date();
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1;
    const d = dd.getDate();
    const d2 = new Date(`${y}/${m}/${d}`).valueOf();
    const iday = parseInt((d2 - d1).toString()) / 1000 / 60 / 60 / 24; // eslint-disable
    return iday === 0;
}

function judgeLv(points) {
  let pointLv = 1;
  let nextLvPoints = 0;
  let pointLvNext = 500;
  if (points < 1000) {
    pointLv = 1;
    nextLvPoints = 100 - (1000 - points) / 1000 * 100;
    pointLvNext = 1000;
  } else if (points < 2500) {
    pointLv = 2;
    nextLvPoints = 100 - (2500 - points) / 2500 * 100;
    pointLvNext = 2500;
  } else if (points < 5000) {
    pointLv = 3;
    nextLvPoints = 100 - (5000 - points) / 5000 * 100;
    pointLvNext = 5000;
  } else if (points < 10000) {
    pointLv = 4;
    nextLvPoints = 100 - (10000 - points) / 10000 * 100;
    pointLvNext = 10000;
  } else if (points < 30000) {
    pointLv = 5;
    nextLvPoints = 100 - (30000 - points) / 30000 * 100;
    pointLvNext = 30000;
  } else if (points < 55000) {
    pointLv = 6;
    nextLvPoints = 100 - (55000 - points) / 55000 * 100;
    pointLvNext = 55000;
  } else if (points < 95000) {
    pointLv = 7;
    nextLvPoints = 100 - (95000 - points) / 95000 * 100;
    pointLvNext = 95000;
  } else if (points < 200000) {
    pointLv = 8;
    nextLvPoints = 100 - (200000 - points) / 200000 * 100;
    pointLvNext = 200000;
  } else if (points < 500000) {
    pointLv = 9;
    nextLvPoints = 100 - (500000 - points) / 500000 * 100;
    pointLvNext = 500000;
  } else if (points < 2500000) {
    pointLv = 10;
    nextLvPoints = 100 - (2500000 - points) / 2500000 * 100;
    pointLvNext = 2500000;
  }
  if (nextLvPoints === 0) {
    nextLvPoints = 1;
  }
  return {
    pointLv,
    nextLvPoints,
    pointLvNext
  }
}

const useGetPoinsData = (account:any) => {
  const [data, setData] = useState({})

  const poinsContract : any = usePoinsContract();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(poinsContract && account){
          const {
            signInDate, signInContinuous, swapDate, swapQuantity, swapContinuous, liquidityDate, liquidityWeekDay, liquidityQuantity, totalPoints, isUsed
          } = await poinsContract.userList(account).call();
          const userPoins = Number(totalPoints.toString());
          const {pointLv, nextLvPoints, pointLvNext} = judgeLv(userPoins);
          const recentCheckDate = signInDate.toString();
          const isSignIn = isToday(recentCheckDate);
          const signNum = signInContinuous.toString();
          let signReward = 0;
          if (signNum >= 3) {
            signReward = 200;
          } else {
            signReward = signNum === 2 ? 150 : 100
          }
          const poinsData = {
            userPoins,
            pointLv,
            nextLvPoints,
            pointLvNext,
            isSignIn,
            signReward
          };
          setData(poinsData)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [poinsContract, account])

  return data
}

export default useGetPoinsData
