import { Link } from "react-router-dom"
import Container from "./Container"
import styles from "./Navbar.module.css"
import Logo from "../../img/costs_logo.png"


function Navbar(){
    return(
    
        <nav className={styles.navbar}>
          <Container>
            <Link to='/'><img className={styles.img} src={Logo} alt='Costs'/></Link>
            <ul className={styles.list}>
                <li className={styles.item}><Link to='/'>HOME</Link></li>
                <li className={styles.item}><Link to='/project'>Projetos</Link></li>
                <li className={styles.item}><Link to='/company'>Empresa</Link></li>
                <li className={styles.item}><Link to='/contact'>Contato</Link></li>
            </ul>
          </Container>
        </nav>
       
    )
}

export default Navbar