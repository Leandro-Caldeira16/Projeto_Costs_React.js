import styles from './Select.module.css'



function Select({type, text, name, placeholder, handleOnchange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name}>
                <option>selecione uma opção</option>
            </select>
        </div>
    )
}

export default Select