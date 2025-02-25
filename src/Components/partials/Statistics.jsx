
const Statistics = () => {
  return (
    <div className="statistics pt-4">
        <dl className="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto sm:grid-cols-3 xl:grid-cols-3 text-white sm:p-8">
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">2400+</dt>
              <dd className="text-gray-200">Clienti soddisfatti</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">900+</dt>
              <dd className="text-gray-200">Alloggi disponibili</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">50+</dt>
              <dd className="text-gray-200">Affitti ogni giorno</dd>
          </div>
      </dl>
    </div>
  )
}

export default Statistics