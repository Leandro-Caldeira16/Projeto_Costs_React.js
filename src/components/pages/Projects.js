import Message from "../layout/Message.js"
import { useLocation } from "react-router-dom"
import styles from "./projects.module.css"
import Container from "../layout/Container"
import LinkButton from "../pages/LinkButton"
import ProjectCard from "../project/ProjectCard"

import { useEffect, useState } from "react"

function Projects(){

    const [projects, setProjects]=useState([])

    const location = useLocation()
    let message =''
    if(location.state) {
        message = location.state.message
    }

    useEffect(()=>{
        
        fetch("http://localhost:5000/projects",{
            method:'GET',
            headers:{'Content-Type' : 'application/json',},
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            console.log(data)
            setProjects(data)
            
        })
        .catch((err)=> console.log(err))
    }
    ,[])
    console.log(projects);
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>  
                <LinkButton to={'/newproject'} name={'Criar projeto'}/>
            </div>
            {message && <Message msg = {message} type={"success"}/>}
            <Container customClass= "start">
                {projects.length > 0 && (
                    projects.map((project)=>(
                        <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                    />
                    ))) }
            </Container>
        </div>
    )
}

export default Projects 