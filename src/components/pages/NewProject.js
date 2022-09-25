
import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'






function Newproject(){

    const navigate = useNavigate()

    function createPost(project){ 

        // initialize cost and service
        project.costs = 0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers:{'content-Type':'application/json',},
            body: JSON.stringify(project)
        })
        .then((resp)=> resp.json())
        .then((data)=>{
            navigate('/projects', {state:{message: 'Projeto criado com sucesso!'}})
        })
        .catch((err)=>console.log(err))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto e depois adicione os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
        </div>
    )
}

export default Newproject