import { Link } from "react-router-dom"
import styles from './LinkButton.module.css'

function LinkButton({to,name}){
    return(
        <Link className={styles.button} to={to}>{name}</Link>
    )
}

export default LinkButton