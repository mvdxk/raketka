import {useEffect, useState} from "react";
import {ResponsiveLine} from '@nivo/line'
import Tamaev from "./Tamaev";

const initialDataState = {
    "id": "RAKETKAAAAA",
    "data": [
        {
            "x": 0,
            "y": 0
        }
    ]
}

const Raketka = ({money, setMoney}: {money: number, setMoney: Function}) => {
    const [isOn, setIsOn] = useState<boolean>(false);
    const [dataState, setDataState] = useState(initialDataState);
    const [betMoney, setBetMoney] = useState<number>(5000);
    const [counter, setCounter] = useState<number>(0);

    const [userStopped, setUserStopped] = useState<boolean>(false);
    const [userX, setUserX] = useState<number>(0);
    const [gameEnded, setGameEnded] = useState<boolean>(false);

    function getRandomNumber() {
        return Math.round(Math.random() * (10))
    }

    let forTimeout: any = null
    let isOnTimeout: any = null
    let num: any = null

    const bet = () => {
        if(!betMoney) {
            return alert('Сделайте Вашу ставку!')
        }

        if(betMoney > money) {
            return alert('Мало денег на балансе')
        }

        if(betMoney < 5000) {
            return alert('Блять от 5к ставка, мне бугате покупать')
        }

        setIsOn(true)

        num = getRandomNumber()
        console.log('RandomNumber: ', num)

        for (let i = 0; i < num; i++) {
            (() => {
                forTimeout = setTimeout(() => {
                    setCounter(prevState => prevState + 1)
                }, 500 * i);
            })()
        }

        isOnTimeout = setTimeout(() => {
            setGameEnded(true)
        }, 500 * num+1)
    }

    const stop = () => {
        setUserX(counter)
        setUserStopped(true)
    }

    const finalData = () => {
        setIsOn(false)

        clearTimeout(forTimeout)
        clearTimeout(isOnTimeout)
        setGameEnded(false)

        num = null

        setCounter(0)
        setDataState(initialDataState)

        setUserX(0)
        setUserStopped(false)
    }

    useEffect(() => {
        if(!isOn) {
            return
        }

        const newData = {
            ...dataState,
            data: [...dataState.data, {
                "x": counter,
                "y": counter
            }]
        }

        setDataState(newData)
    }, [counter]);

    useEffect(() => {
        if(!gameEnded) {
            return
        }

        let win: boolean = false
        const profit = betMoney*userX

        if(userStopped && userX < counter) {
            win = true
        }

        if(win) {
            setMoney((prevState: number) => prevState + profit)
            alert(`Победа!\nПрибыль: ${profit}`)
        } else {
            setMoney((prevState: number) => prevState - betMoney)
            alert('Ракетка имба, я делаю 100к в день')
        }

        finalData()
    }, [gameEnded])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    margin: '0 auto'
                }}
            >

                <MyResponsiveLine data={[dataState]} userX={userX} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5
                    }}
                >
                    <button
                        onClick={() => isOn ? stop() : bet()}
                        className={"hover"}
                        style={{
                            background: isOn ? 'green' : 'blue',
                            padding: 10,
                            fontWeight: 'bold'
                        }}
                        disabled={userStopped}
                    >
                        {isOn ? `Вывести x${counter}` : 'Поставить'}
                    </button>

                    <input type="number" value={betMoney} onChange={e => setBetMoney(+e.target.value)} />

                    {isOn && <Tamaev/>}
                </div>
            </div>
        </div>
    )
}

const MyResponsiveLine = ({ data, userX }: {data: any, userX: number}) => {
    return (
        <div style={{width: 1000, height: 700}}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
                xScale={{ type: 'linear', max: 10 }}
                yScale={{ type: 'linear', stacked: true, min: 0, max: 10 }}
                yFormat=" >-.2f"
                curve="monotoneX"
                enablePointLabel={true}
                pointLabel={d => d.y === userX && userX !== 0 ? `Ваша ставка: x${d.y}` : `x${d.y}`}
                enableGridX={false}
                colors={{ scheme: 'category10' }}
                lineWidth={2}
                pointSize={4}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
            />
        </div>
    )
}

export default Raketka
