import {useState} from "react";
import { Wheel as CustomRoulette } from 'react-custom-roulette'
import Tamaev from "./Tamaev";

function getRandomNumber() {
    return Math.round(Math.random() * (36))
}

function getColor(num: number) {
    return num === 0 ? 'green' : num%2 === 0 ? 'red' : 'black'
}

function getColorX(color: "black" | "red" | "green") {
    switch (color) {
        case "black":
        case "red":
            return 2
        case "green":
            return 14
    }
}

const Wheel = ({money, setMoney}: {money: number, setMoney: Function}) => {
    const ROULETTE_DATA = Array(36).fill("").map((_, idx) => ({
        option: idx.toString(),
        style: {
            backgroundColor: getColor(idx)
        }
    }))
    const [isOn, setIsOn] = useState<boolean>(false);
    const [betMoney, setBetMoney] = useState<number>(5000);
    const [betColor, setBetColor] = useState<"black" | "red" | "green">("red");
    const [prizeNumber, setPrizeNumber] = useState(0);

    const start = () => {
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
        setPrizeNumber(getRandomNumber())
    };

    function finish() {
        const color = getColor(prizeNumber)

        if(color === betColor) {
            const profit = betMoney * getColorX(color)
            setMoney((prevState: number) => prevState + profit)
            alert(`Победа!\nПрибыль: ${profit}`)
        } else {
            setMoney((prevState: number) => prevState - betMoney)
            alert('Ракетка имба, я делаю 100к в день')
        }

        setIsOn(false)
        setPrizeNumber(0)
    }

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
                    gap: 75,
                    margin: '100px auto'
                }}
            >
                <CustomRoulette
                    mustStartSpinning={isOn}
                    textColors={["white"]}
                    textDistance={90}
                    perpendicularText={true}
                    prizeNumber={prizeNumber}
                    data={ROULETTE_DATA}
                    onStopSpinning={finish}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: 10
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: 10
                            }}
                        >
                            <button
                                disabled={isOn}
                                onClick={() => setBetColor("red")}
                                className={"hover"}
                                style={{
                                    background: 'red',
                                    padding: 10,
                                    fontWeight: 'bold',
                                    marginRight: 5,
                                    border: betColor === "red" ? "5px solid blue" : "none"
                                }}
                            >
                                x2
                            </button>
                            <button
                                disabled={isOn}
                                onClick={() => setBetColor("black")}
                                className={"hover"}
                                style={{
                                    background: 'black',
                                    padding: 10,
                                    color: "white",
                                    fontWeight: 'bold',
                                    marginRight: 5,
                                    border: betColor === "black" ? "5px solid blue" : "none"
                                }}
                            >
                                x2
                            </button>
                            <button
                                disabled={isOn}
                                onClick={() => setBetColor("green")}
                                className={"hover"}
                                style={{
                                    background: 'green',
                                    padding: 10,
                                    fontWeight: 'bold',
                                    marginRight: 5,
                                    border: betColor === "green" ? "5px solid blue" : "none"
                                }}
                            >
                                x14
                            </button>
                        </div>
                        <button
                            disabled={isOn}
                            onClick={start}
                            className={"hover"}
                            style={{
                                background: 'white',
                                padding: 10,
                                fontWeight: 'bold',
                                marginRight: 5
                            }}
                        >
                            Крутить
                        </button>
                    </div>

                    <input disabled={isOn} type="number" value={betMoney} onChange={e => setBetMoney(+e.target.value)} />

                    {isOn && <Tamaev/>}
                </div>
            </div>
        </div>
    )
}

export default Wheel
