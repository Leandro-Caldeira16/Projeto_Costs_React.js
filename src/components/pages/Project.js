import {parse, v4 as uuidv4} from "uuid"
import styles from "./Project.module.css"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm"
import Message from "../layout/Message"
import ServiceForm from "../services/ServiceForm"


function Project(){

    const {id} = useParams()
    const [project, setProject]= useState([])
    const [showProjectForm, setshowProjectForm]= useState(false)
    const [showServiceForm, setShowServiceForm]= useState(false)
    const [message, setMessage]=useState([])
    const [type, setType]=useState()

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
                method:"GET",   
                headers:{"Content-Type": "application/json",},
                })
                .then((resp)=> resp.json())
                .then((data)=>{
                    setProject(data)                   
                })
                .catch((err)=>console.log(err))
        
        },1000)
       
        
    },[id])

    function editPost(project){
        setMessage('')
        if(project.budget < project.costs){
            setMessage('O custo do projeto não pode ser maior que o orçamento')
            setType("error")
            return
        }
        fetch(` http://localhost:5000/projects/${project.id}`,{
            method: "PATCH",
            headers: {"Content-Type" : "application/json",},
            body: JSON.stringify(project),
        })
        .then((resp)=>resp.json())
        .then((data=>{
            setProject(data)
            setshowProjectForm(false)
            setMessage('Projeto atualizado com sucesso!')
            setType("success")
        }))


    }

    const createService=(project)=>{
        console.log(project);
        // last service
        const lastService = project.services[project.services.length-1]
       
        lastService.id =uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost) 

        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('')
            setMessage("O valor do projeto não pode ser maior que o Orçamento")
            setType("error")
            project.services.pop()
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: "PATCH",
            headers: {"Content-Type" : "application/json",},
            body: JSON.stringify(project),
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            // exibir os serviços
        })
        .catch((err)=>console.log(err))
    }

    const toggleProjectForm=()=>{
        setshowProjectForm(!showProjectForm)
    }

    const toggleServiceForm=()=>{
        setShowServiceForm(!showServiceForm)
    }

    return(
        <>
        {project.name ? (
            <div className={styles.project_details
            }>
                <Container customClass="column" >
                    {message != "" && (<Message type={type} msg={message}/>)}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Editar projeto" : "Fechar" }</button>

                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>categoria: </span>{project.category.name}</p>
                                <p><span>Total do Orçamento: </span>{project.budget}</p>
                                <p><span>Total utilizado: </span>R${project.costs}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm
                                    handleSubmit={editPost}
                                    btnText={"Concluir edição"}
                                    projectData={project}
                                    />
                                </div>
                                
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? "Adicionar serviços" : "Fechar" }</button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={project}
                                    />
                                       
                                    
                                )}
                            </div>
                            
                    </div>
                    <h2>Serviços</h2>
                    <Container classsName={styles.project_info}>
                        <p>Itens do projeto</p>
                    </Container>
                    
                </Container>
            </div>
        ) :( <Loading/>)}
        </>
    )
}


export default Project