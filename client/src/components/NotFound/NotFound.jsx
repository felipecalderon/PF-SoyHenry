import logofusionajob from '../../assets/logofusionajob.png'
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-dark">
            <img src={logofusionajob} alt='logo' className="flex w-96 my-4" />
            <h1 className="text-5xl font-bold text-white">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-3">Pagina no encontrada</h2>
            <p className="text-gray-300 mb-4">Oops! la pagina que estas buscando no existe.</p>
            <a href="/" className="cursor-pointer py-2 px-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-secondary-light font-bold">Go back home</a>
        </div>
    )
}

export default NotFound