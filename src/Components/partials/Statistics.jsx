const Statistics = () => {
  return (
    <div className="statistics pt-4">
        <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:grid-cols-3 xl:grid-cols-3 text-white sm:p-8">
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-5xl font-extrabold">2400+</dt>
              <dd className="text-gray-200 text-xl">Clienti soddisfatti</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-5xl font-extrabold">900+</dt>
              <dd className="text-gray-200 text-xl">Alloggi disponibili</dd>
          </div>
          <div className="flex flex-col items-center justify-center col-span-2 sm:col-span-1">
              <dt className="mb-2 text-5xl font-extrabold">50+</dt>
              <dd className="text-gray-200 text-xl">Affitti ogni giorno</dd>
          </div>
      </dl>
    </div>
  )
}

export default Statistics