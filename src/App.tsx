import {useEffect, useState} from "react";
import Raketka from "./pages/Raketka";
import Miner from "./pages/Miner";
import Wheel from "./pages/Wheel";
import Slots from "./pages/Slots";

const App = () => {
    const [money, setMoney] = useState<number>(50000);
    const [game, setGame] = useState<"raketka" | "miner" | "wheel" | "slots">("raketka");

    const [isAvailable, setIsAvailable] = useState<boolean>(true);

    useEffect(() => {
        if(money <= 0) {
            alert('Брат, иди нахуй или пополни счет')
            setIsAvailable(false)
        }
    }, [money]);

    if(!isAvailable) {
        return (
            <div>
                <h1>Пополните счет</h1>
                <img src="https://i.pinimg.com/736x/f6/c3/c6/f6c3c650a0c583bfe48d43fdfb4ab8a3.jpg" alt="Деньги сюда"/>
            </div>
        )
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: 'row'
            }}
        >
            <div
                style={{
                    display: "flex",
                    height: '100vh',
                    flexDirection: 'column',
                    gap: 20,
                    width: 50,
                    background: 'rgb(255,99,99)'
                }}
            >
                <div
                    style={{
                        marginBottom: 50
                    }}
                >
                    <img width={50} height={50} src="https://toktok9ja.com/wp-content/uploads/2020/12/IMG_20201206_073804.jpg" alt="EBLAN"/>
                </div>
                <div
                    className={"hover"}
                    onClick={() => setGame("raketka")}
                >
                    <img width={50} height={50} src="https://papik.pro/grafic/uploads/posts/2023-04/1682484766_papik-pro-p-smail-raketa-png-9.png" alt="ракетка"/>
                </div>
                <div
                    className={"hover"}
                    onClick={() => setGame("miner")}
                >
                    <img width={50} height={50} src="https://vostorg.buzz/photo/uploads/posts/2023-04/1681426757_vostorg-buzz-p-fruktovaya-bomba-93.png" alt="бомбочка"/>
                </div>
                <div
                    className={"hover"}
                    onClick={() => setGame("wheel")}
                >
                    <img width={50} height={50} src="https://thumbs.dreamstime.com/b/roulette-i-wheel-casino-icon-vector-image-can-also-be-used-casino-suitable-use-web-apps-mobile-apps-print-media-94218619.jpg" alt="бомбочка"/>
                </div>
                <div
                    className={"hover"}
                    onClick={() => setGame("slots")}
                    style={{
                        position: 'relative'
                    }}
                >
                    <div style={{background: 'red', position: 'absolute', right: -30, top: -15, zIndex: 99, color: '#fff', padding: 5}}><b>NEW!!!</b></div>
                    <img width={50} height={50} src="https://store.nipsapp.com/app_icon/80.jpg" alt="слоты"/>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    width: '100%'
                }}
            >
                <div
                    style={{
                        background: 'rgb(255,99,99)',
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}
                >
                    <div>
                        🚀<b>РАКЕТКА</b>🚀 | Деньги бесплатно каждому!!!
                    </div>

                    <div>Баланс: <b>{money}</b> руб.</div>
                </div>

                {game === "raketka" && <Raketka money={money} setMoney={setMoney} />}
                {game === "miner" && <Miner money={money} setMoney={setMoney} />}
                {game === "wheel" && <Wheel money={money} setMoney={setMoney} />}
                {game === "slots" && <Slots money={money} setMoney={setMoney} />}
            </div>
        </div>
    )
}

export default App
