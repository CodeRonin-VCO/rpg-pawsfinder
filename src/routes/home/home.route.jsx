import HeaderLayout from "../../layout/header/header.jsx";
import styles from "./home.route.module.css";
import AvatarsCards from "./components/avatars/avatars.jsx";
import ClassesCards from "./components/classes/classes.jsx";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAtom } from "jotai";
import { playerAtom } from "../../atom/atom.js";


export default function HomeRoute() {
    const navigate = useNavigate();
    const [playerCharacter, setPlayerCharacter] = useAtom(playerAtom);
    const [errorMsg, setErrorMsg] = useState("");
    const [playerBuild, setPlayerBuild] = useState({});
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    // Name management
    function handleChangeName(value) {
        if (value) {
            setPlayerBuild(prev => ({
                ...prev,
                nom: value
            }));
        };       
    };
    // Class management
    function handleChangeClass(classe) {
        setPlayerBuild(prev => ({
            ...prev,
            ...classe
        }));
        setSelectedClassId(classe.id);
    };
    // Avatar management
    function handleChangeAvatar(image) {
        if (image) {
            setPlayerBuild(prev => ({
                ...prev,
                avatar: image
            }));
            setSelectedAvatar(image);
        };
    };

    // Form management
    function handleSubmitForm(e) {
        e.preventDefault();

        const { nom, value, avatar } = playerBuild;

        if (!nom || !value || !avatar) {
            setErrorMsg("Veuillez compléter tous les champs (pseudo, classe et avatar).")
            return;
        }

        setErrorMsg("");
        setPlayerCharacter(playerBuild);
        navigate("/config");        
    }

    return (
        <div className="page">
            <HeaderLayout />
            <h4 className={styles.page_title}>Créer votre héro et conquérez les arènes.</h4>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmitForm}>
                    <div className={styles.input_group}>
                        <h6>Choisis un pseudo:</h6>
                        <input type="text" id="pseudo" name="pseudo" value={playerBuild.nom || ""} onChange={(e) => handleChangeName(e.target.value)} />
                    </div>
                    <div className={styles.input_group}>
                        <h6>Choisis une classe :</h6>
                        <ClassesCards onClassCard={handleChangeClass} selectedClassId={selectedClassId} />
                    </div>

                    <div className={styles.input_group}>
                        <h6>Choisis un avatar:</h6>
                        <AvatarsCards onAvatarsCard={handleChangeAvatar} selectedAvatar={selectedAvatar} />
                    </div>
                    <button className={styles.btn} type="submit">Lancer la partie</button>
                    {errorMsg && (
                        <p className={styles.error_msg}>{errorMsg}</p>
                    )}
                </form>
            </main>
        </div>
    )
}