import {useState} from "react";
import Tamaev from "./Tamaev";

const boxStyles = (bg: 'red' | 'green') => ({
    background: bg,
    width: 50,
    height: 50,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
})

const GAME_INITIAL = Array(25).fill("0")

const Miner = ({money, setMoney}: {money: number, setMoney: Function}) => {
    const [GAME_FIELD, SET_GAME_FIELD] = useState<string[]>(GAME_INITIAL);

    const [isOn, setIsOn] = useState<boolean>(false);
    const [betMoney, setBetMoney] = useState<number>(5000);
    const [xCount, setXCount] = useState(10);
    const [gameStep, setGameStep] = useState<number>(0);

    function getFilledField() {
        const danderNums: number[] = []
        const result: string[] = []

        while (danderNums.length !== xCount) {
            const num = Math.round(Math.random() * (24))
            if(!danderNums.includes(num)) {
                danderNums.push(num)
            }
        }

        for (let i = 0; i < 25; i++) {
            if(danderNums.includes(i)) {
                result.push(i+'-danger')
            } else {
                result.push("0")
            }
        }

        return result
    }

    function start() {
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

        SET_GAME_FIELD(getFilledField())
    }

    function step(item: string, index: number) {
        const newGameField = [...GAME_FIELD];

        if (item === "0") {
            newGameField[index] = "money";

            setGameStep(prevState => prevState + 1)
        } else {
            newGameField[index] = "bomb";

            setTimeout(() => {
                finish(false)
            }, 500)
        }

        if (!GAME_FIELD.includes("0")) {
            finish(true)
        }

        SET_GAME_FIELD(newGameField);
    }

    function finish(win: boolean) {
        SET_GAME_FIELD(GAME_FIELD.map(item => item === "0" || item === "money" ? "money" : "bomb"))

        setTimeout(() => {
            if(win) {
                const profit = betMoney * gameStep
                setMoney((prevState: number) => prevState + profit)
                alert(`Победа!\nПрибыль: ${profit}`)
            } else {
                setMoney((prevState: number) => prevState - betMoney)
                alert('Ракетка имба, я делаю 100к в день')
            }

            setIsOn(false)
            setGameStep(0)

            SET_GAME_FIELD(GAME_INITIAL)
        }, 0)
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
                    gap: 5,
                    margin: '0 auto'
                }}
            >
                <div
                    style={{
                        width: 300,
                        height: 700,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        gap: 5
                    }}
                >
                    {/*  ПОЛЕ  */}
                    {GAME_FIELD.map((item, index) => {
                        if(item === "money") {
                            return <div
                                className={"hover"}
                                style={boxStyles("green")}
                            >💰</div>
                        }

                        if (item === "bomb") {
                            return <div
                                className={"hover"}
                                style={boxStyles("red")}
                            >💣</div>
                        }

                        return (
                            <div
                                className={isOn ? "hover" : ""}
                                onClick={() => isOn && step(item, index)}
                                style={{
                                    background: isOn ? "blue" : "grey",
                                    width: 50,
                                    height: 50,
                                    borderRadius: 7
                                }}
                            >{index}</div>
                        )
                    })}
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5
                    }}
                >
                    <div>
                        <button
                            onClick={() => isOn ? finish(true) : start()}
                            className={"hover"}
                            style={{
                                background: isOn ? 'green' : 'blue',
                                padding: 10,
                                fontWeight: 'bold',
                                marginRight: 5
                            }}
                        >
                            {isOn ? `Вывести` : 'Поставить'}
                        </button>
                        <select
                            style={{
                                padding: 10,
                            }}
                            value={xCount}
                            disabled={isOn}
                            onChange={(e) => setXCount(+e.target.value)}
                        >
                            <option value={10}>x2</option>
                            <option value={15}>x3</option>
                            <option value={20}>x4</option>
                            <option value={24}>x5</option>
                        </select>
                    </div>

                    <input disabled={isOn} type="number" value={betMoney} onChange={e => setBetMoney(+e.target.value)} />

                    <div>
                        Прибыль: {betMoney * gameStep}
                    </div>

                    {isOn && <Tamaev/>}
                </div>
            </div>
        </div>
    )
}

export default Miner
