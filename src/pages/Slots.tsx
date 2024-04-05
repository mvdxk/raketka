import {useState} from "react";
import Tamaev from "./Tamaev";
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const prizes: Array<{ image: string }> = [
    {image: 'https://cdn0.iconfinder.com/data/icons/fruits/128/Strawberry.png'},
    {image: 'https://cdn0.iconfinder.com/data/icons/fruits/128/Strawberry.png'},
    {image: "https://cdn0.iconfinder.com/data/icons/fruits/128/Strawberry.png"},
    {image: "https://cdn0.iconfinder.com/data/icons/fruits/128/Cherry.png"},
    {image: "https://cdn0.iconfinder.com/data/icons/fruits/128/Apple.png"},
    {image: "https://cdn0.iconfinder.com/data/icons/fruits/128/Lemon.png"},
    {image: "https://cdn0.iconfinder.com/data/icons/fruits/128/Kiwi.png"},
    {image: "https://cdn0.iconfinder.com/data/icons/fruits/128/Pear.png"}
];

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

const getRandomList = () => {
    const reproductionArray = (array = [], length = 0) => [
        ...Array(length)
            .fill('_')
            .map(() => array[Math.floor(Math.random() * array.length)]),
    ];
// @ts-ignore
    const reproducedPrizeList = [...prizes, ...reproductionArray(prizes, prizes.length * 3), ...prizes, ...reproductionArray(prizes, prizes.length),];
    const prizeList: any[] = reproducedPrizeList.map((prize) => ({
        ...prize,
        id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
    }));

    return prizeList
}

const Slots = ({money, setMoney}: { money: number, setMoney: Function }) => {
    const lots = {
        first: getRandomList(),
        second: getRandomList(),
        third: getRandomList()
    }
    const prizeIndex = prizes.length * 4 -Math.round(Math.random() * (prizes.length * 4));

    const [isOn, setIsOn] = useState<boolean>(false);
    const [betMoney, setBetMoney] = useState<number>(5000);

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

    }

    function finish() {
        const win = lots.first[prizeIndex].image === lots.second[prizeIndex].image === lots.third[prizeIndex].image

        if(win) {
            const profit = betMoney * 2
            setMoney((prevState: number) => prevState + profit)
            alert(`Победа!\nПрибыль: ${profit}`)
        } else {
            setMoney((prevState: number) => prevState - betMoney)
            alert('Ракетка имба, я делаю 100к в день')
        }

        setIsOn(false)
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
                    margin: '50px auto'
                }}
            >
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
                            height: 500,
                            overflow: "hidden",
                            display: "flex",
                            gap: 1
                        }}
                    >
                        <RoulettePro
                            spinningTime={5}
                            type={"vertical"}
                            prizes={lots.first}
                            prizeIndex={prizeIndex}
                            start={isOn}
                            onPrizeDefined={() => {}}
                        />
                        <RoulettePro
                            spinningTime={5}
                            type={"vertical"}
                            prizes={lots.second}
                            prizeIndex={prizeIndex}
                            start={isOn}
                            onPrizeDefined={() => {}}
                        />
                        <RoulettePro
                            spinningTime={5}
                            type={"vertical"}
                            prizes={lots.third}
                            prizeIndex={prizeIndex}
                            start={isOn}
                            onPrizeDefined={finish}
                        />
                    </div>

                    <div>
                        <button
                            onClick={start}
                            disabled={isOn}
                            className={"hover"}
                            style={{
                                background: 'blue',
                                padding: 10,
                                fontWeight: 'bold',
                                marginRight: 5
                            }}
                        >
                            Поставить
                        </button>
                    </div>

                    <input disabled={isOn} type="number" value={betMoney} onChange={e => setBetMoney(+e.target.value)}/>

                    {isOn && <Tamaev/>}
                </div>
            </div>
        </div>
    )
}

export default Slots
