import React from "react";
import {NavAbout} from './NavAbout'
import styles from './About.module.css'

export const  About = () => {
    return (
        <div className={styles.container}>
            <NavAbout />
            <h1 className={styles.titulo}>Sobre nosotros</h1> 
            <p className={styles.content}>¡Bienvenidos a FusionaJob! Somos un equipo de desarrolladores apasionados por la creación de soluciones tecnológicas innovadoras para la búsqueda y posteo de trabajos en línea. Nos gustaría presentarles a cada uno de nuestros integrantes:</p>
            <h2 className={styles.titulo_integrantes}>Integrantes:</h2>
            <p className={styles.personal_information}>Felipe Calderón Espinoza (31 años, de Temuco, Chile) es un diseñador de páginas WordPress con experiencia previa en trabajo freelance. Actualmente trabaja en el área de Front.</p>
            <p className={styles.personal_information}>Leandro Carrizo (38 años, de Rosario, Santa Fe, Argentina) trabajó en la industria de la gastronomía antes de retomar sus estudios. Actualmente estudia una tecnicatura universitaria en IA y trabaja en colaboración tanto en el área de Front como de Back.</p>
            <p className={styles.personal_information}>Lisi Daniela Gonzalez (22 años, de Córdoba, Argentina) es estudiante de Licenciatura en Relaciones Internacionales y trabaja en el área de Front.</p>
            <p className={styles.personal_information}>William Henao (23 años, de Colombia) trabajó como auxiliar de mantenimiento eléctrico industrial antes de decidir estudiar programación. Actualmente trabaja en el área de Back.</p>
            <p className={styles.personal_information}>Santiago Pagge (29 años, de Junín, Buenos Aires, Argentina) trabajó como vendedor en una estación de servicio y luego en una estación de peajes antes de unirse a nuestro equipo. Actualmente trabaja en el área de Front.</p>
            <p className={styles.personal_information}>Eric Palacio (28 años, de Corralito, Provincia de Córdoba, Argentina) trabajaba como ayudante de electricista antes de decidir estudiar programación. Actualmente trabaja en el área de Back. </p>
            <p className={styles.personal_information}>Franco Valdez (23 años, de Córdoba, Argentina) es estudiante de Ingeniería Electrónica y Administrador de E-Commerce, y trabaja en el área de Front. Su experiencia laboral previa incluye trabajo como administrador de E-Commerce.</p>
            <p className={styles.personal_information}>Violeta Sol Arias Hours (24 años, de Salta, Argentina) se graduó como diseñadora de modas y asesora de imagen personal antes de unirse a nuestro equipo. Actualmente trabaja en el área de Back.</p>
            <p className={styles.content}>En FusionaJob, nos enorgullece haber creado una plataforma que permite a los empleadores y candidatos interactuar y coordinar entrevistas y otros detalles, y que ayuda a los empleadores a encontrar al candidato adecuado. Además, nuestro sitio web simplifica el proceso de búsqueda de trabajo para los candidatos, permitiéndoles crear un perfil, subir su currículum y buscar trabajos de manera fácil y eficiente.</p>
            <p className={styles.content}>Estamos comprometidos con la excelencia en la experiencia del usuario y en brindar un servicio de alta calidad. Estamos emocionados de tener la oportunidad de ayudar a las personas a encontrar trabajo y a los empleadores a encontrar el talento adecuado. ¡Gracias por elegir FusionaJob!</p>
        </div>        
    )
} 