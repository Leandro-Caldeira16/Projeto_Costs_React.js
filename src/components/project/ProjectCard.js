import styles from "./ProjectCard.module.css"
import { Link } from "react-router-dom"

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard({name, id, budget, category, key}){
    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span>{category}
            </p>
            <div className={styles.project_card_action}>
                <Link 
                    to="/"><BsPencil/>Editar
                </Link>
                <button>
                    <BsFillTrashFill/>Excluir
                </button>
            </div>
            
        </div>
    )
}

export default ProjectCard