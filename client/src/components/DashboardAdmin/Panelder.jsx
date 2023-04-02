import ListaUsuarios from "./TablaUsuarios"
const datosResumen = [
    {
      name: "Felipe Calderón",
      postulaciones_realizadas: 33,
      fecha_registro: '13-02-2023',
      activo: true,
    },
    {
      name: "William Henao",
      postulaciones_realizadas: 14,
      fecha_registro: '13-02-2023',
      activo: true,

    },
    {
      name: "Lisi Daniela Gonzalez",
      postulaciones_realizadas: 37,
      fecha_registro: '13-02-2023',
      activo: false,

    },
    {
      name: "Leandro Carrizo",
      postulaciones_realizadas: 11,
      fecha_registro: '13-02-2023',
      activo: true,

    },
    {
      name: "Santiago Pagge",
      postulaciones_realizadas: 7,
      fecha_registro: '13-02-2023',
      activo: false,

    },
  ]

const Derecha = () => {
    return (
    <>
        <section className="bg-secondary-light dark:bg-primary-dark m-5 py-3 px-2 border rounded-xl w-full flex flex-col">
            <ListaUsuarios datos={datosResumen} />
        </section>
    </>
    )
}

export default Derecha